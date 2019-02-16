<?php

Route::group([
    'middleware' => 'api',
    'prefix' => 'menu'
], function () {
    Route::get('buildMenu', 'Acl\MenuController@buildMenu');
    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
