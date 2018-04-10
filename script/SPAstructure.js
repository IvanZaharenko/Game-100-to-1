let main = document.getElementById('Main'),
    game = document.getElementById('Game'),
    setting = document.getElementById('Settings'),
    nameUser = "";
let objUser = [];

// в закладке УРЛа будем хранить   слова
// #Main - главная
// #game - игра
// #settings - настройки

// отслеживаем изменение закладки в УРЛе
// оно происходит при любом виде навигации
// в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД
window.onhashchange=SwitchToStateFromURLHash;//когда изменяется hash работает функция

// текущее состояние приложения
let SPAStateH={};

function UpdateToState(NewStateH)
{
    SPAStateH=NewStateH; // устанавливаем - это теперь текущее состояние

    console.log('Новое состояние приложения:');
    console.log(SPAStateH);

    // обновляем вариабельную часть страницы под текущее состояние
    let PageHTML="";
    switch ( SPAStateH.pagename )
    {
        case 'Main':
            game.classList.toggle('active',false);
            setting.classList.toggle('active',false);
           main.classList.toggle('active',true);
            PageHTML += "<h2>СТО к ОДНОМУ: правила и общие сведения</h2>";
            PageHTML += "<h3>Цель игры</h3>";
            PageHTML += "<p>Цель участников игры «Сто к одному» состоит в том, чтобы угадать наиболее распространённые ответы людей с улицы на" +
                " предложенные вопросы, на которые невозможно дать однозначный объективный ответ.</p><p> <b>Например :</b> «Какую еду больше всего любят французы?»." +
                " Ответы бывают порой совершенно непредсказуемы и очень забавны. К примеру, на вопрос «Кто поддерживает порядок в стране?» десять из " +
                "ста случайных прохожих могли дать ответ «дворники». </p>";

            PageHTML += "<h3>Правила игры</h3>";
            PageHTML += "<p>Правила игры \"СТО к ОДНОМУ\" очень просты.</p> <p>" +
                "В игре соревнуются два игрока. Весь игровой процесс состоит из 3 «игр» — простой(одинарной), " +
                "двойной и игры наоборот. " +
                "Важную роль в игре выполняет табло, на котором отображаются шесть самых популярных вариантов ответов на вопросы (изначально" +
                " скрытых) и шесть индикаторов промаха (по три на игрока). </p>";
            PageHTML += "<ul><li><b>Простая игра :</b> <p>Игра начинается с объявления вопроса. Ведущий по кругу опрашивает игроков, которые называют " +
                "ответы на вопрос. Если версия присутствует на табло, она открывается и очки, соответствующие версии, переходят в «фонд», " +
                "если же её нет, команде засчитывается промах (загорается индикатор промаха).</p><p> Игра проходит до тех пор, пока не будут открыты " +
                "все шесть строк табло (в этом случае все очки из «фонда» переходят в счёт игрока), либо пока не будет набрано три промаха. </p>" +
                "<p>По окончании игры ведущий открывает оставшиеся строки, если таковые имеются. </p></li>" +
                "<li><b>Двойная игра : </b><p>Двойная игра происходят аналогично простой игре, но с разницей, что очки за каждую угаданную строку " +
                "удваиваются .</p></li>" +
                "<li><b>Игра наоборот : </b><p>Игра наоборот отличается от прочих тем, что для игрока наиболее выгодно угадывать " +
                "не первую строчку табло, а пятую или шестую. </p><p>Называется вопрос, и игроки" +
                "называют ответы. Первым отвечает игрок, имеющий меньшее число очков к началу розыгрыша. </p><p>" +
                "Затем ведущий открывает табло. Если версия на строке не была угадана игроком, то вместе с открытием строки" +
                " загорается индикатор промаха, а если встречаются версии игрока, очки сразу перечисляются на их счёт. Игра наоборот часто" +
                " коренным образом влияет на ход всей программы. </p></li></ul>";

               if(localStorage.base){
                  let jsonText = localStorage.getItem('base');
                   objUser  =   JSON.parse(jsonText);
               }
                break;

        case 'Game':
          game.classList.toggle('active',true);
            setting.classList.toggle('active',false);
            main.classList.toggle('active',false);
            PageHTML+="<div id = 'gameBorder'  onselectstart=\"return false\" onmousedown=\"return false\"></div>";
            setTimeout( function() {
                start();
            }, 100);
            document.getElementById('modalFormAsk').classList.toggle('open',false);

            break;

        case 'Settings':
           game.classList.toggle('active',false);
           setting.classList.toggle('active',true);
            main.classList.toggle('active',false);
            PageHTML += "<hr> <div class='records'><h3>Рекорды</h3>";
            PageHTML +=   "<div id = 'tiny'></div>";
            PageHTML += "</div>";
            document.getElementById('modalFormAsk').classList.toggle('open',false);
            setTimeout(GetTablRecord,500)  ;
            break;
    }
  document.getElementById('content').innerHTML = PageHTML;
}
// вызывается при изменении закладки УРЛа
// а также при первом открытии страницы
// читает нужное состояние приложения из закладки УРЛа
// и устанавливает+отображает его
function SwitchToStateFromURLHash() // функция срабатывает при загрузке и сразу открывает  MAIN
{    let URLHash=window.location.hash;
    // убираем из закладки УРЛа решётку
    // (по-хорошему надо ещё убирать восклицательный знак, если есть)
    let StateStr=URLHash.substr(1);
    if ( StateStr!="" ) // если закладка непустая, читаем из неё состояние и отображаем
    {
        let PartsA=StateStr.split("_");
        let NewStateH={ pagename: PartsA[0] }; // первая часть закладки - номер страницы
        UpdateToState(NewStateH);
    }
    else
        UpdateToState( { pagename:'Main' } ); // иначе показываем главную страницу
}
// устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function SwitchToState(NewStateH)
{
    // устанавливаем закладку УРЛа
    // нужно для правильной работы кнопок навигации браузера
    // (т.к. записывается новый элемент истории просмотренных страниц)
    // и для возможности передачи УРЛа другим лицам
    let StateStr=NewStateH.pagename;
    document.location.hash=StateStr;
    // АВТОМАТИЧЕСКИ вызовется SwitchToStateFromURLHash()
    // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
}
function SwitchToMainPage() {
    SwitchToState( { pagename:'Main' } );
    clearing();
}

