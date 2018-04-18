let answerBase,questionBase; //загружаемая база слов/вопросов
let currentVariant = 0;
let show;
let textAnswers = []; //арианты ответа
let conclusionAnswers = []; //красивый ответ для вывода
let textScore =[];  // очки
let valueUser =''; // введенный вариант
let arrScore =[];
let arrAnswers = [];//массив ответов заглавный без пробелов
let billingAccount =0;// счёт текущего раунда,
let trueAnswer = 0;  //сумма верных ответов
let allScore = 0 ;//изначальный счёт,
let leftErr = 0;//счёт ошибок левого
let rightErr = 0;//и правого
let LeftWin =0 ;
let rightWin = 0;


let pageHtmlGame = '';
function start () {
    pageHtmlGame += "<div id='wra' class='load'><span class='curtainLeft curtain'></span><div  class ='loadButton'><h3>Обычная игра</h3><button  id='startGame' type='button'>Начать игру</button></div><span class='curtain curtainRight'></span></div>";
    pageHtmlGame += "<div id='currentPoint'> <div class='smooth'><span id='g' class='spr onePlay'> </span><div id='points'>  <span id='roundScore'>0</span>  </div> <span id='gg' class='spr onePlay'></span></div></div>";
    pageHtmlGame += "<div id='divAsk'><span></span></div>";

    pageHtmlGame += "<div id='leftUser'><div class='wraperPlr'>" +
        "<div class='pointsLeft'><span id='roundScoreLeft'>0</span></div>" +
        "<div class='iconcPlrLeft spr2'></div>" +
        "<div class='namePlr' id='leftName'></div>" +
        "<div class='currentScoreLeft'><div id='circle0' class='circle '></div><div id='circle1' class='circle '></div><div id='circle2' class='circle'></div></div>" +
        "</div></div> " ;

    pageHtmlGame +=    "<div id='rightUser'><div class='wraperPlr'>" +
        "<div class='pointsLeft'><span id='roundScoreRight'>0</span></div>" +
        "<div class='iconcPlrRight spr2'></div>" +
        "<div class='namePlr' id='righName'></div>" +
        "<div class='currentScoreLeft'><div id='circleRight0' class='circle '></div><div id='circleRight1' class='circle '></div><div id='circleRight2' class='circle'></div></div>" +
        "</div></div> " ;

    pageHtmlGame += "<div id='answerBoard'><div class='wraperAnswer'>" +

        "<div id='answer0' class='close'> " +

        "<span class='number' id='number0'><span class='d1'>.</span><span class='d2'>.</span><span class='d3'>.</span> <span> 1 </span>" +
        "<span class='d3'>.</span> <span class='d2'>.</span> <span class='d1'>.</span></span>" +
        "<span id='playText0' class= 'answerStyle'></span>" +
        "<span id='playScore0' class ='scoreStyle'></span></div>" +


        "<div id='answer1' class='close'>  <span  class='number' id='number1'><span class='d1'>.</span><span class='d2'>.</span><span class='d3'>.</span> <span> 2 </span> " +
        "<span class='d3'>.</span> <span class='d2'>.</span> <span class='d1'>.</span></span>" +
        "<span id='playText1' class='answerStyle'></span>" +
        "<span id='playScore1' class ='scoreStyle'></span></div>" +


        "<div id='answer2' class='close'> <span class='number' id='number2'><span class='d1'>.</span><span class='d2'>.</span><span class='d3'>.</span> <span> 3 </span>" +
        "<span class='d3'>.</span> <span class='d2'>.</span> <span class='d1'>.</span></span>" +
        "<span id='playText2' class='answerStyle'></span>" +
        "<span id='playScore2' class ='scoreStyle'></span></div>" +


        "<div id='answer3' class='close'><span class='number' id='number3'><span class='d1'>.</span><span class='d2'>.</span><span class='d3'>.</span> <span> 4 </span>" +
        "<span class='d3'>.</span> <span class='d2'>.</span> <span class='d1'>.</span></span>" +
        "<span id='playText3' class='answerStyle'></span>" +
        "<span id='playScore3' class ='scoreStyle'></span></div>" +


        "<div id='answer4' class='close'><span  class='number' id='number4'><span class='d1'>.</span><span class='d2'>.</span><span class='d3'>.</span> <span> 5 </span>" +
        "<span class='d3'>.</span> <span class='d2'>.</span> <span class='d1'>.</span></span>" +
        "<span id='playText4' class='answerStyle'></span>" +
        "<span id='playScore4' class ='scoreStyle'></span></div>" +


        "<div id='answer5' class='close'><span  class='number' id='number5'><span class='d1'>.</span><span class='d2'>.</span><span class='d3'>.</span> <span> 6 </span>" +
        "<span class='d3'>.</span> <span class='d2'>.</span> <span class='d1'>.</span></span>" +
        "<span id='playText5' class='answerStyle'></span>" +
        "<span id='playScore5' class ='scoreStyle'></span></div>" +


        "</div><div id='wraperFormAnswer'><div id='loadRaund' class='alienMove'><div id=\"circularG\">\n" +
        "    <div id=\"circularG_1\" class=\"circularG\"></div>\n" +
        "    <div id=\"circularG_2\" class=\"circularG\"></div>\n" +
        "    <div id=\"circularG_3\" class=\"circularG\"></div>\n" +
        "    <div id=\"circularG_4\" class=\"circularG\"></div>\n" +
        "    <div id=\"circularG_5\" class=\"circularG\"></div>\n" +
        "    <div id=\"circularG_6\" class=\"circularG\"></div>\n" +
        "    <div id=\"circularG_7\" class=\"circularG\"></div>\n" +
        "    <div id=\"circularG_8\" class=\"circularG\"></div>\n" +
        "</div></div>" +
        "<div id='move' class='alienMove'>Чужой ход</div>" +

        "<form action='' id='clc'><div id='wraperForm'>" +
        "<input name='textAnswer' id='textAnswer' placeholder='Ваш ответ' autocomplete='off' >" +
        "<input type='submit' id='time' value='Ответить'>" +
        "</div></form>" +

        "<form action='' id='goGo'><div id='wraperFormGoGo'>" +
        "<input name='textAnswerGoGo' id='textAnswerGoGo' placeholder='Ваш ответ' autocomplete='off' > " +
        "<input type='submit' id='timeGoGo' value='Ответить'>" +
        "</div></form>" +


        "</div></div>" +
        "<div id='theEnd' class='endResult'><span> ПОБЕДИЛ </span><div class='buttonReturn' id='returnGame'>Повторить игру</div><div class='buttonEnd' id='goResult'>К результатам</div></div>";
    document.getElementById('gameBorder').innerHTML = pageHtmlGame;
    document.getElementById("textAnswer").focus();
    pageHtmlGame = '';

    //скачиваем базу вопросов и работаем с ней
    getJSONFile('data/questions.json', function(data){
        questionBase = JSON.parse(data);

        //скачиваем базу ответов и работаем с ней
        getJSONFile('data/answers.json', function(data){
            answerBase = JSON.parse(data);

            choice(questionBase); //ыбор номера вопроса из массива вопросов
            searchStroke();   // подготовка массива для сравнения

let name = document.getElementById('icon').lastChild.innerText;
document.getElementById('leftName').innerHTML = name;
document.getElementById('righName').innerHTML = 'Компьютер';

            document.getElementById('startGame').onclick = function () {
                document.getElementById('wra').classList.toggle('hide',true);
                document.getElementById('loadRaund').classList.toggle('open',true);
                document.getElementById('wraperForm').classList.toggle('hide', true);


                // вывод случайного вопроса
                displayQuestion();

              setTimeout(startPlay,Number(show.length) * 1000);
            };

        });
    });
}


