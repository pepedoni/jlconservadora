<?php

Route::group([
    'namespace' => 'Client',
    'middleware' => 'api',
    'prefix' => 'clients'
], function () {
    Route::post('insert', 'ClientController@insertClient');
    Route::get('', 'ClientController@getClients');
});