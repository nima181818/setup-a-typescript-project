import {Structure} from './structure';
const wcf1 = require('../assets/wcf/wcf1.png');
const wcf2 = require('../assets/wcf/wcf2.png')
const wcf3 = require('../assets/wcf/wcf3.png')
const wcf4 = require('../assets/wcf/wcf4.png')
const wcf5 = require('../assets/wcf/wcf5.png')

export class Wcf extends Structure{
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        //this.paint(position);
        this.imgUrllist = [
            wcf1.default,
            wcf2.default,
            wcf3.default,
            wcf4.default,
            wcf5.default
        ]
        this.circletime = 100;
        this.animationendstart = 6;
        this.animationend = 10
        this.size = {
            x:1970/2,  //TODO--
            y:1610/2
        }
        this.needanimation = false
        this.initImgelement().then(res=>{
            this.paint(position)
        })
       //TODO--未添加发电厂的障碍
    }
}