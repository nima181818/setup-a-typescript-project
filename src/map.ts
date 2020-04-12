interface sizes {
  x: number
  y: number

}
import { transformimg } from './assets/imgurltransform'
import { globalAstarmanage } from './utils/wayfinders'
const map = require('./assets/map.jpg');
const mapobstacle = require('./mapobstacle.json');
export class World {
  size: sizes
  ctx: any
  scrollLeft: number = 0
  scrollTop: number = 0
  // tanks:[]
  worldimg: HTMLImageElement
  pageflowtimer: number
  worldobstacles: sizes[] = []
  constructor(size: sizes, ctx: HTMLCanvasElement) {
    this.size = size
    this.ctx = ctx.getContext('2d');
    this.initWorldobstacle();
    this.paint()
    //this.bindScrollmapevent();
  }
  paint() {
    let img = transformimg(map.default);
    this.worldimg = img
    this.worldimg.onload = function () {
      // 960-464
      this.ctx.drawImage(this.worldimg, 0, 0, 4480, 1400)
    }.bind(this)

  }
  initWorldobstacle() {
    let temp = [];//下方的循环是为了转换坐标系，寻路系统的x,y互换
    for (let j = 0; j < mapobstacle.obstacle.length; j++) {
      temp.push({
        x: parseInt((mapobstacle.obstacle[j].y ).toString()),
        y: parseInt((mapobstacle.obstacle[j].x ).toString())
      })
    }

    globalAstarmanage.addObstacle(temp, 33)
  }
  bindScrollmapevent() {
    let canvascontainer: HTMLDivElement = document.getElementsByClassName('leftwrapper')[0] as HTMLDivElement;
    let timer;
    canvascontainer.onmousemove = function (e) {
      if (!timer) {
        timer = window.setTimeout(() => {
     //     console.log(e.pageX, e.pageY)
          // canvascontainer.scrollLeft
          if (this.pageflowtimer) {
            clearInterval(this.pageflowtimer);
            this.pageflowtimer = null
          }
          this.pageflowtimer = window.setInterval(() => {
            if (e.pageX <= 20) {

               console.log(1)
              this.scrollLeft--;
              if (this.scrollLeft <= 0) {
                this.scrollLeft = 0;
                console.log(2)
                clearInterval(this.pageflowtimer);
                this.pageflowtimer = null
              }

            }
            if (e.pageX >= 700) {
              console.log(3)
              this.scrollLeft++;
              if (this.scrollLeft >= 2030) {
                console.log(4)
                this.scrollLeft = 2030
                clearInterval(this.pageflowtimer);
                this.pageflowtimer = null
              }
            }
            if (e.pageY <= 20) {
              this.scrollTop--;
              console.log(5)
              if (this.scrollTop <= 0) {
                this.scrollTop = 0;
                console.log(6)
                clearInterval(this.pageflowtimer);
                this.pageflowtimer = null
              }
            }
            if (e.pageY >= 530) {
              this.scrollTop++;
              console.log(7)
              if (this.scrollTop >= 580) {
                this.scrollTop = 580
                console.log(8)
                clearInterval(this.pageflowtimer);
                this.pageflowtimer = null
              }
            }
            canvascontainer.scrollLeft = this.scrollLeft
            canvascontainer.scrollTop = this.scrollTop
          }, 4)

          clearTimeout(timer);
          timer = null;
        }, 50)
      }
    }.bind(this)
    canvascontainer.onmouseleave=function(){
      setTimeout(()=>{
    //    console.log('已离开')
        clearInterval(this.pageflowtimer);
        this.pageflowtimer = null
      },50)
      
    }.bind(this)

  }

}