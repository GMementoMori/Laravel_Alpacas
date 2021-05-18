$(function() {

    for (action in actions) {
        $('.box-buttons').append('<div class="alpaca-actions">'+action+'</div>');
    }

    $(".active").click(function() {

        $(this).removeClass('active')

    });

    $(".alpaca-actions").click(function() {

        $('.list-current-variants').html('');

        if ($(this).hasClass('active')) {
            $(".alpaca-actions").each(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            });

            $('.list-current-variants').hide();
        } else {
            $(".alpaca-actions").each(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            });
            $(this).addClass('active');
            for (action in actions[$(this).text()]) {
                $('.list-current-variants').append(
                    '<div class="current-variants-actions" data-action-id="'+actions[$(this).text()][action][0]+'" data-type-action="'+$(this).text()+'">'
                            +actions[$(this).text()][action][1]+
                    '</div>'
                );
            }

            $('.list-current-variants').show();
        }

    });

    $(document).on("click", ".current-variants-actions", function(){

        let _token = $('meta[name="csrf-token"]').attr('content');
        let typeAction = $(this).attr('data-type-action').toLowerCase();
        let idAction = $(this).attr('data-action-id');

        $.ajax({
            type: "POST",
            url: "/alpaca-actions",
            data: {
                action: typeAction,
                idAction: idAction,
                _token: _token
            },
            success: function (response) {
                if (response['success']){
                    window.location.href = response['link'];
                }
            },
            error: function (xhr) {
                $('.alert-danger.d-none').removeClass('d-none');
                $('#danger-list').html('');
                $.each(xhr.responseJSON.errors, function (key, value) {
                    $('#danger-list').append('<li><strong>Danger!</strong> ' + value + '</li>');
                });
            }
        });
    });
});
