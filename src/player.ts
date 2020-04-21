import {structuresets} from './Structureclass/structureSet'

import { eventlist } from './Tankclass/Eventlist';

export class Player{
    baseMapcanvas:HTMLCanvasElement
    topUnitscanvas:HTMLCanvasElement
    structuresets:any
    eventlist:any
    money:number=1000
    moneyelement:HTMLDivElement
    constructor(){
    //    this.
          this.structuresets = structuresets
          this.eventlist = eventlist;
          this.initCanvas();
    }
    //初始化canvas |以及金钱
    initCanvas(){
        let canvas1: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement,
              canvas2: HTMLCanvasElement = document.getElementById('canvas2') as HTMLCanvasElement;
              this.baseMapcanvas = canvas1;
              this.topUnitscanvas = canvas2;
              this.moneyelement =  document.getElementsByClassName('tops')[0] as HTMLDivElement;
    }
    //更新金币
    updateMoney(type:string,value:number){
        if(type=='add'){
            this.money+=value;
        }
        if(type=='reduce'){
            this.money-=value
        }
        this.moneyelement.innerHTML = '$'+this.money.toString()
    }
   
   
    
}
export let player1 = new Player()