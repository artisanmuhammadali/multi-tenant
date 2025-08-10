<?php

namespace App\Services\Auth;

use App\Models\Plan;
use App\Models\User;

class DashboardStats {
 
    public function getAdminStats()
    {
        return [
            [
                'label' => 'Tenants',
                'data' => User::where('role', 'tenant')->count(),
                'icon' => 'groups',
            ],
            [
                'label' => 'Plans',
                'data' => Plan::count(),
                'icon' => 'assignment',
            ],
        ];
    }

    public function getTenantStats($tenantId)
    {
        return [
            [
                'label' => 'Customers',
                'data' => User::where('role', 'customer')->where('tenant_id', $tenantId)->count(),
                'icon' => 'groups',
            ],
            [
                'label' => 'Technicians',
                'data' => User::where('role', 'technician')->where('tenant_id', $tenantId)->count(),
                'icon' => 'deployed_code_account',
            ],
        ];
    }

}