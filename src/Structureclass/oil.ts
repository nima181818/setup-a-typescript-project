import {Structure} from './structure';


import {oilobj,imginits} from './structureimgsinits'
export class Oil extends Structure{
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        //this.paint(position);
        this.imgUrllist = oilobj.oilimgUrllist
        this.circletime = 100;
        this.animationendstart = 1;
        this.needanimation = true
        this.animationend = this.imgUrllist.length-1;
        this.size = {
            x:1211/2,
            y:1009/2
        }
        this.needanimation = true
        imginits(oilobj.oilimgUrllist,oilobj.oilimgList).then(()=>{
            this.imginitsuccess = true;
            this.imgList = oilobj.oilimgList
            this.paint(position)
        })
        //TODO--未添加发电厂的障碍
    }
}