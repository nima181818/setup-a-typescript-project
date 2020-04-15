
export class Bullet{

    position:  pointerface
    size:{width:number,height:number}
    sin:number
    target:pointerface
    speed: number
    currentctx: any
    master: any
    timer: number = 0
    constructor(master: any, position:pointerface,size: {width:number,height:number},speed:number,target:pointerface,currentctx:any) {
        this.master = master
        this.position = position;
        this.size = size;
        this.speed = speed
        this.target = target;
        this.currentctx = currentctx
        this.calculateSin();
    }
    calculateSin(){
        let pt = {
            x: this.target.x - this.position.x,
            y: this.target.y - this.position.y
          };
        let  cos=pt.x/(pt.x**2+pt.y**2)**0.5?pt.x/(pt.x**2+pt.y**2)**0.5:0,
        sin = pt.y/(pt.x**2+pt.y**2)**0.5?pt.y/(pt.x**2+pt.y**2)**0.5:0;
        this.sin = sin
    }
    run(){
        let p2={
            x:this.target.x,
            y:this.target.y
          },
          p0 = {
            x:this.position.x,
            y:this.position.y
          },
          p0_2 = {
            x:p2.x-p0.x,
            y:p2.y-p0.y
          },
          p0_2_unit={
            x:(p0_2.x/(p0_2.x**2+p0_2.y**2)**0.5)?p0_2.x/(p0_2.x**2+p0_2.y**2)**0.5:0,
            y:(p0_2.y/(p0_2.x**2+p0_2.y**2)**0.5)?p0_2.y/(p0_2.x**2+p0_2.y**2)**0.5:0,
          },
          p0_2_stri = {
            x: -(1/p0_2_unit.x)?-(1/p0_2_unit.x):0,
            y: (1/p0_2_unit.y)?(1/p0_2_unit.y):0,
          },
          p0_2_stri_unit = {
            x:(p0_2_stri.x/(p0_2_stri.x**2+p0_2_stri.y**2)**0.5)?p0_2_stri.x/(p0_2_stri.x**2+p0_2_stri.y**2)**0.5:0,
            y:(p0_2_stri.y/(p0_2_stri.x**2+p0_2_stri.y**2)**0.5)?p0_2_stri.y/(p0_2_stri.x**2+p0_2_stri.y**2)**0.5:0,
          },
          p0_2_distance = (p0_2.x**2+p0_2.y**2)**0.5,
          
          centerp = {
            x:(p0.x+p2.x)*0.5,
            y:(p0.y+p2.y)*0.5
          },
          p1 = {
            x:centerp.x +(this.sin>0?-1:1) * p0_2_stri_unit.x*50,
            y:centerp.y + (this.sin>0?-1:1) * p0_2_stri_unit.y*50,
          },
          p={
            x:0,
            y:0
          },
          oldp={
              x:0,
              y:0
          },
          t=0;
          let timer = setInterval(()=>{
            t+=0.03;
            this.currentctx.clearRect(oldp.x-3,oldp.y-3,this.size.width+2,this.size.height+2);
            p.x = p0.x*(1-t)**2+2*(1-t)*t*p1.x+(t**2)*p2.x
            p.y = p0.y*(1-t)**2+2*(1-t)*t*p1.y+(t**2)*p2.y;
            this.currentctx.beginPath();
           
            this.currentctx.arc(p.x,p.y,this.size.width/2,0,Math.PI*2,false);
            this.currentctx.fillStyle='rgb(16,12,12)'
            this.currentctx.fill();
           if(this.master._id==0){
               console.log((p.x-p2.x)**2+(p.y-p2.y)**2)
           }
          
           
            oldp= JSON.parse(JSON.stringify(p));
            
             if((p.x-p2.x)**2+(p.y-p2.y)**2<6){
                this.currentctx.clearRect(p.x-2,p.y-2,this.size.width+1,this.size.height+1);
               clearInterval(timer)
             }
          },16.6)
    }
    //爆炸效果
    explosionEffect(){

    }

}
