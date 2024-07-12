// Import necessary types
interface JSONObject {
    [key: string]: any;
}

// Function to create an HTML element with a class
function createElement(
    tag: string,
    className: string,
    content: string = ""
): HTMLElement {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = content;
    return element;
}

// Function to convert JSON object to HTML
function jsonToHtml(json: JSONObject, parentElement: HTMLElement): void {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];

            const row = createElement("div", "json-row");
            const keyElement = createElement("div", "json-key", key);
            let valueElement;

            if (typeof value === "object" && value !== null) {
                valueElement = createElement("div", "json-value");
                jsonToHtml(value, valueElement); // Recursively call for nested objects
            } else {
                valueElement = createElement(
                    "div",
                    "json-value",
                    value.toString()
                );
            }

            row.appendChild(keyElement);
            row.appendChild(valueElement);
            parentElement.appendChild(row);
        }
    }
}

// Initialize the root element
const rootElement = document.getElementById("json-container");

async function getData() {
    try {
        let token = localStorage.getItem("token");
        const response = await fetch(
            "https://api-qkhq253w2q-ew.a.run.app/profile",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
                method: "GET",
            }
        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        let photo = document.createElement("img");
        photo.src = json.photo;
        photo.className = "photo";
        rootElement?.append(photo);
        if (rootElement) {
            jsonToHtml(json, rootElement);
        }
    } catch (error: any) {
        console.error(error.message);
    }
}

const logOutButton = document.getElementById("log-out-button");
logOutButton?.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "../login/login.html";
});

getData();
