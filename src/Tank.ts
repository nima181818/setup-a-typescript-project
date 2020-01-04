import { Astar,Point } from './wayfinders'
import { obstacle } from './obstacle'
export class Tank{
	mapmanager:Astar=new Astar()
	px:number
	py:number
	constructor(x:number,y:number){
		this.px = x;
		this.py = y;
		this.initMap();
		

	}
	fire(){
		
		alert('开火')
	}
	initMap(){
		for(let j=0;j<80;j++){
			this.mapmanager.map[j] = []
			for(let k=0;k<120;k++){
				this.mapmanager.map[j][k] = 0
			}
		}
		//出发点
		this.mapmanager.startPoint.x = this.px;
		this.mapmanager.startPoint.y = this.py;
		this.mapmanager.startPoint.father = null;
		let stepx = parseInt((this.mapmanager.startPoint.x/5).toString())
		let stepy = parseInt((this.mapmanager.startPoint.y/5).toString())
		this.mapmanager.map[stepy][stepx] = 1;
		//终点
		this.mapmanager.endPoint.x = 25
		this.mapmanager.endPoint.y = 5;
		this.mapmanager.startPoint.father = null;
		let stepx1 = parseInt((this.mapmanager.endPoint.x/5).toString())
		let stepy1 = parseInt((this.mapmanager.endPoint.y/5).toString())
		this.mapmanager.map[stepy1][stepx1] = 2;
		//障碍物
		for(let j=0;j<this.mapmanager.map.length;j++){
			for(let k=0;k<this.mapmanager.map[j].length;k++){
				  for(let u=0;u<obstacle.points.length;u++){
                      if(
						  k*5<=obstacle.points[u].x
						  &&
						  (k+1)*5>obstacle.points[u].x
						  &&
						  j*5<=obstacle.points[u].y
						  &&
						  (j+1)*5>obstacle.points[u].y
					  ){
						this.mapmanager.map[j][k] =3
					  }
				  }
                
			}
		}
		this.mapmanager.FindPoint();

	}
}

   