interface sizes {
  x: number
  y: number

}
import { transformimg } from './assets/imgurltransform'
import { globalAstarmanage } from './utils/wayfinders'
import { littlewindow } from './rightbars/littlewindow'
import {Player} from './player'
const map = require('./assets/map.jpg');
const mapobstacle = require('./mapobstacle.json');
 class World {
  size: sizes
  ctx: any
  scrollLeft: number = 0
  scrollTop: number = 0
  // tanks:[]
  worldimg: HTMLImageElement
  pageflowtimer: number
  playerManage:Player[]=[]
  controler:string
  canvascontainer:HTMLDivElement
  worldobstacles: sizes[] = []
  constructor(size: sizes, ctx: HTMLCanvasElement) {
    this.size = size
    this.ctx = ctx.getContext('2d');
    this.initWorldobstacle();
    this.paint()
    this.bindScrollmapevent();
    let player1 = new Player('player1'); //有数字的原因是有可能是多玩家玩耍
    let ai1 = new Player('ai1');
    this.playerManage.push(player1,ai1)
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
  //改变视口 拖动窗口可以控制，点击littewindow也可以控制
  changeViewport(e:{offsetX:number,offsetY:number},controler:string){
       if(controler=='click'){
         console.log('我先走')
         this.controler = 'click'
        this.canvascontainer.scrollLeft = e.offsetX;
        this.canvascontainer.scrollTop = e.offsetY;
       }
       if(controler=='scroll'){
         //TODO-- 只改变this.scrollLeft和this.scrollTop

       }
  }
  bindScrollmapevent() {
    let canvascontainer: HTMLDivElement = document.getElementsByClassName('leftwrapper')[0] as HTMLDivElement;
    this.canvascontainer = canvascontainer;
    let timer;
    /*
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
    */
   let scrolltimer,
      oldcontroler;
    canvascontainer.onscroll=function(e){
      oldcontroler = this.controler;
      this.controler = 'scroll';
      if(oldcontroler=='click'){
           return;
      }
     
   //   console.log('被迫触发')
      let target:any = e.target;
      if(!scrolltimer){
        scrolltimer = setTimeout(()=>{
     //     console.log(target.scrollLeft,target.scrollTop)
          littlewindow.changeFramelocation({offsetX:target.scrollLeft,offsetY:target.scrollTop},'scroll');
          clearTimeout(scrolltimer);
          scrolltimer = null
        },100)
      }
    
    }.bind(this)

  }

}
let canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
export let world =  new World({ x: 0, y: 0 }, canvas1);  //world的生成顺序至关重要，因为地图障碍物会在此生成，