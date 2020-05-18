class Fog {
     fogcanvas:HTMLCanvasElement
     context:any
     fog_littlewindow:HTMLCanvasElement
     fog_littlewindowctx:any
    constructor(){
       this.initCanvas();
    }
    initCanvas(){
    
        this.fogcanvas = document.getElementById('canvas3') as HTMLCanvasElement
    
        this.context = this.fogcanvas.getContext('2d');
        this.fog_littlewindow = document.getElementById('fog_littlewindow') as HTMLCanvasElement
        this.fog_littlewindowctx = this.fog_littlewindow.getContext('2d');
        // this.context.fillRect(0,0,4480,1400);
        // this.fog_littlewindowctx.fillRect(0,0,180,105.8);
        this.clear(782,442,1123-782,835-442)
    }
    clear(x:number,y:number,width:number,height:number){
        this.context.clearRect(x,y,width,height);
        this.fog_littlewindowctx.clearRect(x/24,y*1.875/24,width/24,height*1.875/24)
    }
}
export let fog = new Fog()