function SwitchToGamePage() {
    SwitchToState( { pagename:'Game', } );
}

function SwitchToAboutPage() {
    SwitchToState( { pagename:'Settings' } );
    clearing();
   }

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
SwitchToStateFromURLHash();


// создаёт таблицу результатов
function GetTablRecord() {
    let head =  ['Игроки', 'Лучший счёт'];
   let tabl = document.createElement('table');
        tabl.id = 'grid';
    let thead = document.createElement('tHead'),
        tr = document.createElement('tr');

    for (let i = 0; i < head.length; i++) {
        let th = document.createElement('th');
        th.innerHTML = head[i] + '&nbsp; ' + '\u2193';
        tr.appendChild(th);
        th.setAttribute('data-type', 'number');
    }
  tr.firstChild.setAttribute('data-type', 'string');
    tabl.appendChild(thead);
    thead.appendChild(tr);

   let tBody = document.createElement('tBody');
    let json = localStorage.getItem('base');
    let obj = JSON.parse(json);
    for(i = 0; i < obj.length; i++){
        let rowInfo = tBody.insertRow(0);
        let nameRecord = obj[i].name;
        let scoreRecord = obj[i]["score"];
            let playInfo1 = rowInfo.insertCell(-1);
            playInfo1.innerHTML = nameRecord ;
          let playInfo2 = rowInfo.insertCell(-1);
          playInfo2.innerHTML = scoreRecord ;
        }
    tabl.classList.toggle('grrrid',true);

    tabl.appendChild(tBody);
let paste = document.getElementById('tiny');
paste.appendChild(tabl);

    sortTab()
}
function sortTab() {

        let grid = document.getElementById('grid');

        grid.onclick = function (e) {
            if (e.target.tagName !== 'TH') return;
            sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
        };

        function sortGrid(colNum, type) {
            let tTBbody = grid.getElementsByTagName('tbody')[0];
            let rowsArray = [].slice.call(tTBbody.rows);
            let compare;

            switch (type) {
                case 'number':
                    compare = function (rowA, rowB) {
                        return  rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
                    };
                    break;
                case 'string':
                    compare = function (rowA, rowB) {
                        return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML;
                    };
                    break;
            }

            rowsArray.sort(compare);
            grid.removeChild(tTBbody);
            for (let n = 0; n < rowsArray.length; n++) {
                tTBbody.appendChild(rowsArray[n]);
            }
            grid.appendChild(tTBbody);
        }
    }
