window.addEventListener('load', function () {
  if (window.location.hash) {
    history.replaceState(null, null, ' ');
    window.scrollTo(0, 0);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Scroll to Top Button
  const scrollToTopBtn = document.querySelector("#scrollToTopBtn");
  if (scrollToTopBtn) {
    if (document.body.scrollTop <= 100 && document.documentElement.scrollTop <= 100) {
      scrollToTopBtn.style.display = "none";
    }
    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };

    scrollToTopBtn.onclick = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

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

  // === Swiper Slider Init ===
  const sliderElement = document.querySelector(".mySwiper");
  let swiperInstance;

  function initializeSwiper() {
    if (!sliderElement) return;

    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    sliderElement.setAttribute("dir", isRTL ? "rtl" : "ltr");

    if (swiperInstance) swiperInstance.destroy(true, true);

    swiperInstance = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      rtl: isRTL,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: false,
        renderBullet: () => "",
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }
    });
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
    initializeSwiper(); // re-init slider

    // Apply RTL/LTR class to body for styling adjustments
    document.body.classList.toggle('rtl', lang === 'ar');
  }

  // Retrieve the saved language from localStorage or default to Arabic
  const savedLang = localStorage.getItem('selectedLang') || 'ar';
  langSelect.value = savedLang;
  setLanguage(savedLang);

  // Listen for language change
  if (langSelect) {
    langSelect.addEventListener('change', (event) => {
      const selectedLang = event.target.value;
      localStorage.setItem('selectedLang', selectedLang);
      setLanguage(selectedLang);
    });
  }

  // Navbar scroll behavior
  const navbar = document.querySelector('.hero-navbar');
  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarCollapse && navbar) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      navbar.classList.add('menu-open');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      navbar.classList.remove('menu-open');
    });
  }

  function handleNavbarState() {
    if (!navbar) return;
    const isScrolled = window.scrollY > 30;
    navbar.classList.toggle('scrolled', isScrolled);
  }

  window.addEventListener('scroll', handleNavbarState);
  handleNavbarState();

  // Form Validation
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

  // AOS Init
  AOS.init({
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out',
  });
});
