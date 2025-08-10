<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\CustomerRequest;
use App\Http\Resources\Tenant\CustomerResource;
use App\Models\Customer;
use App\Models\User;
use App\Models\UserAddress;
use App\Notifications\User\SendPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class CustomerController extends Controller
{
    /**
     * Display a listing of the customers.
     */
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        $list = User::where('role','customer')->orderBy('id' , 'desc')->paginate($limit);
        return CustomerResource::collection($list);
    }

    /**
     * Store a newly created customer.
     */
    public function store(CustomerRequest $request)
    {
        $customer = (object)$request->customer;
        $password = Str::random(8);
        $user = User::create([
            'name'=>$customer->first_name.' '.$customer->last_name,
            'email'=>$customer->email,
            'password'=>Hash::make($password),
            'role'=>'customer'
        ]);
        $cust = Customer::create([
            'first_name' => $customer->first_name,
            'last_name' => $customer->last_name,
            'phone_number' => $customer->phone_number,
            'note' => $customer->note,
            'user_id' => $user->id,
            'tenant_id' => $request->user()->id,
        ]);
        $user->update(['detail_id' => $cust->id]);

        foreach($request->addresses as $address)
        {
            $address['user_id'] = $user->id;
            UserAddress::create($address);
        }
        return response()->json(['message' => 'Customer created successfully' , 'success'=>true]);
    }

    /**
     * Show the specified customer.
     */
    public function detail($id)
    {
        $customer = User::where('id',$id)->first();

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        return new CustomerResource($customer);

    }

    /**
     * Update the specified customer.
     */
    public function edit(CustomerRequest $request, $id)
    {
        $customer = (object)$request->customer;
        
        $cust = Customer::find($id);
        $user = User::find($cust->user_id);
        $user->update([
            'name'=>$customer->first_name.' '.$customer->last_name,
            'email'=>$customer->email,
        ]);
        $cust->update([
            'first_name' => $customer->first_name,
            'last_name' => $customer->last_name,
            'phone_number' => $customer->phone_number,
            'note' => $customer->note,
        ]);
        foreach($request->addresses as $address)
        {
            UserAddress::updateOrCreate(
                ['id' => $address['id'] ?? null],
                $address
            );
        }
        return response()->json(['message' => 'Customer updated successfully' , 'success'=>true]);
    }

    /**
     * Remove the specified customer.
     */
    public function delete($id)
    {
        $user = User::find($id);
        $customer = Customer::where('user_id' , $id)->first();

        if (!$user || !$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        $customer->delete();
        $user->delete();
        UserAddress::where('user_id',$id)->delete();

        return response()->json(['message' => 'Customer deleted successfully'  , 'success'=>true]);
    }
}

