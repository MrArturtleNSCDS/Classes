var numRows = 30;
var numColumns = 60;
var pixelSize = 10;


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
grid.append("<div id='noDraw'></div>");
var colorBoxes = $(".colorBox");
var noDraw = $("#noDraw");

/*
 * Do not change lines above unless you know what they do
 */

/*
 * Put your code below
 */

var active = false;

$(document).keydown(
    function(keyPressed){
        if(keyPressed.which)
            active = !active;
        if(active)
            noDraw.fadeOut();
        else
            noDraw.fadeIn();
    }
);

$(".colorBox").click(
    function(){
        clickedColor = $(this).css("background-image");
        console.log(clickedColor);
        colorBoxes.removeClass("selected");
        $(this).addClass("selected");
    }
);

$(".pixel").mouseover(
    function(){
        if(active)
            $(this).css("background-image",clickedColor)
    }
); 

