function sendAuthRequest() {
    document.addEventListener("DOMContentLoaded", () => {
        const loginForm = document.getElementById("loginForm");

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const loginInput = document.getElementById("loginInput").value;
            const passwordInput = document.getElementById("passwordInput").value;

            try {
                const response = await fetch("api/v1/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        login: loginInput,
                        password: passwordInput
                    })
                });

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }

                const data = await response.json();
                alert("Успешный вход: " + JSON.stringify(data));
            } catch (error) {
                console.error("Ошибка при авторизации:", error);
                alert("Не удалось войти. Проверьте логин и пароль.");
            }
        });
    });
}