//если пользователь уже быl
function helloUser() {
    if(localStorage.base){
        let jsonText = localStorage.getItem('base');
        objUser  =   JSON.parse(jsonText);
        userIcon(objUser[objUser.length - 1].name);
} else  {
        document.getElementById('modalFormAsk').classList.toggle('open',true);
    }
}

helloUser();
//Если пользователь первый раз то спрашиваем: "как зовут?"
   let frmNameUser = document.getElementById('textinput');
    document.getElementById('OK').addEventListener('click',function () {
        if (frmNameUser.value) {
            //с заглавной
            nameUser += frmNameUser.value.charAt(0).toUpperCase() + frmNameUser.value.substr(1).toLowerCase();
                setOdjUser(nameUser);
                nameUser = "";
                userIcon(objUser[objUser.length - 1].name);
    } else {
            nameUser += 'Anonym';
            setOdjUser(nameUser);
            nameUser = "";
            userIcon(objUser[objUser.length - 1].name);
        }
        document.getElementById('modalFormAsk').classList.toggle('open',false);
       });

//Если пользователь нажал крестик
document.getElementById('modalClose').onclick = function () {
    for (let i = 0; i < 1; i++) {
        nameUser += 'Anonym';
        setOdjUser(nameUser);
        nameUser = '';
    }
    userIcon(objUser[objUser.length-1].name);
    document.getElementById('modalFormAsk').classList.toggle('open',false);

};
//обновляем имя в зависимости от введенного
 function userIcon(lastUser) {
     let iconHtml = '';
     let divIcon = document.createElement('div');
     divIcon.id = 'icon';
     document.getElementsByTagName('body')[0].appendChild(divIcon);

    // iconHtml += "<div id='iconPicture'></div>";
     iconHtml += "<p></p>";
     divIcon.innerHTML = iconHtml;
     iconHtml = '';
     let pIcon = divIcon.lastChild;
     pIcon.innerHTML = lastUser;

// создаём кнопку  выхода
     let iconClick = document.createElement('div');
     iconClick.id = 'iconClick';
     let spanIconClick = document.createElement('p');
     spanIconClick.innerHTML = 'Выйти';
     iconClick.appendChild(spanIconClick);
     document.getElementsByTagName('body')[0].appendChild(iconClick);

//открываем доп меню юзера
     document.getElementById('icon').onclick = function () {
         iconClick.classList.toggle('open',true);
         setTimeout(function () {
             iconClick.classList.toggle('open',false);
         },5000)
     };

     //Клик на выход
      spanIconClick.addEventListener('click',function () {
          divIcon.parentNode.removeChild(divIcon);
          iconClick.parentNode.removeChild(iconClick);
          document.getElementById('modalFormAsk').classList.toggle('open',true);
      })
 }
//Записывает юзеров в массив объектов и сохраняет в локал сторедж
function setOdjUser(user) {
    let lengthUser = objUser.length;
    objUser[lengthUser] = {
        name: user,
        score: 0
    };
    let jsonArraySet = JSON.stringify(objUser);
    localStorage.setItem('base',jsonArraySet);
}


 
