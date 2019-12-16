var numRows = 60;
var numColumns = 120;
var pixelSize = 5;


/*
 * Do not change lines below
 */
var grid = $("#grid");
var palette = $("#colorPalette");
var clickedColor = "#000";

grid.width(numColumns * pixelSize);
grid.height(numRows * pixelSize);
palette.width(numColumns * pixelSize);

var allBoxesString = "";

for(var r=0; r<numRows; r++){
    for(var c=0; c<numColumns; c++){
        allBoxesString += "<div class='pixel' style='width:" + pixelSize + "px; height:" + pixelSize + "px;'></div>"
    }
}

grid.append(allBoxesString);
grid.append("<div id='noDraw'></div>")

/*
 * Do not change lines above unless you know what they do
 */

/*
 * Put your code below
 */
var active = false;

$(document).keydown(
    function(keyPressed){
        
        if(keyPressed.which===32)
            active = !active;
            
    }
)

$(".colorBox").click(
    function(){
        clickedColor = $(this).css("background-color");
        console.log(clickedColor);
        $('.colorBox').removeClass("selected");
        $(this).addClass("selected");
    }
);

$(".pixel").mouseover(
    function(){
        if(active)
            $(this).css("background-color",clickedColor)
    }
); 

