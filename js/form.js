var contactForm = $('#contact-form');
var request = new XMLHttpRequest();
request.open('GET', 'submitform.php');
request.send(new FormData(contactForm));
