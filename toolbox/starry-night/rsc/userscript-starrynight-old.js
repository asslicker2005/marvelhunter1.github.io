var txt={
  sence:[
    '深院靜，小庭空，斷續寒砧斷續風',
    '无奈夜长人不寐，数声何月到帘栊'
  ],
  life: [
    '一曲新词酒一杯，去年天气旧亭台，夕阳西下几时回',
    '無可奈何花落去，似曾相識燕歸來，小園香徑獨徘徊',
    '槛菊愁烟兰泣露，罗幕轻寒，燕子双飞去。明月不谙离恨苦，斜光到晓穿朱户',
    '昨夜西风凋碧树，独上高楼，望尽天涯路。欲寄彩笺兼尺素，山长水阔知何处',
    '爱上层楼，为赋新词强说愁',
    '欲說還休，卻道天涼好個秋',
    '世人笑我太疯癫，我笑世人看不穿',
    '不見五陵豪傑墓，無花無酒做鋤田',
    '白发渔樵江渚上，惯看秋月春风',
    '壹壺煮酒喜相逢，古今多少事，都付笑談中',
    '人生在世不稱意，明朝散發弄偏舟',
    '二十四桥明月夜，玉人何处教吹箫',
    '细草微风岸，危樯独夜舟',
    '星垂平野阔，月涌大江流',
    '名岂文章著，官应老病休',
    '飘飘何所似，天地一沙鸥'
  ],
  love: [
    '青青子衿，悠悠我心。縱我不往，子寧不嗣音',
    '青青子佩，悠悠我思。縱我不往，子寧不來',
    '自牧歸荑，洵美且異。匪女之為美，美人之貽',
    '纤云弄巧，飞星传恨，银汉迢迢暗度',
    '金風玉露壹相逢，便勝卻人間無數',
    '柔情似水，佳期如梦，忍顾鹊桥归路',
    '兩情若是久長時，又豈在朝朝暮暮',
    '梦后楼台高锁，酒醒帘幕低垂',
    '去年春恨却来时，落花人独立，微雨燕双飞',
    '記得小蘋初見，兩重心字羅衣',
    '琵琶弦上说相思，當時明月在，曾照彩雲歸',
    '从别后，忆相逢，几回魂梦与君同。今宵剩把银釭照，犹恐相逢是梦中',
    '红笺小字，说尽平生意。鸿雁在云鱼在水，惆怅此情难寄',
    '夜月壹簾幽夢，春風十裏柔情'
  ]
}

var song={
  provider: '163 music',
  api: {
    music:'https://api.imjad.cn/cloudmusic/?type=song&id=', //&br=64000, 128000(default), 198000, 320000
    //return value usage: 'data'[0].'url'
    //standard format:
    // {"data":[{"id":28012031,"url":"https:\/\/m7.music.126.net\/20200703155303\/b03b24797fe0cbb50cd8e7ebde099852\/ymusic\/8972\/6e6e\/7b86\/bddf788bf92e62d7c5c9aa457dd27bf5.mp3","br":128000,"size":3950276,"md5":"bddf788bf92e62d7c5c9aa457dd27bf5","code":200,"expi":1200,"type":"mp3","gain":0,"fee":0,"uf":null,"payed":0,"flag":256,"canExtend":false,"freeTrialInfo":null,"level":"standard","encodeType":"mp3"}],"code":200}
    title: 'https://api.imjad.cn/cloudmusic/?type=detail&id='
    //standard format:
    // {"songs":[{"name":"在这个世界相遇-钢琴版（《潮流琴房》曲谱试听）","id":421110801,"pst":0,"t":0,"ar":[{"id":1197082,"name":"文武贝","tns":[],"alias":[]}],"alia":[],"pop":95.0,"st":0,"rt":"","fee":0,"v":92,"crbt":null,"cf":"","al":{"id":34777765,"name":"《潮流琴房》（乐谱音频）","picUrl":"https://p2.music.126.net/QXI329jEogBgxr2GM93vjQ==/109951162819438408.jpg","tns":[],"pic_str":"109951162819438408","pic":109951162819438408},"dt":189903,"h":{"br":320000,"fid":0,"size":7604811,"vd":670.0},"m":{"br":192000,"fid":0,"size":4562904,"vd":3742.0},"l":{"br":128000,"fid":0,"size":3041951,"vd":7172.0},"a":null,"cd":"1","no":2,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"mark":131072,"originCoverType":0,"single":0,"noCopyrightRcmd":null,"mv":0,"rtype":0,"rurl":null,"mst":9,"cp":0,"publishTime":1468730325241}],"privileges":[{"id":421110801,"fee":0,"payed":0,"st":0,"pl":320000,"dl":320000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":320000,"fl":320000,"toast":false,"flag":0,"preSell":false,"playMaxbr":320000,"downloadMaxbr":320000,"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]}],"code":200}
  },
  id_all: [
    31134633,
    31260221,
    1339009324,
    31134621
  ],
  id_prefered:[
    1459703175,
    421110801
  ]
}

