"use strict";

const links = document.querySelectorAll("nav a");
const form = document.getElementById("contactForm");
const timeElement = document.querySelector("[data-testid='test-user-time']");
const fields = document.querySelectorAll("input, textarea");
const messages = document.querySelectorAll('[role="alert"]');
const groups = document.querySelectorAll(".form-group");
const successMessage = document.querySelector(
  '[data-testid="test-contact-success"]'
);

const updateNavLinks = () => {
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("text-blue-700", "bg-blue-100", "font-semibold");
      link.classList.remove("text-slate-600");
    } else {
      link.classList.remove("text-blue-700", "bg-blue-100", "font-semibold");
      link.classList.add("text-slate-600");
    }
  });
};

links.forEach((link) => {
  link.classList.add(
    "px-3",
    "py-2",
    "rounded-lg",
    "transition-all",
    "duration-300",
    "font-medium",
    "focus:outline-2",
    "focus:outline-offset-2",
    "focus:outline-blue-500"
  );
});

// Update current time in milliseconds
const updateTime = () => {
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
};

// Initial update
updateNavLinks();
updateTime();

// Update every second
setInterval(updateTime, 1000);

// Smooth scroll for internal links

// Validation rules
const validationRules = {
  fullName: {
    validate: (value) => value.trim().length > 0,
    message: "Full name is required",
  },
  email: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Please enter a valid email address (e.g., name@example.com)",
  },
  subject: {
    validate: (value) => value.trim().length > 0,
    message: "Subject is required",
  },
  message: {
    validate: (value) => value.trim().length >= 10,
    message: "Message must be at least 10 characters long",
  },
};

// Validate individual field
const validateField = (fieldName) => {
  const field = form.elements[fieldName];
  const rule = validationRules[fieldName];
  const errorElement = document.getElementById(`error-${fieldName}`);

  if (!rule.validate(field.value)) {
    field.parentElement.classList.add("error", "animate-shake");
    field.classList.add("border-red-600", "bg-red-50");
    field.classList.remove("border-slate-300", "focus:bg-blue-50");
    errorElement.textContent = rule.message;
    errorElement.classList.remove("hidden");
    return false;
  } else {
    field.parentElement.classList.remove("error", "animate-shake");
    field.classList.remove("border-red-600", "bg-red-50");
    field.classList.add("border-slate-300");
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
    return true;
  }
};

// Real-time validation on blur
Object.keys(validationRules).forEach((fieldName) => {
  const field = form.elements[fieldName];
  field.addEventListener("blur", () => validateField(fieldName));
  field.addEventListener("input", () => {
    if (field.parentElement.classList.contains("error")) {
      validateField(fieldName);
    }
  });
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate all fields
  let isValid = true;
  Object.keys(validationRules).forEach((fieldName) => {
    if (!validateField(fieldName)) {
      isValid = false;
    }
  });

  // If valid, show success message
  if (isValid) {
    successMessage.classList.remove("hidden");
    form.reset();

    // Clear error states
    groups.forEach((group) => {
      group.classList.remove("error");
    });

    messages.forEach((msg) => {
      if (msg !== successMessage) {
        msg.classList.add("hidden");
      }
    });

    fields.forEach((field) => {
      field.classList.remove("border-red-600", "bg-red-50");
      field.classList.add("border-slate-300");
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
  }
});
