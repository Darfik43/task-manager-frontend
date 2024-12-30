async function getUserInfo() {
    const response = await fetch("http://localhost:8080/api/v1/user", {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("accesstoken"),
        },
    })
}