@extends('layouts.app')

@section('title')
	HOME
@endsection

@section('links')
    @include('inc.home.link-home')
@endsection

@section('content')
    @include('inc.home.header')

    @if(!$register)
        @include('inc.home.create-alpaca-form')
        @include('inc.alpacas.create-alpaca')
    @else
        @include('inc.home.action-form')
        @include('inc.alpacas.alpaca-home')
    @endif

    @include('inc.home.background')

@endsection

@section('scripts')
    @include('inc.home.scripts-home')
@endsection
