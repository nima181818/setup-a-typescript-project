import { Structure } from "./structure";
import { transformimg } from "../assets/imgurltransform";
const image = require('../assets/solderfactory.png');
export class Soliderfactory extends Structure{
    baseimg: HTMLImageElement
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        this.paint(position);
    }
    paint(position: { x: number, y: number }) {
        console.log(image, "wocao")
        let img = transformimg(image.default);
        console.log(require, "9999999999999999");
        this.baseimg = img;
       this.baseimg.onload = function () {
            this.ctx.drawImage(this.baseimg, position.x,position.y, this.size.x, this.size.y);
        }.bind(this)

    }
}