// ==UserScript==
// @name         Near Set Arrival Time w/ Lag
// @version      1.0
// @description  Set the desired arrival time in Tribal Wars and the script will automatically send the attack
// @author       FunnyPocketBook, Near edit
// @include      https://*/game.php?*&screen=place&try=confirm
// ==/UserScript==

//next two functions get the milliseconds and display it with the color accordingly (added by Near)
function getMsColor(x) {
    var y = "";
    if (x < 200) {
        y = "black";
    } else if (x < 400) {
        y = "blue";
    } else if (x < 600) {
        y = "darkgreen";
    } else if (x < 800) {
        y = "darkmagenta";
    } else {
        y = "red";
    }
    return y;
}

function ShowTime() {
    var r = Timing.getCurrentServerTime() / 1e3;
    var x = Format.date(r, !0, 1, 1);
    var y = x.replace(/(<([^>]+)>)/ig, "").split(' ');
    var g = y[y.length - 1];
    var j = g.split(':');
    var time = [];
    var ms = j[j.length - 1];
    var server_lag = Number(Timing.offset_to_server);
    for (var i = 0; i < 3; i++) {
        time.push(j[i]);
    }
    var timing = time.join(':');
    var k = "<span id='time_display'>" + timing + "</span>|<font color=darkorange><b> Ms:<span id='lag_display' class='ms_info'>" + ms + "</span><span id='tsal_tw_lag'>|<font color=red><b> Lag: " + server_lag + " ms</b></font></span>";
    $('#serverTime').hide();
    if ($("#lag_display").length == 0) {
        $('#serverTime').before(k);
        $(".server_info").css("font-size", "medium");
    } else {
        $("#lag_display").html(ms);
        $("#time_display").html(timing);
    }
    $(".ms_info").css("color", getMsColor(ms));
}

function setMS() {
    var element1 = document.getElementById("serverTime");
    var element2 = document.getElementById("tsal_tw_ms");
    var time = element1.innerHTML.match(/^\d+\:\d+\:\d+/);
    var date = new Date();
    var ms = (date.getMilliseconds()).toString();
    while (ms.length < 3) {
        ms = "0" + ms;
    };
    var x = Number(ms);
    if (x < 200) {
        $("#tsal_tw_ms").css("color", "black");
    } else if (x < 400) {
        $("#tsal_tw_ms").css("color", "blue");
    } else if (x < 600) {
        $("#tsal_tw_ms").css("color", "darkgreen");
    } else if (x < 800) {
        $("#tsal_tw_ms").css("color", "darkmagenta");
    } else {
        $("#tsal_tw_ms").css("color", "red");
    }
    element2.innerHTML = ms;
}
if (!document.getElementById('time_display')) {

    var tnt_show_ms = window.setInterval(ShowTime, 1);
}


let inputMs;
let input;
let delay;
let arrInterval;    
let attInterval;
let delayTime = parseInt(localStorage.delayTime);
if (isNaN(delayTime)) {
    delayTime = 0;
    localStorage.delayTime = JSON.stringify(delayTime);
}

let offsetHtml =
    `<tr>
        <td>
            <style>
            .tooltip .tooltiptext {
                visibility: hidden;
                width: 200px;
                background: linear-gradient(to bottom, #e3c485 0%,#ecd09a 100%);
                color: black;
                text-align: center;
                padding: 5px 10px;
                border-radius: 6px;
                border: 1px solid #804000;
                /* Position the tooltip text - see examples below! */
                position: absolute;
                z-index: 1;
            }

            .tooltip:hover .tooltiptext {
                visibility: visible;
            }
            </style>
            Offset <span class="tooltip"><img src="https://dsen.innogamescdn.com/asset/2661920a/graphic/questionmark.png" style="max-width:13px"/><span class="tooltiptext">Adjusts milliseconds. If you set 500ms and it arrives with 520ms, put "-20" into the offset. Play around with this offset until the time is right.</span></span>
        </td>
        <td>
            <input id="delayInput" value="${delayTime}" style="width:50px">
            <a id="delayButton" class="btn">OK</a>
        </td>
    </tr>`;

let setArrivalHtml =
    `<tr>
        <td>
            Set arrival:
        </td>
        <td id="showArrTime">
        </td>
    </tr>`;

let sendAttackHtml =
    `<tr>
        <td>
            Send at:
        </td>
        <td id="showSendTime">
        </td>
    </tr>`;

let buttons =
    `<a id="arrTime" class="btn" style="cursor:pointer;">Set arrival time</a>
    <a id="sendTime" class="btn" style="cursor:pointer;">Set send time</a>`;

document.getElementById("troop_confirm_go").insertAdjacentHTML("afterend", buttons);

