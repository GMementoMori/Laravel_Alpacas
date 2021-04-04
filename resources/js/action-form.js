$(function() {

    function rgb2hex(orig){
        var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
    }

    function LightenDarkenColor(col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col,16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if  (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

    }

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

            let main = rgb2hex($(this).css('background-color'));
            let lColor = LightenDarkenColor(main, 50);
            let noseColor = LightenDarkenColor(main, 70);
            let dColor = LightenDarkenColor(main, -80);

            $("body").get(0).style.setProperty("--main", main);
            $("body").get(0).style.setProperty("--l-color", lColor);
            $("body").get(0).style.setProperty("--nose-color", noseColor);
            $("body").get(0).style.setProperty("--d-color", dColor);
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
