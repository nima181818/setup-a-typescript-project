class Littlewindow{
    img:HTMLImageElement
    fromcanvas:HTMLCanvasElement
   
    constructor(){

    }
    initCanvas(){
        let img = document.getElementById('canvas3') as HTMLImageElement,
        fromcanvas = document.getElementById('canvas1') as HTMLCanvasElement
            this.img = img;
            this.fromcanvas = fromcanvas
         
    }
    draw(){
        setInterval(()=>{
           let imgsrc = this.fromcanvas.toDataURL();
              this.img.src = imgsrc
        },2000)
    }
}
export let littlewindow = new Littlewindow()