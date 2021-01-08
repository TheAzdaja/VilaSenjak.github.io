
(function ($, window, document, undefined) {
    'use strict';

    var $form = $('#kontakt');
    var $greske = $('#greske');

    $form.submit(function (e) {
        // remove the error class
        $('#kontakt input').removeAttr('style');

        // console.log( $('input[name="name"]').val() );
        // console.log( $('input[name="email"]').val() );
        // console.log( $('textarea[name="message"]').val() );

        // get the form data
        var formData = {
            'name' : $('input[name="name"]').val(),
            'email' : $('input[name="email"]').val(),
            'message' : $('textarea[name="message"]').val()
        };

       //console.log(formData);

        // process the form
        $.ajax({
            type : 'POST',
            url  : 'posalji.php',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
            // handle errors
            if (!data.success) {
                console.log(data.errors);
                if (data.errors.name) {
                    $greske.html('<div class="alert alert-warning">' + data.errors.name + '</div>');
                }
                if (data.errors.email) {
                    $greske.html('<div class="alert alert-warning">' + data.errors.email + '</div>');
                }
                if (data.errors.message) {
                    $greske.html('<div class="alert alert-warning">' + data.errors.message + '</div>'); 
                }
            } else {
                // display success message
                $greske.html(''); 
                $form.html('<div class="alert alert-success">' + data.message + '</div>');
            }
        }).fail(function (data) {
            // for debug
            console.log(data)
        });

        e.preventDefault();
    });
}(jQuery, window, document));
