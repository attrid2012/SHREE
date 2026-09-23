document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (!requireLogin()) {
            return;
        }


        const user =
            getCurrentUser();


        if (!user) {
            return;
        }


        document.getElementById(
            "profileName"
        ).textContent =
            user.name;


        document.getElementById(
            "profileEmail"
        ).textContent =
            user.email;

    }
);
