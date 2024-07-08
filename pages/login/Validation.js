"use strict";
function validate() {
    const emailElement = document.getElementById('email');
    if (emailElement) {
        const email = emailElement.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            alert("Mail Valida.");
        }
        else {
            alert("Mail non valida! Ricontrolla");
        }
    }
    else {
        alert("Email non immessa");
    }
}
