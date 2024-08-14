import findBestMove from "./minmax.js";


const turn = document.querySelectorAll('.turn');
const endGame = document.querySelectorAll('.end-game');
let board = document.querySelector('.game-board');
let endGameLine = document.querySelector('.end-game-line');

let gameBtns = document.querySelector('.game-buttons');
let nextGameBtn = document.querySelector('.next-game-btn');
let cancelGameBtn = document.querySelector('.cancel-game-btn');

let restartBtn = document.querySelector('.restart-btn');
let contextMenu = document.querySelector('.new-game-context-menu');
let startGameContextMenu = document.querySelector('.start-game-context-menu');


let scoreTable = document.querySelector('.score-table');

let x = document.querySelector('.x');
let o = document.querySelector('.o');


let numberOfGame = 1;
let numberTurn = 0;
let gameStarted = false;
let settingsForm = document.forms.gameSettings;
let startSettingsForm = document.forms.startGameSettings;
console.log(settingsForm);
console.log(startSettingsForm);

console.log(Math.floor(5 / 3));

let gameProcess = (event) => {
    gameStarted = true
    if (event.target.tagName != 'TD') return;
    if (event.target.firstElementChild.classList.contains('x-img') || event.target.firstElementChild.classList.contains('o-img')) return;

    for (let item of turn) {
        item.classList.toggle('none');
        if (turn[0].classList.contains('none')) {
            event.target.innerHTML = x.innerHTML;
        } else {
            event.target.innerHTML = o.innerHTML;
        }

    }
    numberTurn++;
    checkEndOfGame(board);


    let gameBoard2 = parseGameBoartTo(board);
    console.log(gameBoard2);
}


let gameProcessWithBot = (event) => {
    if (event.target.tagName != 'TD') return;
    if (event.target.firstElementChild.classList.contains('x-img') || event.target.firstElementChild.classList.contains('o-img')) return;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let i = getRandomInt(3);
    let j = getRandomInt(3);

    event.target.innerHTML = x.innerHTML;
    numberTurn += 2;

    checkEndOfGame(board);
    let end = checkEndOfGame(board);


    if (numberTurn <= 8 && end == undefined) {
        while (board.firstElementChild.children[i].children[j].firstElementChild.classList.contains('x-img') || board.firstElementChild.children[i].children[j].firstElementChild.classList.contains('o-img')) {
            i = getRandomInt(3);
            j = getRandomInt(3);
        }

        setTimeout(() => {
            board.firstElementChild.children[i].children[j].innerHTML = o.innerHTML;
            checkEndOfGame(board);
        }, 800)

    }

    checkEndOfGame(board);

}


let gameProcessWithBotSecondTurn = (event) => {
    if (event.target.tagName != 'TD') return;
    if (event.target.firstElementChild.classList.contains('x-img') || event.target.firstElementChild.classList.contains('o-img')) return;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let i = getRandomInt(3);
    let j = getRandomInt(3);

    event.target.innerHTML = o.innerHTML;
    numberTurn += 2;

    checkEndOfGame(board);
    let end = checkEndOfGame(board);

    if (numberTurn <= 8 && end == undefined) {
        while (board.firstElementChild.children[i].children[j].firstElementChild.classList.contains('x-img') || board.firstElementChild.children[i].children[j].firstElementChild.classList.contains('o-img')) {
            i = getRandomInt(3);
            j = getRandomInt(3);
        }

        setTimeout(() => {
            board.firstElementChild.children[i].children[j].innerHTML = x.innerHTML;
            checkEndOfGame(board);
        }, 800);

    }

    checkEndOfGame(board);
}

let gameProcessWithHardBot = (event) => {
    if (event.target.tagName != 'TD') return;
    if (event.target.firstElementChild.classList.contains('x-img') || event.target.firstElementChild.classList.contains('o-img')) return;

    event.target.innerHTML = x.innerHTML;
    numberTurn += 2;

    checkEndOfGame(board);
    let end = checkEndOfGame(board);

    if (numberTurn <= 8 && end == undefined) {

        setTimeout(() => {
            let gameBoard = parseGameBoartTo(board);
            const bestMove = findBestMove(gameBoard);
            gameBoard[bestMove] = 'O';
            parseGameBoartFrom(bestMove, 'O');
            checkEndOfGame(board);

            console.log(checkEndOfGame(board));
            console.log(board);
        }, 800)

    }

    checkEndOfGame(board);
    console.log(end);
}

