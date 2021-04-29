// ==UserScript==
// @name Near Attack Renamer
// @description Every 20 seconds, all attacks get selected and the "Rename" button gets clicked
// @author Near
// @include https://*&mode=incomings*
// @version 1.0.0
// @namespace https://greasyfork.org/users/471382
// ==/UserScript==

setTimeout(function() {
    location.reload(1);
}, 20000); {
    $('input#select_all.selectAll').click();
    setTimeout(function() {
        var label = document.getElementsByName("label");
        label[0].click();
    }, 20000);
}
