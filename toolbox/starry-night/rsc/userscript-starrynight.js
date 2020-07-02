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
    '金風玉露壹相逢，便勝卻人間無數',
    '兩情若是久長時，又豈在朝朝暮暮',
    '梦后楼台高锁，酒醒帘幕低垂',
    '去年春恨却来时，落花人独立，微雨燕双飞',
    '记得小苹初见，两重心字罗衣',
    '琵琶弦上说相思，當時明月在，曾照彩雲歸',
    '从别后，忆相逢，几回魂梦与君同。今宵剩把银釭照，犹恐相逢是梦中',
    '红笺小字，说尽平生意。鸿雁在云鱼在水，惆怅此情难寄',
    '夜月壹簾幽夢，春風十裏柔情'
  ]

}

$(document).ready(function(){
  fade_speed=3000 //milli second
  x_max=document.body.offsetWidth;
  y_max=document.body.offsetHeight;
  countDown();
  running=setInterval("countDown()",fade_speed)

  var start = {}, end = {}

  document.body.addEventListener('touchstart', function (e) {
    start.x = e.changedTouches[0].clientX
    start.y = e.changedTouches[0].clientY
  })

  document.body.addEventListener('touchend', function (e) {
    $('.prompt').hide();
    end.y = e.changedTouches[0].clientY
    end.x = e.changedTouches[0].clientX

    var xDiff = end.x - start.x
    var yDiff = end.y - start.y

    if (Math.abs(yDiff) > Math.abs(xDiff) && Math.abs(yDiff) > 0.2*document.body.offsetHeight) {
      console.log('touch upscroll motion activated')
      if (yDiff < 0 && start.y >= 0.75*document.body.offsetHeight) {
        if (document.referrer.match('power-button')==null) {
          $(location).attr('href','/');
        }
        else if (document.referrer.match('power-button')[0]!='') {
          $(location).attr('href','../power-button/');
        }
      }
    }
  })

  document.body.addEventListener('touchmove', function (e) {
    $('.prompt').show();
  })

  // $('body').mousedown(function(e){
  // 	$('.wave').css({'left':e.pageX.toString()+'px', 'top':e.pageY.toString()+'px'});
  //   $('.wave').show();
  // 	$('.wave').animate({
  //     opacity:'0.5',
  //     height:'150px',
  //     width:'150px'
  //   });
  // });
});

function Rando(min, max) {
  return Math.floor(Math.random() * (max - min) + min ) ;
}

var at=1;
var max=30;
var toggle=true;
function countDown(){
  var div='#div1'
  if(toggle==true){
    var new_x=Rando(x_max*0.2,x_max*0.7)
    var new_y=Rando(y_max*0.2,y_max*0.7)
    var index = Math.floor(Math.random() * txt.love.length)
    $(div).css({'left':new_x.toString()+'px', 'top':new_y.toString()+'px'});
    $("#p1").text(txt.love[index]);
    toggle=false
    at=at+1
  }
  else{
    toggle=true
  }

  $(div).fadeToggle(fade_speed);
  if(at>max){
    clearInterval(running)
  }
}
