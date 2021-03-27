@extends('layouts.app')

@section('title')
	HOME
@endsection

@section('links')
    @include('inc.home.link-home')
@endsection

@section('content')
    @include('inc.home.header')

    @if(true)
        @include('inc.home.create-alpaca-form')
    @endif

@endsection

@section('scripts')
    @include('inc.home.scripts-home')
@endsection
