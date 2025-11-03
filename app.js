let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.container-msg');
let winMsg = document.querySelector('#msg');

let turnO = true;
let clickCounter = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        //console.log("box was clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = '#6C584C';
            turnO = false;
        } else {
            box.textContent = "X";
            box.style.color = '#40916c';
            turnO = true;
        }
        box.disabled = true;
        clickCounter++;
        checkWinner();
    });
});

const resetGame = () => {
    for (let box of boxes) {
        box.textContent = '';
    }
    enableBoxes();
    turnO = true;
    clickCounter = 0;
    msgContainer.classList.add('hide');
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
}

resetBtn.addEventListener('click', resetGame);

newBtn.addEventListener('click', resetGame);


const displayWinner = (winner) => {
    winMsg.textContent = `Congratulations! The winner is Player ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const displayTieMessage = () => {
    winMsg.textContent = 'The game is tied. Please start a new game';
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const checkWinner = () => {
    console.log(`click counter is ${clickCounter}`);
    if (clickCounter === 9) {
        displayTieMessage();
    }
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;
        
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val)
                displayWinner(pos1Val);
            
        }
    }
};