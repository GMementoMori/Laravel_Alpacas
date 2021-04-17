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
    $('.button.login').click(function (){
        let _token   = $('meta[name="csrf-token"]').attr('content');
        let username = $('#name').val();
        let pass = $('#pass').val();
        let htmlErrors;
        htmlErrors = '<div class="alert alert-danger alert-dismissible fade show" style="z-index:1;">';
        htmlErrors += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
        htmlErrors += '<ul id="danger-list">';
        htmlErrors += '</ul>';
        htmlErrors += '</div>';

        $.ajax({
            type: "POST",
            url: "/login",
            data:{
                name: username,
                pass: pass,
                _token: _token
            },
            success:function(response){
                if(!response['error']) {
                    window.location.href = response['link'];
                }else{
                    $('#div-errors').removeClass('d-none');
                    $('#div-errors').html(htmlErrors);
                    $('#danger-list').append('<li><strong></strong> '+response['error']+'</li>');
                }
            },
            error: function (xhr) {
                $('#div-errors').removeClass('d-none');
                $('#div-errors').html(htmlErrors);
                $.each(xhr.responseJSON.errors, function(key,value) {
                    $('#danger-list').append('<li><strong>Danger!</strong> '+value+'</li>');
                });
            }
        });
    });
    $('.button.register').click(function (){
        let _token   = $('meta[name="csrf-token"]').attr('content');
        let username = $('#regname').val();
        let email = $('#regemail').val();
        let pass = $('#regpass').val();

        $.ajax({
            type: "POST",
            url: "/register",
            data: {
                name: username,
                email: email,
                pass: pass,
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

    $(".alt-2").click(function() {
        if (!$(this).hasClass('material-button')) {
            $(".shape").css({
                "width": "100%",
                "height": "100%",
                "transform": "rotate(0deg)"
            })

            setTimeout(function() {
                $(".overbox").css({
                    "overflow": "initial"
                })
            }, 600)

            $(this).animate({
                "width": "140px",
                "height": "140px"
            }, 500, function() {
                $(".box").removeClass("back");

                $(this).removeClass('active')
            });

            $(".overbox .title").fadeOut(300);
            $(".overbox .input").fadeOut(300);
            $(".overbox .button").fadeOut(300);

            $(".alt-2").addClass('material-buton');
        }

    })

    $(".material-button").click(function() {

        if ($(this).hasClass('material-button')) {
            setTimeout(function() {
                $(".overbox").css({
                    "overflow": "hidden"
                })
                $(".box").addClass("back");
            }, 200)
            $(this).addClass('active').animate({
                "width": "700px",
                "height": "700px"
            });

            setTimeout(function() {
                $(".shape").css({
                    "width": "50%",
                    "height": "50%",
                    "transform": "rotate(45deg)"
                })

                $(".overbox .title").fadeIn(300);
                $(".overbox .input").fadeIn(300);
                $(".overbox .button").fadeIn(300);
            }, 700)

            $(this).removeClass('material-button');

        }

        if ($(".alt-2").hasClass('material-buton')) {
            $(".alt-2").removeClass('material-buton');
            $(".alt-2").addClass('material-button');
        }

    });

});
