@extends('layouts.app')

@section('title')
	LOG IN
@endsection

@section('links')
    @include('inc.login.link-register')
@endsection

@section('content')

    @include('inc.alpaca')

    @include('inc.login.form')

@endsection

@section('scripts')
    @include('inc.login.scripts-register')
@endsection
