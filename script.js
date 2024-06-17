document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const puzzleButton = document.getElementById("puzzle");
    const letterContainer = document.getElementById("letter-container");
    const nameInput = document.getElementById("name-input");
    const submitNameButton = document.getElementById("submit-name");
    const undoButton = document.getElementById("undo-button");
    const wrongCounter = document.getElementById("wrong-counter");
    const wrongCountSpan = document.getElementById("wrong-count");
    const backButtonGallery = document.getElementById("back-button-gallery");
    const backButtonPuzzle = document.getElementById("back-button-puzzle"); // Added this line

    const correctName = "purity";
    let wrongAttempts = 0;
    let solved = false;

    function showPage(pageId) {
        document.querySelectorAll(".page").forEach(page => {
            page.classList.add("hidden");
            page.classList.remove("active");
        });
        document.getElementById(pageId).classList.remove("hidden");
        document.getElementById(pageId).classList.add("active");

        if (pageId === "gallery-page" && solved) {
            audioPlayer.play();
        }
    }

    startButton.addEventListener("click", () => {
        showPage("message-page");
    });

    puzzleButton.addEventListener("click", () => {
        puzzleButton.classList.add("hidden");
        letterContainer.classList.remove("hidden");
        wrongCounter.classList.remove("hidden");
        createPuzzleAlphabet();
    });

    submitNameButton.addEventListener("click", () => {
        const userInput = nameInput.value.toLowerCase().trim();
        if (userInput === correctName) {
            solved = true;
            showPage("gallery-page");
        } else {
            wrongAttempts++;
            wrongCountSpan.textContent = wrongAttempts;
            alert("Wrong name. Try again!");
        }
    });

    undoButton.addEventListener("click", () => {
        nameInput.value = nameInput.value.slice(0, -1);
    });

    backButtonGallery.addEventListener("click", () => {
        if (solved) {
            solved = false;
            nameInput.value = "";
            wrongAttempts = 0;
            wrongCountSpan.textContent = wrongAttempts;
            letterContainer.classList.add("hidden");
            wrongCounter.classList.add("hidden");
            puzzleButton.classList.remove("hidden");
            showPage("message-page");
        }
    });

    backButtonPuzzle.addEventListener("click", () => { // Added this event listener
        showPage("landing-page"); // Show the landing page when back button in puzzle page is clicked
    });

    function createPuzzleAlphabet() {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const lettersArray = letters.split("");
        const lettersContainer = document.getElementById("letters");
        lettersContainer.innerHTML = "";

        lettersArray.forEach(letter => {
            const letterButton = document.createElement("button");
            letterButton.textContent = letter;
            letterButton.classList.add("letter-button");
            letterButton.addEventListener("click", () => {
                nameInput.value += letter;
            });
            lettersContainer.appendChild(letterButton);
        });
    }
});
