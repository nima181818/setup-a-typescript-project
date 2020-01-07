
interface Position1 {
    x: number
    y: number
}
import { Point, Astar } from './wayfinders'
import { Obstacle } from './obstacle';
import { Watcher } from './watcher';
let globalAstarmanage = new Astar();
//初始化地图
let obstacle = new Obstacle()
globalAstarmanage.initGlobalMap(obstacle);
class Eventlist {
    canvasclickeventlist: Function[] = []
    windowmousemoveeventlist: Function[] = []
    tanklist: Tank[] = []
    movingjudge(e: MouseEvent) {
        for (let j = 0; j < this.canvasclickeventlist.length; j++) {
            this.canvasclickeventlist[j](e);

        }
        for (let j = 0; j < this.tanklist.length; j++) {
            if (this.tanklist[j].selected) {
                this.tanklist[j].nextPoint(e.pageX, e.pageY);
            } else {
                this.tanklist[j].fire(e.pageX, e.pageY)
            }


        }

    }
}
export let eventlist = new Eventlist();
class Bullet<T>{
    position: Position1
    width: number = 5
    height: number = 5
    speed: number = 10
    currentctx: any
    master: T
    timer: number = 0
    constructor(master: T, position: Position1) {
        this.master = master
        this.position = position

    }
}
export class Tank {
    static id: number = -1
    _id: number

    blood: number
    matrixposition: Position1 = { x: 0, y: 0 }
    watcher: Watcher<Tank>
    mapmanager: Astar = new Astar()
    autofirecurrency: number = 200
    bulletmaxmile: number = 173
    clicktimestamp: number = new Date().getTime()
    currentclickpoints: Position1 = { x: null, y: null }
    targetpoint: Position1 = { x: 0, y: 0 } //目标点
    startpoint: Position1 = { x: 0, y: 0 } //开始点
    width: number = 30
    height: number = 30
    currentctx: any = null
    timer: number
    position: Position1 = { x: null, y: null }
    selected: false
    tankbullet: any
    speed: number = 2
    ownobstacles: Position1[] = []
    constructor(position: Position1) {
        Tank.id++;
        this._id = Tank.id


        this.autoFire()
        eventlist.tanklist.push(this);
        this.watcher = new Watcher()
        this.watcher.register('currentclickpointsTrigger', this.currentclickpointsTrigger);
        this.watcher.responseMode(this, 'currentclickpoints');
        this.currentclickpoints.x = position.x;
        this.currentclickpoints.y = position.y
        this.position.x = position.x;
        this.position.y = position.y
        globalAstarmanage.setStartpointandendpoint(this.currentclickpoints.x, this.currentclickpoints.y, 'endpoint')
        this.initStartpointendpoint();

    }
    currentclickpointsTrigger() {

        this.ownobstacles = [{
            x: this.currentclickpoints.x - 60 < 0 ? 0 : this.currentclickpoints.x - 60,
            y: this.currentclickpoints.y - 60 < 0 ? 0 : this.currentclickpoints.y - 60
        }, {
            x: this.currentclickpoints.x + 90 > 600 ? 600 : this.currentclickpoints.x + 90,
            y: this.currentclickpoints.y + 75 > 400 ? 400 : this.currentclickpoints.y + 75
        }];

        this.initStartpointendpoint();
    }
    initStartpointendpoint() {
        // for(let j=0;j<80;j++){
        // 	this.mapmanager.map[j] = []
        // 	for(let k=0;k<120;k++){
        // 		this.mapmanager.map[j][k] = 0
        // 	}
        // }
        //出发点

        // globalAstarmanage.startPoint.x = this.currentclickpoints.x;
        // globalAstarmanage.startPoint.y = this.currentclickpoints.y;
        globalAstarmanage.startPoint.father = null;
        //旧的出发矩阵点设置为0
        //  globalAstarmanage.map[this.matrixposition.y][this.matrixposition.x] = 0;
        //	let stepx = parseInt((globalAstarmanage.startPoint.x/5).toString())
        //	let stepy = parseInt((globalAstarmanage.startPoint.y/5).toString())
        //    globalAstarmanage.map[stepy][stepx] = 1;
        //    this.matrixposition.x = stepx;
        //    this.matrixposition.y = stepy;

        //终点
        // globalAstarmanage.endPoint.x = this.targetpoint.x
        // globalAstarmanage.endPoint.y = this.targetpoint.y
        //		globalAstarmanage.startPoint.father = null;
        //		let stepx1 = parseInt((globalAstarmanage.endPoint.x/5).toString())
        //	let stepy1 = parseInt((globalAstarmanage.endPoint.y/5).toString())
        //	globalAstarmanage.map[stepy1][stepx1] = 2;

        // this.mapmanager.FindPoint();

        // console.log(globalAstarmanage.map,"地图当前")
    }

