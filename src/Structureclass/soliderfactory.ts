import { Structure } from "./structure";

const structurepbstacle = require('./soliderfactoryobstacle.json');//注意这是相对位置，要转换为地图的绝对位置
const Soliderfactoryimg1 = require('../assets/infantry/infantry-1.png');
const Soliderfactoryimg2 = require('../assets/infantry/infantry-2.png')
const Soliderfactoryimg3 = require('../assets/infantry/infantry-3.png')
const Soliderfactoryimg4 = require('../assets/infantry/infantry-4.png')
const Soliderfactoryimg5 = require('../assets/infantry/infantry-5.png')
const Soliderfactoryimg6 = require('../assets/infantry/infantry-6.png')
const image = require('../assets/solderfactory.png');
export class Soliderfactory extends Structure{
    baseimg: HTMLImageElement
    constructor(bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(bl, owner, position, name, ctx,size)
        //this.paint(position);
        this.imgUrllist = [
            Soliderfactoryimg1.default,
            Soliderfactoryimg2.default,
            Soliderfactoryimg3.default,
            Soliderfactoryimg4.default,
            Soliderfactoryimg5.default,
            Soliderfactoryimg6.default,
        ]
      
        this.size = {
            x:528,
            y:972
        }
        this.initImgelement().then(res=>{
            this.paint(position)
        })
       this.handleSelfobstacle(structurepbstacle.obstacle)
    }
    
}