const wrapper = document.querySelector('.wrapper'); //контейнер
let cardCoord = []; //массив об'єктів з координатами
let activeCard; //массив з активними полями
const horseStep = [[-2,-1],[-2,1],[-1,2],[1,2],[2,1],[2,-1],[-1,-2],[1,-2]]; //числа для розрахунку кроку
let pushedCard = []; //массив для натиснутих квадратів
let num = 1; //змінна для нумерації
let restartButton = document.querySelector('.buttons .restart');
let hintButton = document.querySelector('.buttons .hint');
let alertField = document.querySelector('.alert');
let body = document.querySelector('body');


for (let i=0; i<100; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('active')
    wrapper.appendChild(card);    
} //генеруємо поле

const cardField = document.querySelectorAll('.card'); //згенеровані поля

function cardObject (i) {
    this.card = cardField[i];
    this.coordX = i%10;
    this.coordY = (i - this.coordX)/10;
} //створюємо конструктор для об'єкту з координатами

for (let i=0; i<100; i++) {
    cardCoord[i] = new cardObject(i);
} //створюємо массив з об'єктами полів і координат

function activePush () {
    for (let i=0; i<100; i++) {
        cardField[i].removeEventListener('click', removeActiveClass);
        cardField[i].removeEventListener('click', addPushedClass);
        cardField[i].removeEventListener('click', addActiveClass);
        cardField[i].removeEventListener('click', activePush);
    }
    activeCard = document.querySelectorAll('.active')
    for (let i=0; i<activeCard.length; i++) {
        activeCard[i].addEventListener('click', removeActiveClass);
        activeCard[i].addEventListener('click', addPushedClass);
        activeCard[i].addEventListener('click', addActiveClass);
        activeCard[i].addEventListener('click', activePush);
    }
    if (activeCard.length == 0) {
        if (num > 100) {
           setTimeout(function() {
                alertFunc({
                className: 'endGame',
                text: '<h1>Congratulation</h1><p>You win the game</p>'
                })}, 0)
        } else {
            setTimeout(function() {
                alertFunc({
                className: 'endGame',
                text: '<h1>So bad</h1><p>You lose the game</p>'
                })
            }, 0)
        }
    } //перевірка на виграш або програш
} //функція для подій при натисканні на активне поле

activePush(); //запуск функції для прикріплення подій

function alertFunc (obj) {
    alertField.classList.add(obj.className);
    alertField.innerHTML = obj.text;
} //функція для створення вспливаючих вікон

function pushedPush () {
    let indArr = this.innerHTML-1;
    let delElem = pushedCard.splice(indArr, pushedCard.length-indArr);
    for (let i=0; i<delElem.length; i++) {
        delElem[i].classList.remove('pushed');
        delElem[i].innerHTML = ' ';
    }
    removeActiveClass();
    addActiveClass();
    activePush();
    for (let i=0; i<cardField.length; i++) {
        if (!cardField[i].classList.contains('pushed')) {
            cardField[i].removeEventListener('click', pushedPush);
        }
    }
    num = pushedCard.length+1;
}//функція для відміни ходів

function removeActiveClass () {
    for (let i=0; i<100; i++) {
        cardField[i].classList.remove('active');
    }
} //видаляє клас активного поля

function addPushedClass () {
    this.classList.add('pushed');
    pushedCard.push(this);
    this.innerHTML = num;
    num++;
    this.addEventListener('click', pushedPush);
} //додає клас натиснутого поля, формує масив з натиснутими полями, заповнює поле числами

function addActiveClass () {
    let startX;
    let startY;
    for (let i=0; i<100; i++) {
        if (cardCoord[i].card==pushedCard[pushedCard.length-1]) {
            startX = cardCoord[i].coordX;
            startY = cardCoord[i].coordY;
        }
    }
    if (startX == undefined || startY == undefined) {
        for (let i=0; i<cardField.length; i++) {
            cardField[i].classList.add('active');
        }
    } else {
            for (let i=0; i<horseStep.length; i++) {
            moveHorse(horseStep[i][0], horseStep[i][1], startX, startY, 'active');
        }
    }
} //додавання класу до необхідних

