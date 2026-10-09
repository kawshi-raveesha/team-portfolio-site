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