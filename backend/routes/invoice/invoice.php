<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Invoice', 'prefix' => 'invoice'], function() {
        Route::get('', 'InvoiceController@getInvoices');
        Route::post('insert', 'InvoiceController@insertInvoice');
        Route::put('update/{id}', 'InvoiceController@updateInvoice');
        Route::delete('delete/{id}', 'InvoiceController@deleteInvoice');
        
        Route::resource('services', 'InvoiceServicesController');
    });

});
