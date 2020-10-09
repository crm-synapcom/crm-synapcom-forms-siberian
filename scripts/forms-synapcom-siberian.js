$(document).ready(function() {
    $('#contact_name').on('focusout', function() {
        var input = $(this);
        var test = input.val();
        if(test){
            input.removeClass('invalid').addClass('valid');
        }
        else{
            input.removeClass('valid').addClass('invalid');
        }
    });

    $('#contact_email').on('focusout', function() {
        var input=$(this);
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var test=re.test(input.val());
        if(test){
            input.removeClass('invalid').addClass('valid');
        }
        else{
            input.removeClass('valid').addClass('invalid');
        }
    });

    $('#contact_submit').click(function(event){
        event.preventDefault();

        // verifying inputs
        if($('#contact_name').hasClass('invalid')){
            alert('Por favor, insira seu nome.')
            return
        }
        if($('#contact_email').hasClass('invalid')){
            alert('Por favor, insira um email válido.')
            return
        }

        // getting URL parameters
        var self = window.location.toString();
        var querystring = self.split("?");
        if (querystring.length > 1) {
            var pairs = querystring[1].split("&");
            for (i in pairs) {
                var keyval = pairs[i].split("=");
                if (sessionStorage.getItem(keyval[0]) === null) {
                sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]));
                }
            }
        }

        var rest_data = {
            'name': $('#contact_name').val(),
            'email': $('#contact_email').val(),
            'gender': $('input[name="gender_radio"]:checked', '#contact-form').val(),
            'utm_source': sessionStorage.getItem('utm_source') == null ? '' : sessionStorage.getItem('utm_source'),
            'utm_medium': sessionStorage.getItem('utm_medium') == null ? '' : sessionStorage.getItem('utm_medium'),
            'utm_campaign': sessionStorage.getItem('utm_campaign') == null ? '' : sessionStorage.getItem('utm_campaign'),
            'utm_term': sessionStorage.getItem('utm_term') == null ? '' : sessionStorage.getItem('utm_term'),
            'utm_content': sessionStorage.getItem('utm_content') == null ? '' : sessionStorage.getItem('utm_content')
        }

        $.ajax({
            url: 'https://7rvwcwgpj6.execute-api.us-east-1.amazonaws.com/prod/lead',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utm-8',
            data: JSON.stringify(rest_data),
            success: function() {
                alert('Cadastro realizado com sucesso!!!')
                $('input').each(function() {
                    if($(this).is(':text')) {
                        $(this).val('')
                    }
                })
            },
            error: function() {

            }
        })

    });
});