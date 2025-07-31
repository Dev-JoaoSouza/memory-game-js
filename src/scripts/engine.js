const state = {
    view: {
        game: document.querySelector(".game"),
        screenGame: document.querySelector(".game-screen"),
        timer: document.querySelector(".timer")
    },
    values: {
        emojisAnimals: ["🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶", "🦁", "🦁", "🐵", "🐵", "🐯", "🐯", "🐮", "🐮", "🐭", "🐭", "🐰", "🐰"],
        emojisCarrinhas: ["😎", "😎", "🤣", "🤣", "😍", "😍", "🤬", "🤬", "🤡", "🤡", "🤮", "🤮", "😥", "😥", "🤗", "🤗", "😋", "😋", "😴", "😴"],
        openCards: [],
        emojisSelected: [],
        timerCountDown: null,
        timeGame: {
            min: 1,
            sec: 59
        }
    }
};

function finalScreen(msg1, msg2, buttonText1, actionButton1, buttonText2, actionButton2) {
    
    const screen = `
        <h2>${msg1}</h2>
        <p>${msg2}</p>
        <div>
            <button onclick="${actionButton1}()">${buttonText1}</button>
            <button onclick="${actionButton2}()">${buttonText2}</button>
        </div>
    `;

    state.view.screenGame.innerHTML = screen;
    state.view.screenGame.classList.remove("hidden");
}

function countDown() {
    const timer = state.view.timer.innerHTML.split(" ")[4];
    let min = Number(timer.split(":")[0]);
    let sec = Number(timer.split(":")[1]);
    sec--;

    if (sec < 0) {
        sec = 59;
        min--;
    }

    if (min === 0 && sec === 0) {
        clearInterval(state.values.timerCountDown);
        finalScreen("😭 Game Over! 😭", `O tempo acabou! 😥`, "Jogar novamente", "initialize", "Voltar ao Inicio", "screenHome");
    }

    state.view.timer.innerHTML = `<i class="fa-regular fa-clock"></i> ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function startTimer() {
    state.values.timerCountDown = setInterval(countDown, 1000);
}


// const emojisAnimals = ["🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶", "🦁", "🦁", "🐵", "🐵", "🐯", "🐯", "🐮", "🐮", "🐭", "🐭", "🐰", "🐰"];

// const emojis2 = ["😎", "😎", "🤣", "🤣", "😍", "😍", "🤬", "🤬", "🤡", "🤡", "🤮", "🤮", "😥", "😥", "🤗", "🤗"];

// let openCards = [];

// let shuffledEmojis = emojisAnimals.sort(() => (Math.random() > 0.5 ? 2 : -1));

// for (let i = 0; i < shuffledEmojis.length; i++) {
//     let box = document.createElement("div");
//     box.classList.add("item");
//     box.innerHTML = `<div>${shuffledEmojis[i]}</div>`
//     box.onclick = handleClick;

//     document.querySelector(".game").appendChild(box);
// }

function initialize() {
    let emojis = state.values.emojisSelected;
    let shuffledEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

    state.view.game.innerHTML = "";

    for (let i = 0; i < shuffledEmojis.length; i++) {
        let box = document.createElement("div");
        box.classList.add("item");
        box.innerHTML = `<div>${shuffledEmojis[i]}</div>`;
        box.onclick = handleClick;

        state.view.game.appendChild(box);
        // document.querySelector(".game").appendChild(box);
    }

    state.view.timer.innerHTML = `<i class="fa-regular fa-clock"></i> ${state.values.timeGame.min.toString().padStart(2, '0')}:${state.values.timeGame.sec.toString().padStart(2, '0')}`;
    document.querySelector(".game-screen").classList.add("hidden");
    startTimer();
}

function screenHome() {
    finalScreen("😎 Jogo da Memória com Emojis 😎", "🤩 Encontre os pares de cartas! 🤩", "Start emojis animais 🐵", "startGame1", "Start emojis carrinhas 🙂", "startGame2");
}

function handleClick() {
    if (state.values.openCards.length < 2) {
        this.classList.add("boxOpen");
        state.values.openCards.push(this);
    }

    if (state.values.openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }

}

function setTime() {
    let time = state.view.timer.innerHTML.split(" ")[4];
    let min = Number(time.split(":")[0]);
    let sec = Number(time.split(":")[1]);

    let resultMin = state.values.timeGame.min - min;
    let resultSec = state.values.timeGame.sec - sec;

    return `${resultMin.toString().padStart(2, '0')}:${resultSec.toString().padStart(2, '0')}`;
}

function checkMatch() {

    if (state.values.openCards[0].innerHTML === state.values.openCards[1].innerHTML) {
        state.values.openCards[0].classList.add("boxMatch");
        state.values.openCards[1].classList.add("boxMatch");
    } else {
        state.values.openCards[0].classList.remove("boxOpen");
        state.values.openCards[1].classList.remove("boxOpen");
    }

    state.values.openCards = [];

    if(document.querySelectorAll(".boxMatch").length === state.values.emojisSelected.length) {
        clearInterval(state.values.timerCountDown);
        finalScreen("🎊🎉 Parabéns! 🎉🎊", `Você terminou o jogo em ${setTime()}`, "Jogar novamente", "initialize", "Voltar ao Inicio", "screenHome");
    }
}

function startGame1() {
    document.querySelector(".game-screen").classList.add("hidden");
    state.values.emojisSelected = state.values.emojisAnimals;
    initialize();
}

function startGame2() {
    state.values.emojisSelected = state.values.emojisCarrinhas;
    initialize();
}