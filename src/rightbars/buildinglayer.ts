let mousem = function(e:MouseEvent){},
   mousec:Function
class Buildinglayer {
    timer: number = null
    finish: boolean = false
    positions: { x: number, y: number } = { x: 0, y: 0 }
    canvas:HTMLCanvasElement
    mmfbind:Function
    mcfbind:Function
    constructor() {
        
        mousec = function(e:MouseEvent){this.mouseClickhandler}.bind(this);
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
            }, 50);
        }
    }
    mouseClickhandler(e:MouseEvent){
       if(this.validationAreasafe()){
           this.finish = true;
           let mmfbind=function(e){}
           this.canvas.removeEventListener('mousemove',mmfbind);
           this.canvas.removeEventListener('click',this.mouseClickhandler.bind(this));
       }
    }
    //绑定滑动，游击事件
    bindCanvas() {
        let canvas = document.getElementById('canvas2'),
           
            this.mmfbind =a
            let mmfbind = this.mmfbind
            this.mcfbind = this.mouseClickhandler.bind(this);
            
           this.canvas = canvas as HTMLCanvasElement
         canvas.addEventListener('mousemove',mousem);
         canvas.addEventListener('click',this.mcfbind);
    }
    //校验是否选择的区域是平坦的
    validationAreasafe():boolean{
        //TODO--
        return true
    }
    //绘制
    draw() {

    }
}
export let buildinglayer=new Buildinglayer()