$(document).ready(function(){
  addTouchControl();

  var music_url=song.api.music+song.id_prefered[1];
  loadMusic(music_url);

  countDown();
  txt_running=setInterval("countDown()",txt_fade_speed)
});

var txt_iterate_cnt=1;
var txt_iterate_max=30;
var txt_fade_toggle=true;
var txt_running;
var txt_fade_speed=3000 //milli second
var x_max;
var y_max;
var start = {}, end = {};
var audio1;

function loadMusic(api_url){
  var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
  httpRequest.open('GET', api_url, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
  httpRequest.send();//第三步：发送请求  将请求参数写在URL中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var _json = httpRequest.responseText;//获取到json字符串，还需解析
      var music_info = JSON.parse(_json);
      $('audio').attr('src', music_rsc=music_info.data[0].url);
      // console.log(typeof(music_info));
      // console.log(music_info);
      // console.log(music_rsc);
    }
  }

  audio1 = document.getElementById("audio1");
  audio1.addEventListener('ended', function () { //结束
      console.log("播放结束");
  }, false);

  // $('audio').removeAttr('controls')
  // $('title').text('Title')
}

function addTouchControl(){
  x_max=document.body.offsetWidth;
  y_max=document.body.offsetHeight;

  document.body.addEventListener('touchstart', function (e) {
    if(audio1.paused) {
      audio1.play();
    }
    else {
      audio1.pause();// 这个就是暂停
    }
    start.x = e.changedTouches[0].clientX
    start.y = e.changedTouches[0].clientY
  })

  document.body.addEventListener('touchend', function (e) {
    $('.prompt').hide();
    end.y = e.changedTouches[0].clientY
    end.x = e.changedTouches[0].clientX

    var xDiff = end.x - start.x
    var yDiff = end.y - start.y

    //vertical scroll
    if (Math.abs(yDiff) > Math.abs(xDiff) && Math.abs(yDiff) > 0.2*document.body.offsetHeight) {
      console.log('vertical scroll')
      if (yDiff < 0 && start.y >= 0.75*document.body.offsetHeight) {
        if (document.referrer.match('power-button')==null) {
          $(location).attr('href','/');
        }
        else if (document.referrer.match('power-button')[0]!='') {
          $(location).attr('href','../power-button/');
        }
      }
      else if (yDiff < 0){
        $('.prompt').show();
      }
    }
    //Horrizontal scroll
    else if (Math.abs(yDiff) > Math.abs(xDiff) && Math.abs(yDiff) > 0.2*document.body.offsetHeight) {
      console.log('vertical scroll')
    }

  })

    //Random move
    document.body.addEventListener('touchmove', function(){})
}


function countDown(){
  var div='#div1'
  if(txt_fade_toggle==true){
    var new_x=Rando(x_max*0.2,x_max*0.7)
    var new_y=Rando(y_max*0.2,y_max*0.7)
    var index = Math.floor(Math.random() * txt.love.length)
    $(div).css({'left':new_x.toString()+'px', 'top':new_y.toString()+'px'});
    $("#p1").text(txt.love[index]);
    txt_fade_toggle=false
    txt_iterate_cnt=txt_iterate_cnt+1
  }
  else{
    txt_fade_toggle=true
  }

  $(div).fadeToggle(txt_fade_speed);
  if(txt_iterate_cnt>txt_iterate_max){
    clearInterval(txt_running)
  }
}

function Rando(min, max) {
  return Math.floor(Math.random() * (max - min) + min ) ;
}
