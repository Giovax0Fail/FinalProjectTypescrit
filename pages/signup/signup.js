"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signupForm = document.getElementById("form");
const errorMessageSignUp = document.getElementById("error-message");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let fullName = document.getElementById("fullName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let values = {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
    };
    console.log(values);
    try {
        const response = yield fetch("https://api-qkhq253w2q-ew.a.run.app/sign-in", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            errorMessage.textContent = "credenziali sbagliate";
            throw new Error(`Response status: ${response.status}`);
        }
        const json = yield response.json();
        console.log(json);
        location.href = "../login/login.html";
    }
    catch (error) {
        console.error(error.message);
    }
}));
