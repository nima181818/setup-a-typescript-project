class Play{
    unitList:Array<any>=[]
    baseMapcanvas:HTMLCanvasElement
    topUnitscanvas:HTMLCanvasElement
    constructor(){

    }
    //初始化canvas
    initCanvas(){
        let canvas1: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement,
              canvas2: HTMLCanvasElement = document.getElementById('canvas2') as HTMLCanvasElement;
              this.baseMapcanvas = canvas1;
              this.topUnitscanvas = canvas2;
    }
    //    
    initStructures(){

    }
    addUnit(unit:any){
        this.unitList.push(unit)
    }
}