import AuthService from "/scripts/UserService.js";
import HeaderController from "/scripts/HeaderController.js";

document.addEventListener("DOMContentLoaded", () => {
    const authService = new AuthService("http://localhost:8080/api/v1");
    const headerController = new HeaderController(authService, "header-container");

    headerController.renderHeader();
});
