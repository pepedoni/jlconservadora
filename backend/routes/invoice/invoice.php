<?php

Route::group(['middleware' => 'auth:api'], function(){

    Route::group(['namespace' => 'Invoice', 'prefix' => 'invoice'], function() {
        
        Route::get('', 'InvoiceController@index');
        Route::post('', 'InvoiceController@store');
        Route::put('/{id}', 'InvoiceController@update');
        Route::delete('/{id}', 'InvoiceController@remove');
        Route::get('/taxes', "InvoiceController@taxes");
        
        Route::post('/transmitInvoice', 'InvoiceController@transmitInvoice');
        
        Route::resource('/services', 'InvoiceServicesController');
    });

});
