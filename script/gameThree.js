let billing = 0;
function     turThree() {
    document.getElementById("goGo").onsubmit = function() {
        sborThree();
        document.getElementById('move').classList.toggle('hide', false);

        return false;
    };
}
function sborThree() {
    let billing = 0;
    valueUser = this.textAnswerGoGo.value;
    valueUser = valueUser.replace(/\s/g, '').toUpperCase();
    let left = Number(document.getElementById('roundScoreLeft').innerText);
    let x = findPartial(arrAnswers, valueUser);
    let arrScore = [15,30,60,120,180,240];
    if (document.getElementById('textAnswerGoGo').value !== '' && document.getElementById('textAnswerGoGo').value !== ' ' && x !== -1) {
        //ыводит ответ
        document.getElementById('number' + x).classList.toggle('hide',true);
        document.getElementById('playText' + x).innerHTML = conclusionAnswers[x];
        document.getElementById('playScore' + x).innerHTML = arrScore[x];
        document.getElementById('answer' + x).classList.toggle('openAnswer',true);
        billing += left;
        billing +=  Number(arrScore[x]);
        numberTo("roundScoreLeft",left ,billing ,500);  //прибавляем к общему числу
        arrAnswers[x] =  0;
       trueAnswer++;

        if(trueAnswer >= 2 ||  rightErr === 1) {
            endGame()        }
           LeftWin++;

        this.textAnswerGoGo.value = '';
        setTimeout(computerThree, 4000);
        document.getElementById('wraperFormGoGo').classList.toggle('hide', true);
        document.getElementById('move').classList.toggle('open', true);
    } else {
        // в случае ошибки
        document.getElementById('circle' + leftErr).classList.toggle('err', true);
        leftErr++;

        if( rightErr === 1 || trueAnswer >= 1){
            endGame()
        }
        setTimeout(computerThree,4000);
        document.getElementById('wraperFormGoGo').classList.toggle('hide',true);
        document.getElementById('move').classList.toggle('open',true);
        this.textAnswerGoGo.value = ''; }
}

function computerThree() {
    billing =0;
    //document.getElementById('move').classList.toggle('open',true);

    let right = Number(document.getElementById('roundScoreRight').innerText);

    let varint = Math.random() * 6;
    varint = Math.floor(varint);
    let arrScore = [15,30,60,120,180,240];

    if (arrAnswers[varint] !== 0){
        document.getElementById('number' + varint).classList.toggle('hide',true);
        document.getElementById('playText' + varint).innerHTML = conclusionAnswers[varint];
        document.getElementById('playScore' + varint).innerHTML = arrScore[varint] ;
        document.getElementById('answer' + varint).classList.toggle('openAnswer',true);
        billing +=  right   ;
        billing +=  Number(arrScore[varint])   ;

        numberTo("roundScoreRight",right,billing ,500);  //прибавляем к общему числу
       // allScore += Number(arrScore[varint])  + Number(arrScore[varint]);
        arrAnswers[varint] =  0;
        trueAnswer++;
        if(trueAnswer >= 2 || leftErr === 1) {
            endGame()
        }

        document.getElementById('wraperFormGoGo').classList.toggle('open',true);
        document.getElementById('move').classList.toggle('open',false);
        document.getElementById('textAnswerGoGo').focus();

    } else {
        // в случае ошибки
        document.getElementById('circleRight' + rightErr).classList.toggle('err', true);
         rightErr++;
if( leftErr === 1 || trueAnswer >= 1){
    endGame()
}

        document.getElementById('wraperFormGoGo').classList.toggle('hide',false);
        document.getElementById('move').classList.toggle('open',false);

    }
}
//обработка резудьтатов игры
function endGame() {

    let arrScore = [15,30,60,120,180,240];

    document.getElementById('wraperFormGoGo').classList.toggle('open',false);
    document.getElementById('move').classList.toggle('open',false);
    document.getElementById('loadRaund').classList.toggle('open',true);


    for (let i = 0; i < arrAnswers.length; i++){
        if (arrAnswers[i] !== 0) {
            setTimeout(function () {
                document.getElementById('number' + i).classList.toggle('hide',true);
                document.getElementById('playText' + i).innerHTML = conclusionAnswers[i];
                document.getElementById('playScore' + i).innerHTML = arrScore[i];
                document.getElementById('answer' + i).classList.toggle('openAnswer',true);
            },1000)
        }
    }

    let left = Number(document.getElementById('roundScoreLeft').innerHTML);
    let right = Number(document.getElementById('roundScoreRight').innerHTML);

    let win = document.getElementById('theEnd').firstChild;
    if( left > right) {
        win.innerHTML = "Победил "  + document.getElementById('leftName').innerText ;
    } else {
        win.innerHTML = "Победил Компьютер" ;

    }
    scoring ();
setTimeout(function () {
    document.getElementById('theEnd').classList.toggle('open',true);
},4000);

    document.getElementById('returnGame').onclick = function () {
        clearing();
        setTimeout( function() {
            start();
        }, 100);
    };
    document.getElementById('goResult').onclick = function () {
        clearing();
        SwitchToAboutPage();
    };
}

function scoring () {

        let y = objUser.length - 1;
     objUser[y]["score"] = document.getElementById('roundScoreLeft').innerText;

    let jsonArrayScore = JSON.stringify(objUser);
    localStorage.setItem('base',jsonArrayScore);

}

function clearing() {
    rightErr = 0;
    leftErr = 0;
    allScore = 0;
    billingAccount = 0;
    show = [];
    //questionBase.splice(currentVariant, 1);
   // answerBase.splice(currentVariant, 1);
    textAnswers ='';
    conclusionAnswers = [];
    currentVariant = 0;
    textScore = '';
    arrAnswers = [];
    arrScore =[];
    trueAnswer = 0;
    rightWin =0;
}


