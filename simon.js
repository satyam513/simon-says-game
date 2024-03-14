let gameSeq = [];
let userSeq = [];

let btn = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    if (level > highestScore) {
        highestScore = level; // Update highest score
        trackHighestScore();
    }

    let randIndx = Math.floor(Math.random() * 4); // Fix the range to include the last index
    let randColor = btn[randIndx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns (idx) {
    if (userSeq[idx] === gameSeq[idx]) {
            if(userSeq.length == gameSeq.length){
                setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was ${level}. Highest score: ${highestScore} <br/> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    //console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);

    console.log(userSeq);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (btn) {
    btn.addEventListener("click", btnPress);
});


function reset () {
    started = false;
    gameSeq =[];
    userSeq = [];
    level = 0;
}

function trackHighestScore() {
    console.log("New highest score: " + highestScore);
}



