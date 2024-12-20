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
    let timerInterval = null;
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


let gameWon1 = parseInt(getCookie('gameWon1'), 10) || 0; // Wczytaj licznik wygranych lub ustaw na 0
function incrementWinCookie() {
    gameWon1++;
    setCookie('gameWon1', gameWon1, 1); // Zapisz nową wartość
    console.log(`Liczba wygranych została zwiększona do: ${gameWon1}`);
}


    const win = document.getElementById('result');
    let gameEnded = true;
    // Pobieranie wszystkich obrazków w elelemnty
    const images = document.querySelectorAll('#elelemnty img');
const plansza = document.getElementById('plansza');
function startTimer() {
    let remainingTime = 210; // 2 minuty (120 sekund)

    const timerElement = document.getElementById("timer");

    timerInterval = setInterval(function() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        timerElement.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        remainingTime--;

        if (remainingTime < 0) {
            const resultElement = document.getElementById("result2");
            if (resultElement) {
                gameEnded = true;
                resultElement.style.display = "flex";
                clearInterval(timerInterval); // Stop the timer when time is up
            }
        }
    }, 1000); // Co 1000 ms (1 sekunda)
}


    // Wywołaj funkcję, aby uruchomić timer


images.forEach(img => {
    img.addEventListener('dragstart', dragStart);
    img.addEventListener('touchstart', touchStart);
    img.addEventListener('touchmove', touchMove);
    img.addEventListener('touchend', touchEnd);

    
});



let draggedImg = null;
let touchOffsetX = 0;
let touchOffsetY = 0;

function dragStart(e) {
    if (gameEnded) return;
    draggedImg = e.target;
    setTimeout(() => {
        draggedImg.style.opacity = '0.9';
    }, 0);
}


// Obsługa przeciągania myszką po planszy
plansza.addEventListener('dragover', dragOver);
plansza.addEventListener('drop', drop);

function dragOver(e) {
    if (gameEnded) return;
    e.preventDefault(); // Zezwolenie na upuszczenie
}

function drop(e) {
    if (gameEnded) return;
    e.preventDefault();
    const rect = plansza.getBoundingClientRect();
    const x = e.clientX - rect.left - draggedImg.width / 2;
    const y = e.clientY - rect.top - draggedImg.height / 2;

    setPosition(draggedImg, x, y);
    draggedImg.style.opacity = '1'; // Przywrócenie pełnej widoczności
    plansza.appendChild(draggedImg); // Dodanie obrazka do planszy
}

// Funkcja pomocnicza do ustawiania pozycji elementu
function setPosition(img, x, y) {
    img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
}

// Obsługa dotyku
// Obsługa dotyku
function touchStart(e) {
    if (gameEnded) return;
    const touch = e.touches[0];
    draggedImg = e.target;

    // Obliczenie przesunięcia dotyku względem obrazka
    const rect = draggedImg.getBoundingClientRect();
    touchOffsetX = touch.clientX - rect.left;
    draggedImg.style.zIndex =5; // Ustawiamy z-index na 2000
    touchOffsetY = touch.clientY - rect.top;

    draggedImg.style.opacity = '0.9';

}


function touchMove(e) {
    if (gameEnded) return;
    e.preventDefault(); // Zapobiega przewijaniu strony podczas przesuwania
    if (!draggedImg) return;

    const touch = e.touches[0];
    const rect = plansza.getBoundingClientRect();

    const x = touch.clientX - rect.left - touchOffsetX;
    const y = touch.clientY - rect.top - touchOffsetY;
    draggedImg.style.zIndex =5; // Ustawiamy z-index na 2000

    setPosition(draggedImg, x, y);
}

function touchEnd() {
    if (gameEnded) return;
    if (draggedImg) {
        draggedImg.style.opacity = '1'; // Przywrócenie pełnej widoczności
        draggedImg.style.zIndex =2; // Ustawiamy z-index na 2000
        plansza.appendChild(draggedImg); // Dodanie obrazka do planszy
        draggedImg = null;
    }
}


