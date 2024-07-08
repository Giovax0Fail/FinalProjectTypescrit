const signupForm: HTMLFormElement = document.getElementById(
    "form"
) as HTMLFormElement;

const errorMessageSignUp: HTMLParagraphElement = document.getElementById(
    "error-message"
) as HTMLParagraphElement;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let fullName: HTMLInputElement = document.getElementById(
        "fullName"
    ) as HTMLInputElement;
    let email: HTMLInputElement = document.getElementById(
        "email"
    ) as HTMLInputElement;
    let password: HTMLInputElement = document.getElementById(
        "password"
    ) as HTMLInputElement;

    let values = {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
    };

    console.log(values);

    try {
        const response = await fetch(
            "https://api-qkhq253w2q-ew.a.run.app/sign-in",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(values),
            }
        );
        if (!response.ok) {
            errorMessage.textContent = "credenziali sbagliate";
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        location.href = "../login/login.html";
    } catch (error: any) {
        console.error(error.message);
    }
});
