<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Company', 'prefix' => 'company'], function() {
        Route::get('', 'CompanyController@getCompanies');
        Route::post('insert', 'CompanyController@insertCompany');
        Route::put('update/{id}', 'CompanyController@updateCompany');
    });
});
