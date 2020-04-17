import {structuresets} from './Structureclass/structureSet'
type a = structuresets.constructor 
function findClass<T>(o:T):type{
    return structuresets.constructor 
}
class Play{
    baseMapcanvas:HTMLCanvasElement
    topUnitscanvas:HTMLCanvasElement
    structuresets:findClass<structuresets>()
    constructor(){
    //    this.
    }
    //初始化canvas
    initCanvas(){
        let canvas1: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement,
              canvas2: HTMLCanvasElement = document.getElementById('canvas2') as HTMLCanvasElement;
              this.baseMapcanvas = canvas1;
              this.topUnitscanvas = canvas2;
    }
   
    
}