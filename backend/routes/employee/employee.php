<?php

Route::group(['middleware' => 'auth:api'], function(){
    
    Route::group(['namespace' => 'Employee', 'prefix' => 'employee'], function() {
        Route::get('', 'EmployeeController@getEmployees');
        Route::post('insert', 'EmployeeController@insertEmployee');
    });
});
