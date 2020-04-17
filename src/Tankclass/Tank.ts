
interface Position1 {
    x: number
    y: number
}
import { globalAstarmanage as realAstarmanage } from '../utils/wayfinders'
import { Watcher } from '../utils/watcher';
import { eventlist } from './Eventlist';
import { transformimg } from '../assets/imgurltransform';
import { rvosystem } from '../utils/rovpathfindinghelper';
import {tankmoving_audio,waitingorders_audio} from '../assets/audios/audio'

console.log(rvosystem)
export class Tank {
    static id: number = -1
    _id: number
    bodyposition:boolean= false //身体的动作  为士兵所特有
    tick:number=0 //一次士兵身体动作改变的index
    lastpickindex:number=0 //上一次的方向
	workername:string //webwork创造id  因为有时需要去掉不必要的worker
    r: number = 20
    dt: number = 0.08
    startmoving:boolean=false
    obstaclematrix: Position1 = { x: 0, y: 0 }
    avoidforce: Position1 = { x: 0, y: 0 }
    seekforce: Position1 = { x: 0, y: 0 }
    velocity: Position1 = { x: 0, y: 0 }
    mass: number = 2
    stable:boolean=false
    MAX_SEE_AHEAD: number = 40
    MAX_AVOID_FORCE: number = 80
    MAX_SPEED: number = 80
    MAX_SEEK_FORCE: number = 180
    headpositionleft: Position1 = { x: 0, y: 0 }
    headpositionright: Position1 = { x: 0, y: 0 }
    head: Position1 = { x: 0, y: 0 }
    headposition: Position1 = { x: 0, y: 0 }
    collisiondectingbyAstar: boolean = false //由A*系统检测是否遭遇碰撞
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
    maxblood:number
    firerange:number //攻击距离 在该范围内可以攻击
    infirearea:boolean=false //是否在攻击区
    matrixposition: Position1 = { x: 0, y: 0 }
    watcher: Watcher<Tank> = new Watcher<this>()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    autofirecurrency: number = 200
    bulletmaxmile: number = 173
    clicktimestamp: number = new Date().getTime()
    currentclickpoints: Position1 = { x: null, y: null }
    proxycurrentclickpoints: Position1 = { x: null, y: null } //保证在不操作 currentclickpoints的情况下处理rvo的回调，以备不时之需
    targetpoint: Position1 = { x: 0, y: 0 } //目标点
    destinationpoint: Position1 = { x: 0, y: 0 } //目标点的子集 用以寻路
    startpoint: Position1 = { x: 0, y: 0 } //开始点
    width: number = 54  //绘制宽度
    height: number = 54 //绘制高度
    obwidth:number   //障碍宽度
    obheight:number //障碍高度
    currentctx: any = null
    timer: number
    position: Position1 = { x: null, y: null }
    selected: boolean = false
    multiselect:boolean = false
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
                      
