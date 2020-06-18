const helpers = {}

helpers.randomName = ()=>{

const possible = 'abcdefghijklñopqrstuvwxyz1234567890'
let randomNomber = 0;
for (let i=0;i<6;i++){

   randomNomber += possible.charAt(  Math.floor
     (Math.random()*possible.length))
}
return randomNomber
}

module.exports=helpers;