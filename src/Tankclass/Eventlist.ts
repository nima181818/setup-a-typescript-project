interface Positions{
    x:number
    y:number
}
interface tankobject{
    selected:boolean
    // nextPoint(x:number,y:number)
    fire(x:number,y:number)
    ownobstacles: Positions[]
    currentclickpoints:Positions
    globalAstarmanage:any
    _id:number
    width:number
    height:number
    movingcommander:boolean
    pathplaningbyRvo(x:number,y:number)
    closeFunc(x:number)
    setTankspoints(x:number,y:number,type:string,moving:boolean)
}
class Eventlist{
    canvasclickeventlist: Function[] = []
    windowmousemoveeventlist: Function[] = []
    incommunication:tankobject[] = []
    tanklist: tankobject[] = []
    movingjudge(e: MouseEvent) {
        let currentclick:number=null,
            hastankselect:number=null;
            //若hastankselect不为null，那么说明之前有选中的,为null则说明为第一次选中或者未选中
            for(let j=0;j<this.tanklist.length;j++){
                if(this.tanklist[j].selected){
                  hastankselect = j
                }
            }
        //找出通过点击选中的那一个
        for(let k=0;k<this.tanklist.length;k++){
            if ((e.pageX - this.tanklist[k].currentclickpoints.x) ** 2 < this.tanklist[k].width**2 && (e.pageY - this.tanklist[k].currentclickpoints.y) ** 2 < this.tanklist[k].height**2) {
                this.tanklist[k].selected =true;
                currentclick = k
            }
        }
       console.log(currentclick,hastankselect)
        if(currentclick!==null){
            if(hastankselect!==null){
                if(hastankselect!==currentclick){
                    this.tanklist[hastankselect].selected = false
                }
            }
           // this.tanklist[currentclick].movingcommander = true;
            this.tanklist[currentclick].setTankspoints(e.pageX,e.pageY,'setstartpoints',false)
        }else{
            //未点击选中任何目标，则如果有当前选中的则执行moving的相关方法
            if(hastankselect!==null){
                let currentitem = this.tanklist[hastankselect];
                console.log(currentitem._id);
                currentitem.movingcommander = true;
                currentitem.setTankspoints(e.pageX,e.pageY,'setendpoints',true)
          
            }else{
                //不做任何事情

            }
        }
     

    }
}
let eventlist = new Eventlist();
export {eventlist}