import {Structure} from './structure';
import {wcfobj,imginits} from './structureimgsinits'
export class Wcf extends Structure{
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        //this.paint(position);
        this.imgUrllist =wcfobj.wcfimgUrllist
        this.circletime = 100;
        this.animationendstart = 6;
        this.animationend = 10
        this.size = {
            x:1970/2,  //TODO--
            y:1610/2
        }
        this.needanimation = false
        imginits(wcfobj.wcfimgUrllist,wcfobj.wcfimgList).then(()=>{
            this.imginitsuccess = true;
            this.imgList = wcfobj.wcfimgList
            this.paint(position)
        })
       //TODO--未添加发电厂的障碍
    }
}