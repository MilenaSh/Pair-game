'use strict'

var game = (function () {

    function load() {
        loadJQuery();
        console.log('game loaded');
        buildMatrix(4, 4);
    };

    function loadJQuery() {
        var script = document.createElement('script');
        script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function buildMatrix(rows, cols, ) {
        for (let i = 0; i < rows; i += 1) {
            $('<div/>', {
                id: 'row'+ i,
                class: 'row-'+ i,
                title: 'buu',
                width: 'auto',
                height: 'auto'
            }).appendTo('.game-wrapper');

            for (let j = 0; j < cols; j += 1) {

                let parentClass = '.row-'+ i;

                $('<div/>', {
                    id: 'col'+ j,
                    class: 'col-' + j,
                    title: 'buucol',
                    width: '100px',
                    height: '100px',
                }).css('display', 'inline-block')
                .css('border', '2px solid black')
                .appendTo(parentClass);
                
            }
        }
    }

    return {
        load: load
    }

})();
