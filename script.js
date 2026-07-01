const html = document.querySelector("html");

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");

const banner = document.querySelector(".app__image");

const titleText = document.querySelector(".app__title");
const strongText = document.querySelector(".app__title-strong");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const playSound = new Audio("/sons/play.wav");
const stopSound = new Audio("/sons/pause.mp3");
const endSound = new Audio("/sons/beep.mp3");
musica.loop = true;

const startPauseBt = document.querySelector("#start-pause");
const startOrPauseText = document.querySelector("#start-pause span");
const startPauseIcon = document.querySelector(".app__card-primary-butto-icon");

let second = 1500;
let intervaloId = null;
const currentTime = document.querySelector("#timer");

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  second = 1500;
  alterarContexto("foco");
});

curtoBt.addEventListener("click", () => {
  second = 300;
  alterarContexto("descanso-curto");
});

longoBt.addEventListener("click", () => {
  second = 900;
  alterarContexto("descanso-longo");
});

startPauseBt.addEventListener("click", iniciarOuPausar);

const contagemRegressiva = () => {
  if (second <= 0) {
    endSound.play();
    pausar();
    return;
  }
  second -= 1;
};

function alterarContexto(contexto) {
  const buttons = document.querySelectorAll(".app__card-button");

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  let currentButton = "";
  switch (contexto) {
    case "foco":
      titleText.innerHTML =
        "Otimize sua produtividade, <strong class='app__title-strong'> mergulhe no que importa </strong>";

      currentButton = document.querySelector(".app__card-button--foco");
      break;
    case "descanso-curto":
      titleText.innerHTML =
        "Que tal dar uma respirada? <strong class='app__title-strong'> Faça uma pausa curta! </strong>";

      currentButton = document.querySelector(".app__card-button--curto");
      break;
    case "descanso-longo":
      titleText.innerHTML =
        "Hora de voltar à superfície. <strong class='app__title-strong'>Faça uma pausa longa. </strong>";

      currentButton = document.querySelector(".app__card-button--longo");
      break;
  }

  currentButton.classList.add("active");
  displayTime();
}

function iniciarOuPausar() {
  if (intervaloId) {
    stopSound.play();
    pausar();
    return;
  } else {
    playSound.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startOrPauseText.textContent = "Pausar";
    startPauseIcon.setAttribute("src", "/imagens/pause.png");
  }
}

function pausar() {
  clearInterval(intervaloId);
  intervaloId = null;
  startOrPauseText.textContent = "Começar";
  startPauseIcon.setAttribute("src", "/imagens/play_arrow.png");
}

function displayTime() {
  const time = new Date(second * 1000);
  const formatedTime = time.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  currentTime.innerHTML = `${formatedTime}`;
}

displayTime();
