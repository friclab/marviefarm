<?php

namespace App\Http\Controllers;

use App\Models\Season;
use Illuminate\Http\Request;

class SeasonController extends Controller
{
    public function index()
    {
        $seasons = Season::withCount('pieces')
            ->withCount('orders')
            ->orderByDesc('year')
            ->orderBy('type')
            ->get();

        return view('seasons.index', compact('seasons'));
    }

    public function show(Season $season)
    {
        $season->load('pieces.materials');
        $requirements = $season->materialRequirements();

        return view('seasons.show', compact('season', 'requirements'));
    }

    public function create()
    {
        return view('seasons.form', ['season' => new Season()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'type'       => 'required|in:SS,FW',
            'year'       => 'required|integer|min:2000|max:2100',
            'starts_at'  => 'nullable|date',
            'ends_at'    => 'nullable|date|after_or_equal:starts_at',
        ]);

        $season = Season::create($data);

        return redirect()->route('seasons.show', $season)->with('success', 'Season created.');
    }

    public function edit(Season $season)
    {
        return view('seasons.form', compact('season'));
    }

    public function update(Request $request, Season $season)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'type'       => 'required|in:SS,FW',
            'year'       => 'required|integer|min:2000|max:2100',
            'starts_at'  => 'nullable|date',
            'ends_at'    => 'nullable|date|after_or_equal:starts_at',
        ]);

        $season->update($data);

        return redirect()->route('seasons.show', $season)->with('success', 'Season updated.');
    }

    public function destroy(Season $season)
    {
        $season->delete();

        return redirect()->route('seasons.index')->with('success', 'Season deleted.');
    }

    /**
     * Material procurement sheet for this season.
     */
    public function procurement(Season $season)
    {
        $requirements = $season->materialRequirements();

        return view('seasons.procurement', compact('season', 'requirements'));
    }
}
