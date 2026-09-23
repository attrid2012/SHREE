const BACKEND_URL =
    "YOUR_VERCEL_BACKEND_URL";



document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (!requireLogin()) {
            return;
        }

    }
);



async function sendQuestion() {

    const input =
        document.getElementById(
            "questionInput"
        );


    const question =
        input.value.trim();


    if (!question) {
        return;
    }


    const chat =
        document.getElementById(
            "chatMessages"
        );


    const welcome =
        document.querySelector(
            ".welcome-screen"
        );


    if (welcome) {
        welcome.remove();
    }


    // USER MESSAGE

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "message user-message";

    userMessage.textContent =
        question;

    chat.appendChild(
        userMessage
    );


    input.value = "";


    // AI LOADING

    const aiMessage =
        document.createElement("div");

    aiMessage.className =
        "message ai-message";

    aiMessage.textContent =
        "SHREE is thinking...";

    chat.appendChild(
        aiMessage
    );


    chat.scrollTop =
        chat.scrollHeight;


    try {

        const response =
            await fetch(
                BACKEND_URL + "/api/chat",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        question: question
                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Request failed"
            );

        }


        aiMessage.textContent =
            data.answer;


        saveSearch(
            question,
            data.answer
        );


    } catch (error) {

        console.error(error);

        aiMessage.textContent =
            "Unable to connect to SHREE. Please check the backend connection.";

    }


    chat.scrollTop =
        chat.scrollHeight;
}



function saveSearch(
    question,
    answer
) {

    const searches =
        JSON.parse(
            localStorage.getItem(
                "shree_searches"
            ) || "[]"
        );


    searches.unshift({

        question: question,

        answer: answer,

        date: new Date().toLocaleString()

    });


    // Keep the latest 50

    if (searches.length > 50) {

        searches.splice(
            50
        );

    }


    localStorage.setItem(
        "shree_searches",
        JSON.stringify(searches)
    );
}



function newChat() {

    window.location.href =
        "dashboard.html";

}



function fileSelected() {

    const file =
        document.getElementById(
            "fileInput"
        ).files[0];


    if (!file) {
        return;
    }


    const input =
        document.getElementById(
            "questionInput"
        );


    input.value =
        "Attached: " + file.name;
}



function startSpeaking() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.start();


    recognition.onstart =
        function () {

            document.getElementById(
                "questionInput"
            ).placeholder =
                "Listening...";

        };


    recognition.onresult =
        function (event) {

            const text =
                event.results[0][0]
                    .transcript;


            document.getElementById(
                "questionInput"
            ).value =
                text;

        };


    recognition.onend =
        function () {

            document.getElementById(
                "questionInput"
            ).placeholder =
                "Write your question...";

        };

}
