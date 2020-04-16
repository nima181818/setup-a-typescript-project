function imginits(imgUrllist,imgList){
   
    for(let j=0;j<imgUrllist.length;j++){
            let img:HTMLImageElement = new Image();
                img.src = imgUrllist[j]
                img.onload = function(){
                   
                    imgList[j] = img;
                   
            }
         document.body.appendChild(img)
            
      
    }
}

const oil1 = require('../assets/oilstructure/oil1.png');
const oil2 = require('../assets/oilstructure/oil2.png')
const oil3 = require('../assets/oilstructure/oil3.png')
const oil4 = require('../assets/oilstructure/oil4.png')
const oil5 = require('../assets/oilstructure/oil5.png')
const oil6 = require('../assets/oilstructure/oil6.png');
const oil7 = require('../assets/oilstructure/oil7.png');
let oilimgUrllist = [
    oil1.default,
    oil2.default,
    oil3.default,
    oil4.default,
    oil5.default,
    oil6.default,
    oil7.default,
    // oil8.default,
    // oil7.default,
    oil6.default,
    oil5.default,
    oil4.default,
    oil3.default,
    oil2.default,
    oil1.default,
],
oilimgList=[];


const structurepbstacle = require('./soliderfactoryobstacle.json');//注意这是相对位置，要转换为地图的绝对位置
const Soliderfactoryimg1 = require('../assets/infantry/infantry-1.png');
const Soliderfactoryimg2 = require('../assets/infantry/infantry-2.png')
const Soliderfactoryimg3 = require('../assets/infantry/infantry-3.png')
const Soliderfactoryimg4 = require('../assets/infantry/infantry-4.png')
const Soliderfactoryimg5 = require('../assets/infantry/infantry-5.png')
const Soliderfactoryimg6 = require('../assets/infantry/infantry-6.png');
let soilderimgUrllist = [
    Soliderfactoryimg1.default,
    Soliderfactoryimg2.default,
    Soliderfactoryimg3.default,
    Soliderfactoryimg4.default,
    Soliderfactoryimg5.default,
    Soliderfactoryimg6.default,
],
soilderimgList=[];



const pb1 = require('../assets/powerstation/p-b1.png');
const pb2 = require('../assets/powerstation/p-b2.png')
const pb3 = require('../assets/powerstation/p-b3.png')
const pb4 = require('../assets/powerstation/p-b4.png')
const pb5 = require('../assets/powerstation/p-b5.png')
const pb6 = require('../assets/powerstation/p-b6.png');
const ps1 = require('../assets/powerstation/p-s1.png');
const ps2 = require('../assets/powerstation/p-s2.png');
const ps3 = require('../assets/powerstation/p-s3.png');
const ps4 = require('../assets/powerstation/p-s4.png');
const ps5 = require('../assets/powerstation/p-s5.png');
let powerstationimgUrllist = [
    pb1.default,
    pb2.default,
    pb3.default,
    pb4.default,
    pb5.default,
    pb6.default,
    ps1.default,
    ps2.default,
    ps3.default,
    ps4.default,
    ps5.default
],
powerstationimgList=[];





const wcf1 = require('../assets/wcf/wcf1.png');
const wcf2 = require('../assets/wcf/wcf2.png')
const wcf3 = require('../assets/wcf/wcf3.png')
const wcf4 = require('../assets/wcf/wcf4.png')
const wcf5 = require('../assets/wcf/wcf5.png');


let wcfimgUrllist = [
    wcf1.default,
    wcf2.default,
    wcf3.default,
    wcf4.default,
    wcf5.default
],
wcfimgList=[];

imginits(oilimgUrllist,oilimgList);
imginits(soilderimgUrllist,soilderimgList);
imginits(powerstationimgUrllist,powerstationimgList);
imginits(wcfimgUrllist,wcfimgList);
export {oilimgList,soilderimgList,powerstationimgList,wcfimgList}
  