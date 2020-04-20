interface positions {
    x: number
    y: number
}
/*
  军营的基础计算位置是按照{ x: 100, y: 0 }参考的 且是5为单位的
  基地是900 600 10

*/
console.log(Multithread, "wocao")
import { globalAstarmanage } from '../utils/wayfinders';
import { eventlist } from '../Tankclass/Eventlist';
import {structuresets} from './structureSet'
// import {baseControl} from './basecontrol'
class Structure {
    static ids:number=0
    _id:number
    name: string
    imginitsuccess:boolean=false
    blood: number
    owner: string
    imgsize: positions
    ctx: any
    imgList: Array<HTMLImageElement> = []
    imgUrllist: Array<string> = []
    positions: positions
    size: positions
    circletime: number = 16.6 //对于不同的建筑物，动画是不一样的
    animationtimer: number = null
    needanimation: boolean = false
    animationendstart: number
    animationend: number
    ownobstacles: positions[] = [] //存取自身的障碍矩阵 已/5
    constructor(bl: number, owner: string, position: positions, name: string, ctx: HTMLCanvasElement, size: positions) {
        this.blood = bl;
        Structure.ids++;
        this._id = Structure.ids
        this.owner = owner
        this.positions = position
        this.name = name
        this.size = size
        this.ctx = ctx.getContext('2d');
        structuresets.operationStructure(this.name,'add',this)
        // this.paint(position)
        if(this.name!='base'){
            if(structuresets.base.length){
                
                structuresets.base[0].newBuildingadded();
            }
           
        }
        console.log(structuresets)
    }
    
   
    //
     /*
    1,死亡时发出声音 TODO
    2，清理自己在globalMap的障碍
    3，清理自己的drawImage
    4，弹出
  */
    destroy() {
        clearInterval(this.animationtimer);
        this.animationtimer = null;
        console.log('建筑毁灭')
        //地图上销毁障碍?这点还要反应到各个机车上？？？--代价应该不大 因为现在已明确找到了不用遍历直接操作map的方式
        for (let j = 0; j < eventlist.tanklist.length; j++) {
            for (let k = 0; k < this.ownobstacles.length; k++) {
                eventlist.tanklist[j].globalAstarmanage.map[this.ownobstacles[k].y][this.ownobstacles[k].x] = 0;

            }
        }
        this.ctx.clearRect(this.positions.x, this.positions.y, this.size.x, this.size.y );
        for(let j in structuresets.unitsList){
            for(let k=0;k<structuresets.unitsList[j].length;k++){
                if(this._id==structuresets.unitsList[j][k]._id){
                    structuresets.unitsList[j].splice(k,1);
                    k--
                }
            }
        }
    }

    initImgelement() {
        return new Promise((res, rej) => {
            let counts = 0;
            for (let j = 0; j < this.imgUrllist.length; j++) {
                let img: HTMLImageElement = new Image();
                img.src = this.imgUrllist[j]
                img.onload = function () {
                    counts++;
                    this.imgList[j] = img;
                    if (counts == this.imgUrllist.length) {
                        res();
                    }
                }.bind(this)
                document.body.appendChild(img)

            }
        })

    }
    paint(position: { x: number, y: number }) {
            if(!this.imginitsuccess){
                return;
            }
        let index = 0;
        //  setTimeout(()=>{
        let time = setInterval(() => {
            index++;

            if (index <= this.imgList.length) {
              
                    this.ctx.clearRect(this.positions.x, this.positions.y, this.size.x, this.size.y );
                    this.ctx.drawImage(this.imgList[index - 1], this.positions.x, this.positions.y, this.size.x , this.size.y );

              
            } else {
                clearInterval(time);
                //  if(this.needanimation){
                this.animationMthod(this.animationendstart, this.animationend);
                //  }

            }

        }, 100)
        //   },1000)




    }
    animationMthod(start: number, end: number) {

        let index = start;
      
            if (this.needanimation) {
                this.animationtimer = window.setInterval(() => {
                    index++;
                    if (index > end) {
                        index = start
                    }
    
                    
                    this.ctx.drawImage(this.imgList[index - 1], this.positions.x, this.positions.y, this.size.x, this.size.y);
    
                }, this.circletime)
            } else {
                this.animationtimer = window.setInterval(() => {
                    index = this.imgList.length;
                    //TODO-- 这里不清除效果好一点点 ，但是对于上面需要自身更新的怎么办？
                    //  this.ctx.clearRect( this.positions.x,this.positions.y, this.size.x/6, this.size.y/6);
                    this.ctx.drawImage(this.imgList[index - 1], this.positions.x, this.positions.y, this.size.x , this.size.y );
    
                }, 16.6)
            }
      
       

    }
    //临近函数 //找出距离自己最近的矩阵点
    closeFunc(point: number): number {
        let k = parseInt((point / 10).toString());
        return k
    }
    //初始化自身的地图
    initStructureobstacle(obstacle: positions[]) {
        let temp = []

        //TODO-- 这里还没有结合自己的位置
     //   if (this.name == 'soliderfactory') {
            for (let j = 0; j < obstacle.length; j++) {
                 let item ={x:null,y:null}
                  if(this.name=='soliderfactory'){
                    item = {
                        x: obstacle[j].y + this.closeFunc(this.positions.y - 0),
                        y: obstacle[j].x + this.closeFunc(this.positions.x - 100)
                    }
                  }
                  if(this.name=='base'){
                    item = {
                        x: obstacle[j].y + this.closeFunc(this.positions.y - 600),
                        y: obstacle[j].x + this.closeFunc(this.positions.x - 900)
                    }
                  }
                  if(this.name=='oil'){
                    item = {
                        x: obstacle[j].y + this.closeFunc(this.positions.y - 400),
                        y: obstacle[j].x + this.closeFunc(this.positions.x - 400)
                    }
                  }
                  if(this.name=='powertation'){
                    item = {
                        x: obstacle[j].y + this.closeFunc(this.positions.y - 300),
                        y: obstacle[j].x + this.closeFunc(this.positions.x - 200)
                    }
                  }
                temp.push(item)
            }
            console.log('已走')
    //    }
        globalAstarmanage.addObstacle(temp, 333);
        //当建筑出生的时候 动态映射到真实地图和每个坦克的地图上
        for (let j = 0; j < eventlist.tanklist.length; j++) {

            eventlist.tanklist[j].globalAstarmanage.addObstacle(temp, 333)


        }
    }
    //血量减少
    bloodLess(value){
      this.blood-=value;
      console.log(this.blood)
      if(this.blood<=0){
        this.destroy();
    }
    }
    //处理自身位置的障碍
    handleSelfobstacle(obstacle: positions[]) {
        let temp = [];
        // -(this.closeFunc(this.positions.x)),
        // -(this.closeFunc(this.positions.y))
        //TODO-- 障碍需要又加有减？
        for (let j = 0; j < obstacle.length; j++) {
            let item={}
            if(this.name=='soliderfactory'){
                item = {
                    x: parseInt((obstacle[j].x / 2).toString()),
                    y: parseInt((obstacle[j].y / 2).toString())
                }
            }
            if(this.name=='base'||this.name=='oil'||this.name=='powertation'){
                item = {
                    x: parseInt((obstacle[j].x).toString()),
                    y: parseInt((obstacle[j].y).toString())
                }
            }
           
            temp.push(item);
        }
        this.ownobstacles = temp;
        this.initStructureobstacle(temp);
    }

}
export { Structure }