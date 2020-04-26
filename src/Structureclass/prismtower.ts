import {Structure} from './structure';
import {ptobj,imginits} from './structureimgsinits';
import {world} from '../World'
import {ptattack_audio} from '../assets/audios/audio'

const powerstationobstacle = require('./powerstation.json');  //TODO--
export class Prismtower extends Structure{
    firerange:number=130
    firetimer:number=null
    constructor(unittype:string,bl: number, owner: string, position: { x: number, y: number }, name: string, ctx: HTMLCanvasElement,size:{x:number,y:number}) {
        super(unittype,bl, owner, position, name, ctx,size)
        this.imgUrllist = ptobj.ptimgUrllist
        this.circletime = 100;
        this.animationendstart = 6;
        this.animationend = 14
        
        this.size = {
            x:48,
            y:95
        }
        this.cost = 400
        imginits(ptobj.ptimgUrllist,ptobj.ptimgList).then(()=>{
            this.imginitsuccess = true;
            this.imgList = ptobj.ptimgList
            this.paint(position)
        })
        this.blood=20
        this.needanimation = true
        this.handleSelfobstacle(powerstationobstacle.obstacle)
       //
    }
    //监听模式
    watchMode(){
        let othereventlist = world.getEventlist('all',this.unittype),
            distance=10**9,
            index=0,
            structureposition={
                x:this.positions.x+this.size.x*0.5,
                y:this.positions.y+this.size.y*0.5
            }
           //这里处理了 tank  
           for(let j=0;j<othereventlist.tanklist.length;j++){
            if(distance>=this.pointDistance(othereventlist.tanklist[j].currentclickpoints,structureposition,true)){
                distance = this.pointDistance(othereventlist.tanklist[j].currentclickpoints,structureposition,true);
                index = j
             }

    }
    if(distance<=this.firerange){
             this.fire()
        //
    }else{
        console.log(distance,this.firerange)
    }
    }
    //攻击
    fire(){
        if(!this.firetimer){
            this.firetimer = window.setTimeout(()=>{
             //TODO--
              this.xrayAttack()
           clearTimeout(this.firetimer);
           this.firetimer = null
            },600)
        }
      
    }
    //射线攻击
    xrayAttack(){
        //   console.log('开始攻击')
          ptattack_audio.playAudio()
    }
}