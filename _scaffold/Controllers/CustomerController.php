<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::withCount('orders')->orderBy('name')->get();

        return view('customers.index', compact('customers'));
    }

    public function create()
    {
        return view('customers.form', ['customer' => new Customer()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code'           => 'required|string|max:50|unique:customers,code',
            'name'           => 'required|string|max:200',
            'contact_person' => 'nullable|string|max:200',
            'email'          => 'nullable|email|max:200',
            'phone'          => 'nullable|string|max:50',
            'country'        => 'nullable|string|size:2',
            'city'           => 'nullable|string|max:100',
            'address'        => 'nullable|string',
            'notes'          => 'nullable|string',
        ]);

        $customer = Customer::create($data);

        return redirect()->route('customers.show', $customer)->with('success', 'Customer created.');
    }

    public function show(Customer $customer)
    {
        $customer->load('orders.season', 'orders.items');

        return view('customers.show', compact('customer'));
    }

    public function edit(Customer $customer)
    {
        return view('customers.form', compact('customer'));
    }

    public function update(Request $request, Customer $customer)
    {
        $data = $request->validate([
            'code'           => 'required|string|max:50|unique:customers,code,' . $customer->id,
            'name'           => 'required|string|max:200',
            'contact_person' => 'nullable|string|max:200',
            'email'          => 'nullable|email|max:200',
            'phone'          => 'nullable|string|max:50',
            'country'        => 'nullable|string|size:2',
            'city'           => 'nullable|string|max:100',
            'address'        => 'nullable|string',
            'notes'          => 'nullable|string',
        ]);

        $customer->update($data);

        return redirect()->route('customers.show', $customer)->with('success', 'Customer updated.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted.');
    }
}
