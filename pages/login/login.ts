const form: HTMLFormElement = document.getElementById(
    "form"
) as HTMLFormElement;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let email: HTMLInputElement = document.getElementById(
        "email"
    ) as HTMLInputElement;
    let password: HTMLInputElement = document.getElementById(
        "password"
    ) as HTMLInputElement;

    let values = { email: email.value, password: password.value };

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
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if (localStorage.getItem("token") === null) {
            localStorage.setItem("token", json.token);
        }
        // location.href = "../profile/profile.html";
    } catch (error: any) {
        console.error(error.message);
    }
});
