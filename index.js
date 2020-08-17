const readline = require('readline');
const fs = require('fs');

var box = [];
var cubes = [];
var boxVolume = 1;

const readInterface = readline.createInterface({
    input: fs.createReadStream('./in.txt'),
    output: process.stdout,
    console: false
});

function smallest(x, y, z){
    var smallest = x;
    if(y < smallest)
        smallest = y;
    if(z < smallest)
        smallest = z;
    
    return smallest;
}

function findResult(box, boxVolume, cubes){

    //get the total volume of all cubes 
    var totalCubesVolume = 0;
    for(var i=0; i<cubes.length -1; i++){
        totalCubesVolume = totalCubesVolume + (cubes[i] * (cubes[i + 1] * cubes[i + 1] * cubes[i + 1]))
        i++;
    }
    //check if the total volume of all cubes is smaller than the volume of the box, if true return -1
    if(totalCubesVolume < boxVolume)
            return -1;

    var cubesNrForBox = 0;
    var i=cubes.length-1;
    var cubeVolume = cubes[i]*cubes[i]*cubes[i];

    var occupied = 0;
    // iterate through the cubes array starting with the biggest size cube
    while(i>0){
        // check if the cube fits in the box
        if( box[0]/cubes[i] >=1 && box[1]/cubes[i] >= 1 && box[2]/cubes[i] >= 1 && boxVolume >= cubeVolume ){
            // check if the cube fits after the box was occupied by bigger cubes
            if(cubes[i]==1 || occupied == 0 || cubes[i]<=box[0]-occupied || cubes[i]<=box[1]-occupied || cubes[i]<=box[2]-occupied ){
            
                // get maximum nr of cubes that fit in the box 
                z= Math.trunc(box[0]/cubes[i]) * Math.trunc(box[1]/cubes[i]) * Math.trunc(box[2]/cubes[i]);
                
                //decrese the volume of the box by the volume of maximum size cubes that fit the box

                //if there are enough cubes of max size in the array we put the maximum number (z)
                if( cubes[i-1] > z && boxVolume >= z * cubeVolume ){
                
                    cubesNrForBox = cubesNrForBox + z;
                    boxVolume = boxVolume - z * cubeVolume;
                   
                    occupied = occupied+cubes[i]

                }
                //if there are not enough cubes of max size in the array we put whatever many we have (cubes[i-1])
                else if( cubes[i-1] <= z && boxVolume >= cubes[i-1] * cubeVolume ){
                    
                    cubesNrForBox = cubesNrForBox + Number(cubes[i-1])
                    
                    boxVolume = boxVolume - cubes[i-1] * cubeVolume;
                    occupied = occupied+cubes[i];
                    
                }
                //if we can still fit cubes (1x1x1 cases) we put as many as we need to fill the box
                else if( boxVolume < cubes[i-1] * cubeVolume){
                    while(boxVolume!=0){
                        
                        cubesNrForBox ++;
                        boxVolume = boxVolume - cubeVolume;
                    }
                }
            }
            
        }
        i=i-2;
        cubeVolume = cubes[i]*cubes[i]*cubes[i];
    }

    //if array finished iterating and it didn't fill the box it returns -1
    if(boxVolume > 0)
        return -1;
    
    //if array finished iterating and it filled the box it returns the result
    return cubesNrForBox;
}

 readInterface.on('line', async function(line) {
    var j=0;
    var k=0;
    var cubeSize = 1;
    line = line.split(" ");
    for (var i=0; i < line.length; i++){
        if( i<3 ){
            // build box sizes array: for first example is [2, 3, 4]
            box[j]=line[i];
            boxVolume = boxVolume * Number(box[j]);
            j++;
        }else if( i>= 3 ){
            // build cubes array, number of cubes followed by cube size, for first example: [5, 1, 6, 2]
            cubes[k]=line[i];
            k++;
            
            cubes[k]= cubeSize;
            k++;

            cubeSize = cubeSize * 2;
        }
    }

    
    var res = findResult(box, boxVolume, cubes);
    console.log('\n'+ res + '\n')

    box = [];
    cubes = [];
    boxVolume = 1;

});



