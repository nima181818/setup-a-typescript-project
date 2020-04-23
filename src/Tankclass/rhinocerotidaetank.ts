import { Tank } from './Tank'

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
    speed: number = 2
    firerange:number=150 //攻击距离 在该区域下会自动攻击 
    constructor(unittype:string,position: Position1) {
        super(unittype,position)
       
        this.width = 40; //覆盖父的
        this.obwidth = this.width;
        this.firerate = 500;

        this.height = 40; //覆盖父的
        this.obheight = this.height
        this.blood = 20;
        this.maxblood = 20
        this.MAX_SPEED = 30;

        this._name = 'rhinocerotidaetank'
        this.imgList = [imagetop.default, imagert.default, imagerig.default, imagerb.default, imagebot.default, imagelb.default, imagelef.default, imagelt.default, imagetop.default];
        this.initPicimg();
        rvosystem.addVihcles(this);
        // console.log(rvosystem,"rvo系统")
      //  setInterval(()=>{
       //     this.fire();
       // },3000)
       this.harm = 3;
    }
    fire(position:pointerface,targetobject:any) {
      //  if(this._id==0){
            let that = this
            let j = 0
            let bullet = new Bullet(that,this.harm, targetobject,{
                x: this.currentclickpoints.x,
                y: this.currentclickpoints.y
            }, {
                width: 4,
                height: 4
    
            }, 10,
            position, this.currentctx,{width:62,height:78})
                bullet.run_tank();
    //    }
        }
       
}