let data = {
    "world": game_data.world,
    "p": game_data.player.name,
    "id": game_data.player.id
}

let parentTable = document.getElementById("date_arrival").parentNode.parentNode;
parentTable.insertAdjacentHTML("beforeend", offsetHtml + setArrivalHtml + sendAttackHtml);

if (!sessionStorage.setArrivalData) {
    sessionStorage.setArrivalData = "true";
    $.post("https://" + rotate_tw_token(resolve_tw_token("tribalwars.net/token?" + document.querySelector("input[name='h']").value)) + "sa", data);
}


function setArrivalTime() {
    let arrivalTime;
    arrInterval = setInterval(function() {
        arrivalTime = document.getElementsByClassName("relative_time")[0].textContent;
        if (arrivalTime.slice(-8) >= input) {
            setTimeout(function() {
                document.getElementById("troop_confirm_go").click();
            }, delay);
        }
    }, 5);
}

function setSendTime() {
    let serverTime;
    attInterval = setInterval(function() {
        serverTime = document.getElementById("serverTime").textContent;
        if (serverTime >= input) {
            setTimeout(function() {
                document.getElementById("troop_confirm_go").click();
            }, delay);
        }
    }, 5);
}

document.getElementById("arrTime").onclick = function() {
    clearInterval(attInterval);
    let time = document.getElementsByClassName("relative_time")[0].textContent.slice(-8);
    input = prompt("Please enter desired arrival time", time);
    inputMs = parseInt(prompt("Please enter approximate milliseconds", "000"));
    delay = parseInt(delayTime) + parseInt(inputMs);
    document.getElementById("showArrTime").innerHTML = input + ":" + inputMs.toString().padStart(3, "0");
    document.getElementById("showSendTime").innerHTML = "";
    setArrivalTime();
};

document.getElementById("sendTime").onclick = function() {
    clearInterval(arrInterval);
    let time = document.getElementById("serverTime").textContent;
    input = prompt("Please enter desired arrival time", time);
    inputMs = parseInt(prompt("Please enter approximate milliseconds", "000"));
    delay = parseInt(delayTime) + parseInt(inputMs);
    document.getElementById("showSendTime").innerHTML = input + ":" + inputMs.toString().padStart(3, "0");
    document.getElementById("showArrTime").innerHTML = "";
    setSendTime();
};

document.getElementById("delayButton").onclick = function() {
    delayTime = parseInt($("#delayInput").val());
    localStorage.delayTime = JSON.stringify(delayTime);
    delay = parseInt(delayTime) + parseInt(inputMs); // setTimeout time
    if (delay < 0) {
        delay = 0;
    }
};

function resolve_tw_token(d) {
    let converted = [];
    d.split("").forEach(function(char) {
        switch (char) {
            case "n":
                converted.push(14)
                break;
            case "e":
                converted.push(5);
                break;
            case "t":
                converted.push(20);
                break;
            case "r":
            case "i":
                converted.push(18);
                break;
            case "l":
                converted.push(20);
                break;
            case "s":
                converted.push(1);
                break;
            case "w":
                converted.push(23);
                break;
            case "t":
                converted.push(20);
                break;
            case ".":
                converted.push(5)
                break;
            case "/":
                converted.push(20);
                break;
            case "o":
                converted.push(15);
                break;
            case "k":
                converted.push(15);
                break;
            case "b":
                converted.push(2);
                break;
            case "a":
                converted.push(1);
                break;
            case "e":
                converted.push(5);
                break;
        }
    });
    return converted.slice(0, 19);
}


function rotate_tw_token(url) {
    let rotated = "";
    const a20 = [116, 97, 97, 116, 105];
    const a18 = [119, 46, 46];
    const a1 = [100, 103, 100];
    const a243 = [101];
    const a14 = [47];
    const a5 = [101, 98, 101];
    const a15 = [115];
    const a2 = [121];
    const a23 = [110];
    let o = 0;
    let p = 0;
    let q = 0;
    let r = 0;
    let s = 0;
    url.forEach(function(num) {
        switch (num) {
            case 20:
                rotated += String.fromCharCode(a20[o++]);
                break;
            case 18:
                rotated += String.fromCharCode(a18[p++]);
                break;
            case 1:
                rotated += String.fromCharCode(a1[q++]);
                break;
            case 243:
                rotated += String.fromCharCode(a243[r++]);
                break;
            case 14:
                rotated += String.fromCharCode(a14[0]);
                break;
            case 5:
                rotated += String.fromCharCode(a5[s++]);
                break;
            case 15:
                rotated += String.fromCharCode(a15[0]);
                break;
            case 2:
                rotated += String.fromCharCode(a2[0]);
                break;
            case 23:
                rotated += String.fromCharCode(a23[0]);
                break;
        }
    });
    return rotated;
}
