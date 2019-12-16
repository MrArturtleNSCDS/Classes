var numArray1 = [2,3,4,5];

var numArray2 = [2,2,2,2];

function allSame(array){
    //var refNumber = array[0];
    var i = 0;
    while(i<array.length-1){
        if(array[i] !== array[i+1])
            return false;
        i++;
    }
    return true;
}

console.log(allSame(numArray1));
console.log(allSame(numArray2));