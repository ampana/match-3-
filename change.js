document.addEventListener('DOMContentLoaded', () => {
    const balloons = [ 
        "green_balloon.png",
        "white_balloon.png",
        "red_balloon.png",
        "blue_balloon.png",
        "golden_balloon.png",
        "violet_balloon.png",
        // "hedgehog.png"
    ];
    
    for (let i = 0; i < balloons.length; i++){
        balloons[i].height = "55.55"
        balloons[i].width = "55.55"
    }

    const width = 9;
    const height = 9;
    var IJ = 0 ; 

    const squares = [];
    var elementSwapCount = 0; 
    var numOfGoldenBalloons = 0; 
    var randomColor; 

    var i, j, x, y, k

    var gfg = new Array()
    function createBoard() {
        for (var i = 0; i < width; i++) {
            gfg[i] = new Array()
            for (var j = 0; j < height; j++) {
                newColor();
                const square = document.createElement('img')
                // square.src = balloons[randomColor]
                square.setAttribute('src',balloons[randomColor])
                square.setAttribute('id', IJ)
                
                var grid = document.getElementsByClassName(grid);
                // gfg.push(square)
                gfg[i][j] = square 
                console.log(IJ)
                document.querySelector(".grid").appendChild(square);
                document.getElementById(IJ).addEventListener("click", swapElements);
                if(j == (height-1)){
                    IJ= IJ +2 ; 
                }
                else{
                IJ++; 
                }
            }
        }
    }

function printBoard(){
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            document.querySelector(".grid").appendChild(gfg[i][j]);
        }
    }
}

function luckyThree(){
    for (i = 0; i < gfg.length ; i++) {
        for (j = 0; j < gfg[i].length ; j++) {
            var tempColor = gfg[i][j].getAttribute('src')

            index = balloons.indexOf(tempColor)
            if (index <=4){
                var newColor = balloons[index+1]
                console.log(newColor)
                }
                else{
                    var newColor = balloons[0]
                    console.log(newColor)
                }

            if (j>0){
                var prevColorRow = gfg[i][j-1].getAttribute('src')
                if (tempColor==prevColorRow){
                    gfg[i][j-1].setAttribute('src',newColor)
                    }
            }
            if(j<8){
                var nextColorRow = gfg[i][j+1].getAttribute('src')
                if (tempColor==nextColorRow){
                    gfg[i][j+1].setAttribute('src',newColor)
                    }
            }
            if(i>0){
                var prevColorColumn = gfg[i-1][j].getAttribute('src')
                if (tempColor==prevColorColumn){
                    gfg[i-1][j].setAttribute('src',newColor)
                    }
            }
            if(i<8){
                var nextColorColumn = gfg[i+1][j].getAttribute('src')
                if (tempColor==nextColorColumn){
                    gfg[i+1][j].setAttribute('src',newColor)
                    }
            }
        }
    }
    printBoard();
}

    createBoard();
    luckyThree();

    function newColor(){
        randomColor = Math.floor(Math.random() * balloons.length)
        if (randomColor == 4){
            if (numOfGoldenBalloons < 8){
                numOfGoldenBalloons++; 
                return randomColor; 
            }
            else {
                newColor(); 
        }
        }
        else { 
            return randomColor; 
        }
    }
    var index; 
    var element1Id, swapElementSrc1
    var element2Id, swapElementSrc2
    var rowNum, colNum
    var currentColor
     
    function swapElements(){
        if ( moves > 0){
        if (elementSwapCount == 0){
            element1Id =  this.getAttribute('id')
            swapElementSrc1 = this.getAttribute('src')
            elementSwapCount = 1; 
            return 
        }
    
        if (elementSwapCount == 1){
            element2Id =  this.getAttribute('id')
            swapElementSrc2 = this.getAttribute('src')
            elementSwapCount = 2; 
        }
    
        if(elementSwapCount == 2){
                element1Id = parseInt(element1Id)
                element2Id = parseInt(element2Id)
                if(((element1Id + 10) == element2Id)||((element1Id - 10) == element2Id) || ((element1Id + 1) == element2Id) ||((element1Id - 1) == element2Id)){
                    document.getElementById(element1Id).setAttribute('src',swapElementSrc2);
                    document.getElementById(element2Id).setAttribute('src',swapElementSrc1);
                }
                
        if((swapElementSrc1 == 'hedgehog.png') || (swapElementSrc2 == 'hedgehod.png')){
            if (element2Id > 9){
                rowNum = parseInt((element2Id/10) %10);
                console.log(rowNum)
            }
            else{
               rowNum = 0 ; 
            }
            colNum = element2Id % 10;

            for ( x = 0; x < width ; x++) {
                currentColor = gfg[rowNum][x].getAttribute('src')
                if (currentColor == 'golden_balloon.png'){
                    goldenBalloonPop = parseInt(document.getElementById('specialBalloons').innerText)
                    if(goldenBalloonPop >=1){
                        goldenBalloonPop = goldenBalloonPop - 1  
                    }
                    else{
                        goldenBalloonPop = 0 ;
                    }
                    document.getElementById('specialBalloons').innerHTML = goldenBalloonPop
                }
                gfg[rowNum][x].setAttribute('src',"")
            }
            for ( y = 0; y < 9 ; y++) {
                currentColor = gfg[y][colNum].getAttribute('src')
                if (currentColor == 'golden_balloon.png'){
                    goldenBalloonPop = parseInt(document.getElementById('specialBalloons').innerText)
                    goldenBalloonPop = goldenBalloonPop - 1 
                    if(goldenBalloonPop >=1){
                        goldenBalloonPop = goldenBalloonPop - 1  
                    }
                    else{
                        goldenBalloonPop = 0 ;
                    }
                    document.getElementById('specialBalloons').innerHTML = goldenBalloonPop 
                }
                gfg[y][colNum].setAttribute('src',"")
            }
            elementSwapCount = 0; 
            remainingMoves();
            fillTheEmptySrc();
            luckyThree();
        }
        else{
            threeOrMoreInAColumn();
            threeOrMoreInARow();
            remainingMoves();
            checkFlag(); 

            elementSwapCount = 0; 
            threeOrMoreInAColumn();
            threeOrMoreInARow();

            return
        }
        } 
        return
    }
}
    
