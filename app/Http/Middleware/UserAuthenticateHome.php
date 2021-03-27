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
        if(session()->has('_sessionToken')){
            return $next($request);
        }

        return redirect('/');
    }
}
