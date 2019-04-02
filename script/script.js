const wrapper = document.querySelector('.wrapper');
let num = 1;

for (let i=0; i<100; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('active')
    wrapper.appendChild(card);    
    card.innerText = i;
}

const cardField = document.querySelectorAll('.card');

for (let i=0; i<100; i++) {
    cardField[i].addEventListener('click', cardPushed);
    function cardPushed () {
        cardField[i].classList.add('pushed');
        cardField[i].innerText = num;
        num=num+1;
        cardField[i].classList.remove('active');
        cardField[i].removeEventListener('click', cardPushed);
        let cardsPushed = document.querySelectorAll('.pushed');
        for (let i=1; i<cardsPushed.length; i++) {
            if (cardsPushed[i-1].innerText>1){
                if (cardsPushed[i].innerText>cardsPushed[i-1].innerText) {
                    cardsPushed[i].addEventListener('click', cardsPushedCansel);
                    function cardsPushedCansel () {
                        cardsPushed[i].classList.remove('pushed');
                        cardsPushed[i].classList.add('active');
                        cardsPushed = document.querySelectorAll('pushed');
                        num=num-1;
                    }
                } else {
                    cardsPushed[i].removeEventListener('click', cardsPushed);
                }
            }
        }
        console.log(cardsPushed);
        console.log(cardsPushed[0].innerText);
    }
}

console.log(cardField[1].innerText)


// for (let i=0; i<64; i) {
//     for (let t=0; t<8; t+=2) {
//         cardField[i].classList.add('black');
//         i++;
//         cardField[i].classList.add('white');
//         i++;
//     }
//     for (let c=0; c<8; c+=2) {
//         cardField[i].classList.add('white');
//         i++;
//         cardField[i].classList.add('black');
//         i++;
//     }
// }