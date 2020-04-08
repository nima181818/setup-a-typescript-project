
//引入 tank中的一个
import { eventlist } from '../Tankclass/Eventlist';
import { globalAstarmanage as realAstarmanage, globalAstarmanage } from '../utils/wayfinders'
class Buildinglayer {
    timer: number = null
    drawTimer: number = null
    type: string
    type_name: string
    finish: boolean = false
    positions: { x: number, y: number } = { x: 0, y: 0 }
    oldpositions: { x: number, y: number } = { x: 0, y: 0 }
    canvas: HTMLCanvasElement
    context: any
    obstaclemap: { x: number, y: number }[] = []
    oldobstaclemap: { x: number, y: number }[] = []
    size: { width: number, height: number }
    constructor() {


        this.mouseMovehandler = this.mouseMovehandler.bind(this);
        this.mouseClickhandler = this.mouseClickhandler.bind(this);


    }
    setType(type: string, type_name: string) {
        this.type = type;
        this.type_name = type_name;
        this.sizeJudge();

    }
    //种类判别 建筑的大小是不同的
    sizeJudge() {
        switch (this.type_name) {
            case 'stpowertation':
                this.size = {
                    width: 108,
                    height: 90
                }
                break;
            case 'stinfantry':
                this.size = {
                    width: 95,
                    height: 168
                }
                break;
            case 'stoil':
                this.size = {
                    width: 106,
                    height: 91
                }
                break;
            default:
                break;
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
                this.draw();
                this.getObstacles();
                clearTimeout(this.timer);
                this.timer = null;
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
        this.context = this.canvas.getContext('2d')
        canvas.addEventListener('mousemove', this.mouseMovehandler);
        canvas.addEventListener('click', this.mouseClickhandler);
    }
    //获取其中一个坦克的地图
    //障碍区= fakeMap（自身障碍物）+其他障碍物
    getObstacles() {
        let othermap = eventlist.tanklist[0].globalAstarmanage.map,//其他障碍物
            atankmap = globalAstarmanage.fakemap, //（自身障碍物）
            MT = new Multithread(4);//web worker
        return new Promise((resolve, reject) => {
            ///   console.log('呵呵')
            let handle = MT.process(this.calculateObstacles, (e) => {
                this.obstaclemap = e;
                resolve();
                //   console.log(e, "啦啦啦啦")
            });
            handle(othermap, atankmap)
        })



    }
    //计算障碍物
    calculateObstacles(othermap: any, atankmap: any) {
        let lastmap = [];
        for (let j = 0; j < 200; j++) {

            for (let k = 0; k < 200; k++) {
                if (othermap[j][k] == 33 || othermap[j][k] == 333 || atankmap[j][k] == 3) {
                    // lastmap[j][k] = 9 //假设9为不允许建造
                    lastmap.push({
                        x: j,
                        y: k
                    })
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
    // //绘制绿色部分
    draw() {
        this.context.clearRect(this.oldpositions.x - this.size.width * 0.5, this.oldpositions.y - this.size.height * 0.5, this.size.width, this.size.height);
        this.context.fillStyle = 'rgb(0,220,0)';
        this.context.fillRect(this.positions.x - this.size.width * 0.5, this.positions.y - this.size.height * 0.5, this.size.width, this.size.height);
        this.oldpositions = {
            x: this.positions.x,
            y: this.positions.y
        }
        //绘制红色
        let startx = this.positions.x - this.size.width * 0.5,
            starty = this.positions.y - this.size.height * 0.5,
            endx = startx + this.size.width,
            endy = starty + this.size.height;
        for (let j = 0; j < this.oldobstaclemap.length; j++) {
            if (startx <= this.oldobstaclemap[j].y * 10
                && starty <= this.oldobstaclemap[j].x * 10
                && endx >= this.oldobstaclemap[j].y * 10
                && endy >= this.oldobstaclemap[j].x * 10) {
                this.context.clearRect(this.oldobstaclemap[j].y * 10, this.oldobstaclemap[j].x * 10, 10, 10);

           }
        }
        for (let j = 0; j < this.obstaclemap.length; j++) {
            if (startx <= this.obstaclemap[j].y * 10
                && starty <= this.obstaclemap[j].x * 10
                && endx >= this.obstaclemap[j].y * 10
                && endy >= this.obstaclemap[j].x * 10) {
                this.context.fillStyle = 'rgb(220,0,0)';
                this.context.fillRect(this.obstaclemap[j].y * 10, this.obstaclemap[j].x * 10, 10, 10);

            }
        }
        this.oldobstaclemap = JSON.parse(JSON.stringify(this.obstaclemap));

    }

}
export let buildinglayer = new Buildinglayer()