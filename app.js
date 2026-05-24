let timeRemaining = 60;
const timerDisplay = document.getElementById('timer');

timerDisplay.textContent = timeRemaining + ' seconden';

const countdownInterval = setInterval(() => {
    timeRemaining--;

    // Foto nemen op 30 seconden
    if (timeRemaining === 30) {
        takePhoto();
    }

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        timerDisplay.textContent = 'Time\'s up!';

        // Score opslaan
        const score = parseInt(document.getElementById('pushupCount').textContent);
        const photo = sessionStorage.getItem('gamePhoto') || null;

        const entry = {
            score: score,
            photo: photo,
            date: new Date().toLocaleDateString('nl-BE')
        };

        // Haal bestaand klassement op, voeg toe en sorteer
        const klassement = JSON.parse(localStorage.getItem('klassement') || '[]');
        klassement.push(entry);
        klassement.sort((a, b) => b.score - a.score);
        // Bewaar max 10 scores
        localStorage.setItem('klassement', JSON.stringify(klassement.slice(0, 10)));

        sessionStorage.removeItem('gamePhoto');

        window.location.href = 'klassement.html';
    } else {
        timerDisplay.textContent = timeRemaining + ' seconden';
    }
}, 1000);
