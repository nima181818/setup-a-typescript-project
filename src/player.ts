import { structuresets } from './Structureclass/structureSet'
import { Eventlist } from './Tankclass/Eventlist';
import { Tank } from './Tankclass/tank';
import { Rhinocerotidaetank } from './Tankclass/rhinocerotidaetank'
import { BaseControl } from './Structureclass/basecontrol'
import { Soliderfactory } from './Structureclass/soliderfactory'
import { Powerstation } from './Structureclass/powerstation'
import { Oil } from './Structureclass/oil'
import { world } from './World'
import { Rightbars } from './rightbars/rightbars'
import { Liberationarmy } from './Tankclass/liberationarmy'
export class Player {
    baseMapcanvas: HTMLCanvasElement
    topUnitscanvas: HTMLCanvasElement
    structuresets: any
    eventlist: any
    money: number = 1000
    unittype: string
    moneyelement: HTMLDivElement
    constructor(unittype: string) {
        //    this.
        this.unittype = unittype
        this.structuresets = structuresets
        this.eventlist = new Eventlist(unittype);
        this.initCanvas();
        this.playersSelection();
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
    //更新金币
    updateMoney(type: string, value: number) {
        if (type == 'add') {
            this.money += value;
        }
        if (type == 'reduce') {
            this.money -= value
        }
        //TODO 现要考虑敌方AI
        this.moneyelement.innerHTML = '$' + this.money.toString()
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