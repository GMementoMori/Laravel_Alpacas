<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/register', 'LoginController@register');

Route::post('/login', 'LoginController@login');

Route::post('/alpaca-create', 'CreateAlpacaController@create');

Route::group(['middleware' => ['userAuthenticateMain']], function (){

    Route::get('/', 'PageLoginController@index');

});

Route::group(['middleware' => ['userAuthenticateHome']], function (){

    Route::get('/home', 'PageHomeController@index')->name('home');

    Route::post('/logout', 'LogoutController@logout');

    Route::post('/alpaca-actions', 'ActionsController@index');

});
