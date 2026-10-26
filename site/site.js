// Общая шапка и 3D-модель страницы. Модель задаётся так: <body data-model="monitor">
(function(){
var P=[['index.html','Главная'],['prices.html','Цены'],['news.html','Новости'],['tournaments.html','Турниры'],['booking.html','3D-бронь'],['contacts.html','Контакты']];
var cur=location.pathname.split('/').pop()||'index.html';
var h=document.createElement('header');
h.innerHTML='<a class="logo" href="index.html">АВАТАР</a><nav>'+P.map(function(p){return '<a href="'+p[0]+'"'+(p[0]===cur?' class="on"':'')+'>'+p[1]+'</a>'}).join('')+'</nav><a class="login" href="auth.html">Войти</a>';
document.body.insertBefore(h,document.body.firstChild);
if(!window.THREE)return;
var cv=document.createElement('canvas');cv.id='bg3d';document.body.insertBefore(cv,document.body.firstChild);
var r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,60);
sc.add(new THREE.AmbientLight(0x8090ff,.8));var dl=new THREE.DirectionalLight(0xffffff,1.1);dl.position.set(-3,5,4);sc.add(dl);
var l1=new THREE.PointLight(0x2ee6d6,2,18);l1.position.set(3,1,4);sc.add(l1);var l2=new THREE.PointLight(0xff4fa3,1.6,18);l2.position.set(-4,-1,3);sc.add(l2);
function M(c,o){return new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:.6,roughness:.35},o||{}))}
function BM(c,a){return new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:a||1,side:THREE.DoubleSide})}
function Bx(w,hh,d,m,x,y,z,p){var o=new THREE.Mesh(new THREE.BoxGeometry(w,hh,d),m);o.position.set(x,y,z);p.add(o);return o}
var CY=0x2ee6d6,VI=0x7a5cff,PK=0xff4fa3,YE=0xffd54a;
var models={
 tower:function(g){Bx(1,2,.9,M(0x151a30),0,0,0,g);var gl=new THREE.Mesh(new THREE.PlaneGeometry(.8,1.8),BM(CY,.7));gl.position.x=.505;gl.rotation.y=Math.PI/2;g.add(gl);
  [-.55,0,.55].forEach(function(y){var rg=new THREE.Mesh(new THREE.RingGeometry(.15,.2,32),BM(0xffffff));rg.position.set(.51,y,0);rg.rotation.y=Math.PI/2;g.add(rg)})},
 monitor:function(g){Bx(3,1.8,.12,M(0x0a0c1a),0,.3,0,g);
  var c=document.createElement('canvas');c.width=512;c.height=300;var x=c.getContext('2d'),gr=x.createLinearGradient(0,0,512,0);gr.addColorStop(0,'#2ee6d6');gr.addColorStop(.55,'#7a5cff');gr.addColorStop(1,'#ff4fa3');x.fillStyle='#070b2a';x.fillRect(0,0,512,300);x.fillStyle=gr;x.font='800 90px Arial Black,sans-serif';x.textAlign='center';x.fillText('АВАТАР',256,170);x.font='24px Arial';x.fillStyle='#a9b6d8';x.fillText('240 Гц',256,230);
  var s=new THREE.Mesh(new THREE.PlaneGeometry(2.85,1.65),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));s.position.set(0,.3,.07);g.add(s);
  Bx(.18,.8,.18,M(0x222638),0,-.9,0,g);Bx(1.2,.08,.6,M(0x222638),0,-1.3,0,g)},
 trophy:function(g){var pts=[[0,-1.3],[.8,-1.3],[.8,-1.1],[.25,-1.0],[.2,-.4],[.35,-.2],[.85,.5],[.95,1.2],[.0,1.2]].map(function(a){return new THREE.Vector2(a[0],a[1])});
  var l=new THREE.Mesh(new THREE.LatheGeometry(pts,40),M(YE,{metalness:.9,roughness:.25,side:THREE.DoubleSide}));g.add(l);
  [-1,1].forEach(function(s){var t=new THREE.Mesh(new THREE.TorusGeometry(.42,.07,10,24),M(YE,{metalness:.9,roughness:.25}));t.position.set(s*1.0,.65,0);g.add(t)});
  Bx(1.8,.3,1.8,M(0x151a30),0,-1.5,0,g)},
 pin:function(g){var m=M(PK,{metalness:.4}),sp=new THREE.Mesh(new THREE.SphereGeometry(.85,32,24),m);sp.position.y=.7;g.add(sp);
  var cn=new THREE.Mesh(new THREE.ConeGeometry(.78,1.7,32),m);cn.rotation.x=Math.PI;cn.position.y=-.55;g.add(cn);
  var h2=new THREE.Mesh(new THREE.SphereGeometry(.32,20,16),M(0xffffff));h2.position.y=.7;h2.scale.z=1;g.add(h2);
  var rg=new THREE.Mesh(new THREE.TorusGeometry(1.1,.03,8,48),BM(CY));rg.rotation.x=Math.PI/2;rg.position.y=-1.5;g.add(rg)},
 news:function(g){[[0,.0,0,CY],[.5,.2,-.5,VI],[-.5,-.2,-1,PK]].forEach(function(a,i){var cd=Bx(1.9,2.5,.06,M(0x151a30),a[0],a[1],a[2],g);cd.rotation.z=(i-1)*.12;
  var bar=Bx(1.4,.14,.07,BM(a[3]),a[0],a[1]+.8,a[2]+.02,g);bar.rotation.z=cd.rotation.z;
  for(var k=0;k<3;k++){var ln=Bx(1.5-k*.3,.07,.07,BM(0xffffff,.6),a[0]-.05,a[1]+.3-k*.25,a[2]+.02,g);ln.rotation.z=cd.rotation.z}})}
};
var root=new THREE.Group(),inner=new THREE.Group();root.add(inner);sc.add(root);
var name=document.body.getAttribute('data-model')||'tower';(models[name]||models.tower)(inner);
var spin=name==='tower'||name==='trophy'||name==='pin',asp=1,mx=0;
function sz(){var w=innerWidth,hh=innerHeight;r.setSize(w,hh,false);asp=w/hh;cam.aspect=asp;cam.position.z=asp<.8?13:10;cam.updateProjectionMatrix()}
addEventListener('resize',sz);sz();addEventListener('pointermove',function(e){mx=(e.clientX/innerWidth-.5)*2});
var t0=performance.now();
(function loop(){var t=(performance.now()-t0)/1000,m=asp<.8;
 root.position.set(m?0:3.1,(m?2.6:0)+Math.sin(t*1.4)*.12,0);root.scale.setScalar(m?.72:1);
 inner.rotation.y=spin?t*.6+scrollY*.003+mx*.3:Math.sin(t*.6)*.5+mx*.3+scrollY*.002;inner.rotation.x=spin?0:Math.sin(t*.5)*.08;
 r.render(sc,cam);requestAnimationFrame(loop)})();
})();
