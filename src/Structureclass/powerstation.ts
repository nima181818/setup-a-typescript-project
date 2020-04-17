import {Structure} from './structure';
import {powerstationobj,imginits} from './structureimgsinits'
export class Powerstation extends Structure{
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        this.imgUrllist = powerstationobj.powerstationimgUrllist
        this.circletime = 100;
        this.animationendstart = 6;
        this.animationend = 10
        this.size = {
            x:1211/2,
            y:1009/2
        }
        imginits(powerstationobj.powerstationimgUrllist,powerstationobj.powerstationimgList).then(()=>{
            this.imginitsuccess = true;
            this.imgList = powerstationobj.powerstationimgList
            this.paint(position)
        })
        this.needanimation = true
      
       //TODO--未添加发电厂的障碍
    }
}