var flag = false ;   
function checkFlag(){
    if ( flag == false ){
        document.getElementById(element1Id).setAttribute('src',swapElementSrc1);
        document.getElementById(element2Id).setAttribute('src',swapElementSrc2);
        moves = parseInt(document.getElementById("remainingMoves").innerText); 
        moves = moves +1 ;
        document.getElementById("remainingMoves").innerHTML = moves ; 
    }
    flag = false; 
    
}


var tempBalloon;
var nextBalloon; 
var m,n,a,b
var goldenBalloonPop; 

var balloonCountInARow = 1 ; 

    function threeOrMoreInARow(){
        for (i = 0; i < gfg.length; i++) {
            for (j = 0; j < gfg[i].length-1 ; j++) {
                 
                tempBalloon = gfg[i][j].getAttribute('src') 
                nextBalloon = gfg[i][j+1].getAttribute('src') 

                if ((tempBalloon == nextBalloon)||(tempBalloon == "")||(nextBalloon == "")){
                    balloonCountInARow++; 
                }
                if (((tempBalloon != nextBalloon) && (balloonCountInARow <=2)) || ((j==7) && (balloonCountInARow <=2)) ){
                    balloonCountInARow = 1; 
                }

                if (((tempBalloon != nextBalloon) && (balloonCountInARow>2)) || ((j==7) && (balloonCountInARow>2))) {
                    console.log("im here")
                    flag = true ; 
                    
                    // for ()
                    
                    if (tempBalloon == 'golden_balloon.png'){
                        goldenBalloonPop = parseInt(document.getElementById('specialBalloons').innerText)
                        goldenBalloonPop = goldenBalloonPop - balloonCountInARow; 
                        if(goldenBalloonPop <= 0 ){
                            goldenBalloonPop = 0; 
                        }
                        document.getElementById('specialBalloons').innerHTML = goldenBalloonPop
                    }
                    for ( k=0;k<=i; k++){
                        for (y=0; y<balloonCountInARow; y++){
                            j = parseInt(j)
                            i = parseInt(i)
                            k = parseInt(k)
                            if((tempBalloon == nextBalloon) && j==7){
                                j=j+1;
                            }
                            
                            if ((i-k)>=1){
                                balloonColor = gfg[i-k-1][j-y].getAttribute('src')
                                gfg[i-k][j-y].setAttribute('src',balloonColor)
                                }

                            if ((i-k)==0){
                                gfg[i-k][j-y].setAttribute('src','')
                            }
                        }
                    }
                    collectingPoints(balloonCountInARow, goldenBalloonPop)
                    balloonCountInARow = 1; 
                }
            }
        } 
        fillTheEmptySrc();   
    }

var balloonCountInAColumn = 1 ; 
var balloonColor; 
var elementForumula;

