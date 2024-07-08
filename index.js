"use strict";
if (localStorage.getItem("token")) {
    location.href = "pages/profile/profile.html";
}
else {
    location.href = "pages/login/login.html";
}