// Funkcja do sprawdzania poprawności ułożenia elementów
// Definicja poprawnych pozycji obrazków
const correctPositions = {
    "1.png": { x: 0, y: 0 },
    "2.png": { x: 111.2, y: 0 },
    "3.png": { x: 111.2, y: 58.4 },
    "4.png": { x: 111.2, y: 105.6 },
    "5.png": { x: 260, y: 105.6 },
    "6.png": { x: 0, y: 150.4 },
    "7.png": { x: 111.2, y: 244.8 },
    "8.png": { x: 0, y: 288.8 },
    "9.png": { x: 85.6, y: 288.8 },
    "10.png": { x: 0, y: 408 },
    "11.png": { x: 0, y: 468 }
    // Dodaj pozostałe elementy i ich poprawne pozycje
};
function checkPositions() {
    if (gameEnded) return;

    let allCorrect = true; // Flaga oznaczająca, czy wszystkie elementy są poprawne
    const elements = plansza.querySelectorAll('img'); // Pobierz wszystkie obrazki z planszy

    // Stwórz zestaw nazw elementów, które są obecnie na planszy
    const placedElements = new Set();

    elements.forEach(img => {
        const rect = img.getBoundingClientRect();
        const planszaRect = plansza.getBoundingClientRect();

        const currentX = rect.left - planszaRect.left;
        const currentY = rect.top - planszaRect.top;

        const imgName = img.src.split('/').pop();
        const correct = correctPositions[imgName];

        if (!correct) {
            allCorrect = false; // Element nie jest w poprawnych pozycjach
            return;
        }

        const tolerance = 50; // Tolerancja w pikselach
        if (
            Math.abs(currentX - correct.x) > tolerance ||
            Math.abs(currentY - correct.y) > tolerance
        ) {
            allCorrect = false; // Element nie znajduje się w tolerancji
        } else {
            placedElements.add(imgName); // Dodaj element do zestawu poprawnie umieszczonych
        }
    });

    // Sprawdź, czy wszystkie wymagane elementy znajdują się na planszy
    const allRequiredPlaced = Object.keys(correctPositions).every(name => placedElements.has(name));

    if (allCorrect && allRequiredPlaced) {
        clearInterval(timerInterval);
        win.style.display = 'flex';
        incrementWinCookie(); // Zwiększ licznik wygranych i zaloguj w konsoli
    } else if (!allRequiredPlaced) {
        alert("Nie wszystkie elementy zostały umieszczone na planszy.");
    } else {
        alert("Niektóre elementy nie są w prawidłowych pozycjach.");
    }
}
function autoCheckPositions() {
    if (gameEnded) return; // Check if the game has already ended

    // If the win message is displayed, stop further checks
    if (win.style.display === 'flex'){
        gameEnded=true;
        return;
    }
    

    let allCorrect = true; // Flag indicating if all elements are in the correct positions
    const elements = plansza.querySelectorAll('img'); // Get all images on the board

    // Create a set of element names currently on the board
    const placedElements = new Set();

    elements.forEach(img => {
        const rect = img.getBoundingClientRect();
        const planszaRect = plansza.getBoundingClientRect();

        const currentX = rect.left - planszaRect.left;
        const currentY = rect.top - planszaRect.top;

        const imgName = img.src.split('/').pop();
        const correct = correctPositions[imgName];

        if (!correct) {
            allCorrect = false; // The element is not in the correct position
            return;
        }

        const tolerance = 50; // Tolerance in pixels
        if (
            Math.abs(currentX - correct.x) > tolerance ||
            Math.abs(currentY - correct.y) > tolerance
        ) {
            allCorrect = false; // Element is not within tolerance
        } else {
            placedElements.add(imgName); // Add the element to the set of correctly placed ones
        }
    });

    // Check if all required elements are on the board
    const allRequiredPlaced = Object.keys(correctPositions).every(name => placedElements.has(name));

    if (allCorrect && allRequiredPlaced) {
        win.style.display = 'flex'; // Display the win message
        incrementWinCookie(); // Increase the win counter and log it to the console
        clearInterval(timerInterval);
    } else if (!allRequiredPlaced) {
        return; // Do nothing if not all required elements are placed
    } else {
        return; // Do nothing if not all elements are correct
    }
}

setInterval(autoCheckPositions, 1000); // Run the check every second

// Dodanie przycisku do sprawdzania pozycji
const checkButton = document.createElement('button');
checkButton.textContent = "Sprawdź ułożenie";
checkButton.style.margin = "10px";
checkButton.addEventListener('click', checkPositions);

document.body.appendChild(checkButton);

document.getElementById('play').onclick = function () {
    document.getElementById('info').style.display = 'none';
    document.getElementById('play').style.display = 'none';
    startTimer();
    gameEnded = false;
};

// Funkcja do losowego sortowania obrazków
function shuffleElements(parentElement) {
    const images = Array.from(parentElement.children); // Pobierz wszystkie dzieci (obrazki)
    images.sort(() => Math.random() - 0.5); // Losowe sortowanie

    // Wyczyść zawartość rodzica i dodaj obrazki w nowej kolejności
    parentElement.innerHTML = '';
    images.forEach(img => parentElement.appendChild(img));
}

// Znajdź div #elelemnty
const elelemntyDiv = document.getElementById('elelemnty');

// Losowo posortuj obrazki wewnątrz #elelemnty
shuffleElements(elelemntyDiv);