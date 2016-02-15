$("#contact-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact").offset().top - 100
    }, 1000);
    console.log('click!');
});

$("#about-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top - 100
    }, 1000);
    console.log('click!');
});

$("#portfolio-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#portfolio").offset().top - 100
    }, 1000);
    console.log('click!');
});