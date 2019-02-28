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
            'nature_operation'  => 'required|string|min:1|max:1',
            'taxation_regime'   => 'required|string|min:1|max:1',
            'national_simple'   => 'required|string|min:1|max:1',
            'cultural_promoter' => 'required|string|min:1|max:1',
        ]);
        
        $company = new Company([                                        
            'municipal_inscription' => $request->municipal_inscription,            
            'inscription' => $request->inscription,
            'name' => $request->name,                           
            'nature_operation' => $request->nature_operation,   
            'taxation_regime' => $request->taxation_regime,     
            'national_simple' => $request->national_simple,     
            'cultural_promoter' => $request->cultural_promoter 
        ]);
            
        $company->save();

        return response()->json([
            'message' => __('company.insert_ok')
        ], 201);
    } 

    public function updateCompany(Request $request, Company $company) {

        $company = Company::findOrFail($request->id);

        $company->fill($request->all())->save();

        return response()->json(['data'=> $company]);
    }

    public function getCompanies(Request $request) {
        $companys = Company::paginate(7);

        return $companys;
    }
}
