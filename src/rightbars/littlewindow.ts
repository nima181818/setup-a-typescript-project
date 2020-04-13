const map = require('../assets/map.jpg'); 
import { eventlist } from '../Tankclass/Eventlist'; 
class Littlewindow{
    img:HTMLImageElement
    canvas4alivethings:HTMLCanvasElement
    canvas4alivethingsctx:any
    fromcanvas:HTMLCanvasElement
   
    constructor(){

    }
    initCanvas(){
        let img = document.getElementById('canvas3') as HTMLImageElement,
        fromcanvas = document.getElementById('canvas1') as HTMLCanvasElement,
        canvas4alivethings = document.getElementById('canvas4') as HTMLCanvasElement
            this.img = img;
            this.fromcanvas = fromcanvas;
            this.canvas4alivethings = canvas4alivethings;
            this.canvas4alivethingsctx = this.canvas4alivethings.getContext('2d')
           this.img.src = map.default;
         
    }
    draw(){
        setInterval(()=>{
        
            //TODO--这里还要添加建筑的， 还要添加敌方的
      this.canvas4alivethingsctx.clearRect(0,0,180,105);
      for(let j=0;j<eventlist.tanklist.length;j++){
          let positionx = eventlist.tanklist[j].currentclickpoints.x/24,
              positiony = eventlist.tanklist[j].currentclickpoints.y*1.875/24;
              this.canvas4alivethingsctx.fillStyle = 'rgb(135,254,2)';
              this.canvas4alivethingsctx.fillRect(positionx,positiony,2,2);
      }
             
          
        },200)
    }
}
export let littlewindow = new Littlewindow()