window.addEventListener('load', function () {
    if (window.location.hash) {
     
      history.replaceState(null, null, ' ');
      window.scrollTo(0, 0);
    }
  });
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.querySelector("#scrollToTopBtn");
   if (document.body.scrollTop <= 100 && document.documentElement.scrollTop <= 100) {
       scrollToTopBtn.style.display = "none";
   }
   window.onscroll = function() {
       if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
           scrollToTopBtn.style.display = "block";
       } else {
           scrollToTopBtn.style.display = "none";
       }
   };

   scrollToTopBtn.onclick = function() {
       window.scrollTo({ top: 0, behavior: 'smooth' });
   };
  const langSelect = document.getElementById('language-select');
  const htmlElement = document.getElementById('lang-html');

  function updateFormPlaceholders() {
    const dir = document.documentElement.getAttribute('dir');
    const isRTL = dir === 'rtl';

    const nameInput = document.getElementById("UserName");
    const emailInput = document.getElementById("UserEmail");
    const messageInput = document.getElementById("message");

    if (nameInput) nameInput.placeholder = isRTL ? 'الاسم' : 'Your Name';
    if (emailInput) emailInput.placeholder = isRTL ? 'البريد الالكتروني' : 'Email Address';
    if (messageInput) messageInput.placeholder = isRTL ? 'رسالتك' : 'Your Message';

    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = isRTL ? 'ارسل الان' : 'Send Now';

    const formSuccess = document.getElementById('formSuccess');
    if (formSuccess) formSuccess.textContent = isRTL ? 'تم ارسال الرسالة' : 'Message sent successfully';
  }

  function setLanguage(lang) {
    if (lang === 'ar') {
      htmlElement.setAttribute('lang', 'ar');
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.setAttribute('lang', 'en');
      htmlElement.setAttribute('dir', 'ltr');
    }

    document.querySelectorAll('[data-en]').forEach(element => {
      element.textContent = element.getAttribute(`data-${lang}`);
    });

    updateFormPlaceholders();
  }

  if (langSelect) {
    langSelect.addEventListener('change', (event) => {
      setLanguage(event.target.value);
    });
  }

  setLanguage('ar');

  const navbar = document.querySelector('.hero-navbar');
  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarCollapse && navbar) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      navbar.classList.add('scrolled');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      navbar.classList.remove('scrolled');
    });
  }

  function handleNavbarState() {
    if (!navbar) return;
    const isScrolled = window.scrollY > 30;
    navbar.classList.toggle('scrolled', isScrolled);
  }

  window.addEventListener('scroll', handleNavbarState);
  handleNavbarState();

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("UserName");
  const emailInput = document.getElementById("UserEmail");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const successMessage = document.getElementById("formSuccess");

  function validateAll() {
    let isValid = true;
    const dir = document.documentElement.getAttribute('dir');
    const isRTL = dir === 'rtl';

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (name.length < 3) {
      if (nameError) nameError.textContent = isRTL ? "الاسم يجب أن يكون على الأقل 3 أحرف." : "Name must be at least 3 characters.";
      isValid = false;
    } else {
      if (nameError) nameError.textContent = "";
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      if (emailError) emailError.textContent = isRTL ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email.";
      isValid = false;
    } else {
      if (emailError) emailError.textContent = "";
    }

    if (message.length < 10) {
      if (messageError) messageError.textContent = isRTL ? "يجب أن تكون الرسالة 10 أحرف على الأقل." : "Message must be at least 10 characters.";
      isValid = false;
    } else {
      if (messageError) messageError.textContent = "";
    }

    return isValid;
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener("input", validateAll);
    }
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

      if (validateAll()) {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim()
        };

        localStorage.setItem("contactFormData", JSON.stringify(formData));

        if (successMessage) {
          successMessage.textContent = isRTL ? "تم إرسال الرسالة بنجاح." : "Message sent successfully.";
          successMessage.classList.remove("d-none");
        }

        form.reset();

        setTimeout(() => {
          if (successMessage) successMessage.classList.add("d-none");
        }, 3000);
      } else {
        if (successMessage) successMessage.classList.add("d-none");
      }
    });
  }

  // AOS animation init
  AOS.init({
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out',
  });
});
