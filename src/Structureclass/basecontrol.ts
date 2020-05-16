import { Structure } from './structure'
import { transformimg } from '../assets/imgurltransform';
import {baseobj,imginits} from './structureimgsinits'
const image = require('../assets/base.png');
const basecontrolobstacle = require('./basecontrol.json');
// import baseimg from './assets/base.jpg'

// alert(image);
export class BaseControl extends Structure {
    baseimg: HTMLImageElement
    innewbuilding:boolean=false
    constructor(unittype:string,bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(unittype,bl, owner, position, name, ctx,size)
        imginits(baseobj.baseimgUrllist,baseobj.baseimgList).then(res=>{
            this.imgList = baseobj.baseimgList;
            this.imginitsuccess = true;
            this.paint(position)
        })
        this.handleSelfobstacle(basecontrolobstacle.obstacle)
        this.blood=45
        this.cost = 0
    }
    
    paint(position: { x: number, y: number }) {
         let index = 0;
      
            
            
            this.animationtimer = window.setInterval(()=>{
                this.ctx.clearRect(position.x,position.y, this.size.x, this.size.y);
                this.ctx.drawImage(this.imgList[parseInt(index.toString())], position.x,position.y, this.size.x, this.size.y);
                if(this.innewbuilding){
                    index+=0.5;
                   if(index>=this.imgList.length-1){
                       this.innewbuilding = false;
                       index=0;
                   }
                }
                
            },16.6)
       

    }
    newBuildingadded(){
        this.innewbuilding = true;
    }
}
let canvas2= document.getElementById('canvas2') as HTMLCanvasElement;
// export let baseControl = new BaseControl(10, '20', { x: 900, y: 600 }, 'base', canvas2, { x: 98.9 * 1.5, y: 58.5 * 1.5 })