// подготовка массива для сравнения
function searchStroke() {
    for(let j = 0; j < answerBase[currentVariant ].length ;  j++){
        textAnswers +=  answerBase[currentVariant][j]["answer"] + '_';
        conclusionAnswers += answerBase[currentVariant][j]["answer"] + '_';
        textAnswers =   textAnswers .replace(/\s/g, '').toUpperCase(); //удаляет пробелы и регистр меняет

        textScore += answerBase[currentVariant][j]["number"] + '_';
    }
    conclusionAnswers = conclusionAnswers.split('_').splice(0,6); //массив ответов красивых для вывода
    arrAnswers = textAnswers.split('_').splice(0,6); 
     arrScore = textScore.split('_').splice(0,6); //массив очков для вывода
}

function startPlay() {

    document.getElementById('loadRaund').classList.toggle('open',false);
    document.getElementById('wraperForm').classList.toggle('hide', false);
    document.getElementById('textAnswer').focus();
    document.getElementById("clc").onsubmit = function() {
        sbor();
        return false;
    };
}

//при энтере или клику поиск ищем слово  певом раунде
    function sbor() {
    valueUser = this.textAnswer.value;
    valueUser = valueUser.replace(/\s/g, '').toUpperCase();

    let x = findPartial(arrAnswers, valueUser);
    if (document.getElementById('textAnswer').value !== '' && document.getElementById('textAnswer').value !== ' ' && x !== -1) {
        //ыводит ответ
        document.getElementById('number' + x).classList.toggle('hide',true);
        document.getElementById('playText' + x).innerHTML = conclusionAnswers[x];
        document.getElementById('playScore' + x).innerHTML = arrScore[x];
        document.getElementById('answer' + x).classList.toggle('openAnswer',true);
        billingAccount +=  Number(arrScore[x]);
        numberTo("roundScore",allScore ,billingAccount ,500);  //прибавляем к общему числу
        allScore += Number(arrScore[x] );
        arrAnswers[x] =  0;
        trueAnswer++;
        // проверка на условия выйгрышa
        if (trueAnswer >= 6) {
            LeftWin++;

            this.textAnswer.value = '';

            return endRound();
        }
        this.textAnswer.value = '';
        setTimeout(computer, 4000);
        document.getElementById('wraperForm').classList.toggle('hide', true);
        document.getElementById('move').classList.toggle('open', true);

    } else {
        // в случае ошибки
        document.getElementById('circle' + leftErr).classList.toggle('err', true);
        leftErr++;
        if(leftErr >= 3 ){
            rightWin++;
            return endRound();
        }
        setTimeout(computer,4000);
        document.getElementById('wraperForm').classList.toggle('hide',true);
        document.getElementById('move').classList.toggle('open',true);
        this.textAnswer.value = ''; }

}
// проверка на условия выйгрыша
function endRound() {
    document.getElementById('wraperForm').classList.toggle('hide',true);
    document.getElementById('move').classList.toggle('open',false);
    document.getElementById('loadRaund').classList.toggle('open',true);

    //если выйгрыш юзера
    if(leftErr  < 3 && rightErr >= 3|| LeftWin > 0 && rightWin < 1 ) {
         document.getElementById('roundScoreLeft').innerHTML = billingAccount;

    }
    //если выйгрыш компа
    else {
         document.getElementById('roundScoreRight').innerHTML = billingAccount;

    }
    allScore = 0;
    billingAccount = 0;
    document.getElementById('roundScore').innerHTML = 0;

    for (let i = 0; i < arrAnswers.length; i++){

        if (arrAnswers[i] !== 0) {
           setTimeout(function () {
               document.getElementById('number' + i).classList.toggle('hide',true);
               document.getElementById('playText' + i).innerHTML = conclusionAnswers[i];
               document.getElementById('playScore' + i).innerHTML = arrScore[i];
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
        document.getElementById('g').classList.toggle('onePlay', false);
        document.getElementById('gg').classList.toggle('onePlay', false);
        document.getElementById('g').classList.toggle('twoPlay', true);
        document.getElementById('gg').classList.toggle('twoPlay', true)
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

    document.getElementById('roundScore').innerHTML = 0;

document.getElementById('divAsk').firstChild.innerHTML = '';
    choice(questionBase);
    searchStroke();
    displayQuestion();

    returnGame()

},6000);
}

//следующий раунд
function returnGame() {
    let length = show.length * 1000;
    setTimeout(function () {
        document.getElementById('loadRaund').classList.toggle('open',false);

       let right = Number(document.getElementById('roundScoreRight').innerHTML);
       let left = Number(document.getElementById('roundScoreLeft').innerHTML);

        if (left > right) {
            document.getElementById('wraperForm').classList.toggle('hide',false);
            document.getElementById('textAnswer').focus();

        } else {
            document.getElementById('move').classList.toggle('open',true);
            setTimeout(computerTwo,3000);
        }
    },length);
    turTwo();
}

function computer() {
        let varint = Math.random() * 6;
    varint = Math.floor(varint);

    if (arrAnswers[varint] !== 0){
        document.getElementById('number' + varint).classList.toggle('hide',true);
        document.getElementById('playText' + varint).innerHTML = conclusionAnswers[varint];
        document.getElementById('playScore' + varint).innerHTML = arrScore[varint];
        document.getElementById('answer' + varint).classList.toggle('openAnswer',true);
        billingAccount +=  Number(arrScore[varint]) ;
        numberTo("roundScore",allScore    ,billingAccount ,500);  //прибавляем к общему числу
        allScore += Number(arrScore[varint] );
        arrAnswers[varint] =  0;
        trueAnswer++;
                  if(trueAnswer >= 6 ){

                      rightWin++;
                         // numberTo("roundScore",allScore    ,billingAccount ,500);  //прибавляем к общему числу
                    document.getElementById('roundScore').innerHTML  = billingAccount;
                    return endRound();
                 }

        //document.getElementById('textAnswer').focus();
        document.getElementById('wraperForm').classList.toggle('hide',false);
        document.getElementById('move').classList.toggle('open',false);
        document.getElementById('textAnswer').focus();

        //при энтере или клику поиск ищем слово
    }  else {
        // в случае ошибки


        document.getElementById('circleRight' + rightErr).classList.toggle('err', true);
        rightErr++;
        if(rightErr >= 3 ){
            LeftWin++;
            return endRound()
        }
        document.getElementById('wraperForm').classList.toggle('hide',false);
        document.getElementById('move').classList.toggle('open',false);
        document.getElementById('textAnswer').focus();

    }
              }

//проверка совпадений
function findPartial( array, search ) {
    let i;
   if(search !== ''){
    if( search.length <= 3 ){
        return-1
    }
       if( search.length >= 4 ) {
        i = search.length - 4;
        let r = search.substr( i, 4 );
        while( --i >= 0 )
            r += "|" + search.substr( i, 4 );
        r = new RegExp( r );
        for( i = 0; i < array.length; ++i )
            if( r.test( array[i] ) )
                return i;
    } else {
      for( i = 0; i < array.length; ++i )
            if( array[i].indexOf( search ) === 0 )
                return i;
    }
    return -1;

   } else {
       return -1
   }
}
//плавный счётчик набора очков
function numberTo(id,from,to,duration) {
    let element = document.getElementById(id);
    let start = new Date().getTime();
    setTimeout(function() {
        let now = (new Date().getTime()) - start;
        let progress = now / duration;
        let result = Math.floor(((to + 1) - from) * progress + from);
        if (progress < 1) {
            if (to.length <= 2){
            element.innerHTML = result;
            } else {
                element.innerHTML = result;
            }
        } else
            if (to.length >= 3)
                 element.innerHTML =  to ;

        if (progress < 1) setTimeout(arguments.callee, 10);
    }, 10);
}

// вывод случайного вопроса
function displayQuestion() {
    let i = 0;
    show = questionBase[currentVariant].theme.split(' ');
    setTimeout(function run() {

        if (i <= show.length - 1){
            document.getElementById('divAsk').firstChild.innerHTML += show[i] + ' ';
            i++;
            setTimeout(run, 1000);
        }
    }, 100);

}

//Bыбор случайного вопросв
function choice(arr) {
    let arrayLength = arr.length - 1 ;
    randomInteger(0,arrayLength);
}

//генерация случайного числа в нужно диапозоне
function randomInteger(min, max) {
    let rand = min  + Math.random() * (max - min + 1   );
    rand = Math.floor(rand);
    currentVariant = rand;
    return currentVariant;
}

//унккция скачивания локальных данных
function getJSONFile(url,callback) {
     let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.overrideMimeType("application/json");
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == "200") {
            callback(req.responseText);
        }
    };
    req.send();
}








