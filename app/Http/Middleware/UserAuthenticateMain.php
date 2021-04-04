<?php

namespace App\Http\Middleware;

use Closure;

class UserAuthenticateMain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(session()->has('_sessionToken') && session()->has('user_id')){
            return redirect()->route('home');
        }

        return $next($request);
    }
}
