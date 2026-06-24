const html = document.querySelector("html");

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");

const banner = document.querySelector(".app__image");

const titleText = document.querySelector(".app__title");
const strongText = document.querySelector(".app__title-strong");

const musicaFocus = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
});

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
}
