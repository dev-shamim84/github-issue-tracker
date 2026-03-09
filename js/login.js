const login = () => {
  document.getElementById("Login-btn").addEventListener("click", () => {
    const userNameInput = document.getElementById("UserName").value;
    const password = document.getElementById("password").value;
    if (!userNameInput || !password) {
      alert("Invalid credential email or password");
      return;
    }
    if (userNameInput === "admin" && password === "admin123") {
      window.location.assign("/home.html");
      // alert("Login Success");
    }
  });
};
login();
