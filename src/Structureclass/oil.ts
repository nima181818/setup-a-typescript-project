import {Structure} from './structure';
const oil1 = require('../assets/oilstructure/oil1.png');
const oil2 = require('../assets/oilstructure/oil2.png')
const oil3 = require('../assets/oilstructure/oil3.png')
const oil4 = require('../assets/oilstructure/oil4.png')
const oil5 = require('../assets/oilstructure/oil5.png')
const oil6 = require('../assets/oilstructure/oil6.png');
const oil7 = require('../assets/oilstructure/oil7.png');
// const oil8 = require('../assets/oilstructure/oil8.png');

export class Oil extends Structure{
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        //this.paint(position);
        this.imgUrllist = [
            oil1.default,
            oil2.default,
            oil3.default,
            oil4.default,
            oil5.default,
            oil6.default,
            oil7.default,
            // oil8.default,
            // oil7.default,
            oil6.default,
            oil5.default,
            oil4.default,
            oil3.default,
            oil2.default,
            oil1.default,
        ]
        this.circletime = 100;
        this.animationendstart = 1;
        this.needanimation = true
        this.animationend = this.imgUrllist.length-1;
        this.size = {
            x:1211/2,
            y:1009/2
        }
        this.needanimation = true
        this.initImgelement().then(res=>{
            this.paint(position)
        })
        //TODO--未添加发电厂的障碍
    }
}