document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
      }
    });
  });

  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formFeedback = document.getElementById('formFeedback');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function resetErrors() {
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
    if (formFeedback) {
      formFeedback.textContent = '';
      formFeedback.className = 'feedback';
    }
  }

  function validateFields() {
    resetErrors();
    let valid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else if (name.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters.';
      valid = false;
    } else if (name.length > 100) {
      nameError.textContent = 'Name is too long.';
      valid = false;
    }

    if (!email) {
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }

    if (!message) {
      messageError.textContent = 'Please enter a message.';
      valid = false;
    } else if (message.length < 6) {
      messageError.textContent = 'Message must be at least 6 characters.';
      valid = false;
    } else if (message.length > 2000) {
      messageError.textContent = 'Message is too long.';
      valid = false;
    }

    return { valid, name, email, message };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { valid, name } = validateFields();

    if (!valid) {
      if (formFeedback) {
        formFeedback.textContent = 'Please fix the errors above and try again.';
        formFeedback.classList.add('error');
        formFeedback.focus?.();
      }
      return;
    }

    if (formFeedback) {
      const firstName = name.split(' ')[0] || name;
      formFeedback.textContent = 'Thanks, ${firstName}! Your message has been sent successfully.';
      formFeedback.classList.remove('error');
      formFeedback.classList.add('success');
      formFeedback.focus?.();
    }

    form.reset();
  });

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      if ((input === nameInput && nameError.textContent) ||
          (input === emailInput && emailError.textContent) ||
          (input === messageInput && messageError.textContent)) {
        validateFields();
      }
    });
  });
});
