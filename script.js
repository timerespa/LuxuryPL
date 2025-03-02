const initialRespTime = '14:00:00'; // Ustaw początkową godzinę pierwszego respu (format HH:MM:SS)
const respInterval = 3750; // Interwał między respami w sekundach (1 godzina, 2 minuty i 30 sekund)

document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const nextRespElement = document.getElementById('next-resp');
    const respListElement = document.getElementById('resp-list');
    const toggleRespListButton = document.getElementById('toggle-resp-list');

    let nextRespTime = calculateNextRespTime();

    function calculateNextRespTime() {
        const now = new Date();
        const [hours, minutes, seconds] = initialRespTime.split(':').map(Number);
        let respTime = new Date(now);
        respTime.setHours(hours, minutes, seconds, 0);

        while (respTime <= now) {
            respTime = new Date(respTime.getTime() + respInterval * 1000);
        }

        return respTime;
    }

    function updateTimer() {
        const now = new Date();
        const timeDiff = nextRespTime - now;

        if (timeDiff <= 0) {
            nextRespTime = calculateNextRespTime();
        }

        const hours = String(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, '0');

        timerElement.textContent = `${hours}:${minutes}:${seconds}`;
        nextRespElement.textContent = `Następny resp: ${nextRespTime.toLocaleTimeString('pl-PL')}`;
    }

    function generateRespList() {
        respListElement.innerHTML = '';
        let respTime = new Date(nextRespTime);

        for (let i = 0; i < 12; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = respTime.toLocaleTimeString('pl-PL');
            respListElement.appendChild(listItem);
            respTime = new Date(respTime.getTime() + respInterval * 1000);
        }
    }

    toggleRespListButton.addEventListener('click', () => {
        if (respListElement.style.display === 'none' || respListElement.style.display === '') {
            generateRespList();
            respListElement.style.display = 'block';
            toggleRespListButton.textContent = 'Ukryj listę respów';
        } else {
            respListElement.style.display = 'none';
            toggleRespListButton.textContent = 'Kolejne 12 respów';
        }
    });

    setInterval(updateTimer, 1000);
    updateTimer();
});
