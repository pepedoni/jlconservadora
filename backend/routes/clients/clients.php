<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Client', 'prefix' => 'clients'], function() {
        Route::get('', 'ClientController@getClients');
        Route::post('insert', 'ClientController@insertClient');
    });
});
