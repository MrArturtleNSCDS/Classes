var numRows = 16;
var numColumns = 17;
var pixelSize = 20;

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

$('#grid').append(allBoxesString);

/*
 * Do not change lines above
 */

/*
 * Put your code below
 */

