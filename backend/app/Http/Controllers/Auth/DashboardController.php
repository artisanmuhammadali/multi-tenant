<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\DashboardStats;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    private $dashboardService;
    public function __construct(DashboardStats $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $data = $user->role == 'super-admin' ? $this->dashboardService->getAdminStats() : $this->dashboardService->getTenantStats($user->id);
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
        
    }
}
