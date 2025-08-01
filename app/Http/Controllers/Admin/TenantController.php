<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\TenantResource;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Tenant;
use App\Models\User;
use App\Models\UserAddress;
use App\Notifications\Tenant\SendPassword;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TenantController extends Controller
{
    /**
     * Display a listing of the tenents.
     */
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        $list = User::where('role','tenant')->with('detail' , 'address')->orderBy('id' , 'desc')->paginate($limit);
        return TenantResource::collection($list);
    }

    /**
     * Store a newly created tenant.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'company_number' => 'required|string',
            'vat' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $password = Str::random(8);
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($password),
            'role'=>'tenant'
        ]);
        $user->notify(new SendPassword($password));
        $request->merge(['user_id'=>$user->id]);
        Tenant::create($request->all());
        UserAddress::create($request->all());
        $freePlan = Plan::where('price' , 0)->first();
        $endOn=Carbon::now()->addDay($freePlan->expire_after);
        Subscription::create([
            'tenant_id'=>$user->id,
            'plan_id'=>$freePlan->id,
            'subscription_ends'=>$endOn,
        ]);
        return response()->json(['message' => 'Tenant created successfully' , 'success'=>true]);
    }

    /**
     * Show the specified tenant.
     */
    public function detail($id)
    {
        $tenant = User::where('id',$id)->with('detail' , 'address')->first();

        if (!$tenant) {
            return response()->json(['message' => 'Tenant not found'], 404);
        }

        return new TenantResource($tenant);

    }

    /**
     * Update the specified tenant.
     */
    public function edit(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'company_number' => 'required|string',
            'vat' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        User::find($id)->update([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make(Str::random(8)),
            'role'=>'tenant'
        ]);
        $request->merge(['user_id'=>$id]);
        $tenant =Tenant::where('user_id',$id)->first();
        $tenant->update($request->all());
        $address = UserAddress::where('user_id',$id)->first();
        $address->update($request->all());
        return response()->json(['message' => 'Tenant updated successfully' , 'success'=>true]);
    }

    /**
     * Remove the specified tenant.
     */
    public function delete($id)
    {
        $user = User::find($id);
        $tenant = Tenant::where('user_id' , $id)->first();
        $address = UserAddress::where('user_id',$id)->first();


        if (!$user || !$tenant) {
            return response()->json(['message' => 'Tenant not found'], 404);
        }

        $tenant->delete();
        $user->delete();
        $address->delete();
        return response()->json(['message' => 'Tenant deleted successfully'  , 'success'=>true]);
    }
}
