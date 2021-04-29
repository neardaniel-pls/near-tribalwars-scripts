// ==UserScript==
// @name        Near Paladin Training
// @description Trains the paladin for 4h (changable) and changes village. (I recommend making a group with only paladins).
// @author      Near
// @include     https://*&screen=statue*
// @version     1.1.1
// ==/UserScript==

setInterval(function() {

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    //butão para alterar de aldeia
    var alternar_aldeia = document.querySelector("#village_switch_right > span");

    //se estiver a nivel 30 muda de aldeia
    if (document.querySelectorAll("#knight_level > div > span > span")[1].textContent == "30") {
        alternar_aldeia.click();
    }

    //se o paladino estiver em casa treina
    else if (document.querySelector("#knight_activity").innerText.includes("casa") == true) {
        //clicar em "Treinar por XP"
        document.querySelector("#knight_actions > div > a").click();
        //caixa de 4h = [1]
        //caixa de 8h = [2]
        //caixa de 16h = [3]
        //caixa de 24h = [4]
        //caixa de 48h = [5]
        var caixa = document.querySelectorAll("#popup_box_knight_regimens > div > div")[1];
        //clica "Inicio"
        caixa.querySelector("#popup_box_knight_regimens > div > div:nth-child(4) > div.actions.center > a:nth-child(1)").click();
        alternar_aldeia.click();

    } else if (parseInt(document.querySelector("[data-endtime]").getAttribute("data-endtime")) <= Math.round((new Date()).getTime() / 1000)) {

        //tempo treino
        var tempo_treino = parseInt(document.querySelector("[data-endtime]").getAttribute("data-endtime"));
        //tempo atual
        var tempo_atual = Math.round((new Date()).getTime() / 1000);
        //tempo restante em segundos
        var tempo_sec = tempo_treino - tempo_atual;
        //segundos para milisegundos
        var tempo_ms = tempo_sec * 1000;
        console.log(tempo_ms);

        //espera x milisegundos caso encontre treino
        sleep(tempo_ms);
        alternar_aldeia.click();
    }
}, 2000);
