const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

// ================= LOAD PROFILE =================

async function loadProfile() {

    try {

        const response = await fetch(

            "http://localhost:8080/api/auth/profile",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        if (!response.ok) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;

        }

        const user = await response.json();

        document.getElementById("name").value = user.name;

        document.getElementById("email").value = user.email;

    }

    catch (error) {

        console.log(error);

        showToast("Unable to load profile.","error");

    }

}

// ================= UPDATE PROFILE =================

document.getElementById("saveProfile").addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    try {

        const response = await fetch(

            "http://localhost:8080/api/auth/update-profile",

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    name,

                    email

                })

            }

        );

        const data = await response.json();

        showToast(

            data.message,

            response.ok ? "success" : "error"

        );

    }

    catch (error) {

        console.log(error);

        showToast("Unable to update profile.","error");

    }

});

// ================= CHANGE PASSWORD =================

document.getElementById("changePassword").addEventListener("click", async () => {

    const currentPassword = document.getElementById("currentPassword").value;

    const newPassword = document.getElementById("newPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {

        showToast("Passwords do not match.","warning");

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:8080/api/auth/change-password",

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    currentPassword,

                    newPassword

                })

            }

        );

        const data = await response.json();

        showToast(

            data.message,

            response.ok ? "success" : "error"

        );

        if (response.ok) {

            document.getElementById("currentPassword").value = "";

            document.getElementById("newPassword").value = "";

            document.getElementById("confirmPassword").value = "";

        }

    }

    catch (error) {

        console.log(error);

        showToast("Unable to change password.","error");

    }

});

// ================= DARK MODE =================

const darkMode = document.getElementById("darkMode");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    darkMode.checked = true;

}

darkMode.addEventListener("change", () => {

    if (darkMode.checked) {

        document.body.classList.add("dark-mode");

        localStorage.setItem("theme", "dark");

        showToast("Dark mode enabled.","info");

    }

    else {

        document.body.classList.remove("dark-mode");

        localStorage.setItem("theme", "light");

        showToast("Light mode enabled.","info");

    }

});

// ================= NOTIFICATIONS =================

const notification = document.getElementById("notifications");

notification.checked = localStorage.getItem("notifications") !== "off";

notification.addEventListener("change", () => {

    if (notification.checked) {

        localStorage.setItem("notifications", "on");

        showToast("Notifications enabled.","success");

    }

    else {

        localStorage.setItem("notifications", "off");

        showToast("Notifications disabled.","warning");

    }

});

// ================= LOGOUT =================

document.getElementById("logoutBtn").addEventListener("click", () => {

    const ok = confirm("Logout from RailNova?");

    if (!ok) {

        return;

    }

    localStorage.removeItem("token");

    window.location.href = "login.html";

});

// ================= DELETE ACCOUNT =================

document.getElementById("deleteAccount").addEventListener("click", async () => {

    const ok = confirm(

        "This will permanently delete your account.\n\nContinue?"

    );

    if (!ok) {

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:8080/api/auth/delete-account",

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        showToast(

            data.message,

            response.ok ? "success" : "error"

        );

        if (response.ok) {

            localStorage.removeItem("token");

            setTimeout(() => {

                window.location.href = "signup.html";

            }, 1200);

        }

    }

    catch (error) {

        console.log(error);

        showToast("Unable to delete account.","error");

    }

});

// ================= START =================

loadProfile();