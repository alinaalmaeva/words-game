const options = {
  "домен": "Уникальный адрес сайта в Интернете, состоящий из набора символов и цифр",
  "целостность": "Свойствами информации, наиболее актуальными при обеспечении информационной безопасности являются...",
  "идентификация": "Отождествление, признание тождественности по совокупности общих и частных признаков",
  "средства": "Методы передачи информации",
  "автоматизация": "Замена деятельности человека работой машин и механизмов.",
  "проектирование": "Принцип системного кода",
  "программирование": "Процесс создания компьютерных программ",
  "криптография": "Технология шифрования исходного сообщения в секретный код или шифр и его последующего дешифрования",
  "интернет": "Глобальная сеть взаимосвязанных компьютеров и устройств, которые общаются друг с другом с помощью стандартизированных протоколов",
  "сервер": "Устройство, которое хранит данные и даёт доступ к ним большому числу пользователей",
};

const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

const stopGame = () => {
  controls.classList.remove("hide");
};

const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Вопрос: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Осталось попыток: ${lossCount}</div>`;
};

const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
    generateWord();

  for (let i = 1040; i < 1072; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      message.innerText = `Такая буква есть`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            button.classList.add("correct");
            inputSpace[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = "Все верно! Ты угадал!";
              startBtn.innerText = "Новое слово";
              blocker();
              
            }
          }
        });
      } else {
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Осталось попыток: ${lossCount}`;
        message.innerText = "Такой буквы нет";
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `Это было слово: <span>${randomWord}</span>`;
          resultText.innerHTML = "Игра закончилась";
          blocker();
          
        }
      }
      button.disabled = true;
    });
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};