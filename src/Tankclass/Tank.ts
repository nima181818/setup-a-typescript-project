
interface Position1 {
    x: number
    y: number
}
import { globalAstarmanage as realAstarmanage } from '../utils/wayfinders'
import { Watcher } from '../utils/watcher';
import { eventlist } from './Eventlist';
import { transformimg } from '../assets/imgurltransform';
import { rvosystem } from '../utils/rovpathfindinghelper'
console.log(rvosystem)
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
    movingcommander: boolean = false //运动控制默认为false，true为运动状态
    engineDriver: string = 'A*' //引擎驱动器  默认为A* 还有可能为 rvo
    oldengineDriver: string = 'A*' //上一次的引擎驱动器
    inrvocintrol: boolean = false
    incollision: boolean = false
    globalAstarmanage: any = {}
    picimgList: HTMLImageElement[] = []
    imgList: string[]
    baseimg: HTMLImageElement
    blood: number
    matrixposition: Position1 = { x: 0, y: 0 }
    watcher: Watcher<Tank> = new Watcher<this>()
    autofirecurrency: number = 200
    bulletmaxmile: number = 173
    clicktimestamp: number = new Date().getTime()
    currentclickpoints: Position1 = { x: null, y: null }
    proxycurrentclickpoints: Position1 = { x: null, y: null } //保证在不操作 currentclickpoints的情况下处理rvo的回调，以备不时之需
    targetpoint: Position1 = { x: 0, y: 0 } //目标点
    startpoint: Position1 = { x: 0, y: 0 } //开始点
    width: number = 30
    height: number = 30
    currentctx: any = null
    timer: number
    position: Position1 = { x: null, y: null }
    selected: boolean = false
    tankbullet: any
    speed: number = 2
    myendpoint: Position1
    ownobstacles: Position1[] = []
    constructor(position: Position1) {
        Tank.id++;
        this._id = Tank.id
        for (let j in realAstarmanage) {
            if (typeof realAstarmanage[j] == 'function') {
                this.globalAstarmanage[j] = realAstarmanage[j]
            } else {
                //       console.log(realAstarmanage[j])
                this.globalAstarmanage[j] = JSON.parse(JSON.stringify(realAstarmanage[j]))
            }
        }

        // this.autoFire()
        // eventlist.tanklist.push(this);
        // console.log( eventlist.tanklist,"坦克")



        // this.currentclickpoints.x = position.x;
        // this.currentclickpoints.y = position.y
        // this.position.x = position.x;
        // this.position.y = position.y

        // globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.currentclickpoints.y), this.closeFunc(this.currentclickpoints.x), 'startpoint')
        // this.initStartpointendpoint();

    }
    //处理目标点变化
    targetpointTrigger() {
        console.log('监听成功');
        rvosystem.dynamicUpdategoals(this, 'np')
    }
    //动态的改变自己的
    currentclickpointsTrigger() {
        if (this.ownobstacles.length) {
            this.realUpdatingownerobstacle(0)
        }

        this.ownobstacles = [{
            x: this.currentclickpoints.x - this.width <= 0 ? 0 : this.currentclickpoints.x - this.width,
            y: this.currentclickpoints.y - this.height <= 0 ? 0 : this.currentclickpoints.y - this.height
        }, {
            x: this.currentclickpoints.x + this.width >= 600 ? 600 : this.currentclickpoints.x + this.width,
            y: this.currentclickpoints.y + this.height >= 400 ? 400 : this.currentclickpoints.y + this.height
        }];

        this.proxycurrentclickpoints.x = this.currentclickpoints.x;
        this.proxycurrentclickpoints.y = this.currentclickpoints.y;
        this.realUpdatingownerobstacle(3)
        //     this.initStartpointendpoint();
    }
    //实时更新自己本身的障碍点
    realUpdatingownerobstacle(value: number) {
        // alert('wocao')
        // setTimeout(()=>{
        for (let k = 0; k < realAstarmanage.fakemap.length; k++) {
            for (let u = 0; u < realAstarmanage.fakemap[k].length; u++) {
                if (
                    k * 5 >= this.ownobstacles[0].y
                    &&
                    k * 5 < this.ownobstacles[1].y
                    &&
                    u * 5 >= this.ownobstacles[0].x
                    &&
                    u * 5 < this.ownobstacles[1].x
                ) {

                    realAstarmanage.fakemap[k][u] = value
                }
            }
        }
        // })
        //   console.log(globalAstarmanage.fakemap,"该死的地图",this._id)
        this.notifyRVOsystem()
    }
    initStartpointendpoint() {

    }

    select(canvas: HTMLCanvasElement): void {

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
    }
    //临近函数 //找出距离自己最近的矩阵点
    closeFunc(point: number): number {
        let k = parseInt((point / 5).toString());
        return k * 5
    }
    setTankspoints(x: number, y: number, type: string, movingcommander: boolean = false) {
        if (type == 'setstartpoints') {
            let { x, y } = this.currentclickpoints;
            this.startpoint = { x, y }
        }
        if (type == 'setendpoints') {
            this.targetpoint.x = x;
            this.targetpoint.y = y;

            clearInterval(this.timer);
            this.timer = null;
            this.startpoint = JSON.parse(JSON.stringify(this.currentclickpoints));

        }
        if (movingcommander) {
           
            for (let k = 0; k < this.globalAstarmanage.map.length; k++) {
                for (let u = 0; u < this.globalAstarmanage.map[k].length; u++) {
                    this.globalAstarmanage.map[k][u] = 0
                }
            }
            this.globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.startpoint.y), this.closeFunc(this.startpoint.x), 'startpoint');
            this.globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.targetpoint.y), this.closeFunc(this.targetpoint.x), 'endpoint');
            this.obstacleRepailie();
            //开始寻路
            this.movingfunc('tank', this.currentclickpoints, this.height, this.width, this.speed, this);
        }
    }
    ///障碍重排
    obstacleRepailie() {

        for (let j = 0; j < eventlist.tanklist.length; j++) {
            //这里应该是虚拟地图对真实地图进行映射
            if (this._id !== eventlist.tanklist[j]._id) {

                for (let k = 0; k < this.globalAstarmanage.map.length; k++) {
                    for (let u = 0; u < this.globalAstarmanage.map[k].length; u++) {
                        if (
                            k * 5 >= eventlist.tanklist[j].ownobstacles[0].y
                            &&
                            k * 5 <= eventlist.tanklist[j].ownobstacles[1].y
                            &&
                            u * 5 >= eventlist.tanklist[j].ownobstacles[0].x
                            &&
                            u * 5 <= eventlist.tanklist[j].ownobstacles[1].x
                        ) {

                            this.globalAstarmanage.map[k][u] = 3
                        }
                    }
                }
            }

        }

        this.globalAstarmanage.FindPoint();
        //  console.log(this.globalAstarmanage.map,"寻路算法之后的地图")
    }

    //重绘--不可打扰其他物体的在界面上的显示
    repaint() {

    }
    //自动攻击
    autoFire() {

    }
    //初始化图片
    initPicimg() {

        for (let j = 0; j < this.imgList.length; j++) {
            let img = transformimg(this.imgList[j]);
            this.picimgList.push(img);
            document.body.appendChild(img)
        }
    }
    //抽象层地图，用以表征地图的所有为障碍物的地方
    abstractMap() {

    }

    //停止移动
    stopCommand() {
        clearInterval(this.timer);
        this.timer = null;
    }
    //通知RVO系统进行寻路?
    notifyRVOsystem() {
        //设置开始点   
        rvosystem.dynamicUpdategoals(this, 'sp');
        //  rvosystem.rvostart(this);

    }
    //路径规划 --rvo驱动
    pathplaningbyRvo(x: number, y: number) {
        //此函数一直被调用，以便于处理障碍
        this.oldengineDriver = this.engineDriver
        let goonrvo = this.handleRvopositions(x, y);
        if (goonrvo) {
            //rvo获得控制权
            this.engineDriver = 'rvo';
            this.currentclickpoints.x = x;
            this.currentclickpoints.y = y;

        } else {
            // A*获得控制权
            this.engineDriver = 'A*'
        }
        this.nextStepdecide(x,y);
      //  if(this._id==0){
            console.log(x,y,'引擎驱动默认值为',this.engineDriver,'行军中'+this.movingcommander)
      //  }
      
    }
    //下一步根据引擎驱动选择驱动方式
    nextStepdecide(x:number,y:number) {
        if (this.oldengineDriver != this.engineDriver) {
            if (this.oldengineDriver == 'A*') {
             //   if(this._id==0){
                    console.log('引擎切换由A*--->rvo')
            //    }
                
                clearInterval(this.timer);
                this.timer = null;
                if(this.movingcommander){
                //    this.currentctx.clearRect(this.currentclickpoints.x-10, this.currentclickpoints.y-10, this.width - 2, this.height - 2);
                    this.currentctx.drawImage(this.picimgList[0],x,y, this.width, this.height)
    
                }
              
              
            } else {
                console.log('引擎切换由 rvo--->A*')
                if(this.movingcommander){
                    this.setTankspoints(this.currentclickpoints.x, this.currentclickpoints.y, 'setstartpoints', true)
          
                }
                }
        }else{
            if(this.engineDriver=='rvo'){
                if(this.movingcommander){
                    //    this.currentctx.clearRect(this.currentclickpoints.x-10, this.currentclickpoints.y-10, this.width - 2, this.height - 2);
                        this.currentctx.drawImage(this.picimgList[0],x,y, this.width, this.height)
        
                    }
            }
        }
    }
    //判断rvo position周围是否有障碍 返回true 表示控制权在rvo手上
    /*
           /     \
          /       \
         /         \
        /|^^^^|^^^^|\
       / |    |    | \
      /  ^^^^^^^^^^^  \
      \  |    |    |  /
       \ |    |    | /
        \^^^^^^^^^^^/
          \        /
            \     /   
          */
    handleRvopositions(x: number, y: number, invokedby: string = null) {
        let limitleft = {
            x: this.closeFunc(x - this.width - 10),
            y: this.closeFunc(y)
        },
            limitright = {
                x: this.closeFunc(x + this.width + 10),
                y: this.closeFunc(y)
            },
            limittop = {
                x: this.closeFunc(x),
                y: this.closeFunc(y - this.height - 10)
            },
            limitbottom = {
                x: this.closeFunc(x),
                y: this.closeFunc(y + this.height + 10)
            },
            list = this.filterProbooutofborder([limitleft, limitright, limittop, limitbottom]),
            incollision = false;

        for (let j = 0; j < list.length; j++) {
            if (realAstarmanage.fakemap[list[j].y / 5][list[j].x / 5] == 3) {
                incollision = true
            }
        }
       // if(this._id==0){
            console.log('是否在障碍中'+incollision,'被'+invokedby+'调用')
      //  }
       
        return incollision
    }
    //筛选 过滤探针在边界之外的
    filterProbooutofborder(list: Array<{ x: number, y: number }>): any {
        let templist = JSON.parse(JSON.stringify(list))
        for (let j = 0; j < templist.length; j++) {
            if (templist[j].x < 0 || templist[j].y < 0) {
                templist.splice(j, 1);
                j--
            }
        }
        return templist
    }
    //路径规划 --A*驱动
    movingfunc(type: string, position: Position1, height: number, width: number, speed: number, that: any) {
        //最新的路径规划方案
    
        let k = 0,
            u = 0,
            currentindex = 0,
            dk = 0,
            du = 0,
            positionarrays = [],
            delta = this.globalAstarmanage.deltamatrixllist

        for (let j = 0; j + 1 < this.globalAstarmanage.lastwaysmatrixlist.length; j++) {
            let obj = {
                x: this.globalAstarmanage.lastwaysmatrixlist[j].y,
                y: this.globalAstarmanage.lastwaysmatrixlist[j].x
            }
            positionarrays.unshift(obj)
        }

        if (positionarrays.length == 0) {
            return;
        }
        console.log('寻路开始------')
        that.timer = setInterval(() => {
            for (let j = 0; j + 1 < positionarrays.length; j++) {

                if (positionarrays[j].x * 5 + k == positionarrays[j + 1].x * 5 && positionarrays[j].y * 5 + u == positionarrays[j + 1].y * 5) {
                    k = 0;
                    u = 0;
                    currentindex++;

                    break;
                }

            }

            if (currentindex == positionarrays.length - 1) {
                clearInterval(that.timer);
                that.timer = null;
                //顺利结束  抵达终点(1)
                this.startpoint.x = position.x;
                this.startpoint.y = position.y;
                this.globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.startpoint.y), this.closeFunc(this.startpoint.x), 'startpoint')
                this.movingcommander = false;
                return;
            }
            dk = delta[currentindex + 1].deltay;
            du = delta[currentindex + 1].deltax;
            k = k + dk;
            u = u + du
            this.currentctx.fillStyle = 'black';
            this.currentctx.clearRect(positionarrays[currentindex].x * 5 + k - dk, positionarrays[currentindex].y * 5 + u - du, width + 2, height + 2);
            let tempindex = 0
            if (dk == 0 && du == -1) {
                tempindex = 0
            }
            if (dk == 1 && du == -1) {
                tempindex = 1
            }
            if (dk == 1 && du == 0) {
                tempindex = 2
            }
            if (dk == 1 && du == 1) {
                tempindex = 3
            }
            if (dk == 0 && du == 1) {
                tempindex = 4
            }
            if (dk == -1 && du == 1) {
                tempindex = 5
            }
            if (dk == -1 && du == 0) {
                tempindex = 6
            }
            if (dk == -1 && du == -1) {
                tempindex = 7
            }
            this.currentctx.drawImage(this.picimgList[tempindex], positionarrays[currentindex].x * 5 + k, positionarrays[currentindex].y * 5 + u, this.width, this.height)

            //}
            //    setTimeout(()=>{
            //   if(!this.incollision){
            this.handleRvopositions(this.currentclickpoints.x, this.currentclickpoints.y, 'A*')
            //     }

            //  },500)

            position.x = positionarrays[currentindex].x * 5 + k;
            position.y = positionarrays[currentindex].y * 5 + u;
            // console.log(k, u, "当前位置")

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
        let img = transformimg(this.imgList[0]);
        this.baseimg = img;
        // ctx.beginPath();
        // ctx.fillStyle = "black";
        let that = this

        this.baseimg.onload = function () {
            that.currentctx.drawImage(this.baseimg, this.currentclickpoints.x, this.currentclickpoints.y, this.width, this.height)

        }.bind(that)
        this.position = {
            x: 10,
            y: 10
        }

        // this.select(canvas)
    }



}
