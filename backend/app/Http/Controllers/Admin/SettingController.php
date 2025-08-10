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

    public function key($key)
    {
        $setting = Setting::where('key', $key)->value('value');
        if (is_null($setting)) {
            return response()->json(['message' => 'Setting not found'], 404);
        }
        return response()->json([$key => $setting]);
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
