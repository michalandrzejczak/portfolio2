$(function() {
    $("#contact-form").submit(function(event) {
        event.preventDefault();
        alert("msg sent");
    /*    let name = $("contact-name").value,
                email = $("contact-email").value,
                message = $("contact-message").value;
        $.ajax({
            url: "https://formspree.io/micequ@gmail.com", 
            type: "POST",
            dataType: "json",
            data: {
                "name": name,
                "email": email,
                "message": message
            },
            cache:false,
            success: function(msg) {
                alert('Email Sent');
                $('#msg').html(msg);
            }               
        });*/
    });
})