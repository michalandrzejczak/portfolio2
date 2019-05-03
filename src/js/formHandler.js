$(function () {
    let request;

    $('#contact-form').on('submit', function (event) {
        event.preventDefault();

        $('.loader').fadeIn();
        $('.overlay').fadeIn();

        if (request) {
            request.abort();
        };

        const $form = $(this),
            $inputs = $form.find("input, textarea"),
            serializedData = $form.serialize();

        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "contact.php",
            type: "post",
            data: serializedData
        });

        request.done(function (response, textStatus, jqXHR) {
            const $feedbackList = $('.contact-feedback-list');
            $feedbackList.html('');

            if (response.success) {
                $feedbackList.append(`<li><i class="fas fa-check"></i>${response.success}</li>`);
                setTimeout(() => {
                    $feedbackList.find('li').fadeOut('slow', () => {
                        $(this).remove();
                    });
                }, 3000);
                $inputs.val('');
            } else if (response.errors) {
                response.errors.forEach(error => {
                    $feedbackList.append(`<li class="error"><i class="fas fa-exclamation"></i>${error}</li>`);
                })
            } else {
                $feedbackList.append(`<li class="error"><i class="fas fa-exclamation"></i>Unidentified problem</li>`);
            }
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(
                "XHR error: " + textStatus, errorThrown
            );
        });

        request.always(function () {
            $inputs.prop("disabled", false);
            $('.loader').fadeOut();
            $('.overlay').fadeOut();
        });
    });
});