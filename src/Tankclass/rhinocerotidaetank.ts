import { Tank } from './Tank'
import { globalAstarmanage } from '../utils/wayfinders'
import { Watcher } from '../utils/watcher';
import { eventlist } from './Eventlist';
import { rvosystem } from '../utils/rovpathfindinghelper';
import { Bullet } from './Bullet'
const imagelb = require('../assets/rhinocerotidaetank/rhinocerotidaetank-lb.png');//↙
const imagebot = require('../assets/rhinocerotidaetank/rhinocerotidaetankbot.png');//↓
const imagelef = require('../assets/rhinocerotidaetank/rhinocerotidaetanklef.png');//←
const imagelt = require('../assets/rhinocerotidaetank/rhinocerotidaetanklt.png');//↖
const imagerb = require('../assets/rhinocerotidaetank/rhinocerotidaetankrb.png');//↘
const imagerig = require('../assets/rhinocerotidaetank/rhinocerotidaetankrig.png');//→
const imagert = require('../assets/rhinocerotidaetank/rhinocerotidaetankrt.png');//↗
const imagetop = require('../assets/rhinocerotidaetank/rhinocerotidaetanktop.png');//↑
interface Position1 {
    x: number
    y: number
}
interface Position1 {
    x: number
    y: number
}
export class Rhinocerotidaetank extends Tank {


    blood: number
    matrixposition: Position1 = { x: 0, y: 0 }
    watcher: Watcher<Rhinocerotidaetank>
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
    firerange:number=190 //攻击距离 在该区域下会自动攻击 
    ownobstacles: Position1[] = []
    constructor(position: Position1) {
        super(position)
        // Tank.id++;
        // this._id = Tank.id;
        // console.log('当前id',this._id)
        this.width = 40; //覆盖父的
        this.height = 40; //覆盖父的

        this.blood = 20;
        this.maxblood = 20
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
        globalAstarmanage.setStartpointandendpoint(this.closeFunc(this.currentclickpoints.y), this.closeFunc(this.currentclickpoints.x), 'startpoint');
        this.initStartpointendpoint();
        this.imgList = [imagetop.default, imagert.default, imagerig.default, imagerb.default, imagebot.default, imagelb.default, imagelef.default, imagelt.default, imagetop.default];
        this.initPicimg();
        rvosystem.addVihcles(this);
        // console.log(rvosystem,"rvo系统")
    }
    fire() {
        if(this._id==0){
            let that = this
            let j = 0
            let bullet = new Bullet(that, {
                x: this.currentclickpoints.x,
                y: this.currentclickpoints.y
            }, {
                width: 4,
                height: 4
    
            }, 10,
                { x: 1000, y: 500 }, this.currentctx,{width:62,height:78})
                bullet.run();
        }
        }
       
}