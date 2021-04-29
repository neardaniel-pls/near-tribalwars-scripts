// ==UserScript==
// @name Near Attack Renamer
// @description Every 20 seconds, all attacks get selected and the "Rename" button gets clicked
// @author Near
// @include https://*&mode=incomings*
// @version 1.0.2
// @namespace https://greasyfork.org/users/471382
// ==/UserScript==

setTimeout(function() {
    location.reload(1);
}, 20000); {

    //clicks the select all button
    $('input#select_all.selectAll').click();

    //starts setTimeout funcion of 20000ms
    setTimeout(function() {

        //searches for the label button
        var label = document.getElementsByName("label");

        //clicks on the label button
        label[0].click();

        //refreshes the page every 20 seconds aka 20000ms
    }, 20000);
}
