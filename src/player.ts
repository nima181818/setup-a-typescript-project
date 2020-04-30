import { Structuresets } from './Structureclass/structureSet'
import { Eventlist } from './Tankclass/Eventlist';
import { Tank } from './Tankclass/tank';
import { Rhinocerotidaetank } from './Tankclass/rhinocerotidaetank'
import { BaseControl } from './Structureclass/basecontrol'
import { Soliderfactory } from './Structureclass/soliderfactory'
import { Powerstation } from './Structureclass/powerstation'
import { Oil } from './Structureclass/oil'
import { world } from './World'

export class Player {
    baseMapcanvas: HTMLCanvasElement
    topUnitscanvas: HTMLCanvasElement
    structuresets: any
    eventlist: any
    money: number = 1000
    unittype: string
    moneyelement: HTMLDivElement
    constructor(unittype: string,baseposition:pointerface) {
        //    this.
        this.unittype = unittype
        this.structuresets = new Structuresets(this.unittype)
        this.eventlist = new Eventlist(unittype);
        this.initCanvas();
        this.playersSelection();
        this.initBase(baseposition) //这里又要使用异步的方式 
        this.allAnimations();
    } 
    //通过unittype获取eventList

    //初始化canvas |以及金钱
    initCanvas() {
        let canvas1: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement,
            canvas2: HTMLCanvasElement = document.getElementById('canvas2') as HTMLCanvasElement;
        this.baseMapcanvas = canvas1;
        this.topUnitscanvas = canvas2;
        this.moneyelement = document.getElementsByClassName('tops')[0] as HTMLDivElement;
    }
    //初始化基地，部队
    initBase(baseposition:pointerface){
        setTimeout(()=>{
            let base  = new BaseControl(this.unittype,10, '20', baseposition, 'base', this.topUnitscanvas, { x: 98.9 * 1.5, y: 58.5 * 1.5+25 });
          
            let t1 = new Rhinocerotidaetank(this.unittype,this.unittype=='player1'?{ x: 1000, y: 800 }:{ x: 3500, y: 800 }),
            t2 = new Rhinocerotidaetank(this.unittype,this.unittype=='player1'?{ x: 800, y: 800 }:{ x: 3600, y: 800 });
                t1.paint(this.topUnitscanvas);
                t2.paint(this.topUnitscanvas); 
                if(this.unittype=='ai1'){
                    setTimeout(()=>{
                        t2.setTankspoints(387,1108,'setendpoints',true)
                    },9000)
                   
                }
        })
       
    }
    //所有单位的动画 由于这个控制
    allAnimations(){
      //  setTimeout(()=>{
            this.eventlist.allTanksanimation();
            this.structuresets.structureAnimation();
            window.requestAnimationFrame(this.allAnimations.bind(this))
        ///},2000)

    }
    //更新金币
    updateMoney(type: string, value: number) {
        if (type == 'add') {
            this.money += value;
        }
        if (type == 'reduce') {
            this.money -= value
        }
        //TODO 现要考虑敌方AI
        if(this.unittype.indexOf('player') != -1){
            this.moneyelement.innerHTML = '$' + this.money.toString()
        }
       
    }
    
    playersSelection() {
        if (this.unittype.indexOf('player') != -1) {
            let canvas2: HTMLCanvasElement = document.getElementById('canvas2') as HTMLCanvasElement;
            let context = canvas2.getContext('2d'),
                pages = {
                    x: 0,
                    y: 0
                },
                distance = 0,
                leftclick = false,
                oldposition = { x: 0, y: 0 };


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
                context.clearRect(pages.x - 1, pages.y - 1, oldposition.x + 2, oldposition.y + 2);
                if (distance != 0) {
                   
                    this.eventlist.multiSelection(pages, { x: e.offsetX, y: e.offsetY })
                }

            }.bind(this)
            let timer
            canvas2.onmousemove = function (e) {
                if (!timer) {
                    timer = setTimeout(() => {
                        if (leftclick) {

                            let width = ((e.offsetX - pages.x) ** 2) ** 0.5,
                                height = ((e.offsetY - pages.y) ** 2) ** 0.5;
                        //绘制区域
                            context.clearRect(pages.x - 1, pages.y - 1, width + 2, height + 2)
                            context.strokeStyle = 'white'
                            context.strokeRect(pages.x, pages.y, width, height);
                            oldposition = {
                                x: width, y: height
                            }
                            context.stroke()
                            //绘制区域
                        }
                        clearTimeout(timer);
                        timer = null
                    }, 50)
                }


            }
            canvas2.onclick = function (e) {
                if (distance > 10) {
                    return;
                } else {
                   this.eventlist.movingjudge(e);
                }

            }.bind(this)
           canvas2.oncontextmenu = function(e){
           for(let j=0;j<this.eventlist.tanklist.length;j++){
            this.eventlist.tanklist[j].selected = false;
            this.eventlist.tanklist[j].multiselect = false;
           }
           return false
           }.bind(this)




        }
    }



}



// let baseControl1 = new BaseControl(10, '20', { x: 900, y: 600 }, 'base', canvas2, { x: 98.9 * 1.5, y: 58.5 * 1.5+25 });
// let soliderfactory1 = new Soliderfactory(10, '20', { x: 100, y: 0 }, 'soliderfactory', canvas2, { x: 89.6, y: 86.7 });
// let powerstation = new Powerstation(10, '20', { x: 200, y: 300 }, 'powertation', canvas2, { x: 89.6, y: 86.7 });
// let oil = new Oil(10, '20', { x: 400, y: 400 }, 'oil', canvas2, { x: 89.6, y: 86.7 });
// let rightbars = new Rightbars()

//建筑物本身的障碍是否也应该优先于机车？机车
// let newTank3 = new Rhinocerotidaetank({ x: 1000, y: 800 });
// let newTank4 = new Rhinocerotidaetank({ x: 0, y: 200 });
// let newTank5 = new Rhinocerotidaetank({ x: 100, y: 200 });
// let newTank6 = new Rhinocerotidaetank({ x: 200, y: 200 });
// let soider1 = new Liberationarmy({x:1000,y:1000})


    // newTank3.paint(canvas2);
    // newTank4.paint(canvas2);
    // newTank5.paint(canvas2);
    // newTank6.paint(canvas2);
    // soider1.paint(canvas2)