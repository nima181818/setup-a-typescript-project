import { Tank ,eventlist} from './src/tank';

// let newTank = new Tank({ x: 0, y: 0 });
// let newTank2 = new Tank({ x: 100, y: 0 });
let newTank3 = new Tank({ x: 200, y: 0 });
let newTank4 = new Tank({ x: 300, y: 100 });
  
window.onload=function(){
  // console.log(newTank,"iiiii");
// return;
let canvas1:HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement;
// newTank.paint(canvas1);
// newTank2.paint(canvas1);
newTank3.paint(canvas1);
newTank4.paint(canvas1);
canvas1.onclick=function(e){
    console.log(66)
    eventlist.movingjudge(e);
   
}
var back = document.getElementById('back');
   for(let j=0;j<4800;j++){
       let bodys = document.createElement('div');
       bodys.style.height="9px";
       bodys.style.width="9px";
       bodys.style.borderRight="1px solid red";
       bodys.style.borderBottom="1px solid red";
       back.appendChild(bodys)
   }
}