let gameProcessWithHardBotSecondTurn = (event) => {
    if (event.target.tagName != 'TD') return;
    if (event.target.firstElementChild.classList.contains('x-img') || event.target.firstElementChild.classList.contains('o-img')) return;

    event.target.innerHTML = o.innerHTML;

    checkEndOfGame(board);
    let end = checkEndOfGame(board);

    if (numberTurn <= 8 && end == undefined) {

        setTimeout(() => {
            numberTurn += 2;
            let gameBoard = parseGameBoartTo(board);
            const bestMove = findBestMove(gameBoard);
            console.log(bestMove);
            gameBoard[bestMove] = 'X';
            parseGameBoartFrom(bestMove, 'X');
            checkEndOfGame(board);
            console.log(checkEndOfGame(board));
            console.log(numberTurn);
        }, 800)
        console.log(parseGameBoartTo(board));
    }

    //setTimeout(() => console.log(checkEndOfGame(board)), 850)

}



nextGameBtn.addEventListener('click', (event) => {
    let result = checkEndOfGame(board);
    let results = {
        x: '<t class="turn-text-x">Крестики</t>',
        o: '<t class="turn-text-o">Нолики</t>',
        0: 'Ничья',
    }
    let tr = document.createElement('tr');
    tr.innerHTML = '<td>' + numberOfGame + '</td><td>' + results[result] + '</td>'
    scoreTable.children[1].append(tr);

    numberOfGame++;
    event.preventDefault();
    restartGame();
})

cancelGameBtn.addEventListener('click', (event) => {
    event.preventDefault();
    contextMenu.classList.remove('none');
})



settingsForm.restart.addEventListener('click', (event) => {
    event.preventDefault()
    restartGame();
    scoreTable.children[1].outerHTML = '<tbody></tbody>';
    numberOfGame = 1;


    contextMenu.classList.add('none');
});

settingsForm.cancel.addEventListener('click', (event) => {
    //board.addEventListener('click', gameProcess);
    event.preventDefault();
    contextMenu.classList.add('none');
});
console.log(settingsForm.gameType[2].checked);
settingsForm.gameType.forEach(radio => radio.addEventListener('change', (event) => {
    if (settingsForm.gameType[1].checked || settingsForm.gameType[2].checked) {
        settingsForm.side.classList.remove('none');
    }
    if (settingsForm.gameType[0].checked)
        settingsForm.side.classList.add('none');
}));

function letFirstTurn() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let i = getRandomInt(3);
    let j = getRandomInt(3);
    board.firstElementChild.children[i].children[j].innerHTML = x.innerHTML;
}



function restartGame() {

    gameBtns.classList.add('none');

    endGameLine.classList.add('hidden');
    endGameLine.classList.remove('visible-x', 'visible-y', 'visible-xy');
    endGameLine.style.cssText = 'transition: width 0s ease, height 0s ease;';

    for (let row of board.firstElementChild.children) {
        for (let item of row.children) {
            item.innerHTML = '<div class="zero"></div>';
        }
    }
    endGame[0].classList.add('none');
    endGame[1].classList.add('none');
    endGame[2].classList.add('none');

    turn[0].classList.remove('none');
    turn[1].classList.add('none');

    numberTurn = 0;

    if (settingsForm[0].checked) {
        board.removeEventListener('click', gameProcessWithBot);
        board.removeEventListener('click', gameProcessWithBotSecondTurn);
        board.addEventListener('click', gameProcess);

    } else if (settingsForm[1].checked) {
        board.removeEventListener('click', gameProcess);

        if (settingsForm.side[0].selected) {
            //board.addEventListener('click', gameProcessWithHardBot);
            board.addEventListener('click', gameProcessWithBot);
        }
        else if (settingsForm.side[1].selected) {
            letFirstTurn()
            board.addEventListener('click', gameProcessWithBotSecondTurn);
        }
    } else if (settingsForm[2].checked) {
        board.removeEventListener('click', gameProcess);

        if (settingsForm.side[0].selected) {
            //board.addEventListener('click', gameProcessWithHardBot);
            board.addEventListener('click', gameProcessWithHardBot);
        }
        else if (settingsForm.side[1].selected) {
            numberTurn = 2;
            letFirstTurn()
            board.addEventListener('click', gameProcessWithHardBotSecondTurn);
        }
    }
}

