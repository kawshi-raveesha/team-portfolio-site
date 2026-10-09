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