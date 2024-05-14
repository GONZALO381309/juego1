const totalCards =12;
let cards = []; //tarjetas generadas
let selectedCards = []; //cuales han sido seleccionadas
let valuesUsed = []; //que valores hemos usado
let currenMove = 0; //movimiento actual
let conteoIntento = 0;

let cardTemplate ='<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e){
    if(currenMove < 2){
        
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')){
            e.target.classList.add('active');
            selectedCards.push(e.target);
            
            if(++currenMove == 2){

                conteoIntento++;
                document.querySelector('#stats').innerHTML = conteoIntento + 'intentos';

                if(selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML){
                    selectedCards = [];
                    currenMove = 0;
                }
                else{
                    setTimeout (() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currenMove = 0;
                    }, 600);
                }

            }
        }
    }
}

//FUNCION QUE GENERA VALORES ALEATORIOS PARA TODAS LAS TARJETAS
function randomValue (){
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if(values.length < 2){
        valuesUsed.push(rnd);
    }
    else{
        randomValue();
    }
}


for (let i=0 ; i < totalCards ; i++){
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = valuesUsed[i];
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}