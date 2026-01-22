<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserCalculation;

class CalculationSeeder extends Seeder
{
    public function run()
    {
        UserCalculation::create([
            'full_name' => 'John Doe',
            'calculation_result' => 45 // Random dummy value
        ]);
        
        UserCalculation::create([
            'full_name' => 'Jane Smith',
            'calculation_result' => 90
        ]);
    }
}
