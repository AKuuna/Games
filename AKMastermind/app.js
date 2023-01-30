

$(document).ready(function() {

    let currentColor = "white";
    let currentBoardCells = ["board40","board41","board42","board43"];
    let currentPegCells = ["peg40","peg41","peg42","peg43"];
    let currentRow = 11;
    let possibleColors= [
        "dodgerblue", 
        "lightpink", 
        "darkgreen", 
        "crimson", 
        "aqua", 
        "purple"
    ];
    let isWinner = false;

    let cellColor = [ ];

    const codeColors = [
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
    ]; 

    $(".code").css("grid-template-rows", "repeat(1, 50px)");
    $(".code").css("grid-template-columns", "repeat(4, 50px)");
    
    $(".secret-color").css("border", "1px grey");
    $(".secret-color").css("border-radius", "50%");

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
    $(".pegCell").css("background-color", "rgb(137, 154, 185)");

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

    $(".submit").click(function() {
        // console.log(currentBoardCells);
        for (let i = 0; i < 4;  i++) {
            cellColor[i] = document.getElementById(currentBoardCells[i]).style.backgroundColor;
        };
        // console.log(cellColor);
        checkWin();
        return cellColor;
    });

    function changeCurrentRow () {
        currentRow--;
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

    function changePegColors (a,b) {
        let i = 0;
        for ( a; a > 0; a--) {
            document.getElementById(currentPegCells[i]).style.background = "black";
            i++;
        };
        for ( b; b > 0; b--) {
            document.getElementById(currentPegCells[i]).style.background = "white";
            i++;
        };
    };

    function getTheHint () {
        let a = 0;
        let b = 0;
        //Other try 
        //black peg
        // for ( let i = 0; i < 4; i++ ) {
        //     if(codeColors[i] === cellColor[i]){
        //     a++;}}; 
        // //white peg
        //     for ( let i = 0; i < 4; i++ )
        //     { for ( let j = i; j < 4; j++ ) {
        //         if(codeColors[i] === cellColor[j] && codeColors[i] !== cellColor[i]) {
        //     b++;}
        for ( let i = 0; i < 4; i++ ) {
                if(codeColors[i] === cellColor[i]){
                a++;}
            else {if (codeColors[i] === cellColor[0]||
                    codeColors[i] === cellColor[1] ||
                    codeColors[i] === cellColor[2]||
                    codeColors[i] === cellColor[3]){
                        b++;
            }}}; 
        console.log('number of exact shoots:', a, '\n number of left color shoots: ', b);
        changePegColors(a,b);
    };


    function isValid(id) {
        if(currentBoardCells.includes(id) && isWinner === false 
         ) {
             return true;
         }
         return false;
    };   

    function checkWin() {
      if (codeColors[0] === cellColor[0] && 
          codeColors[1] === cellColor[1] &&
          codeColors[2] === cellColor[2] &&
          codeColors[3] === cellColor[3] ) {
            isWinner = true;
            getTheHint ();
            showTheCode ();
            setTimeout ( function () {
                 alert("Congrats, you've WON!\nYou are a true Champion!\nUniverse Saviour!\nThe Beater of Unbeaten!\n...I'm not kidding, you've really won!\nYou can compare the code now if you disbelief!"), 2000});
           } else if (currentRow === 1) {
            showTheCode ();
            setTimeout ( function () { 
                alert("Sorry, you didn't guessed the code\nUniverse is so unhappy with YOUR DOWNFALL... \nSee the solution? That couldn't be soo hard!"), 2000});
           } else {
            getTheHint ();
            changeCurrentRow ();
           }
    };

     function showTheCode () {
        document.getElementById("s-color1").style.backgroundColor = codeColors[0];
        document.getElementById("s-color2").style.backgroundColor = codeColors[1];
        document.getElementById("s-color3").style.backgroundColor = codeColors[2];
        document.getElementById("s-color4").style.backgroundColor = codeColors[3];
        console.log(codeColors);
    };
});