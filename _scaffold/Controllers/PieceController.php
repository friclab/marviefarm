<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Piece;
use App\Models\Season;
use Illuminate\Http\Request;

class PieceController extends Controller
{
    public function index(Season $season)
    {
        $pieces = $season->pieces()->with('materials')->get();

        return view('pieces.index', compact('season', 'pieces'));
    }

    public function create(Season $season)
    {
        $materials = Material::orderBy('name')->get();

        return view('pieces.form', [
            'season'    => $season,
            'piece'     => new Piece(),
            'materials' => $materials,
        ]);
    }

    public function store(Request $request, Season $season)
    {
        $data = $request->validate([
            'code'            => 'required|string|max:50',
            'name'            => 'required|string|max:200',
            'category'        => 'nullable|string|max:100',
            'description'     => 'nullable|string',
            'retail_price'    => 'nullable|numeric|min:0',
            'wholesale_price' => 'nullable|numeric|min:0',
            'materials'       => 'array',
            'materials.*.id'  => 'required|exists:materials,id',
            'materials.*.qty' => 'required|numeric|min:0.0001',
        ]);

        $piece = $season->pieces()->create($data);

        $this->syncMaterials($piece, $request->input('materials', []));

        return redirect()->route('seasons.pieces.show', [$season, $piece])
            ->with('success', 'Piece created.');
    }

    public function show(Season $season, Piece $piece)
    {
        $piece->load('materials');

        return view('pieces.show', compact('season', 'piece'));
    }

    public function edit(Season $season, Piece $piece)
    {
        $materials = Material::orderBy('name')->get();
        $piece->load('materials');

        return view('pieces.form', compact('season', 'piece', 'materials'));
    }

    public function update(Request $request, Season $season, Piece $piece)
    {
        $data = $request->validate([
            'code'            => 'required|string|max:50',
            'name'            => 'required|string|max:200',
            'category'        => 'nullable|string|max:100',
            'description'     => 'nullable|string',
            'retail_price'    => 'nullable|numeric|min:0',
            'wholesale_price' => 'nullable|numeric|min:0',
            'materials'       => 'array',
            'materials.*.id'  => 'required|exists:materials,id',
            'materials.*.qty' => 'required|numeric|min:0.0001',
        ]);

        $piece->update($data);

        $this->syncMaterials($piece, $request->input('materials', []));

        return redirect()->route('seasons.pieces.show', [$season, $piece])
            ->with('success', 'Piece updated.');
    }

    public function destroy(Season $season, Piece $piece)
    {
        $piece->delete();

        return redirect()->route('seasons.pieces.index', $season)
            ->with('success', 'Piece deleted.');
    }

    private function syncMaterials(Piece $piece, array $materials): void
    {
        $sync = [];
        foreach ($materials as $entry) {
            $sync[$entry['id']] = ['quantity' => $entry['qty']];
        }
        $piece->materials()->sync($sync);
    }
}
