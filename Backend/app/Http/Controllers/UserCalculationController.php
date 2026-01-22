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
        //
        $request->validate([
            'full_name' => 'required|regex:/^[a-zA-Z\s]+$/' // Validation: Alphabets only
        ]);

        // THE CALCULATOR LOGIC (Example: Length of name * random number)
        $result = strlen(str_replace(' ', '', $request->full_name)) * rand(1, 100);

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
        //
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
    public function update(Request $request, UserCalculation $userCalculation)
    {
        //
        $request->validate([
            'full_name' => 'required|regex:/^[a-zA-Z\s]+$/'
        ]);

        $user = UserCalculation::findOrFail($id);
        $user->update(['full_name' => $request->full_name]); // Only update name

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserCalculation $userCalculation)
    {
        //
        UserCalculation::destroy($id);
        return response()->json(null, 204);
    }
}
