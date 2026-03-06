<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index()
    {
        $materials = Material::orderBy('name')->get();

        return view('materials.index', compact('materials'));
    }

    public function create()
    {
        return view('materials.form', ['material' => new Material()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code'          => 'required|string|max:50|unique:materials,code',
            'name'          => 'required|string|max:200',
            'supplier'      => 'nullable|string|max:200',
            'unit'          => 'required|in:m,kg,pcs',
            'cost_per_unit' => 'required|numeric|min:0',
            'notes'         => 'nullable|string',
        ]);

        $material = Material::create($data);

        return redirect()->route('materials.show', $material)->with('success', 'Material created.');
    }

    public function show(Material $material)
    {
        $material->load('pieces.season');

        return view('materials.show', compact('material'));
    }

    public function edit(Material $material)
    {
        return view('materials.form', compact('material'));
    }

    public function update(Request $request, Material $material)
    {
        $data = $request->validate([
            'code'          => 'required|string|max:50|unique:materials,code,' . $material->id,
            'name'          => 'required|string|max:200',
            'supplier'      => 'nullable|string|max:200',
            'unit'          => 'required|in:m,kg,pcs',
            'cost_per_unit' => 'required|numeric|min:0',
            'notes'         => 'nullable|string',
        ]);

        $material->update($data);

        return redirect()->route('materials.show', $material)->with('success', 'Material updated.');
    }

    public function destroy(Material $material)
    {
        $material->delete();

        return redirect()->route('materials.index')->with('success', 'Material deleted.');
    }
}
