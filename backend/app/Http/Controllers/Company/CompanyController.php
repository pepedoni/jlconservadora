<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Company;
use Carbon\Carbon;

class CompanyController extends Controller
{
    public function insertCompany(Request $request) {
        $request->validate([
            'municipal_inscription'       => 'required|string|max:255',
            'inscription'       => 'required|string|max:255',
            'name'              => 'required|string|max:255',
            'taxation_regime'   => 'required|integer|min:0|max:5',
            'national_simple'   => 'required|integer|min:0|max:1',
            'cultural_promoter' => 'required|integer|min:0|max:1',
        ]);
        
        $company = new Company([                                        
            'municipal_inscription' => $request->municipal_inscription,            
            'inscription' => $request->inscription,
            'name' => $request->name,                            
            'taxation_regime' => $request->taxation_regime,     
            'national_simple' => $request->national_simple,     
            'cultural_promoter' => $request->cultural_promoter, 
            'cep' => $request->cep,
            'state' => $request->state,
            'city' => $request->city,
            'address_district' => $request->address_district,
            'address' => $request->address,
            'address_number' => $request->address_number,
            'address_complement' =>$request->address_complement 
        ]);
            
        $company->save();

        return response()->json([
            'message' => __('company.insert_ok')
        ], 201);
    } 

    public function updateCompany(Request $request, $id) {

        $company = Company::findOrFail($id);

        $company->fill($request->all())->save();

        return response()->json(['data'=> $company]);
    }

    public function getCompanies(Request $request) {
        $companys = Company::paginate(7);

        return $companys;
    }

    public function getCompanyByName(Request $request) {
        return Company::distinct()->where('name', 'LIKE', $request->query('name').'%')->get();
    }

    public function deleteCompany(Request $request, $id) {
        $company = Company::findOrFail($id);
        $company->delete();
    }
}
