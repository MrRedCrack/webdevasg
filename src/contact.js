// src/contact.js
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    // TODO: replace with your real endpoint (Formspree/Netlify/etc.)
    alert('Thanks! Your message has been sent.');
    form.reset();
  });
})();
