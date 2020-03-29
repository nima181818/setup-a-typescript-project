interface positions{
   x:number
   y:number
}
console.log(Multithread,"wocao")
import { globalAstarmanage } from '../utils/wayfinders';
import { eventlist } from '../Tankclass/Eventlist';
class Structure{
    name:string
    blood:number
    owner:string
    imgsize:positions
    ctx:any
    imgList:Array<HTMLImageElement>=[]
    imgUrllist:Array<string>=[]
    positions:positions
    size:positions
    circletime:number=16.6 //对于不同的建筑物，动画是不一样的
    animationtimer:number=null
    needanimation:boolean = false
    animationendstart:number
    animationend:number
    ownobstacles: positions[] = [] //存取自身的障碍矩阵 已/5
    constructor(bl:number,owner:string,position:positions,name:string,ctx:HTMLCanvasElement,size:positions){
        this.blood = bl;

        this.owner = owner
        this.positions = position
        this.name = name
        this.size = size
        this.ctx = ctx.getContext('2d')
        // this.paint(position)
    }
  
    beAttacked(bollet:number){
        this.blood = this.blood - bollet
        
    }
    //maybe I have to destroy this？？
    destroy(){
        clearInterval(this.animationtimer);
        //地图上销毁障碍?这点还要反应到各个机车上？？？--代价应该不大 因为现在已明确找到了不用遍历直接操作map的方式
         for(let j=0;j<eventlist.tanklist.length;j++){
             for(let k=0;k<this.ownobstacles.length;k++){
                eventlist.tanklist[j].globalAstarmanage.map[this.ownobstacles[k].y][this.ownobstacles[k].x]=0;

             }
         } 
    }
    initImgelement(){
        return new Promise((res,rej)=>{
            let counts = 0;
            for(let j=0;j<this.imgUrllist.length;j++){
                let img:HTMLImageElement = new Image();
                    img.src = this.imgUrllist[j]
                    img.onload = function(){
                        counts++;
                        this.imgList[j] = img;
                        if(counts==this.imgUrllist.length){
                            res();
                        }
                }.bind(this)
             document.body.appendChild(img)
                
            }
        })
        
    }
    paint(position: { x: number, y: number }) {
      
        let index = 0;
        setTimeout(()=>{
            let time = setInterval(()=>{
                index++;
           
                if(index<=this.imgList.length){
                    this.ctx.clearRect( this.positions.x,this.positions.y, this.size.x/6, this.size.y/6);
                    this.ctx.drawImage(this.imgList[index-1], this.positions.x,this.positions.y, this.size.x/6, this.size.y/6);
                }else{
                    clearInterval(time);
                  //  if(this.needanimation){
                        this.animationMthod(this.animationendstart,this.animationend);
                  //  }
                   
                }
              
            },100)
        },1000)
       
   
    
       
    }
    animationMthod(start:number,end:number){
      
        let index = start;
      if(this.needanimation){
        this.animationtimer = window.setInterval(()=>{
            index++;
            if(index>end){
                index = start
            }
          
      //      this.ctx.clearRect( this.positions.x,this.positions.y, this.size.x/6, this.size.y/6);
             this.ctx.drawImage(this.imgList[index-1], this.positions.x,this.positions.y, this.size.x/6, this.size.y/6);
                      
             },this.circletime)
      }else{
        this.animationtimer = window.setInterval(()=>{
            index = this.imgList.length;
            //TODO-- 这里不清除效果好一点点 ，但是对于上面需要自身更新的怎么办？
         ///   this.ctx.clearRect( this.positions.x,this.positions.y, this.size.x/6, this.size.y/6);
            this.ctx.drawImage(this.imgList[index-1], this.positions.x,this.positions.y, this.size.x/6, this.size.y/6);
            
        },16.6)
      }
      
    }
     //临近函数 //找出距离自己最近的矩阵点
     closeFunc(point: number): number {
        let k = parseInt((point / 10).toString());
        return k 
    }
    //初始化自身的地图
    initStructureobstacle(obstacle:positions[]){
        let temp = []
         for(let j=0;j<obstacle.length;j++){
             let item = {
                 x:obstacle[j].y,
                 y:obstacle[j].x
               }
               temp.push(item)
         }
         globalAstarmanage.addObstacle(temp,333);
    }
    //处理自身位置的障碍
    handleSelfobstacle(obstacle:positions[]){
        let temp = [];
        // -(this.closeFunc(this.positions.x)),
        // -(this.closeFunc(this.positions.y))
        //TODO-- 障碍需要又加有减？
         for(let j=0;j<obstacle.length;j++){
            let item = {
                x:parseInt((obstacle[j].x/2).toString()),
                y:parseInt((obstacle[j].y/2).toString())
            }
            temp.push(item);
         }         
         this.ownobstacles = temp;
         this.initStructureobstacle(temp);
    }
    
}
export {Structure}