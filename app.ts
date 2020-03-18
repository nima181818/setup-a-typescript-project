import { Tank } from './src/Tankclass/tank';
import {Rhinocerotidaetank} from './src/Tankclass/rhinocerotidaetank'
import {eventlist} from './src/Tankclass/Eventlist'
import {BaseControl} from './src/Structureclass/basecontrol'
import {Soliderfactory} from './src/Structureclass/soliderfactory'
import {World} from './src/map'



let newTank3 = new Rhinocerotidaetank({ x: 0, y: 0 });
let newTank4 = new Rhinocerotidaetank({ x: 0, y: 200 });
let newTank5 = new Rhinocerotidaetank({ x: 100, y: 200 });

window.onload=function(){
let canvas1:HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement;
let canvas2:HTMLCanvasElement = document.getElementById('canvas2') as HTMLCanvasElement;


newTank3.paint(canvas2);
newTank4.paint(canvas2);
newTank5.paint(canvas2);
let world = new World({x:0,y:0},canvas1)
canvas2.onclick=function(e){
    eventlist.movingjudge(e);
}
let obstacles=[]
var back = document.getElementById('back');
   for(let j=0;j<4800*4;j++){
       let bodys = document.createElement('div');
       bodys.style.height="3px";
       bodys.style.width="3px";
       bodys.style.border="1px solid rgba(0,0,0,0.5)";
       bodys.onclick = function(){
         let y = parseInt((j/200).toString());
         let x = (j%200)
         obstacles.push({x:x,y:y});
         console.log(j,y,x)
         bodys.style.background='red'
       }
       back.appendChild(bodys)
   }
    let baseControl1 = new BaseControl(10,'20',{x:100,y:200},'base',canvas2,{x:98.9*1.5,y:58.5*1.5});
    let soliderfactory1 = new Soliderfactory(10,'20',{x:100,y:0},'base',canvas2,{x:89.6,y:86.7});
    
}
