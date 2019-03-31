<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Client', 'prefix' => 'clients'], function() {
        Route::get('',          'ClientController@getClients');
        Route::get('filter',    'ClientController@filterClients');
        Route::get('/getByName', 'ClientController@getClientByName');
        Route::get('districts', 'ClientController@getDistricts');
        Route::post('',         'ClientController@insertClient');
        Route::put('/{id}',     'ClientController@updateClient');
        Route::delete('/{id}',  'ClientController@deleteClient');
    });
});
