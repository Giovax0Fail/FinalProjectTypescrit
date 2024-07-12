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
// Function to create an HTML element with a class
function createElement(tag, className, content = "") {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = content;
    return element;
}
// Function to convert JSON object to HTML
function jsonToHtml(json, parentElement) {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];
            const row = createElement("div", "json-row");
            const keyElement = createElement("div", "json-key", key);
            let valueElement;
            if (typeof value === "object" && value !== null) {
                valueElement = createElement("div", "json-value");
                jsonToHtml(value, valueElement); // Recursively call for nested objects
            }
            else {
                valueElement = createElement("div", "json-value", value.toString());
            }
            row.appendChild(keyElement);
            row.appendChild(valueElement);
            parentElement.appendChild(row);
        }
    }
}
// Initialize the root element
const rootElement = document.getElementById("json-container");
function createForm() {
    const form = document.createElement("form");
    rootElement === null || rootElement === void 0 ? void 0 : rootElement.appendChild(form);
    const textArea = document.createElement("textarea");
    textArea.rows = 10;
    textArea.cols = 60;
    textArea.required = true;
    textArea.minLength = 100;
    form.appendChild(textArea);
    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "crea profilo";
    form.appendChild(submitButton);
    form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            let value = {
                description: textArea.value,
            };
            console.log(value);
            // let token = localStorage.getItem("token");
            // const response = await fetch(
            //     "https://api-qkhq253w2q-ew.a.run.app/profile",
            //     {
            //         headers: {
            //             "Content-Type": "application/json",
            //             Authorization: "Bearer " + token,
            //         },
            //         method: "POST",
            //         body: JSON.stringify(value),
            //     }
            // );
        }
        catch (error) {
            console.error(error.message);
        }
    }));
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = localStorage.getItem("token");
            const response = yield fetch("https://api-qkhq253w2q-ew.a.run.app/profile", {
                headers: {
                    Authorization: "Bearer " + token,
                },
                method: "GET",
            });
            if (!response.ok) {
                // means user hasn't generated profile data yet so we present the form
                createForm();
            }
            else {
                // display profile data
                const json = yield response.json();
                console.log(json);
                let photo = document.createElement("img");
                photo.src = json.photo;
                photo.className = "photo";
                rootElement === null || rootElement === void 0 ? void 0 : rootElement.append(photo);
                if (rootElement) {
                    jsonToHtml(json, rootElement);
                }
            }
        }
        catch (error) {
            console.error(error.message);
        }
    });
}
const logOutButton = document.getElementById("log-out-button");
logOutButton === null || logOutButton === void 0 ? void 0 : logOutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "../login/login.html";
});
getData();
