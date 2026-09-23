function getUsers() {

    const users =
        localStorage.getItem("shree_users");

    if (!users) {
        return [];
    }

    return JSON.parse(users);
}



function saveUsers(users) {

    localStorage.setItem(
        "shree_users",
        JSON.stringify(users)
    );
}



function registerUser() {

    const name =
        document.getElementById("registerName")
            .value
            .trim();

    const email =
        document.getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById("registerPassword")
            .value;


    const message =
        document.getElementById("registerMessage");


    if (!name || !email || !password) {

        message.textContent =
            "Please fill in all fields.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    const users =
        getUsers();


    const existingUser =
        users.find(
            user => user.email === email
        );


    if (existingUser) {

        message.textContent =
            "An account with this email already exists.";

        return;
    }


    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);

    saveUsers(users);


    message.textContent =
        "Account created successfully.";


    setTimeout(() => {

        window.location.href =
            "login.html";

    }, 1000);

}



function loginUser() {

    const email =
        document.getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById("loginPassword")
            .value;


    const message =
        document.getElementById("loginMessage");


    const users =
        getUsers();


    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password
        );


    if (!user) {

        message.textContent =
            "Incorrect email or password.";

        return;
    }


    localStorage.setItem(
        "shree_current_user",
        JSON.stringify(user)
    );


    window.location.href =
        "dashboard.html";

}



function getCurrentUser() {

    const user =
        localStorage.getItem(
            "shree_current_user"
        );


    if (!user) {
        return null;
    }


    return JSON.parse(user);
}



function requireLogin() {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return false;
    }


    return true;
}



function logoutUser() {

    localStorage.removeItem(
        "shree_current_user"
    );

    window.location.href =
        "index.html";
}
