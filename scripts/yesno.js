window.onload = function () {
const navigationEntry = performance.getEntriesByType('navigation')[0];
if (navigationEntry.type === 'reload') {
  window.alert(":)");
    // Reset the cookie 'gameWon1'
    setCookie('gameWon1', 0, 1); // Reset value to 0, valid for 1 day

    // Redirect to another page
    window.location.href = "index.html"; // Change to your page's URL
}
};
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.split('=')[1]);
        }
    }
    return null;
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresString = `expires=${expires.toUTCString()}`;

    // Ustawienie ciasteczka z atrybutem SameSite=None oraz Secure
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expiresString}; path=/; SameSite=None; Secure`;
}


// Pobieranie liczby wygranych z ciasteczek
let gameWon1 = parseInt(getCookie('gameWon1'), 10) || 0;
function incrementWinCookie() {
    gameWon1++;
    setCookie('gameWon1', gameWon1, 1); // Zapisz nową wartość na 365 dni
    console.log(`Liczba wygranych została zwiększona do: ${gameWon1}`);
}

        const lose = document.getElementById('result2');
        const win = document.getElementById('result');
        const cover = document.getElementById('cover')
          const playButton = document.getElementById('play');
          const infocard = document.getElementById('info');
        // Dane pytań
        const questions = [
            { question: "Czy Krajowy Komitet Strajkowy ogłosił działalność w Gdańsku?", options: ["TAK", "NIE"], correct: "NIE" },
            { question: "Czy ogłoszenie strajku w Stoczni Gdańskiej trafiło do wszystkich polskich załóg?", options: ["NIE", "TAK"], correct: "NIE" },
            { question: "Czy rano 15 grudnia oddziały ZOMO ztłumiły strajk w Stoczni Gdańskiej?", options: ["TAK", "NIE"], correct: "TAK" },
            { question: "Czy górnicy w Stoczni Gdańskiej kontynuowali strajk następnego dnia?", options: ["TAK", "NIE"], correct: "NIE" },
            { question: "Czy górnicy w Stoczni Gdańskiej  osiągneli swój cel?", options: ["TAK", "NIE"], correct: "TAK" },
            { question: "Czy protestujący górnicy byli represjonowani?", options: ["TAK", "NIE"], correct: "NIE" }
        ];

        let shuffledQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let lives = 3; // Liczba żyć

        const questionElement = document.getElementById('question');
        const feedbackElement = document.getElementById('feedback');
        const yesButton = document.getElementById('yes-button');
        const noButton = document.getElementById('no-button');
        const progressBar = document.getElementById('progress-bar');
        const livesElement = document.getElementById('lives');

        let progressBarTimeout; // Zmienna przechowująca timeout dla paska postępu

        // Funkcja mieszania tablicy (Fisher-Yates Shuffle)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function setQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length && lives > 0) {
        const { question, options } = shuffledQuestions[currentQuestionIndex];
        questionElement.textContent = `${question}`;
        feedbackElement.textContent = '';
        enableButtons(); // Umożliwienie kliknięcia przycisków po załadowaniu pytania
        startProgressBar(); // Rozpocznij animację paska postępu
    } else if (lives <= 0) {
        questionElement.textContent = `Koniec gry zdobyłeś ${score} z ${shuffledQuestions.length}`;
        lose.style.display = 'flex';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
        progressBar.style.display = 'none'; // Ukryj pasek po zakończeniu gry
    } else {
        questionElement.textContent = `Koniec gry zdobyłeś ${score} z ${shuffledQuestions.length}`;
        win.style.display = 'flex';
        incrementWinCookie(); // Zwiększ licznik wygranych
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
        progressBar.style.display = 'none'; 
    }
}

        // Funkcja do aktualizacji paska postępu
        function startProgressBar() {
            progressBar.style.width = '0%'; // Resetowanie paska
            progressBar.style.animation = 'none'; // Zatrzymywanie poprzedniej animacji
            setTimeout(() => {
                progressBar.style.animation = 'progressAnimation 10s forwards'; // Uruchomienie animacji
            }, 50); // Opóźnienie przed rozpoczęciem animacji

            // Ustawienie, aby po 5 sekundach przejść do kolejnego pytania, jeśli gracz nie odpowie
            progressBarTimeout = setTimeout(() => {
                loseLife('Koniec czasu!'); // Jeśli minie czas, tracimy życie
                nextQuestion(); // Przejście do następnego pytania
            }, 10000); // 12 sekund na odpowiedź
        }

        // Funkcja przechodzenia do kolejnego pytania
        function nextQuestion() {
            currentQuestionIndex++; // Zwiększenie indeksu pytania
            disableButtons(); // Zablokowanie przycisków przed kolejnym pytaniem
            setQuestion(); // Ustawienie nowego pytania
        }

        // Funkcja do włączenia przycisków (po załadowaniu pytania)
        function enableButtons() {
            yesButton.disabled = false;
            noButton.disabled = false;
        }

        // Funkcja do wyłączenia przycisków (przed załadowaniem kolejnego pytania)
        function disableButtons() {
            yesButton.disabled = true;
            noButton.disabled = true;
        }

        // Funkcja obsługująca odpowiedzi
        function handleAnswer(isYes) {
    disableButtons(); // Wyłącz przyciski po pierwszym kliknięciu
    clearTimeout(progressBarTimeout); // Zatrzymywanie timera paska postępu
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const correctOption = currentQuestion.correct;
    const yesMeans = currentQuestion.options[1]; // "Tak" odnosi się do drugiej opcji
    const isCorrect = (isYes && yesMeans === correctOption) || (!isYes && yesMeans !== correctOption);

    if (isCorrect) {
        score++;
        feedbackElement.textContent = 'Dobra odpowiedź!';
        feedbackElement.style.color = 'rgb(131, 67, 51)';
    } else {
        feedbackElement.textContent = 'Zła odpowieź!';
        feedbackElement.style.color = 'rgb(131, 67, 51)';
        loseLife('Zła odpowieź!'); // Utrata życia
    }

    setTimeout(nextQuestion, 1000); // Przejście do kolejnego pytania po 1 sekundzie
}


        // Funkcja obsługująca utratę życia
        function loseLife(reason) {
            lives--; // Zmniejszenie liczby żyć
            livesElement.textContent = `Życia: ${lives}`;
            feedbackElement.textContent = reason;
            feedbackElement.style.color = 'rgb(131, 67, 51)';

            if (lives <= 0) {
                setTimeout(() => {
                    questionElement.textContent = `Koniec gry zdobyłeś ${score} z ${shuffledQuestions.length}`;
                    yesButton.style.display = 'none';
                    noButton.style.display = 'none';
                    progressBar.style.display = 'none'; // Ukryj pasek po zakończeniu gry
                }, 1000); // Pokazanie komunikatu o zakończeniu gry po utracie ostatniego życia
            }
        }

        // Eventy
        yesButton.addEventListener('click', () => handleAnswer(true));
        noButton.addEventListener('click', () => handleAnswer(false));

        // Start gry
        function startGame() {
            shuffledQuestions = [...questions];
            shuffleArray(shuffledQuestions); // Mieszanie pytań
            setQuestion();
        }

        playButton.addEventListener('click', () => {
        startGame();
        infocard.style.display = 'none';
        cover.style.display = 'none'
});