interface Positions{
    x:number
    y:number
}
interface tankobject{
    selected:boolean
    nextPoint(x:number,y:number)
    fire(x:number,y:number)
    ownobstacles: Positions[]
}

class Eventlist{
    canvasclickeventlist: Function[] = []
    windowmousemoveeventlist: Function[] = []
    tanklist: tankobject[] = []
    movingjudge(e: MouseEvent) {
        for (let j = 0; j < this.canvasclickeventlist.length; j++) {
            this.canvasclickeventlist[j](e);

        }
        for (let j = 0; j < this.tanklist.length; j++) {
            // let tempobj = this.tanklist[j] as object
            if (this.tanklist[j].selected) {
                this.tanklist[j].nextPoint(e.pageX, e.pageY);
            } else {
                this.tanklist[j].fire(e.pageX, e.pageY)
            }


        }

    }
}
let eventlist = new Eventlist();
export {eventlist}