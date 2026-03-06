<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Piece;
use App\Models\Season;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['customer', 'season'])
            ->orderByDesc('ordered_at')
            ->paginate(25);

        return view('orders.index', compact('orders'));
    }

    public function create()
    {
        $seasons   = Season::orderByDesc('year')->get();
        $customers = Customer::orderBy('name')->get();

        return view('orders.form', [
            'order'     => new Order(),
            'seasons'   => $seasons,
            'customers' => $customers,
            'pieces'    => collect(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_id'        => 'required|exists:customers,id',
            'season_id'          => 'required|exists:seasons,id',
            'order_number'       => 'required|string|max:100|unique:orders,order_number',
            'status'             => 'required|in:draft,confirmed,fulfilled,cancelled',
            'ordered_at'         => 'nullable|date',
            'delivery_due'       => 'nullable|date',
            'notes'              => 'nullable|string',
            'items'              => 'required|array|min:1',
            'items.*.piece_id'   => 'required|exists:pieces,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.unit_price' => 'nullable|numeric|min:0',
        ]);

        $order = Order::create($data);

        foreach ($request->input('items') as $item) {
            $order->items()->create($item);
        }

        return redirect()->route('orders.show', $order)->with('success', 'Order created.');
    }

    public function show(Order $order)
    {
        $order->load('customer', 'season', 'items.piece.materials');

        return view('orders.show', compact('order'));
    }

    public function edit(Order $order)
    {
        $seasons   = Season::orderByDesc('year')->get();
        $customers = Customer::orderBy('name')->get();
        $pieces    = Piece::where('season_id', $order->season_id)->get();
        $order->load('items');

        return view('orders.form', compact('order', 'seasons', 'customers', 'pieces'));
    }

    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'customer_id'        => 'required|exists:customers,id',
            'season_id'          => 'required|exists:seasons,id',
            'order_number'       => 'required|string|max:100|unique:orders,order_number,' . $order->id,
            'status'             => 'required|in:draft,confirmed,fulfilled,cancelled',
            'ordered_at'         => 'nullable|date',
            'delivery_due'       => 'nullable|date',
            'notes'              => 'nullable|string',
            'items'              => 'required|array|min:1',
            'items.*.piece_id'   => 'required|exists:pieces,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.unit_price' => 'nullable|numeric|min:0',
        ]);

        $order->update($data);
        $order->items()->delete();

        foreach ($request->input('items') as $item) {
            $order->items()->create($item);
        }

        return redirect()->route('orders.show', $order)->with('success', 'Order updated.');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted.');
    }

    /**
     * AJAX: return pieces for a given season (used when selecting a season in the order form).
     */
    public function piecesBySeason(Season $season)
    {
        return response()->json($season->pieces()->select('id', 'code', 'name', 'wholesale_price')->get());
    }
}
