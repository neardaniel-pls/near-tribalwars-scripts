# Bunch of includes

@include      [https://_&screen=overview_](https://*&screen=overview*)
@include      [https://_&mode=incomings_](https://*&mode=incomings*)
@include      [https://_&screen=info_village&_](https://*&screen=info_village&*)
@include      [https://_&screen=place_](https://*&screen=place*)
@include      [https://_?screen=place&t=_&village=\*](https://*?screen=place&t=*&village=*)
@include      [https://_?screen=place&village=_](https://*?screen=place&village=*)
@include      [https://_&screen=statue_](https://*&screen=statue*)
@include      [https://_?screen=overview&village=_](https://*?screen=overview&village=*)
@include      [https://_screen=snob_](https://*screen=snob*)
@include      [https://_screen=am_farm_](https://*screen=am_farm*)

# Header template

==UserScript==
@name         Near Fakes
@version      1.0
@description  Sends fakes to the coords defined by the user
@author       Near edit
@include      [https://_&screen=place_](https://*&screen=place*)
@grant        none
==/UserScript==

# Random Stuff

function randomLH(superior, inferior) {
    var numPosibilidades = Math.round(superior - inferior);
    var aleat = Math.random() \* numPosibilidades;
    return Math.round(parseInt(inferior) + aleat + Timing.offset_to_server);
}
