const wrapper = document.querySelector('.wrapper'); //контейнер
let cardCoord = []; //массив об'єктів з координатами
let activeCard; //массив з активними полями
const horseStep = [[-2,-1],[-2,1],[-1,2],[1,2],[2,1],[2,-1],[-1,-2],[1,-2]]; //числа для розрахунку кроку
let pushedCard = [];
let num = 1; //змінна для нумерації

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
} //створюємо массив з об'ктами полів і карток

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
} //функція для подій при натисканні на активне поле

activePush(); //запуск функції для прикріплення подій

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
}

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
    function moveHorse (moveX, moveY) {
        let newX = startX + moveX;
        let newY = startY + moveY;
        for (let i=0; i<100; i++) {
            if (cardCoord[i].coordX == newX && cardCoord[i].coordY == newY && !cardCoord[i].card.classList.contains('pushed')) {
                cardCoord[i].card.classList.add('active');
            }
        }
    }
    if (startX == undefined || startY == undefined) {
        for (let i=0; i<cardField.length; i++) {
            cardField[i].classList.add('active');
        }
    } else {
            for (let i=0; i<horseStep.length; i++) {
            moveHorse (horseStep[i][0], horseStep[i][1]);
        }
    }
}