function checkEndOfGame(table) {
    let result = 'none';


    let xWin = (winner, itt) => {
        result = winner
        endGameLine.classList.remove('hidden');
        endGameLine.classList.add('visible-x');
        endGameLine.style.cssText = `top: ${(2 * itt + 1) * 35 + (itt + 1) * 6}px;`;
        endGameLine.style.cssText += 'left: 50%;';
        endGameLine.style.cssText += 'transform: translate(-50%, -50%);';
        endGameLine.style.cssText += 'transition: width 0.5s ease, height 0s ease;';
    }

    let yWin = (winner, itt) => {
        result = winner
        endGameLine.classList.remove('hidden');
        endGameLine.classList.add('visible-y');
        endGameLine.style.cssText = 'width: 7px;';

        endGameLine.style.cssText += `left: ${(2 * itt + 1) * 35 + (itt + 1) * 6}px;`;
        endGameLine.style.cssText += 'transition: width 0s ease, height 0.5s ease;';
        endGameLine.style.cssText += 'top: 50%;';
        endGameLine.style.cssText += 'transform: translate(-50%, -50%);';
    }

    let xyWin = (winner, deg) => {
        result = winner;
        endGameLine.classList.remove('hidden');
        endGameLine.classList.add('visible-xy');

        endGameLine.style.cssText += 'left: 50%; top: 50%;'
        endGameLine.style.cssText += `transform: translate(-50%, -50%) rotate(${deg * 45}deg)`;
        endGameLine.style.cssText += 'transition: width 0.5s ease, height 0s ease;';
    }

    for (let i = 0; i < 3; i++) {
        let xScore = 0;
        let oScore = 0;
        if (table.firstElementChild.children[i].children[0].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[i].children[1].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[i].children[2].firstElementChild.classList.contains('x-img'))
            xScore += 1;


        if (table.firstElementChild.children[i].children[0].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[i].children[1].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[i].children[2].firstElementChild.classList.contains('o-img'))
            oScore += 1;


        if (xScore == 3) {
            xWin('x', i);
        }

        else if (oScore == 3) {
            xWin('o', i);
        }
    }

    for (let i = 0; i < 3; i++) {
        let xScore = 0;
        let oScore = 0;
        if (table.firstElementChild.children[0].children[i].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[1].children[i].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[2].children[i].firstElementChild.classList.contains('x-img'))
            xScore += 1;


        if (table.firstElementChild.children[0].children[i].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[1].children[i].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[2].children[i].firstElementChild.classList.contains('o-img'))
            oScore += 1;

        if (xScore == 3) {
            yWin('x', i);

        }

        else if (oScore == 3) {
            yWin('o', i);
        }
    }




    for (let i = 0; i < 1; i++) {
        let xScore = 0;
        let oScore = 0;
        if (table.firstElementChild.children[0].children[0].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[1].children[1].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[2].children[2].firstElementChild.classList.contains('x-img'))
            xScore += 1;


        if (table.firstElementChild.children[0].children[0].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[1].children[1].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[2].children[2].firstElementChild.classList.contains('o-img'))
            oScore += 1;


        if (xScore == 3) {
            xyWin('x', 1);
        }

        else if (oScore == 3) {
            xyWin('o', 1);
        }
    }

    for (let i = 0; i < 1; i++) {
        let xScore = 0;
        let oScore = 0;
        if (table.firstElementChild.children[0].children[2].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[1].children[1].firstElementChild.classList.contains('x-img'))
            xScore += 1;
        if (table.firstElementChild.children[2].children[0].firstElementChild.classList.contains('x-img'))
            xScore += 1;


        if (table.firstElementChild.children[0].children[2].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[1].children[1].firstElementChild.classList.contains('o-img'))
            oScore += 1;
        if (table.firstElementChild.children[2].children[0].firstElementChild.classList.contains('o-img'))
            oScore += 1;

        if (xScore == 3) {
            xyWin('x', -1);
        }
        else if (oScore == 3) {
            xyWin('o', -1);
        }

    }

    function changeText(index) {
        turn[0].classList.add('none');
        turn[1].classList.add('none');
        endGame[index].classList.remove('none');
        table.removeEventListener('click', gameProcess);
        table.removeEventListener('click', gameProcessWithBot);
        board.removeEventListener('click', gameProcessWithBotSecondTurn);
        table.removeEventListener('click', gameProcessWithHardBot);
        table.removeEventListener('click', gameProcessWithHardBotSecondTurn);
        gameBtns.classList.remove('none');
    }
    if (result == 'o') {
        changeText(1);
        return 'o';
    }
    if (result == 'x') {
        changeText(0);
        return 'x'
    }
    if (numberTurn >= 9) {
        changeText(2);
        return '0'
    }

}



