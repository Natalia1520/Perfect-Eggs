function showOptions() {
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("options-screen").style.display = "flex";
}

let countdownInterval;

function startTimer(type) {
  const times = {
    soft: 4 * 60,
    medium: 7 * 60,
    hard: 12 * 60,
  };

  const colors = {
    soft: "#f28b15",
    medium: "radial-gradient(circle, #f28b15 30%, #facc15 70%)",
    hard: "#fbd86e",
  };

  let timeLeft = times[type];

  // Ocultar opciones y mostrar temporizador
  document.getElementById("options-screen").style.display = "none";
  document.getElementById("timer-screen").style.display = "flex";

  // Cambiar color del huevo
  const egg = document.getElementById("timer-egg");
  egg.style.background = colors[type];

  updateCountdownDisplay(timeLeft);

  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerText = "Your egg is ready!";
      const alarm = document.getElementById("alarm-sound");
      alarm.currentTime = 0;
      alarm
        .play()
        .catch((e) => console.log("No se pudo reproducir el sonido:", e));
    } else {
      updateCountdownDisplay(timeLeft);
    }
  }, 1000);
}

function updateCountdownDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  document.getElementById("countdown").innerText = `${minutes}:${
    sec < 10 ? "0" : ""
  }${sec}`;
}

function reset() {
  clearInterval(countdownInterval);

  const alarm = document.getElementById("alarm-sound");
  alarm.pause();
  alarm.currentTime = 0;

  document.getElementById("timer-screen").style.display = "none";
  document.getElementById("options-screen").style.display = "flex";
}
