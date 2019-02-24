<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Service', 'prefix' => 'service'], function() {
        Route::get('', 'ServiceController@getServices');
        Route::post('insert', 'ServiceController@insertService');
        Route::put('update/{id}', 'ServiceController@updateService');
    });
});
