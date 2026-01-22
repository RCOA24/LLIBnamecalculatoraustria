<?php

namespace App\Http\Controllers;

use App\Models\UserCalculation;
use Illuminate\Http\Request;

class UserCalculationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(UserCalculation::latest()->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|regex:/^[a-zA-Z\s]+$/'
        ]);

        // Deterministic Calculation: Sum of alphabet positions (A=1, B=2...)
        // Remove spaces, uppercase, convert to arrays
        $cleanName = strtoupper(preg_replace('/[^A-Z]/i', '', $request->full_name));
        $result = collect(str_split($cleanName))->sum(fn($char) => ord($char) - 64);

        $data = UserCalculation::create([
            'full_name' => $request->full_name,
            'calculation_result' => $result
        ]);

        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserCalculation $userCalculation)
    {
        return response()->json($userCalculation);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserCalculation $userCalculation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'full_name' => 'required|regex:/^[a-zA-Z\s]+$/'
        ]);

        $userCalculation = UserCalculation::findOrFail($id);
        // Recalculate result based on new name
        $cleanName = strtoupper(preg_replace('/[^A-Z]/i', '', $request->full_name));
        $result = collect(str_split($cleanName))->sum(fn($char) => ord($char) - 64);
        $userCalculation->update([
            'full_name' => $request->full_name,
            'calculation_result' => $result
        ]);

        return response()->json($userCalculation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userCalculation = UserCalculation::findOrFail($id);
        $userCalculation->delete();
        return response()->json(null, 204);
    }
}
