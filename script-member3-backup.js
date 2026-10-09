// MEMBER 3: all JavaScript interactivity

//DOM ELEMENTS

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const typingText = document.getElementById("typingText");
const contactForm = document.getElementById("contactForm");
const year = document.getElementById("year");

//TYPING EFFECT

const words = [
    "together.",
    "with code.",
    "with creativity.",
    "with GitHub."
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 120);
}

if (typingText) {
    typeEffect();
}


   //MOBILE MENU

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("show");

        if (navbar.classList.contains("show")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }
    });
}

   //CLOSE MOBILE MENU AFTER CLICK

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navbar) {
            navbar.classList.remove("show");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }
    });
});



   //DARK MODE

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "☾";
            localStorage.setItem("theme", "light");
        }
    });
}

//LOAD SAVED THEME

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀";
    }
}

//CTIVE NAVIGATION LINK

const sections = document.querySelectorAll("main section");

function updateActiveLink() {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (currentSection && target === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


//FORM VALIDATION

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const message = document.getElementById("message")?.value.trim() || "";

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");
        const formStatus = document.getElementById("formStatus");

        if (nameError) nameError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (messageError) messageError.textContent = "";

        if (formStatus) {
            formStatus.textContent = "";
            formStatus.classList.remove("success");
        }

        let valid = true;

        if (name === "") {
            if (nameError) nameError.textContent = "Please enter your name.";
            valid = false;
        } else if (name.length < 2) {
            if (nameError) {
                nameError.textContent =
                    "Name must contain at least 2 characters.";
            }
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            if (emailError) emailError.textContent = "Please enter your email.";
            valid = false;
        } else if (!emailPattern.test(email)) {
            if (emailError) {
                emailError.textContent =
                    "Please enter a valid email address.";
            }
            valid = false;
        }

        if (message === "") {
            if (messageError) {
                messageError.textContent = "Please enter your message.";
            }
            valid = false;
        } else if (message.length < 10) {
            if (messageError) {
                messageError.textContent =
                    "Message must contain at least 10 characters.";
            }
            valid = false;
        }

        if (valid) {
            if (formStatus) {
                formStatus.textContent =
                    "Thanks! Your message was sent.";
                formStatus.classList.add("success");
            }

            contactForm.reset();
        }
    });
}

//FOOTER YEAR

if (year) {
    year.textContent = new Date().getFullYear();
}
          