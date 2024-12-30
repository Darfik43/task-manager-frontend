export default class AuthService {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async getUserInfo() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/user`, {
                method: "GET",
                headers: { Authorization: localStorage.getItem("accesstoken") },
            });
            if (response.ok) {
                return await response.json(); // Возвращаем данные пользователя
            } else if (response.status === 401) {
                return null; // Пользователь не авторизован
            } else {
                throw new Error(`Unexpected status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            return null;
        }
    }

    async login(username, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("accesstoken", data.accesstoken);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error logging in:", error);
            return false;
        }
    }

    async logout() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/logout`, {
                method: "POST",
                headers: { Authorization: localStorage.getItem("accesstoken") },
            });

            if (response.ok) {
                localStorage.removeItem("accesstoken");
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error logging out:", error);
            return false;
        }
    }
}
