interface sizes{
    x:number
    y:number

}
import {transformimg} from './assets/imgurltransform'
import { globalAstarmanage } from './utils/wayfinders'
const map = require('./assets/map.jpg');
const mapobstacle = require('./mapobstacle.json');
export class World{
    size:sizes
    ctx:any
    worldimg:HTMLImageElement
    worldobstacles: sizes[] = []
    constructor(size:sizes,ctx:HTMLCanvasElement){
        this.size = size
        this.ctx = ctx.getContext('2d');
        this.initWorldobstacle();
        this.paint()
    }
    paint(){
      let img = transformimg(map.default);
      this.worldimg = img
      this.worldimg.onload = function() {
        this.ctx.drawImage(this.worldimg,0,0,960,464)
      }.bind(this)

    }
    initWorldobstacle(){
      let temp =[];//下方的循环是为了转换坐标系，寻路系统的x,y互换
      for(let j=0;j<mapobstacle.obstacle.length;j++){
        temp.push({
          x:mapobstacle.obstacle[j].y,
          y:mapobstacle.obstacle[j].x
        })
      }
      
      globalAstarmanage.addObstacle(temp)
    }

}