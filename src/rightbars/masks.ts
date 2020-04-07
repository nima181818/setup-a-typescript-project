import { Watcher } from '../utils/watcher';
import {buildinglayer} from './buildinglayer'
//总共要导出4个 分别对应建筑，防御，士兵，坦克
interface positions {
    x: number,
    y: number
}
class Masks {
    type: string   //为bar的类名？ stlist guardlist soilderlist wartanklist
    type_name: string
    finish: string //多少帧内结束 用于控制delta增量
    center: positions
    p1: positions
    p2: positions
    p3: positions
    p4: positions
    p5: positions
    p6: positions
    p7: positions
    watcher: Watcher<Masks> = new Watcher<this>()
    taskqueue: { fun: Function, timer: number,typenum:number }[] = [] //任务列队，针对 战车和兵种可以重复多建造的：length>1
    element: HTMLDivElement
    r: number
    theta: number
    delta: number
    timer: number
    buildingrate: number
    currentbuildingindex: number = 0
    constructor(type: string) {

        this.type = type;
        this.buildingrate = 1 //TODO--
        this.watcher = new Watcher();
        //this.watcher.register('currentbuildingindexTrigger', this.currentbuildingindexTrigger);
        //this.watcher.responseMode(this, 'currentbuildingindex');
        this.initData();
        this.initGui();
        this.mountOnbar()
    }
    //当前正在执行任务index变化的监听回调
    currentbuildingindexTrigger() {

    }
    //初始化渲染的数据
    initData() {
        this.center = {
            x: 50,
            y: 50
        }

        this.p1 = {
            x: this.center.x,
            y: 0
        }
        // let array: positions[] = [this.p2, this.p3, this.p4, this.p5, this.p6, this.p7];
        // for (let j = 0; j < array.length; j++) {
        //     if (array[j].x === null) {
        //         array.splice(j, 1);
        //         j--
        //     }
        // }
    }
    //初始化要渲染的div
    initGui() {
        let div = document.createElement('div');
        div.className = 'mask';
        div.id = this.type + '_div';
        this.element = div;
        this.element.style.display = 'none';
        this.element.style.position = 'absolute';
        this.element.style.top = '0';
        this.element.style.left = '0';
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.zIndex = '2'
        this.element.style.background = 'rgba(255,255,0,0.5)';
    }
    //div初始化完成需要挂载在对应的bar上
    mountOnbar() {
        let bar = document.getElementsByClassName(this.type)[0];
        bar.appendChild(this.element);
    }
    //分析命令
    analyseCommander(commander: string, typeNum: number) {
        if (commander == 'building') {
            if (this.type == 'stlist') {
                //建筑的建造均为单一的没有队列，做完一个 弹出队列？但是我是根据运行一个 走下一个？？
                if (this.taskqueue.length) {
                    alert('正在建造中');
                    return;
                }
            
                switch (typeNum) {
                    case 0:
                        this.handlePositions(0, 0);
                        break;
                    case 1:
                        this.handlePositions(0, 100);
                        break;
                    case 2:
                        this.handlePositions(100, 0);
                        break;
                    case 3:
                        this.handlePositions(100, 100);
                        break;
                    default:

                        break;
                }
            }

            this.loadTasks(typeNum);
        } else {
            //取消建筑
            this.cancelBuilding();
        }


    }
    //任务装载
    loadTasks(typenum:number) {
        if (this.type == 'stlist' || this.type == 'guardlist') {

            let taskitem = {
                fun: this.startBuilding.bind(this),
                timer: null,
                typenum:typenum
            }
            this.taskqueue.push(taskitem);
            this.taskqueue[0].fun();
        } else {

        }
    }
    //取消建造 TODO--
    cancelBuilding() {
        let timer = this.taskqueue.splice(this.taskqueue.length - 1, 1)[0].timer;
        if (timer) {
            clearInterval(timer)
        }
    }
    //位置处理
    handlePositions(top: number, left: number) {
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';

    }
    //开始建造
    startBuilding() {
        let center = {
            x: 50,
            y: 50
        };
        this.p1 = {
            x: center.x,
            y: 0
        };
        this.theta = 0;
        this.r = 50;
        this.delta = Math.PI / 180;
        this.element.style.display = 'block'
        //    return new Promise(())
        let timer = window.setInterval(() => {
            if (0 < this.theta && this.theta <= 0.25 * Math.PI) {
                this.r = 50 / Math.cos(this.theta);
                this.p2 = {
                    x: center.x + this.r * Math.sin(this.theta),
                    y: 0
                }
                this.p3 = {
                    x: center.x * 2,
                    y: 0
                }
                this.p4 = {
                    x: center.x * 2,
                    y: center.y * 2
                }
                this.p5 = {
                    x: 0,
                    y: center.y * 2
                }
                this.p6 = {
                    x: 0,
                    y: 0
                }
                this.p7 = this.p1
            }

            if (0.25 * Math.PI < this.theta && this.theta <= 0.75 * Math.PI) {
                this.r = 50 / Math.sin(this.theta);
                this.p2 = {
                    x: center.x * 2,
                    y: center.y - this.r * Math.cos(this.theta)
                }

                this.p3 = {
                    x: center.x * 2,
                    y: center.y * 2
                }
                this.p4 = {
                    x: 0,
                    y: center.y * 2
                }
                this.p5 = {
                    x: 0,
                    y: 0
                }
                this.p6 = this.p1
                this.p7 = null

            }

            if (0.75 * Math.PI < this.theta && this.theta <= 1.25 * Math.PI) {
                this.r = Math.abs(50 / Math.cos(this.theta))
                this.p2 = {
                    x: center.x + this.r * Math.sin(this.theta),

                    y: center.y * 2
                }

                this.p3 = {
                    x: 0,
                    y: center.y * 2
                }
                this.p4 = {
                    x: 0,
                    y: 0
                }
                this.p5 = this.p1
                this.p6 = null
                this.p7 = null

            }

            if (1.25 * Math.PI < this.theta && this.theta <= 1.75 * Math.PI) {
                this.r = Math.abs(50 / Math.sin(this.theta))
                this.p2 = {
                    x: 0,

                    y: center.y - this.r * Math.cos(this.theta)
                }

                this.p3 = {
                    x: 0,
                    y: 0
                }
                this.p4 = this.p1
                this.p5 = null
                this.p6 = null
                this.p7 = null

            }
            if (1.75 * Math.PI < this.theta && this.theta <= 2 * Math.PI) {
                this.r = Math.abs(50 / Math.cos(this.theta))
                this.p2 = {
                    x: center.x + this.r * Math.sin(this.theta),

                    y: 0
                }

                this.p3 = this.p1
                this.p4 = null
                this.p5 = null
                this.p6 = null
                this.p7 = null

            }

            let arrays = [this.p1, center, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7];
            for (let j = 0; j < arrays.length; j++) {
                if (!arrays[j]) {
                    arrays.splice(j, 1);
                    j--
                }

            }
            let strings = 'polygon(';
            for (let j = 0; j < arrays.length; j++) {
                strings += `${arrays[j].x}% ${arrays[j].y}% ,`
            }
            strings = (strings + ')').replace(',)', ')');
            this.element.style.clipPath = strings
            this.theta += this.delta;
            if (this.theta > 2 * Math.PI) {
                clearInterval(timer);
              
             
          
                   this.toldPlayer();
            
                this.element.style.display = 'none'
                this.taskqueue.pop();
                if (this.taskqueue.length) {
                    this.taskqueue[this.currentbuildingindex].fun();
                }

            }
            //    console.log(strings)
        }, this.buildingrate * 16.6);

        this.taskqueue[this.currentbuildingindex].timer = timer
    }
    //建造完成通知玩家进行鼠标左键选择-放在playground上
    //注意！！ 这只对 建筑和防御有效
    toldPlayer(){
           // stlist guardlist soilderlist wartanklist
     if(this.type=='stlist'||this.type=='guardlist'){
           console.log(66666);
           buildinglayer.bindCanvas();
     }
    }

}
let stlistMask = new Masks('stlist'),
    guardlistMask = new Masks('guardlist'),
    soilderlistMask = new Masks('soilderlist'),
    wartanklistMask = new Masks('wartanklist');
export { stlistMask, guardlistMask, soilderlistMask, wartanklistMask }