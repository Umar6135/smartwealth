$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

$(".next").click(function (e) {
    current_fs = $(this).parent();

    // Validate required fields first
    var isValid = true;

    current_fs.find("input[required]").each(function () {
        var val = $.trim($(this).val());

        // Check if field is filled
        if (val === '') {
            isValid = false;
            $(this).css('border', '1px solid red'); // highlight if it's empty
        }
        // Validate email format
        else if ($(this).attr("type") === "email") {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(val)) {
                isValid = false;
                $(this).css('border', '1px solid red'); // highlight if invalid
            } else {
                $(this).css('border', '');
            }
        }
        // Validate phone (Digits and minimum length 10 for this example)
        else if ($(this).attr("name") === "phone") {
            var phonePattern = /^[0-9]{10,}$/;
            if (!phonePattern.test(val)) {
                isValid = false;
                $(this).css('border', '1px solid red'); // highlight if invalid
            } else {
                $(this).css('border', '');
            }
        }
        else {
            $(this).css('border', '');
        }
    });

    if (!isValid) {
        e.preventDefault();
        return;
    }
  
    // If validation passed, move forward
    next_fs = current_fs.next();

    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();

    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now) {
            // for making fieldset appear animation
            var opacity = 1 - now;

            current_fs.css({ 'display': 'none', 'position': 'relative' });
            next_fs.css({ 'opacity': opacity });
        },
        duration: 500
    });

    setProgressBar(++current);
});

// Clear borders when typing
$("input[required]").on("input", function(){
    $(this).css('border', '');
});



    $(".previous").click(function () {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }

    $(".submit").click(function () {
        return false;
    })

});