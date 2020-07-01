
function initAll(){
  initMobileMenu()
  initLogoCube()
}

/**
 * Mobile burger menu button and gesture for toggling sidebar
 */

function initMobileMenu () {
  var mobileBar = document.getElementById('mobile-bar')
  var sidebar = document.querySelector('.sidebar')
  var menuButton = mobileBar.querySelector('.menu-button')

  menuButton.addEventListener('click', function () {
    sidebar.classList.toggle('open')
  })

  document.body.addEventListener('click', function (e) {
    if (e.target !== menuButton && !sidebar.contains(e.target)) {
      sidebar.classList.remove('open')
    }
  })

  // Toggle sidebar on swipe
  var start = {}, end = {}

  document.body.addEventListener('touchstart', function (e) {
    start.x = e.changedTouches[0].clientX
    start.y = e.changedTouches[0].clientY
  })

  document.body.addEventListener('touchend', function (e) {
    end.y = e.changedTouches[0].clientY
    end.x = e.changedTouches[0].clientX

    var xDiff = end.x - start.x
    var yDiff = end.y - start.y

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0 && start.x <= document.body.offsetWidth*0.33) sidebar.classList.add('open')
      else sidebar.classList.remove('open')
    }
  })
}


/**
 * Generate cube animation as page logo
 */
var cube_list=[];

function initLogoCube(){
  var vividcube = {
    renderer: new THREE.CanvasRenderer(),
    canvas_width:40,
    canvas_height:40,
    canvas_lineWidth:2,
    camera:0,
    scene:0,
    geometry:0,
    material:0,
    mesh:null
  };

  var vividcube_size2 = {
    renderer: new THREE.CanvasRenderer(),
    canvas_width:30,
    canvas_height:30,
    canvas_lineWidth:2,
    camera:0,
    scene:0,
    geometry:0,
    material:0,
    mesh:null
  };

  if($('#mobile-bar').css('display')=='none'){
    var logo = document.getElementById("logo");
    addCube(vividcube,logo);
  }
  else{
    var logo_mobile = document.getElementById("logo_mobile");
    addCube(vividcube_size2,logo_mobile);
  }
  setInterval(function(){animate(cube_list)},10);
}

/**
 * Generate customized cube animatoin
 */

function initCustomCube(){
  var vividcube = {
    renderer: new THREE.CanvasRenderer(),
    canvas_width:300,
    canvas_height:300,
    canvas_lineWidth:4,
    camera:0,
    scene:0,
    geometry:0,
    material:0,
    mesh:null
  };

  var vividcube_size2 = {
    renderer: new THREE.CanvasRenderer(),
    canvas_width:200,
    canvas_height:200,
    canvas_lineWidth:3,
    camera:0,
    scene:0,
    geometry:0,
    material:0,
    mesh:null
  };

  if($('#mobile-bar').css('display')=='none'){
    var cube_container = document.getElementById("cc");
    var insert = document.getElementById("cc-first-element");
    addCube(vividcube,cube_container,insert);
    $('canvas').css({'display': 'block','margin':'0 auto'});
  }
  else{
    var cube_container = document.getElementById("cc");
    var insert = document.getElementById("cc-first-element");
    addCube(vividcube_size2,cube_container,insert);
    $('canvas').css({'display': 'block','margin':'0 auto'});
  }
  setInterval(function(){animate(cube_list)},10);
  $('#nav').css('right','auto');
  $('.menu-button').hide();
}

/**
 * Custom API
 */
function addCube(cube,container) {
  var insertElement = arguments[2] ? arguments[2] : null;//Default to 0

  cube.renderer.setSize(cube.canvas_width, cube.canvas_width);
  if (insertElement!=null){
    container.insertBefore(cube.renderer.domElement, insertElement)
  }
  else{
    container.appendChild(cube.renderer.domElement);
  }

  cube.camera = new THREE.PerspectiveCamera(50, cube.canvas_width / cube.canvas_height, 1, 1000);
  cube.camera.position.z = 500;
  cube.scene = new THREE.Scene();
  cube.geometry = new THREE.CubeGeometry(200, 200, 200);
  cube.material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: cube.canvas_lineWidth
  });

  cube.mesh = new THREE.Mesh(cube.geometry, cube.material);
  cube.scene.add(cube.mesh);
  cube_list.push(cube);
}

function animate(cubes) {
  if(cubes.length>1){
    for (var i=0; i < cubes.length; i++){
      cubes[i].mesh.rotation.x = Date.now() * 0.0005;
      cubes[i].mesh.rotation.y = Date.now() * 0.001;
      cubes[i].renderer.render(cubes[i].scene, cubes[i].camera);
    }
  }
  else if (cubes.length==1){
    cubes[0].mesh.rotation.x = Date.now() * 0.0005;
    cubes[0].mesh.rotation.y = Date.now() * 0.001;
    cubes[0].renderer.render(cubes[0].scene, cubes[0].camera);
  }
}