function parseGameBoartTo(board) {
    let gameBoard = [];


    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            if (board.firstElementChild.children[i].children[j].firstElementChild.classList.contains('x-img'))
                gameBoard.push('X');
            else if (board.firstElementChild.children[i].children[j].firstElementChild.classList.contains('o-img'))
                gameBoard.push('O');
            else if (board.firstElementChild.children[i].children[j].firstElementChild.classList.contains('zero'))
                gameBoard.push('');
        }



    // if (board.firstElementChild.children[0].children[1].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[0].children[1].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[0].children[1].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    // if (board.firstElementChild.children[0].children[2].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[0].children[2].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[0].children[2].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    // if (board.firstElementChild.children[1].children[0].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[1].children[0].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[1].children[0].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    // if (board.firstElementChild.children[1].children[1].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[1].children[1].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[1].children[1].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    // if (board.firstElementChild.children[1].children[2].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[1].children[2].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[1].children[2].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    // if (board.firstElementChild.children[2].children[0].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[2].children[0].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[2].children[0].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    // if (board.firstElementChild.children[2].children[1].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[2].children[1].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[2].children[1].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    // if (board.firstElementChild.children[2].children[2].firstElementChild.classList.contains('x-img'))
    //     gameBoard.push('X');
    // else if (board.firstElementChild.children[2].children[2].firstElementChild.classList.contains('o-img'))
    //     gameBoard.push('O');
    // else if (board.firstElementChild.children[2].children[2].firstElementChild.classList.contains('zero'))
    //     gameBoard.push('');

    return gameBoard
}

function parseGameBoartFrom(index, player) {
    let innerHTML = ''
    if (player == 'O')
        innerHTML = o.innerHTML
    else if (player == 'X')
        innerHTML = x.innerHTML

    board.firstElementChild.children[Math.floor(index / 3)].children[index % 3].innerHTML = innerHTML;

    // if (index == 0)
    //     board.firstElementChild.children[0].children[0].innerHTML = innerHTML;
    // else if (index == 1)
    //     board.firstElementChild.children[0].children[1].innerHTML = innerHTML;
    // else if (index == 2)
    //     board.firstElementChild.children[0].children[2].innerHTML = innerHTML;
    // else if (index == 3)
    //     board.firstElementChild.children[1].children[0].innerHTML = innerHTML;
    // else if (index == 4)
    //     board.firstElementChild.children[1].children[1].innerHTML = innerHTML;
    // else if (index == 5)
    //     board.firstElementChild.children[1].children[2].innerHTML = innerHTML;
    // else if (index == 6)
    //     board.firstElementChild.children[2].children[0].innerHTML = innerHTML;
    // else if (index == 7)
    //     board.firstElementChild.children[2].children[1].innerHTML = innerHTML;
    // else if (index == 8)
    //     board.firstElementChild.children[2].children[2].innerHTML = innerHTML;
}


// Пример использования



let gameBoard = [
    'X', 'O', 'X',
    'O', 'X', 'X',
    'O', 'X', 'O'
];

let gameBoard2 = parseGameBoartTo(board);



// Ход AI
const bestMove = findBestMove(gameBoard);
gameBoard[bestMove] = 'O';
console.log("Best move for AI is at position:", bestMove);
console.log(gameBoard);



