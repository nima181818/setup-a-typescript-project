import {Structure} from './structure';
import {wcfobj,imginits} from './structureimgsinits'
export class Wcf extends Structure{
    constructor(unittype:string,bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(unittype,bl, owner, position, name, ctx,size)
        //this.paint(position);
        this.imgUrllist =wcfobj.wcfimgUrllist
        this.circletime = 100;
        this.animationendstart = 6;
        this.animationend = 10
        this.size = {
            x:1970/12,  //TODO--
            y:1610/12
        }
        this.needanimation = false
        imginits(wcfobj.wcfimgUrllist,wcfobj.wcfimgList).then(()=>{
            this.imginitsuccess = true;
            this.imgList = wcfobj.wcfimgList
            this.paint(position)
        })
        this.cost = 250
        this.blood=30
       //TODO--未添加发电厂的障碍
    }
}