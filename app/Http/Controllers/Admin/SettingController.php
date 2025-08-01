<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
     public function index(Request $request)
    {
        return response()->json(['data'=>Setting::pluck('value', 'key')->toArray()]);
    }

    /**
     * Store a newly created tenant.
     */
    public function store(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            $set = Setting::where('key', $key)->first() ?: new Setting();
            $set->key = $key;
            $set->value = $value == null ? '' : $value;
            $set->save();
        }
        return response()->json(['message' => 'The Site Config has been save/updated!' , 'success'=>true]);
    }
}
