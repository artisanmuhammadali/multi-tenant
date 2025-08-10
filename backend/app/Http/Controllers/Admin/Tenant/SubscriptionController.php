<?php

namespace App\Http\Controllers\Admin\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Tenant\SubscriptionResource;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the subscriptions.
     */
    public function index(Request $request , $id)
    {
        $list = Subscription::where('tenant_id' , $id)->with('plan')->orderBy('id' , 'desc')->get();
        return SubscriptionResource::collection($list);
    }
    /**
     * Update the specified subscriptions.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'subscription_ends' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        Subscription::find($id)->update($request->all());
        return response()->json(['message' => 'Subscription updated successfully' , 'success'=>true]);
    }
}
