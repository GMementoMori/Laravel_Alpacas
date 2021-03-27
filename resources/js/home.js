$(function() {

    $('#logout').click(function (){
        let _token   = $('meta[name="csrf-token"]').attr('content');

        let htmlErrors;
        htmlErrors = '<div class="alert alert-danger alert-dismissible fade show" style="z-index:1;">';
        htmlErrors += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
        htmlErrors += '<ul id="danger-list">';
        htmlErrors += '</ul>';
        htmlErrors += '</div>';

        $.ajax({
            type: "POST",
            url: "/logout",
            data:{
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

});
