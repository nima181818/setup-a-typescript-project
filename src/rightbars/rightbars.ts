//bar图片
const s1 = require('../assets/rightbar/s1.png'),
    s2 = require('../assets/rightbar/s2.png'),
    s3 = require('../assets/rightbar/s3.png'),
    s4 = require('../assets/rightbar/s4.png'),
    us1 = require('../assets/rightbar/us1.png'),
    us2 = require('../assets/rightbar/us2.png'),
    us3 = require('../assets/rightbar/us3.png'),
    us4 = require('../assets/rightbar/us4.png'),
    //建筑图片
    stpowertation = require('../assets/buildings-structure/st_powerstation.png'),
    stinfantry = require('../assets/buildings-structure/st_infantry.png'),
    stoil = require('../assets/buildings-structure/st_oil.png'),
    stwcf = require('../assets/buildings-structure/wcf.png'),
    $id = document.getElementById.bind(document),
    $cls = document.getElementsByClassName.bind(document);
import { stlistMask, guardlistMask, soilderlistMask, wartanklistMask } from './masks';
import { littlewindow } from './littlewindow';
littlewindow.initCanvas();
littlewindow.draw();
let maskListall = [stlistMask, soilderlistMask, guardlistMask, wartanklistMask]
export class Rightbars {
    currentpageIndex: number = 0
    alllist: Array<HTMLDivElement> = []

    barimgUrllist: Array<string> = []
    barimgList: Array<HTMLImageElement> = []
    barElement: Array<HTMLDivElement> = []


    structureimgurl: Array<string>
    structureimg: Array<HTMLImageElement> = []
    structurelist: Array<HTMLDivElement> = []
    structureinbuiding: boolean = false

    constructor() {

        this.initContainerlist();
        this.initBarelment();


        this.initStructure();
    }
    //初始化下方类型框container
    initContainerlist() {
        let stlist = $cls('stlist')[0] as HTMLDivElement,
            guardlist = $cls('guardlist')[0] as HTMLDivElement,
            soilderlist = $cls('soilderlist')[0] as HTMLDivElement,
            wartanklist = $cls('wartanklist')[0] as HTMLDivElement;

        this.alllist = [stlist, guardlist, soilderlist, wartanklist];
        for (let j = 1; j < this.alllist.length; j++) {
            this.alllist[j].style.display = 'none'
        }
    }
    //初始化bar的div元素
    initBarelment() {
        let items = document.getElementsByClassName('items');
        let barlist: HTMLDivElement[] = [];
        for (let j = 0; j < items.length; j++) {
            barlist.push(items[j] as HTMLDivElement)
        }
        this.barElement = barlist;
        this.initbarImgelement();
    }
    //初始化 bar的图片
    initbarImgelement() {
        this.barimgUrllist = [
            s1.default,
            s2.default,
            s3.default,
            s4.default,
            us1.default,
            us2.default,
            us3.default,
            us4.default,
        ]
        return new Promise((res, rej) => {
            let counts = 0;
            for (let j = 0; j < this.barimgUrllist.length; j++) {
                let img: HTMLImageElement = new Image();
                img.src = this.barimgUrllist[j];
                // img.style.display='inline-block'
                img.onload = function () {
                    counts++;

                    this.barimgList[j] = img;
                    if (counts == this.barimgUrllist.length) {
                        res();
                    }
                }.bind(this)
                document.body.appendChild(img)

            }
        }).then(res => {
            this.paintbarImg();
        })

    }

    //初始化bar，绑定事件
    paintbarImg() {
        for (let j = 0; j < this.barElement.length; j++) {
            this.barElement[j].appendChild(this.barimgList[j + 4]);
            this.barElement[j].onclick = function () {

                this.currentpageIndex = j;
                this.alllist[j].style.display = 'flex';
                this.barElement[j].innerHTML = '';
                this.barElement[j].appendChild(this.barimgList[j]);
                for (let k = 0; k < this.barElement.length; k++) {
                    if (k != j) {
                        this.barElement[k].innerHTML = '';
                        this.barElement[k].appendChild(this.barimgList[k + 4]);
                        this.alllist[k].style.display = 'none'
                    }
                }
            }.bind(this)
        }
    }
    //初始化建筑
    initStructure() {
        let stpowertation = $id('stpowertation'),
            stinfantry = $id('stinfantry'),
            stoil = $id('stoil'),
            stwcf = $id('stwcf');
        this.structurelist = [stpowertation, stoil, stinfantry, stwcf];
        this.initStructureimg();
    }
    //初始化 建筑图片
    initStructureimg() {
        this.structureimgurl = [
            stpowertation.default,
            stinfantry.default,
            stoil.default,
            stwcf.default
        ]
        return new Promise((res, rej) => {
            let counts = 0;
            for (let j = 0; j < this.structureimgurl.length; j++) {
                let img: HTMLImageElement = new Image();
                img.src = this.structureimgurl[j]
                img.onload = function () {
                    counts++;
                    this.structureimg[j] = img;
                    if (counts == this.structureimgurl.length) {
                        res();
                    }
                }.bind(this)
                document.body.appendChild(img)

            }
        }).then(res => {
            this.bindingStructureevent();
        })

    }
    //绑定建筑事件
    bindingStructureevent() {
        for (let j = 0; j < this.structurelist.length; j++) {
            this.structurelist[j].appendChild(this.structureimg[j]);
            //左键建造，
            this.structurelist[j].onclick = function () {

                maskListall[0].analyseCommander('building', j);
                // if (this.structureinbuiding) {
                //     return;
                // }
                // this.structureinbuiding = true
                // setTimeout(() => {
                //     this.structureinbuiding = false;
                //     console.log('修建完成')
                // }, 4000)

            }.bind(this)
            //右键取消
            this.structurelist[j].oncontextmenu = function () {

            }.bind(this)
        }
    }

}