function moveHorse (moveX, moveY, startX, startY, addClass) {
    let newX = startX + moveX;
    let newY = startY + moveY;
    for (let i=0; i<100; i++) {
        if (cardCoord[i].coordX == newX && cardCoord[i].coordY == newY && !cardCoord[i].card.classList.contains('pushed')) {
            cardCoord[i].card.classList.add(addClass);
        }
    }
} //функція для руху коня

restartButton.addEventListener('click', function () {
    for (let i=0; i<cardField.length; i++) {
        if (cardField[i].classList.contains('pushed')) {
            cardField[i].removeEventListener('click', pushedPush);
            cardField[i].classList.remove('pushed');
            cardField[i].innerHTML = " ";
        }
    }
    pushedCard = [];
    num = 1;
    addActiveClass();
    activePush(); 
}); //функція для кнопки перезапуск

hintButton.addEventListener('click', hintFunction);

function hintFunction () {
    if (pushedCard.length == 0) {
        for (let i=0; i<cardField.length; i++) {
            cardField[i].classList.add('hintCard');
        }
    } else {
        let counter = 10;
        for (let i=0; i<activeCard.length; i++) {
            let startX;
            let startY;
            for (let o=0; o<100; o++) {
                if (cardCoord[o].card==activeCard[i]) {
                    startX = cardCoord[o].coordX;
                    startY = cardCoord[o].coordY;
                }
            }
            for (let i=0; i<horseStep.length; i++) {
                moveHorse (horseStep[i][0], horseStep[i][1], startX, startY, 'hint');
            }
            let hintCard = document.querySelectorAll('.wrapper .hint');
            if (counter > hintCard.length){
                counter = hintCard.length;
                for (let i=0; i<activeCard.length; i++) {
                    activeCard[i].classList.remove('hintCard');
                    }
                activeCard[i].classList.add('hintCard');
                setTimeout( function () {
                    for (let i=0; i<cardField.length; i++) {
                        cardField[i].classList.remove('hintCard');
                    }
                }, 3000)
            }
            for (let i=0; i<hintCard.length; i++) {
                hintCard[i].classList.remove('hint');
            }
        }
    }
} //функція для підказки

alertFunc({
    className: 'endGame',
    text: '<p>Would you like to pass tutorial?</p><button>YES</button><button>NO</button>'
    }) //початок навчання

function tutorialStart () {
    alertFunc({
        className: 'tutorial',
        text: '<p>Push on any square on the field</p>'
    })
    for (let i = 0; i<cardField.length; i++) {
        cardField[i].addEventListener('click', tutorialThree);
    }
    function tutorialThree () {
        setTimeout ( function () {
            alertFunc({
                className: 'tutorial',
                text: '<p>Square has changed color and has displayed a number. The goal of the game is to fill whole game field by numbers from 1 to 100. the next move can be done like chess horse moving. Try to do this on any highlighted square around square whis number.</p>'
            })
        }, 0)
        for (let i = 0; i<cardField.length; i++) {
            cardField[i].removeEventListener('click', tutorialThree);
        }
        for (let i=0; i<activeCard.length; i++) {
            activeCard[i].addEventListener('click', tutorialFour);
        }
    }
    function tutorialFour () {
        setTimeout( function () {
            alertFunc({
                className: 'tutorial',
                text: '<p>You can cansel your move by pushing on any square whis numbers. Try it.</p>'
            })
        }, 0)
        for (let i = 0; i<cardField.length; i++) {
            cardField[i].removeEventListener('click', tutorialFour);
        }
        for (let i = 0; i<pushedCard.length; i++) {
            pushedCard[i].addEventListener('click', tutorialFive);
        }
    }
    function tutorialFive () {
        setTimeout( function () {
            alertFunc({
                className: 'tutorial',
                text: '<p>This is great. You have passed the tutorial</p>'
            })
            for (let i = 0; i<cardField.length; i++) {
                cardField[i].removeEventListener('click', tutorialFive);
            }
        }, 0)
    }
}

document.querySelector('.alert button').addEventListener('click', function () {
    setTimeout (tutorialStart, 0)
});

body.addEventListener('click', function () {
    alertField.classList.remove('endGame');
    alertField.classList.remove('tutorial');
})




