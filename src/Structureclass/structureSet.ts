import {BaseControl} from './basecontrol';
import {Powerstation} from './powerstation';
import {Soliderfactory} from './soliderfactory';
import {Oil} from './oil'

import {Wcf} from './wcf'

 export class Structuresets{
     base:BaseControl[]=[]
     powertation:Powerstation[]=[]
     soliderfactory:Soliderfactory[]=[]
     oil:Oil[]=[]
     wcf:Wcf[]=[]
     unitsList:any={}
     constructor(){
          this.unitsList.base = this.base;
          this.unitsList.powertation = this.powertation;
          this.unitsList.soliderfactory = this.soliderfactory;
          this.unitsList.oil = this.oil;
          this.unitsList.wcf = this.wcf
     }
     //增加-新建_死亡-减少建筑
     operationStructure(name,type:string,obj:BaseControl|Powerstation|Soliderfactory|Oil|Wcf){
         for(let j in this.unitsList){
             if(j==name){
                 if(type=='add'){
                    this.unitsList[name].push(obj)
                 }else{
                   //TODO-- 这还没完
                    this.unitsList[name].splice(j,1);
                 }
                 
             }
         }
     }
     //建筑的动画也均在此完成 TODO-- 还未实施
     structureAnimation(){
        for(let j in this.unitsList){
            for(let k=0;k<this.unitsList[j].length;k++){
                this.unitsList[j][k].paint(this.unitsList[j][k].position);
            }
        }
        window.requestAnimationFrame(this.structureAnimation.bind(this))
     }
    

}
export let structuresets = new Structuresets();