const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const message = document.getElementById('message');
const dark = document.querySelector('.dark');
const Y_N = document.querySelectorAll('.y-n');

let seconds = 0;
let score = 0;
let check = true;
let selected_insect = {};

//1. Click vao button 'Play Game'
start_btn.addEventListener('click', () => {
    screens[0].classList.add('up');
});

//Choose insect
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsects, 1000);
        startGame();
    })
});

// Increase Time
function increaseTime() {
    if (check) {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;

        m = m < 10 ? `0${m}` : m;
        s = s < 10 ? `0${s}` : s;

        timeElement.innerHTML = `Time : ${m}:${s}`;
        seconds++;
    }
}
// Increase scoreElement
function increaseScore() {
    score++;
    if (score == 10) {
        dark.style.display = 'block';
        check = false;
        message.classList.add('visible');
    }

    scoreElement.innerHTML = `Score : ${score}`
}

//Random location insect
function getRandomLocation() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y };
}


// 
Y_N.forEach(btn => {
    btn.addEventListener('click', () => {
        message.style.display = 'none';
        dark.style.display = 'none';
        check = true;
    })
})


//Create insect
function createInsects() {
    const insect = document.createElement('div');
    insect.classList.add('insect');

    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;

    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect);
    game_container.appendChild(insect);
}

function addInsect() {
    setTimeout(createInsects, 1000);
    setTimeout(createInsects, 1500);
}

//catch Insect
function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => {
        remove();
    }, 2000);

    addInsect();
}
// Start Game
function startGame() {
    setInterval(increaseTime, 1000);
}


// //add storage
// function addStorage(key, value) {
//     window.localStorage.clear();
//     window.localStorage.setItem('key', JSON.parse(value));
// }

// //get storage
// function getStorage(key) {
//     const value = window.localStorage.getItem(key);
//     return value;
// }