
//引入 tank中的一个
import { eventlist } from '../Tankclass/Eventlist';
import { globalAstarmanage as realAstarmanage, globalAstarmanage } from '../utils/wayfinders'
class Buildinglayer {
    timer: number = null
    finish: boolean = false
    positions: { x: number, y: number } = { x: 0, y: 0 }
    canvas: HTMLCanvasElement
    obstaclemap:Array<Array<number>>=[]
    type:string
    size:{width:number,height:number}
    constructor() {


        this.mouseMovehandler = this.mouseMovehandler.bind(this);
        this.mouseClickhandler = this.mouseClickhandler.bind(this);
        setTimeout(()=>{
            this.getObstacles()
        },8000)
        
    }
    setType(type:string){
        this.type = type;

    }
    //种类判别 建筑的大小是不同的
    sizeJudge(type:string){
       if(type==''){
           
       }
    }

    mouseMovehandler(e: MouseEvent) {
        console.log('卧槽无情');
        //节流
        if (!this.timer) {
            this.timer = window.setTimeout(() => {
                this.positions = {
                    x: e.pageX,
                    y: e.pageY
                }
                clearTimeout(this.timer)
            }, 50);
        }
    }
    mouseClickhandler(e: MouseEvent) {
        if (this.validationAreasafe()) {
            this.finish = true;

            this.canvas.removeEventListener('mousemove', this.mouseMovehandler);
            this.canvas.removeEventListener('click', this.mouseClickhandler);
        }
    }
    //绑定滑动，游击事件
    bindCanvas() {
        let canvas = document.getElementById('canvas2');
        this.canvas = canvas as HTMLCanvasElement
        canvas.addEventListener('mousemove', this.mouseMovehandler);
        canvas.addEventListener('click', this.mouseClickhandler);
    }
    //获取其中一个坦克的地图
    //障碍区= fakeMap（自身障碍物）+其他障碍物
    getObstacles() {
        let othermap = eventlist.tanklist[0].globalAstarmanage.map,//其他障碍物
            atankmap = globalAstarmanage.fakemap, //（自身障碍物）
            MT = new Multithread(4);//web worker
            return new Promise((resolve,reject)=>{
                let handle = MT.process(this.calculateObstacles, (e) => {
                    this.obstaclemap = e;
                    resolve();
                    console.log(e,"啦啦啦啦")
                });
                handle(othermap,atankmap)
            })
           
      
        
    }
    //计算障碍物
    calculateObstacles(othermap:any,atankmap:any){
        let lastmap=[];
           for(let j=0;j<200;j++){
            lastmap[j] = []
               for(let k=0;k<200;k++){
                   if(othermap[j][k]==33||othermap[j][k]==333||atankmap[j][k]==3){
                    lastmap[j][k] = 9 //假设9为不允许建造
                   }else{
                    lastmap[j][k] = 0
                   }
               }
           }
           return lastmap
    }
    //校验是否选择的区域是平坦的
    validationAreasafe(): boolean {
        //TODO--
        return true
    }
    //绘制
    draw() {

    }
}
export let buildinglayer = new Buildinglayer()