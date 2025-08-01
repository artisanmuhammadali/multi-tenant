<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class SubscriptionController extends Controller
{
    public function planSave(Request $request)
    {
        $plan=Plan::find($request->plan_id);
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        $intent=Session::get('intent_id');
        $response = $stripe->paymentIntents->capture($intent,['amount' => $plan->price*100]);
        $user= $request->user();
        $user->stripe_id=$response->id;
        $today=Carbon::now()->addDay(30);
        $user->trial_ends_at=$today;
        $user->plan_id=$request->plan_id;
        $user->save();
        return redirect()->route('home')->with('success','Plan purchased successfully!');
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
                    'confirmation_method' => 'manual',
					'capture_method' => 'manual',
                    'confirm' => true,
					'description' => 'payment',
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
                "success" => true
            ]);
        } else {
            # Invalid status
            http_response_code(500);
            echo json_encode(['error' => 'Invalid PaymentIntent status']);
        }

    }
}
