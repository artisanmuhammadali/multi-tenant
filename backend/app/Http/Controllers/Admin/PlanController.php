<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlanRequest;
use App\Http\Resources\Admin\PlanResource;
use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    /**
     * Display a listing of the tenents.
     */
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        $list = Plan::orderBy('id' , 'desc')
                ->when($request->user()->role != 'super-admin' , function($q){
                    $q->where('price' ,'>' , 0);
                })->paginate($limit);
        return PlanResource::collection($list);
    }

    /**
     * Store a newly created tenant.
     */
    public function store(PlanRequest $request)
    {
        Plan::create($request->all());
        return response()->json(['message' => 'Plan created successfully' , 'success'=>true]);
    }

    /**
     * Show the specified tenant.
     */
    public function detail($id)
    {
        $tenant = Plan::find($id);
        if (!$tenant) {
            return response()->json(['message' => 'Plan not found'], 404);
        }
        return new PlanResource($tenant);

    }

    /**
     * Update the specified tenant.
     */
    public function edit(PlanRequest $request, $id)
    {
        Plan::find($id)->update($request->all());
        return response()->json(['message' => 'Plan updated successfully' , 'success'=>true]);
    }

    /**
     * Remove the specified tenant.
     */
    public function delete($id)
    {
        $plan = Plan::find($id);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }
        $plan->delete();
        return response()->json(['message' => 'Plan deleted successfully'  , 'success'=>true]);
    }
}
