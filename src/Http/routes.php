<?php

Route::group(['namespace' => 'Greabock\Console\Http\Controllers'], function(){

    /*
    |--------------------------------------------------------------------------
    |  Console Get Action Route
    |--------------------------------------------------------------------------
    | Register action returning console view.
    |
    */
    get('console', [
        'as' =>  'greabock.console.console',
        'uses' => 'ConsoleController@getIndex',
    ]);

    /*
    |--------------------------------------------------------------------------
    |  Console Post Action Route
    |--------------------------------------------------------------------------
    | Register action executing code.
    |
    */
    post('console', [
        'as' =>  'greabock.console.console',
        'uses' => 'ConsoleController@postIndex',
    ]);
});