    select(canvas: HTMLCanvasElement): void {
        // canvas.onclick

        let event = function (e: MouseEvent): void {

            let date = new Date().getTime();
            console.log(date - this.clicktimestamp)


            //  if((date - this.clicktimestamp)>300){

            if ((e.pageX - this.currentclickpoints.x) ** 2 < 800 && (e.pageY - this.currentclickpoints.y) ** 2 < 800) {
                       alert(e.pageX)
                       alert(e.pageY)
                this.selected = true;
                for (let j = 0; j < eventlist.tanklist.length; j++) {
                    if (this !== eventlist.tanklist[j]) {
                        eventlist.tanklist[j].selected = false;

                    }
                }
                this.targetpoint = { x: e.pageX, y: e.pageY };
                globalAstarmanage.setStartpointandendpoint(e.pageX, e.pageY, 'endpoint')
                //障碍 
                //先将障碍物置为空
                for (let k = 0; k < globalAstarmanage.map.length; k++) {
                    for (let u = 0; u < globalAstarmanage.map[k].length; u++) {
                        if (globalAstarmanage.map[k][u] == 3) {
                            globalAstarmanage.map[k][u] = 0;
                        }
                    }
                }
                for (let j = 0; j < eventlist.tanklist.length; j++) {
                    if (this !== eventlist.tanklist[j]) {

                        for (let k = 0; k < globalAstarmanage.map.length; k++) {
                            for (let u = 0; u < globalAstarmanage.map[k].length; u++) {
                                if (
                                    k * 5 >= eventlist.tanklist[j].ownobstacles[0].y
                                    &&
                                    k * 5 < eventlist.tanklist[j].ownobstacles[1].y
                                    &&
                                    u * 5 >= eventlist.tanklist[j].ownobstacles[0].x
                                    &&
                                    u * 5 < eventlist.tanklist[j].ownobstacles[1].x
                                ) {

                                    globalAstarmanage.map[k][u] = 3
                                }
                            }
                        }
                    }
                }
            } else {
                // this.selected = false
            }
            //     }else{



            //       }

            this.clicktimestamp = date


        }.bind(this)
        eventlist.canvasclickeventlist.push(event);
        console.log(eventlist.canvasclickeventlist, "事件列队")
    }
    //开火&&子弹移动的方法
    fire(x: number, y: number) {
        let that = this
        let j = 0
        let bullet = new Bullet(that, {
            x: this.currentclickpoints.x,
            y: this.currentclickpoints.y
        })
        bullet.currentctx = this.currentctx
        this.tankbullet = bullet
        //子弹移动
        this.movingfunc('bullet', bullet.position, x, y, j, bullet.height, bullet.width, bullet.speed, bullet)
    }
    //坦克移动
    nextPoint(lastx: number, lasty: number) {
        if (this.selected) {
            let j = 0;
            if (this.timer) {
                //运行过程中转向 临时改变路径
                clearInterval(this.timer);
                this.timer = null;
                this.startpoint.x = this.currentclickpoints.x;
                this.startpoint.y = this.currentclickpoints.y;
                globalAstarmanage.setStartpointandendpoint(this.startpoint.x, this.startpoint.y, 'startpoint')
                //    this.currentclickpoints = {
                //     x:lastx,
                //     y:lasty
                // }
            }
            //寻路算法
            globalAstarmanage.FindPoint();
            console.log(globalAstarmanage.map, "地图")
            this.movingfunc('tank', this.currentclickpoints, lastx, lasty, j, this.height, this.width, this.speed, this);
        }
    }
    //重绘--不可打扰其他物体的在界面上的显示
    repaint() {

    }
    //自动攻击
    autoFire() {
        //响应式 //暂时
        //  window.onmousemove=function(e:MouseEvent){
        //      console.log(e.pageX,e.pageY)
        //      if(this.autofirecurrency){
        //          clearTimeout(this.autofirecurrency)
        //          this.autofirecurrency=null;
        //      }
        //      if((e.pageX-this.currentclickpoints.x)**2+(e.pageY-this.currentclickpoints.y)**2<=this.bulletmaxmile**2){
        //         this.autofirecurrency = setInterval(()=>{
        //             this.fire(e.pageX,e.pageY)
        //         },200)
        //      }

        //  }.bind(this)
    }
    //路径规划
    movingfunc(type: string, position: Position1, lastx: number, lasty: number, j: number, height: number, width: number, speed: number, that: any) {
        let x0 = position.x,
            y0 = position.y,
            x1 = lastx,
            y1 = lasty,

            k = (y1 - y0) / (x1 - x0),
            minusy = y1 - y0 >= 0 ? 1 : -1,
            minusx = x1 - x0 >= 0 ? 1 : -1,
            cosr = (speed) * 1 / ((k * k + 1) ** 0.5),
            sinr = (speed) * k / ((k * k + 1) ** 0.5)

        that.timer = setInterval(() => {
            let tem = j
            j = j + minusx
            this.currentctx.fillStyle = 'black'
            this.currentctx.clearRect(x0 + cosr * tem - 1, y0 + sinr * tem - 1, width + 2, height + 2);
            this.currentctx.fillRect(x0 + cosr * (j), y0 + sinr * (j), width, height);

            position.x = x0 + cosr * (j)
            position.y = y0 + sinr * (j)
            // this.currentclickpoints = JSON.parse(JSON.stringify(position))
            if (type == 'tank') {
                // this.showBloodlength(x0 + cosr * tem - 1,y0 + sinr * tem - 1);
                this.showBloodlength(x0 + cosr * tem - 1, y0 + sinr * tem - 1)
            }

            if (j * j - ((x1 - x0) / cosr) ** 2 > 0) {
                if (type == 'bullet') {
                    this.currentctx.clearRect(x0 + cosr * (j) - 1, y0 + sinr * (j) - 1, width + 2, height + 2);
                }
                clearInterval(that.timer);
                that.timer = null;
                //顺利结束  抵达终点(1)
                this.startpoint.x = position.x;
                this.startpoint.y = position.y;
                globalAstarmanage.setStartpointandendpoint(this.startpoint.x, this.startpoint.y, 'startpoint')
            }
        }, 16.6)
    }
    //选中时显示血量
    showBloodlength(x: number = this.currentclickpoints.x, y: number = this.currentclickpoints.y) {
        this.currentctx.beginPath()
        this.currentctx.fillStyle = "green";
        this.currentctx.clearRect(x - 10, y - 10 - 5, 50 + 2, 10 + 2);
        this.currentctx.fillRect(this.currentclickpoints.x - 10, this.currentclickpoints.y - 10 - 5, 50, 10)
        this.currentctx.stroke();
    }
    paint(canvas: HTMLCanvasElement): void {

        const ctx = canvas.getContext('2d');

        this.currentctx = ctx

        ctx.fillStyle = "yellow";
        ctx.strokeRect(0, 0, 600, 400);
        // ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.currentclickpoints.x, this.currentclickpoints.y, 30, 30);
        ctx.fillRect(40, 10, 10, 10);

        this.showBloodlength();

        this.position = {
            x: 10,
            y: 10
        }
        // ctx.fillStyle="green";
        // let j:number=0
        // setInterval(()=>{
        //     j++;
        //     ctx.clearRect(10+j-1,10+j-1,30,30);
        //     ctx.fillRect(10+j,10+j,30,30);
        // },16.6)
        this.select(canvas)
    }



}





let aAstar = new Astar();

for (let j = 0; j < 80; j++) {
    aAstar.map[j] = []
    for (let k = 0; k < 120; k++) {
        aAstar.map[j].push(0)
    }
}
// console.log(   aAstar.map,"地图")
aAstar.colCount = 10;
aAstar.rowCount = 10;
aAstar.startPoint.x = 1;
aAstar.startPoint.y = 1;

aAstar.endPoint.x = 7;
aAstar.endPoint.y = 6;
//  aAstar.startPathfinding();
console.log(aAstar.map)

//事件列队，只能实例化一个
// console.log(newTank,newTank2)
