<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserCalculation;

class CalculationSeeder extends Seeder
{
    public function run()
    {
        $users = ['John Doe', 'Jane Smith', 'Alice Wonderland'];
        
        foreach ($users as $name) {
            // Replicate the controller logic for consistency
            $cleanName = strtoupper(preg_replace('/[^A-Z]/i', '', $name));
            $result = collect(str_split($cleanName))->sum(fn($char) => ord($char) - 64);

            UserCalculation::create([
                'full_name' => $name,
                'calculation_result' => $result
            ]);
        }
    }
}
