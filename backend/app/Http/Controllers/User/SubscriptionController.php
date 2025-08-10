<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Setting;
use App\Models\Subscription;
use App\Models\Transactions;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the tenents.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $sub = Subscription::where('tenant_id',$user->id)->where('active' , true)->first();
        $plan = $sub ? Plan::find($sub->plan_id) : null;
        return response()->json(['subscription' => $sub , 'plan' => $plan]);
    }
    public function planSave(Request $request)
    {
        $stripeSecret = Setting::where('key', 'stripe_secret')->value('value');
        $user= $request->user();

        $plan=Plan::find($request->plan_id);
        $stripe = new \Stripe\StripeClient($stripeSecret);
        $intent=$request->intent_id;
        $response = $stripe->paymentIntents->capture($intent,['amount' => $plan->price_after_discount*100]);

        $endOn=Carbon::now()->addDay($plan->expire_after);
        $sub = Subscription::create([
            'tenant_id'=>$user->id,
            'plan_id'=>$plan->id,
            'subscription_ends'=>$endOn,
        ]);
        Subscription::whereNotIn('id', [$sub->id])->where('tenant_id',$user->id)->update(['active'=>false]);
        Transactions::create([
            'transaction_id'=>$response->id,
            'tenant_id'=>$user->id,
            'plan_id'=>$request->plan_id,
            'amount'=>$plan->price_after_discount,
            'status'=>'success',
        ]);
        return response()->json(['success'> true,'message'=>'Plan purchased successfully!']);
    }
    public function planFreeSave($id)
    {
        $user= request()->user();
        $plan = Plan::find($id);
        $today=Carbon::now()->addDay(14);
        $user->trial_ends_at=$today;
        $user->plan_id=$id;
        $user->save();
        return redirect()->route('home')->with('success','Plan purchased successfully!');
    }
    public function planUpgrade()
    {
        $ids = [1,5];
        $list = Plan::whereNotIn('id',$ids)->get();
        return view('client.upgrade-plan',get_defined_vars());
    }
    public function intent(Request $request)
    {
        $stripeSecret = Setting::where('key', 'stripe_secret')->value('value');

        \Stripe\Stripe::setApiKey($stripeSecret);

        header('Content-Type: application/json');

        # retrieve json from POST body
        $json_str = file_get_contents('php://input');
        $json_obj = json_decode($json_str);

        $intent = null;
        try {
            if (isset($json_obj->payment_method_id)) {

					\Stripe\Stripe::setApiKey($stripeSecret);
                    $intent = \Stripe\PaymentIntent::create([
                    'payment_method' => $json_obj->payment_method_id,
                    'amount' => $json_obj->amount,
                    'currency' => 'USD',
					'capture_method' => 'manual',
                    'confirm' => true,
					'description' => 'payment',
                    'automatic_payment_methods' => [
                        'enabled' => true,
                        'allow_redirects' => 'never',
                    ],
                ]);
				}

            if (isset($json_obj->payment_intent_id)) {
                $intent = \Stripe\PaymentIntent::retrieve(
                    $json_obj->payment_intent_id
                );
                $intent->confirm();
            }

            $this->generateResponse($intent);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            # Display error on client
            echo json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }
    public function generateResponse($intent) {
        # Note that if your API version is before 2019-02-11, 'requires_action'
        # appears as 'requires_source_action'.
       // print_r($intent);
        if ($intent->status == 'requires_action' &&
            $intent->next_action->type == 'use_stripe_sdk') {
            # Tell the client to handle the action
            echo json_encode([
                'requires_source_action' => true,
                'payment_intent_client_secret' => $intent->client_secret
            ]);
        } else if ($intent->status == 'requires_capture') {
            # The payment didn’t need any additional actions and completed!
            # Handle post-payment fulfillment
			Session::put('intent_id',$intent->id);

            echo json_encode([
                "success" => true,
                'intent_id'=>$intent->id
            ]);
        } else {
            # Invalid status
            http_response_code(500);
            echo json_encode(['error' => 'Invalid PaymentIntent status']);
        }

    }
}
