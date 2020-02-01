import {Obstacle} from './obstacle';

export class Point{
    x:number=0
    y:number=0
    G:number=0
    H:number=0
    father:Point=null
    Init(x:number,y:number,father:Point){
        this.x=x;
        this.y=y;
        this.father=father;
    }
}

 class Astar{
    lastwaysmatrixlist:{x:number,y:number}[]=[] //标记的路径
    deltamatrixllist:{deltax:number,deltay:number}[]=[]
    startmatrix:{x:number,y:number}={x:0,y:0}
    endmatrix:{x:number,y:number}={x:0,y:0}
    map:Array<Array<any>>=[]
    rowCount:number=0
    colCount:number=0
    startPoint:Point=new Point()
    endPoint:Point=new Point()
    openList:Point[]=[]
    closeList:Point[]=[]
    constructor(){
        this.rowCount = 1000;
        this.colCount = 1000;
        for(let j=0;j<200;j++){
			this.map[j] = [] 
			for(let k=0;k<200;k++){
				this.map[j][k] = 0
			}
		}
    }
    //精确度判段
    accuracyJudge(x1:number,x2:number){
         return ((x1-x2)**2)<0.1
    }
    //添加障碍
    addObstacle(obstacle:{x:number,y:number}[]){
       
         for(let j=0;j<obstacle.length;j++){
            this.map[obstacle[j].x][obstacle[j].y] = 33
         }
    }
    //初始化地图
    initGlobalMap(obstacle:Obstacle){
    	//障碍物
		// for(let j=0;j<this.map.length;j++){
		// 	for(let k=0;k<this.map[j].length;k++){
		// 		  for(let u=0;u<obstacle.points.length;u++){
        //             //   if(
		// 			// 	  k*5<=obstacle.points[u].x
		// 			// 	  &&
		// 			// 	  (k+1)*5>obstacle.points[u].x
		// 			// 	  &&
		// 			// 	  j*5<=obstacle.points[u].y
		// 			// 	  &&
		// 			// 	  (j+1)*5>obstacle.points[u].y
		// 			//   ){
		// 				this.map[j][k] =0
		// 			//   }
		// 		  }
                
		// 	}
		// }
    }
    //增量函数的处理办法
    deltaFunchandler(){
        this.deltamatrixllist=[];
        for(let j=0;j+1<this.lastwaysmatrixlist.length;j++){
              let obj = {
                deltax:this.lastwaysmatrixlist[j].x - this.lastwaysmatrixlist[j+1].x,
                deltay:this.lastwaysmatrixlist[j].y - this.lastwaysmatrixlist[j+1].y
              }
              this.deltamatrixllist.unshift(obj)
        }
    }
    //设置开始位置与结束位置
    setStartpointandendpoint(x:number,y:number,type:string){
        
       if(type=='startpoint'){
          this.startPoint.x = x;
          this.startPoint.y = y;
          this.map[this.startmatrix.x][this.startmatrix.y] = 0;
          let stepx = parseInt((this.startPoint.x/5).toString())
          let stepy = parseInt((this.startPoint.y/5).toString())
          this.map[stepx][stepy] = 1;
          this.startmatrix = {
              x:stepx,
              y:stepy
          }
       }else{
        this.endPoint.x = x;
        this.endPoint.y = y;
        this.map[this.endmatrix.x][this.endmatrix.x] = 0;
        let stepx =  parseInt((this.endPoint.x/5).toString())
        let stepy =  parseInt((this.endPoint.y/5).toString())
        this.map[stepx][stepy] = 1;
        this.endmatrix = {
            x:stepx,
            y:stepy
        }
       }
    }
        //是否为障碍物
    IsBar(x:number,y:number):boolean{
        let xshrink = parseInt((x/5).toString())
        let Yshrink = parseInt((y/5).toString())
        try{
            if(this.map[xshrink][Yshrink]==3||this.map[xshrink][Yshrink]==33){
         
                return true;
            }
            else{
               
                return false;
            }
        }catch(e){
            debugger
        }
      
    }
     //当前坐标是否在OpenList
     IsInOpenList(x:number,y:number):boolean{
        for(var i=0;i<this.openList.length;i++){
            if(this.openList[i].x==x&&this.openList[i].y==y){
                return true;
            }

        }
       return false;
     }
        //当前坐标是否在OpenList
        IsInCloseList(x:number,y:number):boolean{
            for(var i=0;i<this.closeList.length;i++){
                if(this.closeList[i].x==x&&this.closeList[i].y==y){
                    return true;
                }

            }
            return false;
         }
          //计算G值;(p是Point类)
          //参数2：是否倾斜方向
          GetG(p:Point,isleans:boolean):number{
            if(p.father==null){
                return 0;
            }
            return p.father.G+(isleans?7:5);
        }
          //计算H值
          GetH(p:Point,pb:Point){
            return Math.abs(p.x-pb.x)+Math.abs(p.y-pb.y);
        }
         //添加当前点的上下左右相邻的方格到Open列表中
         AddNeiToOpenList(curPoint:Point){
            //  console.log(curPoint,"666666")
            for(var x=curPoint.x-5;x<=curPoint.x+5;x+=5){
                for(var y=curPoint.y-5;y<=curPoint.y+5;y+=5){
                    //排除自身以及超出下标的点
                    if((x>=0&&x<this.rowCount&&y>=0&&y<this.colCount)&&!(curPoint.x==x&&curPoint.y==y)){
                        //非斜对角
                        if(Math.abs(x-curPoint.x)+Math.abs(y-curPoint.y)==5){
                            //不是障碍物且不在关闭列表中
                            if(this.IsBar(x,y)==false&&this.IsInCloseList(x,y)==false){
                                //不存在Open列表
                                if(this.IsInOpenList(x,y)==false){
                                    var point=new Point();
                                    point.x=x;
                                    point.y=y;
                                    point.father=curPoint;
                                    point.G=this.GetG(point,false);
                                    point.H=this.GetH(point,this.endPoint);
                                    this.openList.push(point);
                                }
                            }
                        }else{
                            //不是障碍物且不在关闭列表中
                            if(this.IsBar(x,y)==false&&this.IsInCloseList(x,y)==false){
                                //不存在Open列表
                                if(this.IsInOpenList(x,y)==false){
                                    var point=new Point();
                                    point.x=x;
                                    point.y=y;
                                    point.father=curPoint;
                                    point.G=this.GetG(point,true);
                                    point.H=this.GetH(point,this.endPoint);
                                    this.openList.push(point);
                                }
                            }
                        }
                    }
                }
           }
         }
          //在openlist集合中获取G+H为最小的Point点
          GetMinFFromOpenList():any{
            var minPoint=null;
            var index=0;
            for(var i=0;i<this.openList.length;i++){
                if(minPoint==null||minPoint.G+minPoint.H>=this.openList[i].G+this.openList[i].H){
                    minPoint=this.openList[i];
                    index=i;
                }
            }
            return{
                minPoint:minPoint,
                index:index
            }
        }
        //获取该点在openList中的位置
        GetPointFromOpenList(x:number,y:number):Point{
            for(var i=0;i<this.openList.length;i++){
                if(this.openList[i].x==x&&this.openList[i].y==y){
                    return this.openList[i];
                }
            }
            return null;
        }
        //寻路算法
        FindPoint(){
            this.openList = [];
            this.closeList=[];
            for(let j=0;j< this.lastwaysmatrixlist.length;j++){
                this.map[this.lastwaysmatrixlist[j].x][this.lastwaysmatrixlist[j].y] = 0
            }
            this.lastwaysmatrixlist = [];
             
            console.log(this);
            this.openList.push(this.startPoint);
            let timerstart = new Date().getTime();
            while(this.IsInOpenList(this.endPoint.x,this.endPoint.y)==false||this.openList.length==0){
                let endtime = new Date().getTime();
                if(endtime- timerstart>4000){
                    console.log("没有路,跳出");
                    curPoint=null
                    return;
                }
                var curPoint=this.GetMinFFromOpenList().minPoint;
                //   console.log(curPoint,"当前点")
                var index=this.GetMinFFromOpenList().index;
                if(curPoint==null){
                    console.log("没有路");
                    return;
                }
                this.openList.splice(index,1);
                this.closeList.push(curPoint);
                this.AddNeiToOpenList(curPoint);
            }
            var p=this.GetPointFromOpenList(this.endPoint.x,this.endPoint.y);
          
            while(p.father!=null){
                p= p.father;
                let xshrink = parseInt((p.x/5).toString());
                 let Yshrink = parseInt((p.y/5).toString());
                this.map[xshrink][Yshrink]=4;
                this.lastwaysmatrixlist.push({
                    x:xshrink,
                    y:Yshrink
                })
            }
            //把终结点也设置成4
            let endxshrink = parseInt((this.endPoint.x/5).toString());
            let endYshrink = parseInt((this.endPoint.y/5).toString());
            this.map[endxshrink][endYshrink]=4;
            this.lastwaysmatrixlist.push({
                x:endxshrink,
                y:endYshrink
            });
            this.deltaFunchandler();
        }
    }
    let obstacle = new Obstacle()
    let globalAstarmanage = new Astar();
    globalAstarmanage.initGlobalMap(obstacle);
    //障碍注意：3表示为 可移动单元的障碍物
                //33表示地图的障碍物
                ///333表示建筑的障碍物
    export {globalAstarmanage}