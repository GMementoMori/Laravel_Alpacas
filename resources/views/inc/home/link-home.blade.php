<link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
<link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900&subset=latin,latin-ext'>
<link rel="stylesheet" href="{{ asset('/css/home.css') }}">
@if(!$register)
    <link rel="stylesheet" href="{{ asset('/css/create-alpaca-form.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/create-alpaca.css') }}">
@else
    <link rel="stylesheet" href="{{ asset('/css/action-form.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/alpaca-home.css') }}">
@endif
