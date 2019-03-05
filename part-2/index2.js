'use strict'

var game = (function () {
    let entryArray = ["1", "2", "3", "4", "5", "6", "7", "8"];
    let currentCellClass = '.cell';

    function load() {

        setTimeout(function () {
            start();
            $('.reset-button').on('click', start);
        }, 500)

    };


    function start() {

        buildMatrix(4, 4);

        let newShuffledArraya = shuffle(entryArray);
        populateMatrix(newShuffledArraya, currentCellClass);

        $(currentCellClass).on('click', openCell);

    }

    function buildMatrix(rows, cols, ) {

        for (let i = 0; i < rows; i += 1) {


            for (let j = 0; j < cols; j += 1) {

            }

        }
        $('<div/>', {
                class: 'btn btn-danger reset-button',
            }).html('Reset game')
            .css('width', '200px')
            .css('margin-top', '20px')
            .css('border', '2px solid black')
            .css('font-size', '30px')
            .css('text-align', 'center')
            .css('line-height', '100px')
            .css('cursor', 'pointer')
            .appendTo('.game-wrapper');

        $('<div/>', {
                class: 'message-box',
            }).html('')
            .css('width', '400px')
            .css('margin-top', '20px')
            .css('font-size', '25px')
            .css('text-align', 'center')
            .appendTo('.game-wrapper');
    }



    function populateMatrix(array, cellClass) {
        for (let i = 0; i < array.length; i += 1) {
            $($(cellClass)[i]).attr('data-value', array[i]);
        }
    }

    function shuffle(array) {
        array = doubleCurrentArray(array);
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function doubleCurrentArray(array) {
        let resultArray = [];

        for (let i = 0; i < array.length; i += 1) {
            resultArray.push(array[i]);
            resultArray.push(array[i]);
        }
        return resultArray
    }

    function openCell() {
        let $target = $(this);
        if ($target.attr('disabled') === "disabled") {
            return false;
        }

        if ($($target).hasClass('closed')) {
            let value = ($target).attr('data-value');
            $target.html(value);
            $target.removeClass('closed');
            $target.addClass('open');
        }

        lookForMatching();
    }

    function lookForMatching() {
        let openCells = $('.open');

        if (openCells.length > 1) {
            // disable input for 2 seconds
            preventInput();

            setTimeout(function () {

                let $firstCell = $(openCells[0]);
                let $secondCell = $(openCells[1]);

                if ($firstCell.attr('data-value') != $secondCell.attr('data-value')) {
                    $(openCells).removeClass('open');
                    $(openCells).addClass('closed');
                    $(openCells).html('&nbsp');
                } else {
                    $(openCells).addClass('matched')
                    $(openCells).removeClass('open');
                }

                if ($('.matched').length == entryArray.length * 2) {
                    $('.message-box').html('');
                    $('.message-box').html("Congrats! You have completed the game successfully!");
                }
                enableInput();
            }, 2000);
        }
    }

    function preventInput() {
        let $cells = $('.cell');

        $cells.attr('disabled', true);
    }

    function enableInput() {
        let $cells = $('.cell');

        $cells.attr('disabled', false);
    }

    return {
        load: load
    }

})();