<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src="{{ asset('/js/home.js') }}"></script>
@if(!$register)
    <script src="{{ asset('/js/create-alpaca-form.js') }}"></script>
    <script src="{{ asset('/js/create-alpaca.js') }}"></script>
@else
    <script src="{{ asset('/js/action-form.js') }}"></script>
    <script src="{{ asset('/js/alpaca-home.js') }}"></script>
@endif
