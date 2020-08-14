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

    var totalCubesVolume = 0;
    for(var i=0; i<cubes.length -1; i++){
        totalCubesVolume = totalCubesVolume + (cubes[i] * (cubes[i + 1] * cubes[i + 1] * cubes[i + 1]))
        i++;
    }
    if(totalCubesVolume < boxVolume)
            return -1;

    var cubesNrForBox = 0;
    var i=cubes.length-1;
    var cubeVolume = cubes[i]*cubes[i]*cubes[i];

    var occ = 0;
    while(i>0){
        if( box[0]/cubes[i] >=1 && box[1]/cubes[i] >= 1 && box[2]/cubes[i] >= 1 && boxVolume >= cubeVolume ){
            if(cubes[i]==1 || occ == 0 || cubes[i]<=box[0]-occ || cubes[i]<=box[1]-occ || cubes[i]<=box[2]-occ ){
            
                z= Math.trunc(box[0]/cubes[i]) * Math.trunc(box[1]/cubes[i]) * Math.trunc(box[2]/cubes[i]);
                
                if( cubes[i-1] > z && boxVolume >= z * cubeVolume ){
                
                    cubesNrForBox = cubesNrForBox + z;
                    boxVolume = boxVolume - z * cubeVolume;
                   
                    occ = occ+cubes[i]

                }else if( cubes[i-1] <= z && boxVolume >= cubes[i-1] * cubeVolume ){
                    
                    cubesNrForBox = cubesNrForBox + Number(cubes[i-1])
                    
                    boxVolume = boxVolume - cubes[i-1] * cubeVolume;
                    occ = occ+cubes[i];
                    
                }else if( boxVolume < cubes[i-1] * cubeVolume){
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

    if(boxVolume > 0)
        return -1;
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



