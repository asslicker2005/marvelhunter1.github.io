
var TouchMotionObject = function () {

  var EvtFlags = {
    tap_cnt:0,
    in_motion:false,
    motion_sensitivity: 20, //unit: px
    timeout_down: 200,      //unit: ms
    timeout_up: 550,        //unit: ms
    waiting_tap_up:null,
    waiting_tap_down:null,
    evt_code:0
  }

  var evt_comparison_table = {
    'swipeleft':    '-4',
    'swiperight':   '-5',
    'swipeup':      '-6',
    'swipedown':   '-7',
    'singletap':    '4',
    'singlepress':  '5',
    'doubletap':    '8',
    'doublepress':  '9'
  }

  var evt_list = {
    '-4':[],
    '-5':[],
    '-6':[],
    '-7':[],
    '4':[],
    '5':[],
    '8':[],
    '9':[]
  }

  var MotionRestriction = {
    direction:{
      left:true,
      right:true,
      up:true,
      down:true
    },
    start:{
      x:0,
      y:0
    },
    end:{
      x:0,
      y:0
    },
    diff:{
      x:20,
      y:20,
    }
  }

  var start = {}, end = {}, current = {}, diff = {}, x_max=0, y_max=0

  var waitTapDown = function () {
    if(TouchMotionObject.EvtFlags.evt_code==2){
      TouchMotionObject.EvtFlags.evt_code=4
      TouchMotionObject.generateTouchEvt(TouchMotionObject.EvtFlags.evt_code)
    }
    else if(TouchMotionObject.EvtFlags.evt_code==6) {
      TouchMotionObject.EvtFlags.evt_code=8
      TouchMotionObject.generateTouchEvt(TouchMotionObject.EvtFlags.evt_code)
    }
    TouchMotionObject.EvtFlags.evt_code=0
    TouchMotionObject.EvtFlags.tap_cnt=0
  }

  var waitTapUp = function () {
    if(TouchMotionObject.EvtFlags.evt_code==1) {
      TouchMotionObject.EvtFlags.evt_code=5
      TouchMotionObject.generateTouchEvt(TouchMotionObject.EvtFlags.evt_code)
    }
    else if(TouchMotionObject.EvtFlags.evt_code==3) {
      TouchMotionObject.EvtFlags.evt_code=9
      TouchMotionObject.generateTouchEvt(TouchMotionObject.EvtFlags.evt_code)
    }
    TouchMotionObject.EvtFlags.evt_code=0
    TouchMotionObject.EvtFlags.tap_cnt=0
  }

  var addTouchEvt = function (element, evt, callBack){
    this.x_max=document.body.offsetWidth
    this.y_max=document.body.offsetHeight
    this.MotionRestriction.end.x=this.x_max
    this.MotionRestriction.end.y=this.y_max
    this.evt_list[this.evt_comparison_table[evt]].push([element, callBack])
    element.addEventListener('touchstart', function (e) {
      TouchMotionObject.start.x = e.changedTouches[0].clientX
      TouchMotionObject.start.y = e.changedTouches[0].clientY
      TouchMotionObject.selectTouchEvt('down')
    })

    element.addEventListener('touchend', function (e) {
      TouchMotionObject.end.y = e.changedTouches[0].clientY
      TouchMotionObject.end.x = e.changedTouches[0].clientX
      TouchMotionObject.selectTouchEvt('up')
    })

    element.addEventListener('touchmove', function (e) {
      TouchMotionObject.current.y = e.changedTouches[0].clientY
      TouchMotionObject.current.x = e.changedTouches[0].clientX
      TouchMotionObject.selectTouchEvt('drag')
    })

  }

  var selectTouchEvt = function (evt) {
    if (evt=='down') {
      if (this.EvtFlags.evt_code==0){
        this.EvtFlags.evt_code=1;
        this.EvtFlags.tap_cnt=1;
        this.EvtFlags.waiting_tap_up=setTimeout(this.waitTapUp, this.EvtFlags.timeout_up)
      }
      else if (this.EvtFlags.evt_code==2){ //support double taps
        this.EvtFlags.evt_code=3
        this.EvtFlags.tap_cnt=2;
        clearTimeout(this.EvtFlags.waiting_tap_down)
        this.EvtFlags.waiting_tap_up=setTimeout(this.waitTapUp, this.EvtFlags.timeout_up)
      }
    }
    else if (evt=='up') {
      if (this.EvtFlags.in_motion==true){
        this.EvtFlags.in_motion=false
        this.diff.x = this.end.x - this.start.x
        this.diff.y = this.end.y - this.start.y
        //vertical scroll
        if (Math.abs(this.diff.y) > Math.abs(this.diff.x)) {
          console.log('v scroll')
          if (this.diff.y > 0)
            this.generateTouchEvt(-7)
          else if (this.diff.y < 0)
            this.generateTouchEvt(-6)
        }
        //Horrizontal scroll
        else if (Math.abs(this.diff.y) < Math.abs(this.diff.x)) {
          console.log('h scroll')
          if (this.diff.x > 0)
            this.generateTouchEvt(-5)
          else if (this.diff.x < 0)
            this.generateTouchEvt(-4)
        }
      }
      else if (this.EvtFlags.in_motion==false) {
        if (this.EvtFlags.evt_code==1){
          this.EvtFlags.evt_code=2;
          clearTimeout(this.EvtFlags.waiting_tap_up)
          this.EvtFlags.waiting_tap_down=setTimeout(this.waitTapDown, this.EvtFlags.timeout_down)
        }
        else if (this.EvtFlags.evt_code==3){
          this.EvtFlags.evt_code=6;
          clearTimeout(this.EvtFlags.waiting_tap_up)
          // this.EvtFlags.out(6)
          this.EvtFlags.waiting_tap_down=setTimeout(this.waitTapDown, this.EvtFlags.timeout_down)
        }
      }
    }
    else if (evt=='drag') {
      this.diff.x = this.current.x - this.start.x
      this.diff.y = this.current.y - this.start.y
      if (this.EvtFlags.in_motion==false){
        if (Math.abs(this.diff.y) > this.EvtFlags.motion_sensitivity || Math.abs(this.diff.x) > this.EvtFlags.motion_sensitivity) {
          console.log('scroll:cancel tap')
          clearTimeout(this.EvtFlags.waiting_tap_up)
          this.EvtFlags.in_motion=true;
        }
      }
      else if (this.EvtFlags.in_motion==true){

      }
    }
  }

  var generateTouchEvt = function (evt_code) {
    console.log(evt_code)
    console.log('tap cnt:'+this.EvtFlags.tap_cnt);
    for (var i=0; i<this.evt_list[evt_code.toString()].length; i++) {
      this.evt_list[evt_code.toString()][i][1]()
    }
  }

  var checkRestriction = function (direction) {
    if (
      this.start.x>this.MotionRestriction.start.x &&
      this.end.x<this.MotionRestriction.end.x &&
      this.start.y>this.MotionRestriction.start.y &&
      this.end.y<this.MotionRestriction.end.y
    ){
      return true
    }
    else{
      return false
    }
  }

}
