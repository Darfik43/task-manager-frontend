export default class HeaderController {
    constructor(authService, headerContainerId) {
        this.authService = authService;
        this.headerContainer = document.getElementById(headerContainerId);
        this.modalContainer = document.createElement("div");
        this.modalContainer.className = "modal-container hidden";
        document.body.appendChild(this.modalContainer);
    }

    async loadHtmlTemplate(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load HTML template: ${filePath}`);
            }
            return await response.text();
        } catch (error) {
            console.error("Error loading HTML template:", error);
            return "<div>Error loading content</div>";
        }
    }

    async renderHeader() {
        const headerHtml = await this.loadHtmlTemplate("/static/header.html");
        this.headerContainer.innerHTML = headerHtml;
        this.updateAuthBlock();
    }

    async updateAuthBlock() {
        const userInfo = await this.authService.getUserInfo();
        const authControlBlock = this.headerContainer.querySelector(".auth-control-block");

        if (userInfo) {
            // Загружаем HTML и заменяем плейсхолдеры
            const withAuthHtmlResponse = await fetch('/static/with-auth.html');
            let withAuthHtml = await withAuthHtmlResponse.text();
            withAuthHtml = withAuthHtml.replace("${userInfo.email}", userInfo.email);

            authControlBlock.innerHTML = withAuthHtml;

            document.getElementById("logout-button").addEventListener("click", async () => {
                const success = await this.authService.logout();
                if (success) {
                    await this.updateAuthBlock(); // Обновляем блок после успешного logout
                } else {
                    alert("Logout failed.");
                }
            });
        } else {
            // Загружаем HTML для незалогиненного пользователя
            const nonAuthHtmlResponse = await fetch('/static/non-auth.html');
            const nonAuthHtml = await nonAuthHtmlResponse.text();

            authControlBlock.innerHTML = nonAuthHtml;

            document.getElementById("login-button").addEventListener("click", () => this.showLoginModal());
            document.getElementById("register-button").addEventListener("click", () => this.register());
        }
    }

    async showLoginModal() {
        const loginHtml = await this.loadHtmlTemplate("/static/login_modal.html");
        this.modalContainer.innerHTML = loginHtml;
        this.modalContainer.classList.remove("hidden");

        const closeButton = this.modalContainer.querySelector(".close-modal");
        closeButton.addEventListener("click", () => {
            this.modalContainer.classList.add("hidden");
        });

        const loginForm = this.modalContainer.querySelector("#login-form");
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const email = formData.get("email");
            const password = formData.get("password");

            const success = await this.authService.login(email, password);
            if (success) {
                this.modalContainer.classList.add("hidden");
                this.updateAuthBlock();
            } else {
                alert("Login failed. Check your credentials.");
            }
        });
    }

    register() {
        window.location.href = "/register";
    }
}