function threeOrMoreInAColumn(){
    for ( j = 0; j < 9 ; j++) {
        for ( i = 0; i < 8; i++) {
        
        tempBalloon = gfg[i][j].getAttribute('src') 
        nextBalloon = gfg[i+1][j].getAttribute('src') 

        if (tempBalloon == nextBalloon){
            balloonCountInAColumn++; 
        }
        if ((tempBalloon != nextBalloon) && (balloonCountInAColumn <=2) || ((i==7) && (balloonCountInAColumn <=2))) {
            balloonCountInAColumn = 1; 
        }
        if ((i==7) && (balloonCountInAColumn <=2)){
            balloonCountInAColumn = 1; 
        }
        if (((tempBalloon != nextBalloon) && (balloonCountInAColumn>2)) || ((i==7) && (balloonCountInAColumn>2))) {
            flag = true; 
            console.log("im here")

            if (tempBalloon == 'golden_balloon.png'){
                goldenBalloonPop = parseInt(document.getElementById('specialBalloons').innerText)
                goldenBalloonPop = goldenBalloonPop - balloonCountInAColumn; 
                if(goldenBalloonPop <= 0 ){
                    goldenBalloonPop = 0; 
                }
                document.getElementById('specialBalloons').innerHTML = goldenBalloonPop
            }
            
            for (var t=0; t<=i; t++){
                i = parseInt(i)
                t = parseInt(t)
                if((tempBalloon == nextBalloon) && i==7){
                    i=i+1;
                }
                i = parseInt(i)
                t = parseInt(t)
                if((i-t)>(balloonCountInAColumn-1)){
                    i = parseInt(i)
                    t = parseInt(t)
                    elementForumula = i - t - balloonCountInAColumn
                        balloonColor = gfg[elementForumula][j].getAttribute('src')
                        gfg[i-t][j].setAttribute('src',balloonColor)
                        gfg[elementForumula][j].setAttribute('src','')                    
                }
                if((i-t) <= (balloonCountInAColumn-1)) { 
                    i = parseInt(i)
                    t = parseInt(t)
                    gfg[i-t][j].setAttribute('src',"")
                }
            }
            collectingPoints(balloonCountInAColumn, goldenBalloonPop)
            balloonCountInAColumn = 1; 
        }

    }
}    
fillTheEmptySrc();
}

function fillTheEmptySrc(){
    for (i = 0; i < gfg.length; i++) {
        for (j = 0; j < gfg[i].length ; j++) {
            if (gfg[i][j].getAttribute('src')==""){
                var chooser = randomNoRepeats(balloons);
                gfg[i][j].setAttribute('src',chooser() )           
            }

        }
    }
}

var newIndex
var item 

function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      newIndex = Math.floor(Math.random() * copy.length);
      item = copy[newIndex];
      copy.splice(newIndex, 1);
      return item;
    };
  }

    var moves = 5 ; 
    function remainingMoves(){
        moves = parseInt(document.getElementById("remainingMoves").innerText); 

        if(moves > 1){
            moves = moves - 1 ; 
        }
        else {
            newLevel();
            level = level +1;
        }
        console.log(moves);
        document.getElementById("remainingMoves").innerHTML = moves; 
    }

    var level = 0 ; 
    var star = "star"; 
    var star_conc = star ; 
    var goldenBalloons ; 
    function newLevel(){
        points = parseInt(document.getElementById("points").innerText); 
        goldenBalloons = parseInt(document.getElementById('specialBalloons').innerText)
        if (level == 0){
        if (points >= 60 ){
                    level = parseInt(level)
                    star_conc = star + level;
                    confirm("you leveled up")
                    document.getElementById(star_conc).setAttribute('src','colored_star.png');
                    moves = 5 ; 
            }
            else {
                confirm('try again')
                moves = 5; 
                    document.getElementById("points").innerHTML = 0;
                    document.getElementById('specialBalloons').innerHTML = 10 ;
                    level = 0 ; 
                    star_conc = star + level;
                    document.getElementById(star_conc).setAttribute('src','empty_star.png');
                    tryAgain()

            }
        }

            if (level == 1){
                if ( goldenBalloons <= 8){
                    level = parseInt(level)
                    star_conc = star + level;
                    confirm("you leveled up")
                    document.getElementById(star_conc).setAttribute('src','colored_star.png');
                    moves = 5 ; 
                    hedgehog(); 
                }
            else {
                confirm('try again')
                moves = 5; 
                    document.getElementById("points").innerHTML = 0;
                    document.getElementById('specialBalloons').innerHTML = 10 ;
                    level = 1 ; 
                    star_conc = star + level;
                    document.getElementById(star_conc).setAttribute('src','empty_star.png');
                    level=0; 
                    star_conc = star + level;
                    document.getElementById(star_conc).setAttribute('src','empty_star.png');
                    tryAgain()
            }
        }

            if (level == 2){
                if (goldenBalloons == 0){
                    level = parseInt(level)
                    star_conc = star + level;
                    confirm("you won")
                    document.getElementById(star_conc).setAttribute('src','colored_star.png');  
                    document.getElementById("remainingMoves").innerHTML = 0;              
                }
                else {
                    confirm('try again')
                    moves = 5; 
                    document.getElementById("points").innerHTML = 0;
                    document.getElementById('specialBalloons').innerHTML = 10 ;
                    level = 2 ; 
                    star_conc = star + level;
                    document.getElementById(star_conc).setAttribute('src','empty_star.png');
                    level = 1 ; 
                    star_conc = star + level;
                    document.getElementById(star_conc).setAttribute('src','empty_star.png');
                    level=0;
                    star_conc = star + level;
                    document.getElementById(star_conc).setAttribute('src','empty_star.png');
                    tryAgain()
                    }
                    balloons.pop("hedgehog.png");
                    
                }
    }

    function collectingPoints(n){
        points = parseInt(document.getElementById("points").innerText); 
        points = points + n*10 ; 
        document.getElementById("points").innerHTML = points;
    }

    function hedgehog(){
        balloons.push("hedgehog.png");
    }

    function removeOldGrid(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    const container = document.querySelector('.grid');

    function tryAgain(){
        removeOldGrid(container);
        createBoard();
        luckyThree();
    }

    })