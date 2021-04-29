// ==UserScript==
// @name         Near Auto Recruit
// @version      1.1
// @description  If the queue is empty it will recruit a unit
// @author       Near edit
// @include https://*&screen=train*
// @include https://*&screen=barracks*
// @require https://code.jquery.com/jquery-2.2.4.min.js
// @run-at document-end
// ==/UserScript==

var objectTroop = [];
var randomTime = randomLH(10000, 100000);

//change between true or false to choose which units to recruit
var lanca = true;
var espada = false;
var barbaro = false;
var explorador = false;
var cavalariaLeve = false;
var cavalariaPesada = false;
var catapulta = false;
var ariete = false;

var classEnum = Object.freeze({
    lanca: ".unit_sprite_smaller.spear",
    espada: ".unit_sprite_smaller.sword",
    barbaro: ".unit_sprite_smaller.axe",
    explorador: ".unit_sprite_smaller.spy",
    cavalariaLeve: ".unit_sprite_smaller.light",
    cavalariaPesada: ".unit_sprite_smaller.heavy",
    ariete: ".unit_sprite_smaller.ram",
    catapulta: ".unit_sprite_smaller.catapult"
});

//make another function in EN if you want in that languange - still needs to be confirmed
function generateObjectPT() {
    objectTroop = [{
            unitName: "spear",
            recruit: lanca,
            cssClassSelector: classEnum.lanca
        },
        {
            unitName: "sword",
            recruit: espada,
            cssClassSelector: classEnum.espada
        },
        {
            unitName: "axe",
            recruit: barbaro,
            cssClassSelector: classEnum.barbaro
        },
        {
            unitName: "spy",
            recruit: explorador,
            cssClassSelector: classEnum.explorador
        },
        {
            unitName: "light",
            recruit: cavalariaLeve,
            cssClassSelector: classEnum.cavalariaLeve
        },
        {
            unitName: "heavy",
            recruit: cavalariaPesada,
            cssClassSelector: classEnum.cavalariaPesada
        },
        {
            unitName: "ram",
            recruit: ariete,
            cssClassSelector: classEnum.ariete
        },
        {
            unitName: "catapult",
            recruit: catapulta,
            cssClassSelector: classEnum.catapulta
        }
    ];
}

$(document).ready(function() {
    generateObjectPT();

    var returnValue = false;
    objectTroop.forEach(element => {
        var response = validFill(element);

        //se o returnValue não tiver sido verdadeiro nos loops anteriores, seta com o valor da resposta atual
        //caso ja tenha sido, manter o valor como verdadeiro
        if (!returnValue) {
            returnValue = response;
        }
    });

    if (returnValue) {
        //clicks the recruit button
        $(".btn-recruit").click();
    }

    //console.log(randomTime);
    setInterval(function() {
        console.log("reload");
        location.reload(true);
    }, randomTime);
});

function validFill(singleObject) {
    if (singleObject.recruit) {
        if ($(singleObject.cssClassSelector).length <= 0) {
            $("input[name=" + singleObject.unitName + "]").val("1");
            return true;
        }
    }
    return false;
}

//random function for the waiting time
function randomLH(superior, inferior) {
    var numPosibilidades = Math.round(superior - inferior);
    var aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior) + aleat + Timing.offset_to_server);
}
