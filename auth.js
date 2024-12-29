function sendAuthRequest() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const loginInput = document.getElementById("loginInput").value;
        const passwordInput = document.getElementById("passwordInput").value;

        try {
            // TODO need to replace concrete url with some config or anything
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginInput,
                    password: passwordInput
                })
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
        }
    });
}

document.addEventListener("DOMContentLoaded", sendAuthRequest);
