var mainCanvas;
var mainPencil;
var canvasWidth;
var canvasHeight;
var canvasColor;
var speed = 21;
var gridArr = [];
var active = true;
var gridSize = 4;
var numItems = 0;
var numMoves = 0;
var score = 0;
var scoreBox = $('#score');
var gameOverBox = $('#gameOver');

var colors = 
    [{colorNum:2,rgb:"005580"},
    {colorNum:4,rgb:"0088cc"},
    {colorNum:8,rgb:"00abff"},
    {colorNum:16,rgb:"3e346a"},
    {colorNum:32,rgb:"6C519D"},
    {colorNum:64,rgb:"8c79d4"},
    {colorNum:128,rgb:"c09853"},
    {colorNum:256,rgb:"b94a48"},
    {colorNum:512,rgb:"468847"}];

$(document).keyup(
    function(e){
        if(active && numItems < gridSize*gridSize)
            moveAll(e.which);
        if(numItems >= gridSize*gridSize-1)
            gameOverBox.fadeIn();
    }
);

class Block{
    constructor(r,c,color,content){
        this.row = r;
        this.col = c;
        this.size = canvasWidth/gridSize;
        this.x = c * this.size;
        this.y = r * this.size;
        this.color = color;
        this.content = content;
        this.neighbors = [];
        this.draw();
        this.pendingContent = content;
    }

    draw(){
        mainPencil.fillStyle = this.color;
        mainPencil.fillRect(this.x, this.y, this.size, this.size);
        mainPencil.textAlign = "center";
        mainPencil.font= "50px Dosis";
        mainPencil.fillStyle = "#fff";
        mainPencil.fillText(this.content, this.x+(this.size/2), this.y+65);
    };
    
    erase(){
        mainPencil.fillStyle = canvasColor;
        mainPencil.strokeStyle = canvasColor;
        mainPencil.lineWidth = 2;
        mainPencil.fillRect(this.x, this.y, this.size, this.size);
        mainPencil.strokeRect(this.x, this.y, this.size, this.size);
    }
    
    move(direction){
        if(direction === 37 || direction === 38 || direction === 39 || direction === 40){
            gridArr[this.row][this.col] = 0;
            ////console.log("old:",this.row,this.col);
            
            var nextSpot = this.findNextSpot(direction);
            //console.log(nextSpot);
            var dX = nextSpot.dX;
            var dY = nextSpot.dY;
            var distance = nextSpot.distance;
            var sameContent = nextSpot.same;
            
            //console.log(dX,dY,distance,sameContent);
            
            active = false;
            
            ////console.log("new:",this.row,this.col);
            gridArr[this.row][this.col] = this;
            ////console.log("distance", distance);
            this.doMove(dX, dY, distance,sameContent);
            for(var i=0; i<gridArr.length; i++){
                //console.log("__________");
                //console.log(gridArr[i].toString());
                ////console.log("__________");
            }

        }
    }
    
    doMove(dX,dY,distance_,sameContent){
        if(distance_>0){
            this.erase();
            this.x += dX;
            this.y += dY;
            this.draw();
            distance_-=speed;
            var thisBlock = this;
            requestAnimationFrame(function(){thisBlock.doMove(dX,dY,distance_,sameContent);});
        }
        else{
            if(this.pendingContent !== this.content){
                //console.log("merging:",this.content,this.pendingContent);
                
                this.content = this.pendingContent;
                //console.log("merged:",this.content,this.pendingContent);
                this.color = findColor(colors,this.content);
                this.draw();
                score+=this.content;
                scoreBox.text(score);
                numItems--;
                //console.log('deleted item:',numItems);
            }
            else{
                numMoves++;
            }
            ////console.log("numMoves:",numMoves,"numItems:",numItems);
            if(numMoves  === numItems){
                getNewSpot(false);
                active = true;
            }

            ////console.log(this.row,this.col,this.content);
        }
    }
    
