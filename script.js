document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");
    const nextRespElement = document.getElementById("nextResp");
    const respList = document.getElementById("respList");
    const toggleListButton = document.getElementById("toggleList");

    // Nowa konfiguracja początkowego czasu pierwszego respa
    let baseTime = new Date();
    baseTime.setHours(20, 50, 55, 0); // Poprawiona startowa godzina

    const interval = 3750 * 1000; // 1h 2m 30s w milisekundach

    function getNextRespTime() {
        let now = new Date();
        let nextResp = new Date(baseTime.getTime());

        while (nextResp <= now) {
            nextResp = new Date(nextResp.getTime() + interval);
        }

        return nextResp;
    }

    function updateTimer() {
        let nextResp = getNextRespTime();
        let now = new Date();
        let timeDiff = nextResp - now;

        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        if (timeDiff <= 1000) {
            updateRespList();
        }
    }

    function updateRespList() {
        respList.innerHTML = "";
        let nextResp = getNextRespTime();
        let nextAfterThis = new Date(nextResp.getTime() + interval); // Pominięcie odliczanego respa

        for (let i = 0; i < 12; i++) {
            let respTime = new Date(nextAfterThis.getTime() + i * interval);
            let formattedTime = respTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            let listItem = document.createElement("li");
            listItem.textContent = formattedTime;
            respList.appendChild(listItem);
        }

        nextRespElement.textContent = nextResp.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }

    toggleListButton.addEventListener("click", function () {
        respList.classList.toggle("hidden");
    });

    updateRespList();
    setInterval(updateTimer, 1000);
});
