

$(document).ready(function() {

    let currentColor = "white";
    let currentBoardCells = ["board40","board41","board42","board43"];
    let currentPegCells = ["peg40","peg41","peg42","peg43"];
    let currentRow = 11;
    let possibleColors= [
        dodgerblue, 
        lightpink, 
        darkgreen, 
        crimson, 
        aqua, 
        purple
    ];

    let cellColor1, cellColor2, cellColor3, cellColor4;

    const codeColors = [
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
]; 
console.log(codeColors);

    for (let i = 0; i < 44; i++) {
        let cell = "<div class=\"boardCell\" id=board" + i +"></div>";
        $(".main-board").append(cell);
    }

    for (let i = 0; i < 44; i++) {
        let cell = "<div class=\"pegCell\" id=peg" +i +"></div>";
        $(".side-board").append(cell);
    }

    $(".main-board").css("grid-template-rows", "repeat(11, 61.7px)");
    $(".main-board").css("grid-template-columns", "repeat(4, 61.7px)");

    $(".boardCell").css("border", "1px grey");
    $(".boardCell").css("border-radius", "50%");
    $(".boardCell").css("background-color", "white");

    $(".side-board").css("grid-template-rows", "repeat(22, 30.9px)");
    $(".side-board").css("grid-template-columns", "repeat(2, 30.9px)");

    $(".pegCell").css("border", "1px grey");
    $(".pegCell").css("border-radius", "50%");
    $(".pegCell").css("background-color", "rgb(184, 184, 184)");

    $(".color").each(function() {
        let color = $(this).attr("id");
        $(this).css("background-color", color);
    });

    $(".color").click(function() {
        let color = $(this).attr("id");
        currentColor = color;
        $(".current-color").css("background-color", color);
    });

    $(".boardCell").click(function() {
        let id = $(this).attr("id");
        if(isValid(id)) {
            $(this).css("background-color", currentColor);
        }
    });

    function changeCurrentRow () {
        currentRow = 1;
        let multiplier = 4;
        currentBoardCells = [
            "board" + (currentRow * multiplier - 4),
            "board" + (currentRow * multiplier - 3),
            "board" + (currentRow * multiplier - 2),
            "board" + (currentRow * multiplier - 1)
        ];

        currentPegCells = [
            "peg" + (currentRow * multiplier - 4),
            "peg" + (currentRow * multiplier - 3),
            "peg" + (currentRow * multiplier - 2),
            "peg" + (currentRow * multiplier - 1)
        ];
    };
    function isValid(id) {
        if(currentBoardCells.includes(id) && isWinner === false ) {
            return true;
        }
        return false;
    }

    function checkWin() {
        if (code[0] === cell1Color && 
            code[1] === cell2Color &&
            code[2] === cell3Color &&
            code[3] === cell4Color) {
                isWinner = true;
                alert("Congrats, you've won! \n You can see the guessed code now!")
                showTheCode ();
            };
            return isWinner;
    }

    function showTheCode () {
        $("#secretColor1").css("background-color", code [0] );
        $("#secretColor2").css("background-color", code [1] );
        $("#secretColor3").css("background-color", code [2] );
        $("#secretColor4").css("background-color", code [3] );
    };



});