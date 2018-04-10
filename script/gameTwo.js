

function   turTwo() {
    document.getElementById("clc").onsubmit = function() {
        sborTwo();
       // computerTwo();
        return false;
    };
}
function sborTwo() {
    valueUser = this.textAnswer.value;
    valueUser = valueUser.replace(/\s/g, '').toUpperCase();
    let x = findPartial(arrAnswers, valueUser);

    if (document.getElementById('textAnswer').value !== '' && document.getElementById('textAnswer').value !== ' ' && x !== -1) {
        //ыводит ответ
        document.getElementById('number' + x).classList.toggle('hide',true);
        document.getElementById('playText' + x).innerHTML = conclusionAnswers[x];
        document.getElementById('playScore' + x).innerHTML = Number(arrScore[x]) + Number(arrScore[x]);
        document.getElementById('answer' + x).classList.toggle('openAnswer',true);
        billingAccount +=  Number(arrScore[x]) +  Number(arrScore[x]);
        numberTo("roundScore",allScore ,billingAccount ,500);  //прибавляем к общему числу
        allScore += Number(arrScore[x] ) +  Number(arrScore[x]);
        arrAnswers[x] =  0;
        trueAnswer++;
        // проверка на условия выйгрышa
        if (trueAnswer >= 6) {
            LeftWin++;
            this.textAnswer.value = '';

            return endRoundtwo();
        }
        this.textAnswer.value = '';
        setTimeout(computerTwo, 4000);
        document.getElementById('wraperForm').classList.toggle('hide', true);
        document.getElementById('move').classList.toggle('open', true);
    } else {
        // в случае ошибки
        document.getElementById('circle' + leftErr).classList.toggle('err', true);
        leftErr++;
        if(leftErr >= 3 ){
            rightWin++;
            return endRoundtwo();
        }
        setTimeout(computerTwo,4000);
        document.getElementById('wraperForm').classList.toggle('hide',true);
        document.getElementById('move').classList.toggle('open',true);
        this.textAnswer.value = ''; }
}

function computerTwo() {
   document.getElementById('move').classList.toggle('open',true);

    let varint = Math.random() * 6;
    varint = Math.floor(varint);
let right = Number(document.getElementById('roundScoreRight').innerText);
    if (arrAnswers[varint] !== 0){
        document.getElementById('number' + varint).classList.toggle('hide',true);
        document.getElementById('playText' + varint).innerHTML = conclusionAnswers[varint];
        document.getElementById('playScore' + varint).innerHTML = Number(arrScore[varint])  + Number(arrScore[varint]);
        document.getElementById('answer' + varint).classList.toggle('openAnswer',true);
       // billingAccount +=  right ;
        billingAccount +=  Number(arrScore[varint])  + Number(arrScore[varint]) ;
        numberTo("roundScore",0    ,billingAccount ,500);  //прибавляем к общему числу
        allScore += Number(arrScore[varint])  + Number(arrScore[varint]);
        arrAnswers[varint] =  0;
        trueAnswer++;
        if(trueAnswer >= 6 ){
            rightWin++;
            // numberTo("roundScore",allScore    ,billingAccount ,500);  //прибавляем к общему числу
            document.getElementById('roundScore').innerHTML  = billingAccount;
            return endRoundtwo();
        }
        document.getElementById('wraperForm').classList.toggle('hide',false);
        document.getElementById('textAnswer').focus();
        document.getElementById('move').classList.toggle('open',false);

        //при энтере или клику поиск ищем слово
    }  else {
        // в случае ошибки
        document.getElementById('circleRight' + rightErr).classList.toggle('err', true);
        rightErr++;
        if(rightErr >= 3 ){
            LeftWin++;
            return endRoundtwo()
        }
        document.getElementById('wraperForm').classList.toggle('hide',false);
        document.getElementById('move').classList.toggle('open',false);
        }
}

// проверка на условия выйгрыша
function endRoundtwo() {
    document.getElementById('wraperForm').classList.toggle('hide',true);
    document.getElementById('move').classList.toggle('hide',true);
    document.getElementById('loadRaund').classList.toggle('open',true);
    let right = Number(document.getElementById('roundScoreRight').innerText);
    let left = Number(document.getElementById('roundScoreLeft').innerText);
    //если выйгрыш юзера
    if(leftErr  < 3 && rightErr >= 3|| LeftWin > 0 && rightWin < 1 ) {
        document.getElementById('roundScoreLeft').innerHTML = left + billingAccount;
        //numberTo("roundScoreLeft",1 ,billingAccount ,500);  //прибавляем к общему числу
    }
    //если выйгрыш компа
    else {

        document.getElementById('roundScoreRight').innerHTML = right + billingAccount ;
        //numberTo("roundScoreRight",1 ,billingAccount ,500);  //прибавляем к общему числу
    }
    allScore = 0;
    billingAccount = 0;
    document.getElementById('roundScore').innerHTML = 0;

    for (let i = 0; i < arrAnswers.length; i++){

        if (arrAnswers[i] !== 0) {
            setTimeout(function () {
                document.getElementById('number' + i).classList.toggle('hide',true);
                document.getElementById('playText' + i).innerHTML = conclusionAnswers[i];
                document.getElementById('playScore' + i).innerHTML = Number(arrScore[i]) + Number(arrScore[i]);
                document.getElementById('answer' + i).classList.toggle('openAnswer',true);
            },2000)
        }
    }
    rightErr = 0;
    leftErr = 0;

    setTimeout(function () {
        for (let j = 0 ; j < arrAnswers.length; j++) {
            document.getElementById('number' + j).classList.toggle('hide',false);
            document.getElementById('playText' + j).innerHTML = '';
            document.getElementById('playScore' + j).innerHTML = '';
            document.getElementById('answer' + j).classList.toggle('openAnswer',false);
        }
        for  ( let k = 0 ; k < 3; k++)    {
            document.getElementById('circleRight' + k).classList.toggle('err', false);
            document.getElementById('circle' + k).classList.toggle('err', false);
        }
        //перенести на начало второго этапа
        document.getElementById('g').classList.toggle('twoPlay', false);
        document.getElementById('gg').classList.toggle('twoPlay', false);
        document.getElementById('g').classList.toggle('threePlay', true);
        document.getElementById('gg').classList.toggle('threePlay', true)
    },5000);

    setTimeout(function () {
        show = [];
        questionBase.splice(currentVariant, 1);
        answerBase.splice(currentVariant, 1);
        textAnswers ='';
        conclusionAnswers = [];
        currentVariant = 0;
        textScore = '';
        arrAnswers = [];
        arrScore =[];
        trueAnswer = 0;
        rightWin =0;

        document.getElementById('divAsk').firstChild.innerHTML = '';

        choice(questionBase);
        searchStroke();
        displayQuestion();

        returnGameTwo()

    },6000);

    document.getElementById('wraperForm').classList.toggle('hide',true);
}

//следующий раунд
function returnGameTwo() {


    let length = show.length * 1000;
    setTimeout(function () {
        document.getElementById('loadRaund').classList.toggle('open',false);

        let right = Number(document.getElementById('roundScoreRight').innerHTML);
        let left = Number(document.getElementById('roundScoreLeft').innerHTML);

        if (left > right) {
            document.getElementById('move').classList.toggle('hide',false);
            document.getElementById('move').classList.toggle('open',true);
            setTimeout(computerThree,3000);
        } else {
            document.getElementById('wraperFormGoGo').classList.toggle('open',true);
        }
    },length);

    turThree()
}