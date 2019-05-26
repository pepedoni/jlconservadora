<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Service', 'prefix' => 'services'], function() {
        Route::get('', 'ServiceController@getServices');
        Route::get('/getByName', 'ServiceController@getServiceByName');
        Route::post('', 'ServiceController@insertService');
        Route::put('/{id}', 'ServiceController@updateService');
    });
});
