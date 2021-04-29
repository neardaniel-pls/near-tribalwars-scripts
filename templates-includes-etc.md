# bunch of includes

// @include      https://*&screen=overview*
// @include      https://*&mode=incomings*
// @include      https://*&screen=info_village&*
// @include      https://*&screen=place*
// @include      https://*?screen=place&t=*&village=*
// @include      https://*?screen=place&village=*
// @include      https://*&screen=statue*
// @include      https://*?screen=overview&village=*
// @include      https://*screen=snob*
// @include      https://*screen=am_farm*


# header template

// ==UserScript==
// @name         Near Fakes
// @version      1.0
// @description  Sends fakes to the coords defined by the user
// @author       Near edit
// @include      https://*&screen=place*
// @grant        none
// ==/UserScript==


# random stuff
function randomLH(superior, inferior) {
    var numPosibilidades = Math.round(superior - inferior);
    var aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior) + aleat + Timing.offset_to_server);
}
