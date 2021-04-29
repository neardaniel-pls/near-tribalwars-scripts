// ==UserScript==
// @name Near Unlock Scavenge
// @description Unlocks scavenge from village to village
// @author Near edit
// @include https://*&mode=scavenge*
// @version 1.0.0
// @namespace https://greasyfork.org/users/471382
// ==/UserScript==



setInterval(function() {

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    var $content = $('#scavenge_screen');
    if ($content.length > 0) {
        var $btns = $content.find('.unlock-button').not('.btn-disabled');
        var $popup = $('.scavenge-option-unlock-dialog');
        var $warn = $popup.find('.costs').find('.warn');
        var $cd = $('.unlock-countdown');

        if ($btns.length == 0 || ($popup.length > 0 && $warn.length > 0) || $cd.length > 0) {
            $('.arrowRight, .groupRight').trigger('click');
        } else {
            if ($popup.length > 0) {
                $popup.find('a').last().trigger('click');
            } else {
                $btns.first().trigger('click');
            }
        }
    } else {
        location.href = game_data.link_base_pure + 'place&mode=scavenge';
    }
}, 2000);
