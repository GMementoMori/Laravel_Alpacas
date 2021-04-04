<?php

namespace App\Http\Middleware;

use Closure;

class UserAuthenticateHome
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
            return $next($request);
        }

        return redirect('/');
    }
}
