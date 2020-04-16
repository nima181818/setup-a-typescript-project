import { Tank } from './Tank'

import { rvosystem } from '../utils/rovpathfindinghelper';
import { Bullet } from './Bullet';

  
interface Position1 {
    x: number
    y: number
}
interface Position1 {
    x: number
    y: number
}
//alert('wocao')

 class Liberationarmy extends Tank {
    speed: number = 2
    firerange:number=190 //攻击距离 在该区域下会自动攻击 
    constructor(position: Position1) {
        super(position)
       
        this.width = 19; //覆盖父的
        this.height = 24; //覆盖父的
        this.blood = 12;
        this.maxblood = 12
        this.MAX_SPEED = 18
        // this.imgList = [imagetop.default, imagert.default, imagerig.default, imagerb.default, imagebot.default, imagelb.default, imagelef.default, imagelt.default, imagetop.default];
       // this.initPicimg();
       this.imgList = imgList
        this.picimgList = picimgList
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
export {Liberationarmy}