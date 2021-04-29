// ==UserScript==
// @name         Near Mint Coins Same Village
// @description  Mints coins in the same village. I recommend the usage of flags and boosts before starting the process for maximum effeciency.
// @version      1.0
// @author       Near
// @include      https://*screen=snob*
// ==/UserScript==


setTimeout(function() {
    location.reload(1);
}, 5000); {
    setTimeout(function() {

        //obter moedas disp
        var qtd_moedas_get = document.getElementById("coin_mint_fill_max");
        var qtd_moedas_str = qtd_moedas_get.textContent; // "(5)"
        var qtd_moedas_sliced = qtd_moedas_str.slice(1, 2); // 5

        //mudar valor
        var intr_moeda = document.getElementById("coin_mint_count");
        intr_moeda.value = qtd_moedas_sliced;

        //clicar "Cunhar"
        var cunhar = document.getElementsByClassName("btn btn-default");
        cunhar[0].click();
    }, 5000);
}
