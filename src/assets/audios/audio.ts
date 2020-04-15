const buiding =require('./eva_voice/building.mp3'),
      buidinginprogress =require('./eva_voice/building_in_progress.mp3'),
      cannotplayhere = require('./eva_voice/cannotplayhere.mp3'),
      constructionalcomplete = require('./eva_voice/constructionalcomplete.mp3'),
      constructionalnoctions =require('./eva_voice/constructionalnoctions.mp3'),

      //犀牛坦克声音
      tankmoving = require('./tank_voice/moving_rank.mp3'),
      waitingorders = require('./tank_voice/waitingorders.mp3'),
      fireout = require('./tank_voice/fireout.mp3');
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
constructionalcomplete_audio = new Audios(constructionalcomplete.default),
constructionalnoctions_audio = new Audios(constructionalnoctions.default),
//犀牛坦克声音
tankmoving_audio = new Audios(tankmoving.default),
waitingorders_audio = new Audios(waitingorders.default),
fireout_audio = new Audios(fireout.default)

export {buiding_audio,buidinginprogress_audio,cannotplayhere_audio,tankmoving_audio,waitingorders_audio,constructionalcomplete_audio,constructionalnoctions_audio,fireout_audio}