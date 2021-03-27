<div id="div-errors" class="position-absolute w-100 d-none">
    <div class="alert alert-danger alert-dismissible fade show" style="z-index:1;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <ul id="danger-list">
            @if($errors->any())
                @foreach($errors->all() as $error)
                    <li><strong>Danger!</strong>{{ $error }}}</li>
                @endforeach
            @endif
        </ul>
    </div>
</div>
