async function login() {
  const userName = document.getElementById("username").value;
  const userPassword = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");
  try {
    const response = await fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        userPassword,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      if (data.token) {
        document.cookie = `jwt=${data.token}; path=/; max-age=3600`;
        window.location.href = "/";
      }
    } else {
      errorMessage.textContent = data.message || "Error logging in.";
    }
  } catch (error) {
    errorMessage.textContent =
      "There was a problem logging in: " + error.message;
  }
}

