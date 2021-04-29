// ==UserScript==
// @name         Near Fakes
// @version      1.0
// @description  Sends fakes to the coords defined by the user
// @author       Near edit
// @include      https://*&screen=place&mode=command
// @grant        none
// ==/UserScript==

var tempo = 1000;
var x = 1000;

//amount of fakes per village
var FakesPorAldeia = 5;

//amount of troops per fake sent
var sp = 0;
var sw = 0;
var ax = 0;
var scout = 2;
var lc = 0;
var hv = 0;
var cat = 1;
var ra = 0;

//place all the coords here
var coords = '541|439';
var doc = document;
var url = document.URL;
var cookieName = "farmeruk";
var cookieNameTent = "tentcookie";
var maxTentativas = 1;
var data;
var h2 = document.getElementsByTagName('h2');
var Praca = false;
var EnviarAtaque = false;

for (i = 0; i < h2.length; i++) {
    if (h2[i].innerHTML == "Praça de Reuniões (nível 1)") {
        Praca = true;
    } else if (h2[i].innerHTML.search("Confirmar ataque a") != -1) {
        EnviarAtaque = true;
    }
}

if (Praca == EnviarAtaque) {
    alert("Algo correu mal");
}

var tentCookie = document.cookie.match('(^|;) ?' + cookieNameTent + '=([^;]*)(;|$)');

if (tentCookie != null) {
    var numTentativas = parseInt(tentCookie[2]);
} else {
    data = new Date(2023, 11, 11);
    document.cookie = cookieNameTent + "=0;expires=" + data.toGMTString();
    var numTentativas = 0;
}

if (Praca) {
    if (document.getElementsByClassName("error_box")[0] != undefined) {
        var erroFaltaUnid = document.getElementsByClassName("error_box");

        for (i = 0; i < erroFaltaUnid.length && !found; i++) {
            if (erroFaltaUnid[i].innerHTML.search("Não existem unidades suficientes") != -1) {
                document.getElementById("village_switch_right").click();
                document.getElementById("village_switch_right > span").click();
                console.log("entroU");
                //throw ''
            }
        }
    }

    if (doc.forms[0].x.value != "") {
        var index = 0;
        farmcookie = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');

        if (farmcookie != null) {
            index = parseInt(farmcookie[2]);
        }

        if (index >= coords.length) {
            index = 0;
        }

        index = index + 1;

        cookie_date = new Date(2023, 11, 11);
        document.cookie = cookieName + "=" + index + ";expires=" + cookie_date.toGMTString();
        var link = document.getElementsByClassName("quickbar_link");
        for (i = 0; i < link.length; i++) {
            if (link[i].href.search(/screen=place/) != -1) {
                window.location.href = link[i].href;
            }
        }
    } else {
        if (window.frames.length > 0) {
            doc = window.main.document;
        }
        url = document.URL;
        coords = coords.split(" ");
        var index = 0;
        farmcookie = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
        if (farmcookie != null) {
            index = parseInt(farmcookie[2]);
        }
        if (index >= coords.length) {
            index = 0;
        }
        if (document.getElementsByClassName("command-list-count")[0] != undefined) {
            var numAtaques = document.getElementsByClassName("command-list-count")[0].innerHTML;
        } else {
            var numAtaques = 0;
        }
        if (numAtaques < FakesPorAldeia) {
            if (numTentativas <= maxTentativas) {
                coords = coords[index];
                coords = coords.split("|");
                index = index + 1;
                cookie_date = new Date(2023, 11, 11);
                document.cookie = cookieName + "=" + index + ";expires=" + cookie_date.toGMTString();
                doc.forms[0].x.value = coords[0];
                doc.forms[0].y.value = coords[1];
                doc.forms[0].spy.value = scout;
                doc.forms[0].spear.value = sp;
                doc.forms[0].sword.value = sw;
                doc.forms[0].axe.value = ax;
                doc.forms[0].spy.value = scout;
                doc.forms[0].light.value = lc;
                doc.forms[0].heavy.value = hv;
                doc.forms[0].ram.value = ra;
                doc.forms[0].catapult.value = cat;
                document.forms[0].attack.click();
            } else {
                data = new Date(2023, 11, 11);
                document.cookie = cookieNameTent + "=0;expires=" + data.toGMTString();
                document.getElementById("village_switch_right").click();
                document.getElementById("village_switch_right > span").click();
            }
        } else {
            document.getElementById("village_switch_right").click();
            document.getElementById("village_switch_right > span").click();
        }
    }
} else if (EnviarAtaque) {
    var BNCheck = document.getElementsByClassName("error");
    var found = false;
    for (i = 0; i < BNCheck.length && !found; i++) {
        if (BNCheck[i].innerHTML == "Bónus noturno ativo!") {
            found = true;
        }
    }
    if (found) {
        var link = document.querySelector("#village_switch_right > span").click();
        for (i = 0; i < link.length; i++) {
            if (link[i].href.search(/screen=place/) != -1) {
                numTentativas = numTentativas + 1;
                data = new Date(2023, 11, 11);
                document.cookie = cookieNameTent + "=" + numTentativas + ";expires=" + data.toGMTString();
                window.location.href = link[i].href;
            }
        }
    } else {
        document.forms[0].troop_confirm_go.click();
    }
} else {
    alert("Corra o script apartir da praça de reuniões");
}
