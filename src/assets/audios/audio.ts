const buiding =require('./eva_voice/building.mp3'),
      buidinginprogress =require('./eva_voice/building_in_progress.mp3'),
      cannotplayhere = require('./eva_voice/cannotplayhere.mp3'),

      //犀牛坦克声音
      tankmoving = require('./tank_voice/moving_rank.mp3'),
      waitingorders = require('./tank_voice/waitingorders.mp3')
console.log(buiding,"啦啦啦啊")
class Audios{
    audio:HTMLAudioElement
    constructor(source:any){
      this.initAudios(source)
    }
    initAudios(source:any){
       this.audio = new Audio(source)
    }
    playAudio(){
        this.audio.play();
    }
}
let buiding_audio = new Audios(buiding.default),
buidinginprogress_audio = new Audios(buidinginprogress.default),
cannotplayhere_audio = new Audios(cannotplayhere.default),
//犀牛坦克声音
tankmoving_audio = new Audios(tankmoving.default),
waitingorders_audio = new Audios(waitingorders.default)

export {buiding_audio,buidinginprogress_audio,cannotplayhere_audio,tankmoving_audio,waitingorders_audio}