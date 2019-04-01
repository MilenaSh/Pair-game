'use strict'

let entryArray = ["1", "2", "3", "4", "5", "6", "7", "8"];
let newShuffledArraya = [];
let matrixDictionary = {};
let matRows = 4;
let matCols = 4;

// Ui specific variables
let currentCellClass = '.cell';

var game = (function () {

    function load() {
        uiApp.loadJQuery();
        setTimeout(function () {
            start();
            $('.reset-button').on('click', start);
        }, 500)

    };

    function restart() {
        start();
    }

    function start() {
        // uiApp.loadJQuery();
        consoleApp.buildMatrix(matRows, matCols, entryArray, matrixDictionary);
        consoleApp.printMatrix(matrixDictionary, matRows, matCols);

        uiApp.buildMatrix(matRows, matCols);
        uiApp.populateMatrix(newShuffledArraya, currentCellClass);


        $(currentCellClass).on('click', uiApp.openCell);
    }

    function play(row, col) {
        consoleApp.play(row, col);
    }

    return {
        load: load,
        restart: restart,
        play: play
    }

})();


var uiApp = (function () {

    function loadJQuery() {
        var script = document.createElement('script');
        script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function buildMatrix(rows, cols, ) {
        $('.game-wrapper').html('');
        for (let i = 0; i < rows; i += 1) {
            $('<div/>', {
                id: 'row' + i,
                class: 'row-' + i,
                title: 'buu',
                width: 'auto',
                height: 'auto'
            }).appendTo('.game-wrapper');

            for (let j = 0; j < cols; j += 1) {

                let parentClass = '.row-' + i;

                $('<div/>', {
                        id: 'row' + i + "-col" + j,
                        class: 'closed cell col-' + j,
                        title: 'buucol',
                        width: '100px',
                        height: '100px',
                    }).css('display', 'inline-block')
                    .css('border', '2px solid black')
                    .css('font-size', '40px')
                    .css('text-align', 'center')
                    .css('line-height', '100px')
                    .css('cursor', 'pointer')
                    .data('state', '')
                    .html('&nbsp')
                    .appendTo(parentClass);
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

    /////////////////////

    function openCell() {
        let $target = $(this);
        let rowN = $target.attr('id').split('-')[0][3];
        let colN = $target.attr('id').split('-')[1][3];

        consoleApp.play(rowN, colN);

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

    function openCellConsole(row, col) {
        let $target = $(`#row${row}-col${col}`);

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
        buildMatrix: buildMatrix,
        loadJQuery: loadJQuery,
        populateMatrix: populateMatrix,
        openCell: openCell,
        openCellConsole: openCellConsole
    }
}())

var consoleApp = (function () {

    function buildMatrix(rows, cols, entryArray, matrixDictionary) {
        newShuffledArraya = shuffle(entryArray);
        let z = 0;
        for (let i = 0; i < rows; i += 1) {

            for (let j = 0; j < cols; j += 1) {
                matrixDictionary['row' + [i] + '-col' + [j]] = {
                    value: newShuffledArraya[z],
                    symbol: '*',
                    state: 'closed',
                    row: i,
                    col: j
                }
                z += 1;
            }

        }
        console.log(matrixDictionary);
        return matrixDictionary;
    }

    function printMatrix(matrixDictionary, matRows, matCols) {
        for (let i = 0; i < matRows; i += 1) {
            let currentRow = '';
            for (let j = 0; j < matCols; j += 1) {
                let matrixCell = matrixDictionary[`row${i}-col${j}`];
                if (matrixCell.state == 'closed') {
                    currentRow += matrixCell.symbol + ' ';
                } else if (matrixCell.state == 'opened' || matrixCell.state == 'matched') {
                    currentRow += matrixCell.value + ' ';
                }
            }
            console.log(currentRow);
            console.log(' ');

        }
        console.log('/********************************************/');

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

    function play(row, col) {
        let selectedCell = matrixDictionary[`row${row}-col${col}`];
        if (selectedCell) {
            selectedCell.state = 'opened';
            printMatrix(matrixDictionary, matRows, matCols);
            let lookForMatch = lookForMatching(row, col);
            if (lookForMatch) {
                printMatrix(matrixDictionary, matRows, matCols);
            }

            let checkResult = checkForGameEnd();

            if (checkResult == true) {
                console.log('Congrats you have lon!');
            }
        }

        uiApp.openCellConsole(row, col);
    }

    function lookForMatching(row, col) {
        let flag = false;
        let currentOpened = matrixDictionary[`row${row}-col${col}`];
        for (let key in matrixDictionary) {
            if (key != `row${row}-col${col}`) {
                let cell = matrixDictionary[key];
                if (cell.state == 'opened' && +cell.value == +currentOpened.value) {
                    cell.state = 'matched';
                    currentOpened.state = 'matched';
                } else if (cell.state == 'opened' && +cell.value != +currentOpened.value) {
                    cell.state = 'closed';
                    currentOpened.state = 'closed';
                    flag = true;
                }
            }
        }
        return flag;
    }

    function checkForGameEnd() {
        let flagEnd = true;
        for (let key in matrixDictionary) {
            if (matrixDictionary[key].state == 'closed') {
                flagEnd = false;
            }
        }
        return flagEnd;
    }

    return {
        buildMatrix: buildMatrix,
        printMatrix: printMatrix,
        restart: restart,
        play: play
    }

})();

// Expose functionality

//document.addEventListener("DOMContentLoaded", play);

function play(row, col) {
    game.play(row, col);
}

function restart() {
    game.restart();
}