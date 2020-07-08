
TouchMotionObject = {
  EvtFlags: {
    tap_cnt:0,
    in_motion:false,
    motion_sensitivity: 20, //unit: px
    timeout_down: 200,      //unit: ms
    timeout_up: 550,        //unit: ms
    waiting_tap_up:null,
    waiting_tap_down:null,
    evt_code:0,
    pending_evt_code:0,
    last_evt_code:0
  },

  evt_comparison_table: {
    'swipeleft':    '-4',
    'swiperight':   '-5',
    'swipeup':      '-6',
    'swipedown':    '-7',
    'panleft':      '-8',
    'panright':     '-9',
    'panup':        '-10',
    'pandown':      '-11',
    'singletap':    '4',
    'singlepress':  '5',
    'doubletap':    '8',
    'doublepress':  '9',
    //use with caution
    'pressrelease': '-1',
    'panmove':      '-2',
    'panchangedirection': '-3',
  },

  evt_list: {
    '-4':[],
    '-5':[],
    '-6':[],
    '-7':[],
    '-8':[],
    '-9':[],
    '-10':[],
    '-11':[],
    '4':[],
    '5':[],
    '8':[],
    '9':[],
    //
    '-1':[],
    '-2':[],
    '-3':[]
  },

  element_list: [],

  MotionRestriction:{
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
      x:null,
      y:null
    },
    initial_drag:{
      x:20,
      y:20,
    },
    speed:{
      x:20,
      y:20,
    },
    update_offset:true
  },

  start : {}, end : {}, current : {}, offset : {},
  x_max:0,
  y_max:0,

  waitTapDown: function () {
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
  },
  waitTapUp: function () {
    if(TouchMotionObject.EvtFlags.evt_code==1) {
      TouchMotionObject.EvtFlags.evt_code=5
      TouchMotionObject.EvtFlags.pending_evt_code=-1
      TouchMotionObject.generateTouchEvt(TouchMotionObject.EvtFlags.evt_code)
    }
    else if(TouchMotionObject.EvtFlags.evt_code==3) {
      TouchMotionObject.EvtFlags.evt_code=9
      TouchMotionObject.EvtFlags.pending_evt_code=-1
      TouchMotionObject.generateTouchEvt(TouchMotionObject.EvtFlags.evt_code)
    }
    TouchMotionObject.EvtFlags.evt_code=0
    TouchMotionObject.EvtFlags.tap_cnt=0
  },

  addTouchEvt: function (element, evt, callBack){
    this.x_max=document.body.offsetWidth
    this.y_max=document.body.offsetHeight
    this.MotionRestriction.end.x=this.x_max
    this.MotionRestriction.end.y=this.y_max

    this.evt_list[this.evt_comparison_table[evt]].push(callBack)

    if (this.element_list.indexOf(element)==-1){
      this.element_list.push(element)
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
        TouchMotionObject.offset.y = TouchMotionObject.current.y-TouchMotionObject.start.y
        TouchMotionObject.offset.x = TouchMotionObject.current.x-TouchMotionObject.start.x
        if (Math.abs(TouchMotionObject.offset.x)>TouchMotionObject.MotionRestriction.initial_drag.x
      || Math.abs(TouchMotionObject.offset.y)>TouchMotionObject.MotionRestriction.initial_drag.y ) {
          TouchMotionObject.selectTouchEvt('drag')
        }
      })
    }
  },

  selectTouchEvt: function (dom_evt) {
    if (dom_evt=='down') {
      if (this.EvtFlags.evt_code==0){ //evt: single press wait timeout
        this.EvtFlags.evt_code=1;
        this.EvtFlags.tap_cnt=1;
        this.EvtFlags.waiting_tap_up=setTimeout(this.waitTapUp, this.EvtFlags.timeout_up)
      }
      else if (this.EvtFlags.evt_code==2){ //evt: double press wait timeout
        this.EvtFlags.evt_code=3
        this.EvtFlags.tap_cnt=2;
        clearTimeout(this.EvtFlags.waiting_tap_down)
        this.EvtFlags.waiting_tap_up=setTimeout(this.waitTapUp, this.EvtFlags.timeout_up)
      }
    }
    else if (dom_evt=='up') {
      if (this.EvtFlags.in_motion==true && this.EvtFlags.pending_evt_code==0){ //evt: 'swipe'
        this.EvtFlags.in_motion=false
        this.offset.x = this.end.x - this.start.x
        this.offset.y = this.end.y - this.start.y
        //vertical scroll
        if (Math.abs(this.offset.y) > Math.abs(this.offset.x)) {
          // console.log('v scroll')
          if (this.offset.y > 0){
            this.generateTouchEvt(-7)
            TouchMotionObject.EvtFlags.evt_code=0
          }
          else if (this.offset.y < 0){
            this.generateTouchEvt(-6)
            TouchMotionObject.EvtFlags.evt_code=0
          }
        }
        //Horrizontal scroll
        else if (Math.abs(this.offset.y) < Math.abs(this.offset.x)) {
          // console.log('h scroll')
          if (this.offset.x > 0){
            this.generateTouchEvt(-5)
            TouchMotionObject.EvtFlags.evt_code=0
          }
          else if (this.offset.x < 0){
            this.generateTouchEvt(-4)
            TouchMotionObject.EvtFlags.evt_code=0
          }
        }
      }
      else if (this.EvtFlags.in_motion==false) { //evt: tap wait timeout
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

      if (this.EvtFlags.pending_evt_code==-1){ //evt: press release
        this.generateTouchEvt(-1)
        TouchMotionObject.EvtFlags.pending_evt_code=0
        this.EvtFlags.in_motion=false
      }
    }
    else if (dom_evt=='drag') {
      this.offset.x = this.current.x - this.start.x
      this.offset.y = this.current.y - this.start.y
      if (this.EvtFlags.in_motion==false){
        if (Math.abs(this.offset.y) > this.EvtFlags.motion_sensitivity || Math.abs(this.offset.x) > this.EvtFlags.motion_sensitivity) {
          // console.log('scroll:cancel tap')
          clearTimeout(this.EvtFlags.waiting_tap_up)
          this.EvtFlags.in_motion=true;
          TouchMotionObject.EvtFlags.pending_evt_code=-1
        }
      }
      else if (this.EvtFlags.in_motion==true){
        if (this.EvtFlags.last_evt_code>=-11
            && this.EvtFlags.last_evt_code<=-8
            && this.EvtFlags.last_evt_code!=this.EvtFlags.evt_code
            && this.MotionRestriction.update_offset==true) {
          this.start.x=this.current.x
          this.start.y=this.current.y
        }

        //vertical pan
        if (Math.abs(this.offset.y) > Math.abs(this.offset.x)) {
          // console.log('v pan')
          if (this.offset.y > 0){
            this.generateTouchEvt(-11)
            TouchMotionObject.EvtFlags.evt_code=0
          }
          else if (this.offset.y < 0){
            this.generateTouchEvt(-10)
            TouchMotionObject.EvtFlags.evt_code=0
          }
        }
        //Horrizontal scroll
        else if (Math.abs(this.offset.y) < Math.abs(this.offset.x)) {
          // console.log('h pan')
          if (this.offset.x > 0){
            this.generateTouchEvt(-9)
            TouchMotionObject.EvtFlags.evt_code=0
          }
          else if (this.offset.x < 0){
            this.generateTouchEvt(-8)
            TouchMotionObject.EvtFlags.evt_code=0
          }
        }
      }
    }
  },

  generateTouchEvt: function (evt_code) {
    console.log(evt_code)
    // console.log('tap cnt:'+this.EvtFlags.tap_cnt);
    for (var i=0; i<this.evt_list[evt_code.toString()].length; i++) {
      this.evt_list[evt_code.toString()][i]()
    }

    if (evt_code>=-11 && evt_code<=-8){
      for (var i=0; i<this.evt_list[this.evt_comparison_table['panmove']].length; i++) {
        this.evt_list[evt_code.toString()][i]()
          this.evt_list[this.evt_comparison_table['panmove']][i]()
      }
    }
    this.EvtFlags.last_evt_code=evt_code
  },

  checkRestriction: function (direction) {
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
