<?php


namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Employee;
use Carbon\Carbon;

class EmployeeController extends Controller {
    public function insertEmployee(Request $request) {
        // var_dump('312313123');die;
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:employees'//,
            // 'password' => 'required|string|confirmed'
            ]);
        // var_dump($request->syndic_email);die;
        
        
        $employee = new Employee([
            'cpf'   => '13408773688',
            'name'  => $request->name,
            'email' => $request->email
        ]);
            
        $employee->save();

        return response()->json([
            'message' => __('employee.insert_ok')
        ], 200);
    } 

    public function getEmployees(Request $request) {
        $employee = Employee::paginate(2);
        return $employee;
    }
}
