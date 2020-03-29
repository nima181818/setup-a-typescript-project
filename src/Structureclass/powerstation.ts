import {Structure} from './structure';
const pb1 = require('../assets/powerstation/p-b1.png');
const pb2 = require('../assets/powerstation/p-b2.png')
const pb3 = require('../assets/powerstation/p-b3.png')
const pb4 = require('../assets/powerstation/p-b4.png')
const pb5 = require('../assets/powerstation/p-b5.png')
const pb6 = require('../assets/powerstation/p-b6.png');
const ps1 = require('../assets/powerstation/p-s1.png');
const ps2 = require('../assets/powerstation/p-s2.png');
const ps3 = require('../assets/powerstation/p-s3.png');
const ps4 = require('../assets/powerstation/p-s4.png');
const ps5 = require('../assets/powerstation/p-s5.png');
export class Powerstation extends Structure{
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        //this.paint(position);
        this.imgUrllist = [
            pb1.default,
            pb2.default,
            pb3.default,
            pb4.default,
            pb5.default,
            pb6.default,
            ps1.default,
            ps2.default,
            ps3.default,
            ps4.default,
            ps5.default
        ]
        this.circletime = 100;
        this.animationendstart = 6;
        this.animationend = 10
        this.size = {
            x:1211/1.5,
            y:1009/1.5
        }
        this.needanimation = true
        this.initImgelement().then(res=>{
            this.paint(position)
        })
       
    }
}