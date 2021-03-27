$(function() {

    $(".input input").focus(function() {

        $(this).parent(".input").each(function() {
            $("label", this).css({
                "line-height": "18px",
                "font-size": "18px",
                "font-weight": "100",
                "top": "0px"
            })
            $(".spin", this).css({
                "width": "100%"
            })
        });
    }).blur(function() {
        $(".spin").css({
            "width": "0px"
        })
        if ($(this).val() == "") {
            $(this).parent(".input").each(function() {
                $("label", this).css({
                    "line-height": "60px",
                    "font-size": "24px",
                    "font-weight": "300",
                    "top": "10px"
                })
            });

        }
    });

    $(".color").click(function() {

        $( ".color" ).each(function() {
            if ($(this).hasClass('select')) {
                $(this).removeClass('select');
            }
        });

        if ($(this).hasClass('select')) {
            $(this).removeClass('select');
        } else {
            $(this).addClass('select');
        }
    });

    $(".gender-button").click(function() {

        $( ".gender-button" ).each(function() {
            if ($(this).hasClass('select-gender')) {
                $(this).removeClass('select-gender').css({
                    "border-color":"rgba(0, 0, 0, 0.1)",
                    "color":"rgba(0, 0, 0, 0.1)"
                });
            }
        });

        if ($(this).hasClass('select-gender')) {
            $(this).removeClass('select-gender').css({
                "border-color":"rgba(0, 0, 0, 0.1)",
                "color":"rgba(0, 0, 0, 0.1)"
            });
        } else {
            $(this).addClass('select-gender').css({
                "border-color":"#ED2553",
                "color":"#ED2553"
            });
        }

    });

    $('#submit-create').click(function (){
        let _token   = $('meta[name="csrf-token"]').attr('content');
        let name = $('#name').val();
        let gender = $('.select-gender').attr('data-gender');
        let color = $('.color.select').attr('data-color');

        $.ajax({
            type: "POST",
            url: "/alpaca-create",
            data: {
                name: name,
                gender: gender,
                color: color,
                _token: _token
            },
            success: function (response) {
                window.location.href = response['link'];
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
