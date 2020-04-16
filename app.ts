import { Tank } from './src/Tankclass/tank';
import { Rhinocerotidaetank } from './src/Tankclass/rhinocerotidaetank'
import { eventlist } from './src/Tankclass/Eventlist'
import { BaseControl } from './src/Structureclass/basecontrol'
import { Soliderfactory } from './src/Structureclass/soliderfactory'
import { Powerstation } from './src/Structureclass/powerstation'
import { Oil } from './src/Structureclass/oil'
import { world } from './src/map'
import {Rightbars} from './src/rightbars/rightbars'
import {picimgList,Liberationarmy} from './src/Tankclass/liberationarmy'
let canvas1: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement;
let canvas2: HTMLCanvasElement = document.getElementById('canvas2') as HTMLCanvasElement;


let baseControl1 = new BaseControl(10, '20', { x: 900, y: 600 }, 'base', canvas2, { x: 98.9 * 1.5, y: 58.5 * 1.5 });
let soliderfactory1 = new Soliderfactory(10, '20', { x: 100, y: 0 }, 'soliderfactory', canvas2, { x: 89.6, y: 86.7 });
let powerstation = new Powerstation(10, '20', { x: 200, y: 300 }, 'powerstation', canvas2, { x: 89.6, y: 86.7 });
let oil = new Oil(10, '20', { x: 400, y: 400 }, 'oil1', canvas2, { x: 89.6, y: 86.7 });
let rightbars = new Rightbars()

//建筑物本身的障碍是否也应该优先于机车？机车
let newTank3 = new Rhinocerotidaetank({ x: 1000, y: 700 });
let newTank4 = new Rhinocerotidaetank({ x: 0, y: 200 });
let newTank5 = new Rhinocerotidaetank({ x: 100, y: 200 });
let newTank6 = new Rhinocerotidaetank({ x: 200, y: 200 });
let soider1 = new Liberationarmy({x:1000,y:1000})
window.onload = function () {
    
       
         let  context = canvas2.getContext('2d'),
        pages = {
            x: 0,
            y: 0
        },
        distance = 0,
        leftclick = false,
        oldposition = {x:0,y:0};
        
    newTank3.paint(canvas2);
    newTank4.paint(canvas2);
    newTank5.paint(canvas2);
    newTank6.paint(canvas2);
    soider1.paint(canvas2)

    canvas2.onmousedown = function (e) {
        pages = {
            x: e.offsetX,
            y: e.offsetY
        }
        distance = 0;
        leftclick = true
    }
    canvas2.onmouseup = function (e) {

        distance = (pages.x - e.offsetX) ** 2 + (pages.y - e.offsetY) ** 2;
        leftclick = false;
        context.clearRect(pages.x-1,pages.y-1,oldposition.x+2,oldposition.y+2);
        if(distance!=0){
            eventlist.multiSelection(pages,{x:e.offsetX,y:e.offsetY})
        }
      
    }
    let timer
    canvas2.onmousemove = function (e) {
        if(!timer){
            timer = setTimeout(()=>{
                if (leftclick) {
            
                    let width = ((e.offsetX - pages.x) ** 2) ** 0.5,
                        height = ((e.offsetY - pages.y) ** 2) ** 0.5;
                    paintretangle(canvas2, pages, { x: width, y: height })
                }
             clearTimeout(timer);
             timer = null
            },50)
        }
     
     
    }
    canvas2.onclick = function (e) {
        if (distance > 10) {
            return;
        } else {
            eventlist.movingjudge(e);
        }

    }
    //绘制矩形选择框
    function paintretangle(canvas2: HTMLCanvasElement, startpoint: { x: number, y: number }, endpoint: { x: number, y: number }) {
       
        context.clearRect(startpoint.x-1,startpoint.y-1,oldposition.x+2,oldposition.y+2)
        context.strokeRect(startpoint.x, startpoint.y, endpoint.x, endpoint.y);
        oldposition = endpoint
        context.stroke()

    }




   

































    let obstacles = []
    var back = document.getElementById('back');
    for (let j = 0; j < 4800 * 4; j++) {
        let bodys = document.createElement('div');
        bodys.style.height = "3px";
        bodys.style.width = "3px";
        bodys.style.border = "1px solid rgba(0,0,0,0.5)";
        bodys.onclick = function () {
            let y = parseInt((j / 200).toString());
            let x = (j % 200)
            obstacles.push({ x: x, y: y });
            console.log(j, y, x)
            bodys.style.background = 'red'
        }
        back.appendChild(bodys)
    }
 
}
