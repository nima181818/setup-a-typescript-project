
//引入 tank中的一个
import { eventlist } from '../Tankclass/Eventlist';
import { globalAstarmanage as realAstarmanage, globalAstarmanage } from '../utils/wayfinders'
import {Powerstation,Soliderfactory,Oil} from '../Structureclass/allStructureslist'
class Buildinglayer {
    timer: number = null
    drawTimer: number = null
    type: string
    type_name: string
    finish: boolean = false
    positions: { x: number, y: number } = { x: 0, y: 0 }
    oldpositions: { x: number, y: number } = { x: 0, y: 0 }
    canvas: HTMLCanvasElement
    context: any
    obstaclemap: { x: number, y: number }[] = []
    oldobstaclemap: { x: number, y: number }[] = []
    size: { width: number, height: number }
    canBuild: boolean = false //能够在此修建
    constructor() {


        this.mouseMovehandler = this.mouseMovehandler.bind(this);
        this.mouseClickhandler = this.mouseClickhandler.bind(this);


    }
    setType(type: string, type_name: string) {
        this.type = type;
        this.type_name = type_name;
        this.sizeJudge();

    }
    //种类判别 建筑的大小是不同的
    sizeJudge() {
        switch (this.type_name) {
            case 'stpowertation':
                this.size = {
                    width: 108,
                    height: 90
                }
                break;
            case 'stinfantry':
                this.size = {
                    width: 95,
                    height: 168
                }
                break;
            case 'stoil':
                this.size = {
                    width: 106,
                    height: 91
                }

                break;
            case 'stwcf':   //TODO--
                this.size = {
                    width: 106,
                    height: 91
                }

                break;
            default:
                break;
        }
    }
    //TODO-- 连续建造存在初始换问题 需要注意 
    mouseMovehandler(e: MouseEvent) {
        console.log('卧槽无情');
        //节流
        if (!this.timer) {
            this.timer = window.setTimeout(() => {
                this.positions = {
                    x: e.pageX,
                    y: e.pageY
                }
                this.draw();
                this.getObstacles();
                clearTimeout(this.timer);
                this.timer = null;
            }, 50);
        }
    }
    mouseClickhandler(e: MouseEvent) {
        if (this.validationAreasafe()) {
            this.finish = true;
            let buildinglocation = {
                x:this.positions.x-this.size.width*0.5,
                y:this.positions.y-this.size.height*0.5,
            }
            this.canvas.removeEventListener('mousemove', this.mouseMovehandler);
            this.canvas.removeEventListener('click', this.mouseClickhandler);
            //清楚绿色待建造区
            this.context.clearRect(buildinglocation.x,buildinglocation.y,this.size.width,this.size.height)
            //开始建造了
            this.newStructures();
        }
    }
    //TODO-- 得阻止 物体的选择
    //新建筑物
    newStructures() {
        
     let buildinglocation = {
         x:this.positions.x-this.size.width*0.5,
         y:this.positions.y-this.size.height*0.5,
     },
     size = {
         x:this.size.width,
         y:this.size.height
     }
     
        // Powerstation,Soliderfactory,Oil
        switch (this.type_name) {
            case 'stpowertation':
                let powerstation = new Powerstation(10, '20',buildinglocation, 'powerstation', this.canvas,size ); 
                break;
            case 'stinfantry':
                let soliderfactory1 = new Soliderfactory(10, '20',buildinglocation, 'soliderfactory', this.canvas,size);
                break;
            case 'stoil':
                let oil = new Oil(10, '20',buildinglocation, 'oil1', this.canvas, size);
                break;
            case 'stwcf':

                break;
            default:
                break;
        }
    }
    //绑定滑动，游击事件
    bindCanvas() {
        let canvas = document.getElementById('canvas2');
        this.canvas = canvas as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')
        canvas.addEventListener('mousemove', this.mouseMovehandler);
        canvas.addEventListener('click', this.mouseClickhandler);
    }
    //获取其中一个坦克的地图
    //障碍区= fakeMap（自身障碍物）+其他障碍物
    getObstacles() {
        let othermap = eventlist.tanklist[0].globalAstarmanage.map,//其他障碍物
            atankmap = globalAstarmanage.fakemap, //（自身障碍物）
            MT = new Multithread(4);//web worker
        return new Promise((resolve, reject) => {
            ///   console.log('呵呵')
            let handle = MT.process(this.calculateObstacles, (e) => {
                this.obstaclemap = e;
                resolve();
                //   console.log(e, "啦啦啦啦")
            });
            handle(othermap, atankmap)
        })



    }
    //计算障碍物
    calculateObstacles(othermap: any, atankmap: any) {
        let lastmap = [];
        for (let j = 0; j < 200; j++) {
            for (let k = 0; k < 200; k++) {
                if (othermap[j][k] == 33 || othermap[j][k] == 333 || atankmap[j][k] == 3) {
                    // lastmap[j][k] = 9 //假设9为不允许建造
                    lastmap.push({
                        x: j,
                        y: k
                    })
                }
            }
        }
        return lastmap
    }
    //校验是否选择的区域是平坦的
    validationAreasafe(): boolean {
        //TODO--
        return this.canBuild
    }
    // //绘制绿色部分
    draw() {
        this.context.clearRect(this.oldpositions.x - this.size.width * 0.5, this.oldpositions.y - this.size.height * 0.5, this.size.width, this.size.height);
        this.context.fillStyle = 'rgb(0,220,0)';
        this.context.fillRect(this.positions.x - this.size.width * 0.5, this.positions.y - this.size.height * 0.5, this.size.width, this.size.height);
        this.oldpositions = {
            x: this.positions.x,
            y: this.positions.y
        }
        //绘制红色
        let startx = this.positions.x - this.size.width * 0.5,
            starty = this.positions.y - this.size.height * 0.5,
            endx = startx + this.size.width,
            endy = starty + this.size.height;
        for (let j = 0; j < this.oldobstaclemap.length; j++) {
            this.context.clearRect(this.oldobstaclemap[j].y * 10, this.oldobstaclemap[j].x * 10, 10, 10);
        }
        if (this.oldobstaclemap.length == 0) {
            this.canBuild = true
        } else {
            this.canBuild = false  //这里有一个时效性问题 webworker为异步的TODO--,目前表现还良好
        }
        this.oldobstaclemap = [];
        for (let j = 0; j < this.obstaclemap.length; j++) {
            if (startx <= this.obstaclemap[j].y * 10
                && starty <= this.obstaclemap[j].x * 10
                && endx >= this.obstaclemap[j].y * 10
                && endy >= this.obstaclemap[j].x * 10) {
                this.context.fillStyle = 'rgb(220,0,0)';
                this.context.fillRect(this.obstaclemap[j].y * 10, this.obstaclemap[j].x * 10, 10, 10);
                this.oldobstaclemap.push({
                    x: this.obstaclemap[j].x,
                    y: this.obstaclemap[j].y,
                })
            }
        }



    }

}
export let buildinglayer = new Buildinglayer()