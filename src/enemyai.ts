
import {Player} from './player'
export class Timemanager{
    currenttime:number
    gamestarttime:number
    looptime:number=0
    kuilei:Player
     constructor(kuilei:Player){
         this.gamestarttime = new Date().getTime();
         this.kuilei = kuilei
         this.flushTime()
     }
     //刷新时间
     flushTime(){
         window.setInterval(()=>{
          this.currenttime = new Date().getTime();
          this.looptime+=0.5
          this.beginningBuilding()
         },500)
     }
     beginningBuilding(){
         
        // powerstation soliderfactory wcf oil prismtower
       if(this.looptime==1){
           //1s 后修建第一个 电场
           this.kuilei.createStructure('powerstation')
       }
       if(this.looptime==5){
          //5s后修建第二个电场
          this.kuilei.createStructure('powerstation')
       }
       if(this.looptime==10){
           //第10秒 修建
        this.kuilei.createStructure('oil')
       }
       if(this.looptime==15){
        //第15秒 修建第三个电场
        debugger
     this.kuilei.createStructure('powerstation')
       }
       if(this.looptime==20){
        //第20秒 修建第2个油井
    // this.kuilei.createStructure('oil');
    this.kuilei.createStructure('powerstation')
   
       }
       if(this.looptime==30){
        //第20秒 修建第2个油井
    // this.kuilei.createStructure('oil');
    this.kuilei.createStructure('wcf')
   
       }
       if(this.looptime==35){
        //第20秒 修建第2个油井
    // this.kuilei.createStructure('oil');
    this.kuilei.createStructure('soliderfactory')
   
       }
     }
}
class StateMachine{
    state:string
}