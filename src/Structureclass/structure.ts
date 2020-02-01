interface positions{
   x:number
   y:number
}

class Structure{
    name:string
    blood:number
    owner:string
    ctx:any
    positions:positions
    size:positions
    ownobstacles: positions[] = []
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
}
export {Structure}