    findNextSpot(direction){
        var dX_ = 0;
        var dY_ = 0;
        var distance_ = 0;
        var spotFound = false;
        //var newContent_ = this.content;
        var sameContent = false;
        var travelSpots = 0;
        
        switch(direction){
            case 37: 
                if(this.x-this.size>=0){
                    dX_ = -speed;
                    var currSpot = this.col;

                    while(!spotFound && currSpot>0){
                        var currBlock = gridArr[this.row][currSpot-1];
                        sameContent = currBlock.pendingContent===this.pendingContent;
                        if(currBlock === 0 || sameContent){
                            currSpot--;
                            travelSpots++;
                            if(sameContent){
                                this.pendingContent = this.content*2;
                                //currBlock.pendingContent = this.pendingContent;
                                spotFound = true;
                            }
                        } 
                        else
                            spotFound = true;
                            
                    }
                    
                    distance_ = travelSpots*this.size;
                    this.col -= distance_/this.size;
                }
                break;
            case 38: 
                if(this.y-this.size>=0){
                    dY_ = -speed;
                    currSpot = this.row;

                    while(!spotFound && currSpot>0){
                        currBlock = gridArr[currSpot-1][this.col];
                        sameContent = currBlock.pendingContent===this.pendingContent;
                        if(currBlock === 0 || sameContent){
                            currSpot--;
                            travelSpots++;
                            if(sameContent){
                                this.pendingContent = this.content*2;
                                spotFound = true;
                            }
                        } 
                        else
                            spotFound = true;
                    }
                    
                    if(currSpot<=0)
                        spotFound = true;
                        
                    distance_ = travelSpots*this.size;
                    this.row -= distance_/this.size;
                }
                break;
            case 39: 
                if(this.x+this.size<canvasWidth){
                    dX_ = speed;
                    currSpot = this.col;

                    while(!spotFound && currSpot<gridSize-1){
                        currBlock = gridArr[this.row][currSpot+1];
                        sameContent = currBlock.pendingContent===this.pendingContent;
                        if(currBlock === 0 || sameContent){
                            currSpot++;
                            travelSpots++;
                            if(sameContent){
                                this.pendingContent = this.content*2;
                                //currBlock.pendingContent = this.pendingContent;
                                spotFound = true;
                            }
                        } 
                        else
                            spotFound = true;
                    }
                    
                    
                    distance_ = travelSpots*this.size;
                    this.col += distance_/this.size;
                }
                break;
            case 40:
                if(this.y+this.size<canvasHeight){
                    dY_ = speed;
                    currSpot = this.row;

                    while(!spotFound  && currSpot<gridSize-1){
                        currBlock = gridArr[currSpot+1][this.col];
                        sameContent = currBlock.pendingContent===this.pendingContent;
                        if(currBlock === 0 || sameContent){
                            currSpot++;
                            travelSpots++;
                            if(sameContent){
                                this.pendingContent = this.content*2;
                                spotFound = true;
                            }
                        } 
                        else
                            spotFound = true;
                    }
                    
                    distance_ = travelSpots*this.size;
                    this.row += distance_/this.size;
                }
                break;
        }
        
        
        return {dX:dX_,dY:dY_,distance:distance_,same:sameContent};
    }
}

init();

function init(){
    mainCanvas = document.getElementById("main");
    mainPencil = mainCanvas.getContext("2d");
    canvasWidth = mainCanvas.width;
    canvasHeight = mainCanvas.height;
    canvasColor = $(mainCanvas).css("background-color");
    initGrid();
}

function initGrid(){
    for(var r=0; r<gridSize; r++){
        gridArr.push([]);
        for(var c=0; c<gridSize; c++){
            gridArr[r].push(0);
        }
    }
    
    getNewSpot(true);
    getNewSpot();
}

function getNewSpot(minVal){
    var emptySpots = [];
    for(var r=0; r<gridSize; r++){
        for(var c=0; c<gridSize; c++){
            if(gridArr[r][c] === 0)
                emptySpots.push({row:r,col:c});
        }
    }
    
    var randomSpot = Math.floor(Math.random()*emptySpots.length);
    var randomValue = 2;
    if(!minVal)
        randomValue=Math.random()<.5?2:4;
    var chosenColor = findColor(colors,randomValue);
    //console.log(chosenColor);
    r = emptySpots[randomSpot].row;
    c = emptySpots[randomSpot].col;
    
    numItems++;
    //console.log("added numItems:",numItems);

    gridArr[r][c] = new Block(r,c,chosenColor,randomValue);       
}

function findColor(colorArray,colorNum_){
    return "#" +
        colors.find(
            function(color) {
                return color.colorNum == colorNum_;
            }).rgb;
}

function moveAll(direction){
    var dimension = gridArr.length;
    numMoves=0;
    if(direction === 37 || direction === 38){
        for(var r=0; r<dimension; r++)
            for(var c=0; c<dimension; c++){
                var currBlock = gridArr[r][c];
                if(currBlock !== 0){
                    ////console.log("attempting to move");
                    currBlock.move(direction);
                }
    
            }
    }

    else if(direction === 39 || direction === 40){
        for(var r=dimension-1; r>=0; r--)
            for(var c=dimension-1; c>=0; c--){
                currBlock = gridArr[r][c];
                if(currBlock !== 0){
                    ////console.log("attempting to move");
                    currBlock.move(direction);
                }
    
            }
    }
}