                this.globalAstarmanage[j] = JSON.parse(JSON.stringify(realAstarmanage[j]));
            //    if(j=='map'){
            //        for(let u=0;u<realAstarmanage.map.length;u++){
            //            for(let k=0;k<realAstarmanage.map[u].length;k++){
            //                 if(realAstarmanage.map[u][k]==33||realAstarmanage.map[u][k]==333){
            //                     this.globalAstarmanage.map[j] = realAstarmanage
            //                 }
            //            }
            //        }
            //    }
            }
        }
        
        this.autoFire();
        eventlist.tanklist.push(this);
        this.watcher = new Watcher();
        this.watcher.register('currentclickpointsTrigger', this.currentclickpointsTrigger);
        this.watcher.responseMode(this, 'currentclickpoints');
        this.watcher.register('targetpointTrigger', this.targetpointTrigger);
        this.watcher.responseMode(this, 'targetpoint');

        this.watcher.register('targetpointTrigger', this.targetpointTrigger);
        this.watcher.responseMode(this, 'targetpoint');



        this.watcher.register('selectedTrigger', this.selectedTrigger);
        this.watcher.responseMode(this, 'selected');

        this.watcher.register('multiselectTrigger', this.multiselectTrigger);
        this.watcher.responseMode(this, 'multiselect');


        this.watcher.register('startmovingTrigger', this.startmovingTrigger);
        this.watcher.responseMode(this, 'startmoving');



        this.currentclickpoints.x = position.x;
        this.currentclickpoints.y = position.y;
        this.position.x = position.x;
        this.position.y = position.y;
        this.targetpoint.x = this.currentclickpoints.x
        this.targetpoint.y = this.currentclickpoints.y
        realAstarmanage.setStartpointandendpoint(this.closeFunc(this.currentclickpoints.y), this.closeFunc(this.currentclickpoints.x), 'startpoint');
        this.initStartpointendpoint();
             
    }
    //处理目标点变化
    targetpointTrigger() {
    
        rvosystem.dynamicUpdategoals(this, 'np')
    }
    //动态的改变自己的
    currentclickpointsTrigger() {
        if (this.ownobstacles.length) {
            this.realUpdatingownerobstacle(0)
        }
    
        this.ownobstacles = [{
            x: this.currentclickpoints.x - this.obwidth*0.5 <= 0 ? 0 : this.currentclickpoints.x - this.obwidth*0.5,
            y: this.currentclickpoints.y - this.obheight*0.5 <= 0 ? 0 : this.currentclickpoints.y - this.obheight*0.5
        }, {
            x: this.currentclickpoints.x + this.obwidth*0.5 >= 600 ? 600 : this.currentclickpoints.x + this.obwidth*0.5,
            y: this.currentclickpoints.y + this.obheight*0.5 >= 400 ? 400 : this.currentclickpoints.y + this.obheight*0.5
        }];

        this.proxycurrentclickpoints.x = this.currentclickpoints.x + Math.random();
        this.proxycurrentclickpoints.y = this.currentclickpoints.y + Math.random();
        this.realUpdatingownerobstacle(3)
        //     this.initStartpointendpoint();
    }
    //单选改变
    selectedTrigger(){
      if(this.selected){
        // tankmoving_audio
        waitingorders_audio.playAudio();
      }
    }
    //多选改变
    multiselectTrigger(){
      if(this.multiselect){
        waitingorders_audio.playAudio();
      }
    }
    //去目的地改变
    startmovingTrigger(){
        if(this.startmoving){
            tankmoving_audio.playAudio();
        }
    }
    //
    //实时更新自己本身的障碍点
    realUpdatingownerobstacle(value: number) {
        // alert('wocao')
        // setTimeout(()=>{
            
        for (let k = 0; k < realAstarmanage.fakemap.length; k++) {
            for (let u = 0; u < realAstarmanage.fakemap[k].length; u++) {
                if (
                    k * 10 >= this.ownobstacles[0].y
                    &&
                    k * 10 < this.ownobstacles[1].y
                    &&
                    u * 10 >= this.ownobstacles[0].x
                    &&
                    u * 10 < this.ownobstacles[1].x
                ) {

                    realAstarmanage.fakemap[k][u] = value
                }
            }
        }
      
        this.notifyRVOsystem()
    }
    initStartpointendpoint() {

    }

    select(canvas: HTMLCanvasElement): void {

    }
    //开火
    fire() {
      
    }
    //监听敌人 是否在攻击范围内 在的话
    detectingEnviromentchange(){

    }
    //临近函数 //找出距离自己最近的矩阵点
    closeFunc(point: number): number {
        let k = parseInt((point / 10).toString());
        return k * 10
    }
    setTankspoints(x: number, y: number, type: string, movingcommander: boolean = false) {
        this.startmoving = false
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
                    //-- 这里处理了地图障碍物，还有建筑障碍物未处理
                    if(this.globalAstarmanage.map[k][u] !=33&&this.globalAstarmanage.map[k][u] !=333){
                        this.globalAstarmanage.map[k][u] = 0
                    }
                 
                }
            }
            this.globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.startpoint.y), this.closeFunc(this.startpoint.x), 'startpoint');
            this.globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.targetpoint.y), this.closeFunc(this.targetpoint.x), 'endpoint');
            this.obstacleRepailie();
			if(this.workername){
				window[this.workername].terminate();  //去掉正在运行的worker
			}
			
            //开始寻路
			 this.workername = 'worker'+parseInt((Math.random()*10**10).toString());
             var MT = new Multithread(4,this.workername);//web worker
         
              
          let handle = MT.process(this.globalAstarmanage.prepareForwebworker,(e)=>{
			 
              this.startmoving=true
            this.globalAstarmanage.map = e.map;
            this.globalAstarmanage.lastwaysmatrixlist = e.lastwaysmatrixlist;
		      this.workername = null; //置空
            this.movingfunc('tank', this.currentclickpoints, this.height, this.width, this.speed, this)
             });
			
          let sp = {
              x:this.globalAstarmanage.startPoint.x,
              y:this.globalAstarmanage.startPoint.y
          },
            ep = {
                x:this.globalAstarmanage.endPoint.x,
                y:this.globalAstarmanage.endPoint.y
            }
           
                
          handle(this.globalAstarmanage.map,sp,ep)
           
          
         
               /*
               
                 this.globalAstarmanage.FindPoint();
              this.movingfunc('tank', this.currentclickpoints, this.height, this.width, this.speed, this)
               */
               
          
            
            
            
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
                            k * 10 >= eventlist.tanklist[j].ownobstacles[0].y
                            &&
                            k * 10 <= eventlist.tanklist[j].ownobstacles[1].y
                            &&
                            u * 10 >= eventlist.tanklist[j].ownobstacles[0].x
                            &&
                            u * 10 <= eventlist.tanklist[j].ownobstacles[1].x
                        ) {
                          //-- 还有建筑物生成的障碍物未处理
                          if(this.globalAstarmanage.map[k][u]!=33&&this.globalAstarmanage.map[k][u]!=333){
                            this.globalAstarmanage.map[k][u] = 3
                          }
                           
                        }
                    }
                }
            }

        }
     
       //
    //   
     
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
            let img:HTMLImageElement = new Image(); 
                img.src = this.imgList[j]
                img.onload = function(){
                    this.picimgList[j] = img
                }.bind(this)
         
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


    }
    //下一步根据引擎驱动选择驱动方式
    nextStepdecide(x: number, y: number) {
        if (this.oldengineDriver != this.engineDriver) { }
        this.currentctx.drawImage(this.picimgList[0], x, y, this.width, this.height)

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
        let itemlist = [];
        for (let j = 0; j < 100; j++) {
            let theta = j * 2 * Math.PI / 100;
            let r = 50
            let item = {
                x: this.closeFunc(x + r * Math.cos(theta)),
                y: this.closeFunc(y + r * Math.sin(theta))
            }
            itemlist.push(item)
        }

        let list = this.filterProbooutofborder(itemlist);
        let incollision = false;

        for (let j = 0; j < list.length; j++) {
            if (realAstarmanage.fakemap[list[j].y / 10][list[j].x / 10] == 3) {
                incollision = true
            }
        }
        if (this._id == 0) {
            console.log('是否在障碍中' + incollision, '被' + invokedby + '调用', '当前的驱动引擎为', this.engineDriver)
        }

        return incollision
    }
    //筛选 过滤探针在边界之外的
    filterProbooutofborder(list: Array<{ x: number, y: number }>): any {
        let templist = JSON.parse(JSON.stringify(list))
        for (let j = 0; j < templist.length; j++) {
            if (templist[j].x <= 0 || templist[j].y <= 0) {
                templist.splice(j, 1);
                j--
            }
        }
        return templist
    }
    //当由 rvo转到A*时，此时要对下面的k和j，index做偏移
    rvoToastar(positionarrays: { x: number, y: number }[], x: number, y: number) {
        let mostclosestpoint = (positionarrays[0].x * 5 - x) ** 2 + (positionarrays[0].y * 5 - y) ** 2
        let finalindex = 0;
        for (let j = 0; j < positionarrays.length; j++) {
            let distance = (positionarrays[j].x * 5 - x) ** 2 + (positionarrays[j].y * 5 - y) ** 2;
            if (mostclosestpoint > distance) {
                mostclosestpoint = distance;
                finalindex = j
            }
        }
        console.log(finalindex)

        return finalindex
    }
    //处理当前运动的点的位置
    handleCurrenttarget(positionarrays: Position1[]) {
        let x = parseInt((this.currentclickpoints.x / 10).toString()),
            y = parseInt((this.currentclickpoints.y / 10).toString()),
            positionindex = null
        for (let j = 0; j < positionarrays.length; j++) {
            if (positionarrays[j].x == y && positionarrays[j].y == x) {
                positionindex = j;
                return positionindex
            }
        }
    }


    //路径规划 --A*驱动
    movingfunc(type: string, position: Position1, height: number, width: number, speed: number, that: any) {
		  window.clearInterval(this.timer);
		   this.timer = null
        //最新的路径规划方案
        let positionarrays = [],
            currentindex = 0;

        //设置开始速度
        // this.velocity.x = 0;
        // this.velocity.y = 50;
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
		let calltime=0;
        that.timer = window.setInterval(() => {
          calltime++;
	//	  console.log(calltime)
            //p为当前点，a为寻路算法当前点，b为寻路算法下一点
            let PA = {
                x: positionarrays[currentindex].x * 10 - this.currentclickpoints.x,
                y: positionarrays[currentindex].y * 10 - this.currentclickpoints.y
            }
            let AB;
            try{
                 AB = {
                    x: positionarrays[currentindex + 1].x * 10 - positionarrays[currentindex].x * 10,
                    y: positionarrays[currentindex + 1].y * 10 - positionarrays[currentindex].y * 10,
                }
                if (PA.x * AB.x + PA.y * AB.y < 0) {
                    //已经越过当前寻路点
                    currentindex++
                }
            }catch(e){
                AB = {
                    x: positionarrays[currentindex].x * 10 - positionarrays[currentindex-1].x * 10,
                    y: positionarrays[currentindex].y * 10 - positionarrays[currentindex-1].y * 10,
                }
            }
           
              try{
                this.destinationpoint = {
                    x: positionarrays[currentindex + 1].x * 10,
                    y: positionarrays[currentindex + 1].y * 10
                }
              }catch(e){
                  console.log(e,'出错')
                this.destinationpoint = {
                    x: positionarrays[currentindex].x * 10,
                    y: positionarrays[currentindex].y * 10
                }
              }
            // this.destinationpoint = {
            //     x: positionarrays[currentindex + 1].x * 10,
            //     y: positionarrays[currentindex + 1].y * 10
            // }
            let temp = {
                x: this.velocity.x * this.dt,
                y: this.velocity.y * this.dt
            }


            if (currentindex >= positionarrays.length - 2) {
                this.startpoint.x = position.x;
                this.startpoint.y = position.y;
                window.clearInterval(that.timer);
				that.timer = null
                this.velocity = {
                    x: 0,
                    y: 0
                }
                this.globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.startpoint.y), this.closeFunc(this.startpoint.x), 'startpoint')
                this.movingcommander = false;
            }
            this.updating();
            this.updatingcalculateobstaclematrix();

            this.updatingVelocity();
            
            this.updatingDisplacement();
            this.handleDestinations()

        }, 16.6)
    }
    //实时更新--head,head position
    updating() {
        //	 console.log(this.id,this.velocity.x,this.velocity.y)
        let cosv = this.velocity.x / (this.squalCaculator(this.velocity, true)),
            sinv = this.velocity.y / (this.squalCaculator(this.velocity, true));
        
        this.head = {
            x: cosv * this.MAX_SEE_AHEAD ? cosv * this.MAX_SEE_AHEAD : 0,
            y: sinv * this.MAX_SEE_AHEAD ? sinv * this.MAX_SEE_AHEAD : 0
        };
        const cos = this.head.x / (this.head.x ** 2 + this.head.y ** 2) ** 0.5;
        const sin = this.head.y / (this.head.x ** 2 + this.head.y ** 2) ** 0.5;
        this.headposition = {
            x: this.currentclickpoints.x + this.head.x,
            y: this.currentclickpoints.y + this.head.y
        };
        this.headpositionleft = {
            x: this.headposition.x - this.r * (sin ? sin : 0),
            y: this.headposition.y + this.r * (cos ? cos : 0)

        }
        this.headpositionright = {
            x: this.headposition.x + this.r * (sin ? sin : 0),
            y: this.headposition.y - this.r * (cos ? cos : 0)

        }
    }
    //updating--计算障碍中心到head的向量--障碍物产生的力obstacle avoidance
    updatingcalculateobstaclematrix() {

        let obstacle = this.findMostcloseobstacle();
        //	console.log(obstacle)

        this.calculateObstacleavoidance(obstacle);

        this.calculateSeekforce();
        let cosobstaclematrix = this.obstaclematrix.x / this.squalCaculator(this.obstaclematrix, true),
            sinobstaclematriy = this.obstaclematrix.y / this.squalCaculator(this.obstaclematrix, true);
        this.avoidforce = {
            x: (this.obstaclematrix.x),
            y: (this.obstaclematrix.y)
        }
        if (this.squalCaculator(this.obstaclematrix, true) > this.MAX_AVOID_FORCE) {
            this.avoidforce = {
                x: cosobstaclematrix * this.MAX_AVOID_FORCE ? cosobstaclematrix * this.MAX_AVOID_FORCE : 0,
                y: sinobstaclematriy * this.MAX_AVOID_FORCE ? sinobstaclematriy * this.MAX_AVOID_FORCE : 0
            }

        }

        if ((this.calculateDistance(obstacle, false) > obstacle.r) && ((obstacle.currentclickpoints.x - this.currentclickpoints.x) ** 2 + (obstacle.currentclickpoints.y - this.currentclickpoints.y) ** 2 >= (this.r + obstacle.r) ** 2)) {

            this.avoidforce = {
                x: 0,
                y: 0
            }

        } else { }

        //	 console.log(this.avoidforce.x,this.avoidforce.y)
    }
    //距离公式
    distanceFormlation(p1:any,p2:Position1,kf:boolean = false){
        let value = (p1.x - p2.x)**2+(p1.y-p2.y)**2;
        return kf?(value**0.5):value
    }
    //重绘--自身的图片形状
    paintAgain() {
        // this.currentclickpoints.x += this.velocity.x * this.dt;
        // this.currentclickpoints.y += this.velocity.y * this.dt;
        let picindex = 0,
            velocitylength = this.squalCaculator(this.velocity, true),
            v =　{
                x: (this.velocity.x / velocitylength) ? (this.velocity.x / velocitylength) : 0,
                y: (this.velocity.y / velocitylength) ? (this.velocity.y / velocitylength) : 0
            },
         
            part = 0.7071,
            imglist = [{x:0,y:-1},{
                x:part,y:-part
            },{
                x:1,y:0
            },{
                x:part,y:part
            },{
                x:0,y:1
            },{
                x:-part,y:part
            },{
                x:-1,y:0
            },{
                x:-part,y:-part
            }],
            mini = null;
            for(let j=0;j<imglist.length;j++){
                let value = this.distanceFormlation(imglist[j],v,true)
                
               
               if(j==0){
                   mini=value
               }
             
               if(value<=mini){
                   mini = value;
                   picindex = j
               }
            }
         
         if(!this.bodyposition){
            this.currentctx.clearRect(this.currentclickpoints.x - this.velocity.x * this.dt-this.width*0.5-2, this.currentclickpoints.y - this.velocity.y * this.dt-this.height*0.5-2, this.width+3, this.height+3);
            this.currentctx.drawImage(this.picimgList[picindex], this.currentclickpoints.x-this.width*0.5, this.currentclickpoints.y-this.height*0.5, this.width, this.height)
         }else{
             this.bodypositionChangehandler(picindex);
         }
         this.lastpickindex = picindex
    }
    //身体位置的变化 picindex:方向
    bodypositionChangehandler(picindex:number){
        if(picindex!=this.lastpickindex){
            //方向发生突变，
            this.tick = 0;
        }else{
            this.tick+=0.18;
           
            if(this.tick>=5){
                this.tick = 0
            }
        }
     
        if(this.squalCaculator(this.velocity,true)<1&&this.pointDistance(this.destinationpoint,this.currentclickpoints,true)<30){
            this.currentctx.drawImage(this.picimgList[0], this.currentclickpoints.x-this.width*0.5, this.currentclickpoints.y-this.height*0.5, this.width, this.height)
       
        }else{
            this.currentctx.clearRect(this.currentclickpoints.x - this.velocity.x * this.dt-this.width*0.5-2, this.currentclickpoints.y - this.velocity.y * this.dt-this.height*0.5-2, this.width+3, this.height+3);
            this.currentctx.drawImage(this.picimgList[picindex*5+parseInt(this.tick.toString())], this.currentclickpoints.x-this.width*0.5, this.currentclickpoints.y-this.height*0.5, this.width, this.height)
       
        }
       }
    //////////////////////steering behavior↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    //计算最近的距离
    calculateDistance(obstacle: any, usemiddle: boolean = false) {
        if (!usemiddle) {
            let left = (((this.headpositionleft.x - obstacle.currentclickpoints.x) ** 2 + (this.headpositionleft.y - obstacle.currentclickpoints.y) ** 2)) ** 0.5,
                right = (((this.headpositionright.x - obstacle.currentclickpoints.x) ** 2 + (this.headpositionright.y - obstacle.currentclickpoints.y) ** 2)) ** 0.5

            return left <= right ? left : right
        } else {
            return (((this.headposition.x - obstacle.currentclickpoints.x) ** 2 + (this.headposition.y - obstacle.currentclickpoints.y) ** 2)) ** 0.5
        }

    }
    ////计算最近的障碍物
    findMostcloseobstacle() {
        let tempobstaclearray = []

        // return 
        for (let j = 0; j < eventlist.tanklist.length; j++) {
            if (eventlist.tanklist[j]._id != this._id) {
                tempobstaclearray.push(eventlist.tanklist[j]);

            }
        }
        let obstacle = tempobstaclearray[0];

        for (let j = 0; j < tempobstaclearray.length; j++) {
            if (tempobstaclearray[j]._id != this._id) {
                if (tempobstaclearray[j + 1]) {
                    if (this.calculateDistance(tempobstaclearray[j + 1], true) < this.calculateDistance(obstacle)) {
                        obstacle = tempobstaclearray[j + 1]
                    }
                }
            }

        }
        return obstacle
    }
    //handle multi-entitys have the same destination
		handleDestinations() {
		    if (this.multiselect) {
            
                // console.log(this.pointDistance(this.currentclickpoints, this.targetpoint,true),this.r,"呵呵呵")
                //当前位置已抵达终点
          
		        if (this.pointDistance(this.currentclickpoints, this.targetpoint,true)>(this.r*1)-50&&this.pointDistance(this.currentclickpoints, this.targetpoint,true)<(this.r*1)+50) {
                         this.stable = true
                    let obstacle = this.minDistancefromcenter();
                    if(obstacle){
                        if ((this.pointDistance(obstacle.currentclickpoints, this.currentclickpoints) < ((this.r + obstacle.r) ** 2) + 100)
                        && (this.pointDistance(obstacle.currentclickpoints, this.currentclickpoints) > ((this.r + obstacle.r) ** 2) - 100)) {
                       //
            
                       obstacle.destinationpoint.x = obstacle.currentclickpoints.x;
                       obstacle.destinationpoint.y = obstacle.currentclickpoints.y;
                       clearInterval(obstacle.timer);
                       obstacle.timer = null;
                       obstacle.stable = true
                      // this.timer = null;
                   }
                    }
		         

		        } else {
                    //当前位置未到达终点TODO--  有点问题
                    let obstacle = this.minDistancefromcenter();
                //    console.log('调整中');
                    if(obstacle){
                        if ((this.pointDistance(obstacle.currentclickpoints, this.currentclickpoints) < ((this.r + obstacle.r) ** 2) + 100)
                        && (this.pointDistance(obstacle.currentclickpoints, this.currentclickpoints) > ((this.r + obstacle.r) ** 2) - 100)
                        &&(obstacle.stable)) {
                       //
                      console.log('调整成功')
                     
                       this.destinationpoint.x = this.currentclickpoints.x;
                       this.destinationpoint.y = this.currentclickpoints.y;
                       clearInterval(this.timer)
                       this.timer = null;
                       this.stable = true
                   }
                    }
                   
                    
                   
				}
               
		    }

		}
    //计算两个机车圆心的距离
    minDistancefromcenter(){
        let temp = []
        for(let j=0;j<eventlist.tanklist.length;j++){
            if(eventlist.tanklist[j].multiselect&&this._id!=eventlist.tanklist[j]._id){
                temp.push(eventlist.tanklist[j])
            }
        }
        let obstacle = temp[0];
        for(let j=0;j<temp.length;j++){
            if(this.pointDistance(this.currentclickpoints,temp[j].currentclickpoints)<=this.pointDistance(this.currentclickpoints,obstacle.currentclickpoints)){
                obstacle = temp[j]
            }
        }
      return obstacle;
    }
    //distance function 计算两点之间的距离
		pointDistance(obj1:Position1,obj2:Position1,kf=false):number{
			let distance =  (obj1.x-obj2.x)**2 +(obj1.y - obj2.y)**2;
            return kf?(distance**0.5):distance			
			
		}
    //计算-seek
    calculateSeekforce() {
        let destination = {
            x: this.destinationpoint.x - this.currentclickpoints.x,
            y: this.destinationpoint.y - this.currentclickpoints.y
        }

        let cons = destination.x / ((destination.x) ** 2 + (destination.y) ** 2) ** 0.5;
        let sins = destination.y / ((destination.x) ** 2 + (destination.y) ** 2) ** 0.5;
        let currentspendlength = ((destination.x) ** 2 + (destination.y) ** 2) ** 0.5;


        //这是期望的最大速度
        let destinationvelocity = {
            x: (cons * this.MAX_SPEED) ? (cons * this.MAX_SPEED) : 0,
            y: (sins * this.MAX_SPEED) ? sins * this.MAX_SPEED : 0

        }

        //假设朝向终点的seekforce与物体到终点的长度成正比?
        this.seekforce = {
            x: (destinationvelocity.x - this.velocity.x),
            y: (destinationvelocity.y - this.velocity.y)
            //TODO--控制力太小了？？x10
        }
        //上述假设不成立  假设牵引力大小始终为恒定值？
        //    this.seekforce = {
        //        x:this.MAX_SEEK_FORCE*(this.seekforce.x/(this.squalCaculator(this.seekforce,true))),
        //        y:this.MAX_SEEK_FORCE*(this.seekforce.y/(this.squalCaculator(this.seekforce,true)))
        //    }
        if (this._id == 2) {
            // console.log(this.seekforce.x, this.seekforce.y)
        }

    }

    //Square conversion  计算长度本身上
    squalCaculator(obj: Position1, needgh: boolean = false) {
        let value = obj.x ** 2 + obj.y ** 2;
        return needgh ? (value ** 0.5) : value
    }
    //位置检测函数 如果两者的距离小于了两者圆心的距离则迅速让其分离
    positionTestfunc() {
        let obstacle = this.findMostcloseobstacle();
        let speedlength = this.squalCaculator(this.velocity, true)
        if ((obstacle.currentclickpoints.x - this.currentclickpoints.x) ** 2 + (obstacle.currentclickpoints.y - this.currentclickpoints.y) ** 2 + speedlength * this.dt * 2 < (this.r + obstacle.r) ** 2) {

            let this2obstacle = {
                x: obstacle.currentclickpoints.x - this.currentclickpoints.x,
                y: obstacle.currentclickpoints.y - this.currentclickpoints.y

            }
            let ethis2obstacle = {
                x: (this2obstacle.x / this.squalCaculator(this2obstacle, true)) ? (this2obstacle.x / this.squalCaculator(this2obstacle, true)) : 0,
                y: (this2obstacle.y / this.squalCaculator(this2obstacle, true)) ? (this2obstacle.y / this.squalCaculator(this2obstacle, true)) : 0,

            }
            let cose = (this.velocity.x * this2obstacle.x + this.velocity.y * this2obstacle.y) / ((this.squalCaculator(this.velocity, true)) * (this.squalCaculator(this2obstacle, true)));
            if (cose < 0) {
                return;
            } else {
                let velocitylength = this.squalCaculator(this.velocity, true);
                let striktlength = velocitylength * (cose ? cose : 0)
                let velocitylengthmatrix = {
                    x: ethis2obstacle.x * striktlength,
                    y: ethis2obstacle.y * striktlength

                }
                this.velocity = {
                    x: this.velocity.x - velocitylengthmatrix.x,
                    y: this.velocity.y - velocitylengthmatrix.y

                }
            }
            // let overlapdistance = ((((obstacle.currentclickpoints.x - this.currentclickpoints.x) ** 2 + (obstacle.currentclickpoints.y - this.currentclickpoints.y) ** 2) ** 0.5 - (this.r + obstacle.r)) ** 2) ** 0.5,
            // overlapobj = {
            //     x: this.currentclickpoints.x - obstacle.currentclickpoints.x,
            //     y: this.currentclickpoints.y - obstacle.currentclickpoints.y
            // },

            // cos = overlapobj.x / ((overlapobj.x) ** 2 + (overlapobj.y) ** 2) ** 0.5,
            // sin = overlapobj.y / ((overlapobj.x) ** 2 + (overlapobj.y) ** 2) ** 0.5;
            // this.currentclickpoints.x = this.currentclickpoints.x + (overlapdistance) * cos
            //     this.currentclickpoints.y = this.currentclickpoints.y + (overlapdistance) * sin

        }
    }
    //实时更新速度
    updatingVelocity() {
        let obstacle = this.findMostcloseobstacle();

        let acceleration = {
            x: (this.seekforce.x + this.avoidforce.x) / this.mass ? (this.seekforce.x + this.avoidforce.x) / this.mass : 0,
            y: (this.seekforce.y + this.avoidforce.y) / this.mass ? (this.seekforce.y + this.avoidforce.y) / this.mass : 0
        }

        let directionofmiles = {
            x: obstacle.currentclickpoints.x - this.currentclickpoints.x,
            y: obstacle.currentclickpoints.y - this.currentclickpoints.y
        }
        let xvelocity = acceleration.x / (acceleration.x ** 2 + acceleration.y ** 2) ** 0.5,
            yvelocity = acceleration.y / (acceleration.x ** 2 + acceleration.y ** 2) ** 0.5;

        this.velocity = {
            //  x: velocityall * xvelocity + id * 2,
            x: this.velocity.x + (acceleration.x ? acceleration.x : 0) * this.dt,
            y: this.velocity.y + (acceleration.y ? acceleration.y : 0) * this.dt
            //y: velocityall * yvelocity + id * 2
        };
        let all = ((this.velocity.x) ** 2 + this.velocity.y ** 2) ** 0.5;
        if (this.squalCaculator(this.avoidforce, true) < 0.0001) {
            //方向为seekforce的方向
            // let cosseek = this.seekforce.x/this.squalCaculator(this.seekforce,true),
            //     sinseek = this.seekforce.y/this.squalCaculator(this.seekforce,true);
            //     this.velocity = {
            //         x:(cosseek?cosseek:0)*this.MAX_SPEED,
            //         y:(sinseek?sinseek:0)*this.MAX_SPEED
            //  }
        }
        if (all > this.MAX_SPEED) {
            let cosa = this.velocity.x / ((this.velocity.x) ** 2 + this.velocity.y ** 2) ** 0.5;
            let sina = this.velocity.y / ((this.velocity.x) ** 2 + this.velocity.y ** 2) ** 0.5
            this.velocity = {
                x: this.MAX_SPEED * (cosa ? cosa : 0),
                y: this.MAX_SPEED * (sina ? sina : 0)
            }
        }


        //	  clearInterval(this.movingtimer)
        this.positionTestfunc()
        // this.motivateForce();

        //	 console.log(this.velocity)
    }

    //计算-obstacle avoidance
    calculateObstacleavoidance(obstacle: any) {
      
        this.obstaclematrix = {
            x: (this.headposition.x - obstacle.currentclickpoints.x),
            y: (this.headposition.y - obstacle.currentclickpoints.y)
        };
    }
    //实时更新位移
    updatingDisplacement() {
        //如果快到边边了 返回去
        // if (this.currentclickpoints.x > 700 || this.currentclickpoints.y > 700 || this.currentclickpoints.x < 0 || this.currentclickpoints.y < 0) {
        //     this.velocity = {

        //         x: -this.velocity.x,
        //         y: -this.velocity.y
        //     }

        // }
        if((this.currentclickpoints.x-this.targetpoint.x)**2+(this.currentclickpoints.y-this.targetpoint.y)**2<1){
            this.handleEntityisinstable(true);
        }else{
                this.handleEntityisinstable(false);
        }
        let ds = {
            x: this.velocity.x * this.dt,
            y: this.velocity.y * this.dt
        }
        this.currentclickpoints.x += ds.x;
        this.currentclickpoints.y += ds.y;
    }
    //处理物体是否处于稳定状态
    handleEntityisinstable(state:boolean){
        // this.stable = state;
        // if(this.stable){
        //     this.velocity = {
        //         x:0,
        //         y:0
        //       }
        // }
     
    }
    //////////////////////steering behavior↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    //选中时显示血量
    showBloodlength(x: number = this.currentclickpoints.x, y: number = this.currentclickpoints.y) {
        let ablood = this.obwidth/this.maxblood;
        this.currentctx.clearRect(this.currentclickpoints.x - this.velocity.x * this.dt-this.obwidth*0.5-3,this.currentclickpoints.y - this.velocity.y * this.dt-this.obheight*0.5-11-3,this.obwidth+(1/5)*ablood+6,7+6);

        if(this.selected||this.multiselect){
            this.currentctx.fillStyle='white'
            this.currentctx.fillRect(this.currentclickpoints.x-this.obwidth*0.5,this.currentclickpoints.y-this.obheight*0.5-11,this.obwidth+(1/5)*ablood,7);

            for(let j=0;j<this.maxblood;j++){
                this.currentctx.fillStyle='white';
                this.currentctx.fillRect(j*ablood+this.currentclickpoints.x-this.obwidth*0.5,this.currentclickpoints.y-this.obheight*0.5-10,ablood*(1/5),5);

                this.currentctx.fillStyle='rgb(16,201,19)';
                if(this.blood<=0.5*this.maxblood){
                    //TODO-- 注意血量低于1/2 显示红色
                    this.currentctx.fillStyle='red';
                }
                this.currentctx.fillRect(j*ablood+this.currentclickpoints.x-this.obwidth*0.5+(1/5)*ablood,this.currentclickpoints.y-this.obheight*0.5-10,(4/5)*ablood,5);

                if(j>this.blood){
                    this.currentctx.fillStyle='gray';
                    this.currentctx.fillRect(j*ablood+this.currentclickpoints.x-this.obwidth*0.5,this.currentclickpoints.y-this.obheight*0.5-10,(4/5)*ablood,5);
    
                    this.currentctx.fillStyle='black';
                    this.currentctx.fillRect(j*ablood+this.currentclickpoints.x-this.obwidth*0.5+(1/5)*ablood,this.currentclickpoints.y-this.obheight*0.5-10,(4/5)*ablood,5);
    
                }
              
              }

           
            // this.currentctx.fillStyle = "green";
            // this.currentctx.clearRect(x - 10, y - 10 - 5, 50 + 2, 10 + 2);
            // this.currentctx.fillRect(this.currentclickpoints.x - 10, this.currentclickpoints.y - 10 - 5, 50, 10)
            
        }
     
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
            that.currentctx.drawImage(this.baseimg, this.currentclickpoints.x-this.width*0.5, this.currentclickpoints.y-this.height*0.5, this.width, this.height)

        }.bind(that)
        this.position = {
            x: 10,
            y: 10
        }
     //  this.loopMethods();
        // this.select(canvas)
    }
    loopMethods(){
            this.paintAgain();
            this.showBloodlength();
      //  window.requestAnimationFrame(this.loopMethods.bind(this))
    }



}
