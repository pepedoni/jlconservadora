<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Company', 'prefix' => 'companies'], function() {
        Route::get('', 'CompanyController@getCompanies');
        Route::get('/getByName', 'CompanyController@getCompanyByName');
        Route::post('', 'CompanyController@insertCompany');
        Route::put('/{id}', 'CompanyController@updateCompany');
        Route::delete('/{id}',  'CompanyController@deleteCompany');
    });
});
