<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Company', 'prefix' => 'companies'], function() {
        Route::get('', 'CompanyController@getCompanies');
        Route::post('', 'CompanyController@insertCompany');
        Route::put('/{id}', 'CompanyController@updateCompany');
    });
});
