(function(){
"use strict";
var ORIGIN={lat:25.0365,lng:121.4319};
var MAPFONT="Huninn, 'PingFang TC', 'Noto Sans TC', sans-serif";
var T={
 A:{label:"🥇 唱歌＋烤肉",desc:"首選",color:"#f5c451"},
 B:{label:"🥈 烤肉或唱歌",desc:"二選一",color:"#ff7a5c"},
 C:{label:"🏠 一般包棟",desc:"便宜為主",color:"#9aa6ff"},
 D:{label:"⛺ 懶人露營",desc:"禁止卡拉OK",color:"#4fd6c4"}
};
var ICON={A:"🎤",B:"🍖",C:"🏠",D:"⛺"};
function iconOf(d){return d.tier==="B"&&d.ktv&&!d.bbq?"🎤":ICON[d.tier]}
var NEAR=window.NEAR||{},DATA=window.DATA||[];
DATA.forEach(function(d,i){d.idx=i});

/* ---------- 清單 ---------- */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function money(n){return n==null?"點連結看":"$"+n.toLocaleString("en-US")}
function per(n){return n==null?"依營位":"每人 $"+Math.round(n/8).toLocaleString("en-US")}
function dur(m){var h=Math.floor(m/60);return(h?h+" 小時 ":"")+(m%60)+" 分"}
var rankOf={};
function card(d,n){
  var near=(NEAR[d.near]||[]).map(function(x){return"<li>"+esc(x)+"</li>"}).join("");
  return '<article class="card" tabindex="0" data-idx="'+d.idx+'" style="--c:'+T[d.tier].color+';--i:'+Math.min(n,14)+'">'+
  '<div class="top"><div class="rank">'+n+'</div><div><div class="name">'+esc(d.s)+'</div><div class="where">'+esc(d.where)+" · "+esc(d.plat)+" · "+esc(d.cap)+'</div></div></div>'+
  '<div class="pills"><span class="pill '+(d.ktv?"yes":"no")+'">卡拉OK</span><span class="pill '+(d.bbq?"yes":"no")+'">烤肉</span><span class="pill">評價 '+esc(d.rating)+'</span></div>'+
  '<div class="nums"><div class="num"><small>兩晚</small><b>'+money(d.price)+'</b><small>'+per(d.price)+'</small></div><div class="num"><small>車程</small><b>'+dur(d.mins)+'</b><small>約 '+d.km+' 公里</small></div></div>'+
  '<div><div class="label">附近</div><ul class="near">'+near+'</ul></div>'+
  (d.note?'<div class="note">'+esc(d.note)+'</div>':"")+
  '<a class="go" href="'+esc(d.url)+'" target="_blank" rel="noopener">訂房</a></article>';
}
function render(cat,el){
  var items=DATA.filter(function(d){return d.cat===cat});
  var html="",n=0;
  ["A","B","C","D"].forEach(function(t){
    var g=items.filter(function(d){return d.tier===t});if(!g.length)return;
    html+='<div class="tierhead"><h2 style="color:'+T[t].color+'">'+T[t].label+'</h2><span>'+g.length+' 間 · '+T[t].desc+'</span></div><div class="grid">';
    g.forEach(function(d){n++;rankOf[d.idx]=n;html+=card(d,n)});html+="</div>";
  });
  el.innerHTML=html;return items.length;
}
document.getElementById("cHouse").textContent=render("house",document.getElementById("panel-house"));
document.getElementById("cCamp").textContent=render("camp",document.getElementById("panel-camp"));
var TABS=[["tab-house","panel-house","house"],["tab-camp","panel-camp","camp"]];
function setTab(cat){TABS.forEach(function(y){var on=y[2]===cat;document.getElementById(y[0]).setAttribute("aria-selected",on);document.getElementById(y[1]).hidden=!on})}
TABS.forEach(function(x){document.getElementById(x[0]).addEventListener("click",function(){setTab(x[2]);map.filter(x[2])})});

/* ---------- 開場：跨年倒數＋煙火 ---------- */
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var intro=document.getElementById("intro");
var entered=false,onEnter=[];
(function(){
  var cv=document.getElementById("introFx"),g=cv.getContext("2d"),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2);
  var sky=document.createElement("canvas"),sg=sky.getContext("2d");
  function drawSkyline(){sky.width=W*dpr;sky.height=H*dpr;sg.setTransform(dpr,0,0,dpr,0,0);sg.clearRect(0,0,W,H);
    var base=H,x=0,seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
    var glow=sg.createLinearGradient(0,H*.72,0,H);glow.addColorStop(0,"rgba(255,140,80,0)");glow.addColorStop(1,"rgba(255,120,70,.28)");sg.fillStyle=glow;sg.fillRect(0,H*.72,W,H*.28);
    sg.fillStyle="#05060f";sg.beginPath();sg.moveTo(0,base);
    var tower=W*.62,done=false;
    while(x<W){var w=14+rnd()*34,h=H*(.05+rnd()*.13);if(!done&&x+w>tower){w=Math.max(8,tower-x);sg.lineTo(x,base-h);sg.lineTo(x+w,base-h);x+=w;w=18;h=H*.3;done=true}
      sg.lineTo(x,base-h);sg.lineTo(x+w,base-h);x+=w}
    sg.lineTo(W,base);sg.closePath();sg.fill();
    // 高塔尖端
    sg.fillRect(tower+7,base-H*.36,4,H*.06);
    // 窗戶燈光
    sg.fillStyle="rgba(255,214,140,.55)";for(var i=0;i<160;i++){var wx=rnd()*W,wy=base-rnd()*H*.15;sg.fillRect(wx,wy,1.6,1.6)}
  }
  function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0);drawSkyline()}
  size();addEventListener("resize",size);
  var stars=[];for(var i=0;i<160;i++)stars.push({x:Math.random(),y:Math.random()*.75,r:Math.random()*1.3+.3,p:Math.random()*6.28});
  var rockets=[],parts=[],confetti=[],warp=0,alive=true,t0=performance.now(),nextAuto=0,finale=false;
  var COLS=["#f5c451","#ff7a5c","#4fd6c4","#ffffff","#ff9bd2","#9bb5ff","#ffe08a"];
  function rocket(x,ty,col,type){rockets.push({x:x,y:H+10,vx:(Math.random()-.5)*.6,vy:-(Math.sqrt(2*0.11*(H+10-ty))),c:col,type:type,ty:ty,trail:[]})}
  function explode(r){var n=r.type==="ring"?70:r.type==="willow"?90:110,c=r.c,c2=COLS[(Math.random()*COLS.length)|0];
    for(var k=0;k<n;k++){var a=Math.random()*6.283,sp;
      if(r.type==="ring"){a=k/n*6.283;sp=3.6}else if(r.type==="willow"){sp=Math.random()*2.6+.6}else sp=Math.pow(Math.random(),.5)*4.4+.4;
      parts.push({x:r.x,y:r.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,l:1,d:r.type==="willow"?.006:.011+Math.random()*.006,c:k%3?c:c2,g:r.type==="willow"?.035:.05,cr:Math.random()<.25,w:r.type==="willow"})}
    // 中心閃光
    parts.push({x:r.x,y:r.y,vx:0,vy:0,l:1,d:.06,c:"#fff",g:0,flash:1});
  }
  function launch(n){for(var k=0;k<n;k++){var types=["peony","ring","willow","peony"];rocket(W*(.12+Math.random()*.76),H*(.12+Math.random()*.3),COLS[(Math.random()*COLS.length)|0],types[(Math.random()*types.length)|0])}}
  function confettiBurst(n){for(var k=0;k<n;k++)confetti.push({x:Math.random()*W,y:-20-Math.random()*H*.5,vx:(Math.random()-.5)*1.2,vy:1.2+Math.random()*1.8,r:Math.random()*6.28,vr:(Math.random()-.5)*.25,s:4+Math.random()*5,c:COLS[(Math.random()*COLS.length)|0]})}
  function frame(now){
    if(!alive)return;var t=(now-t0)/1000;
    g.globalCompositeOperation="source-over";g.clearRect(0,0,W,H);
    for(var i=0;i<stars.length;i++){var st=stars[i];var a=.4+.6*Math.abs(Math.sin(t*1.4+st.p));g.fillStyle="rgba(220,226,255,"+a*.8+")";
      var sy=st.y*H+(warp?(t*900)%H:0);g.fillRect(st.x*W,sy%H,st.r,st.r*(warp?8:1))}
    if(!reduce&&!warp&&t>nextAuto&&t>.4){launch(finale?2:1);nextAuto=t+(finale?.55:.9)+Math.random()*.4}
    g.globalCompositeOperation="lighter";
    for(var r=rockets.length-1;r>=0;r--){var R=rockets[r];R.trail.push(R.x,R.y);if(R.trail.length>16)R.trail.splice(0,2);R.x+=R.vx;R.y+=R.vy;R.vy+=.11;
      g.strokeStyle=R.c;g.lineWidth=2;g.globalAlpha=.8;g.beginPath();g.moveTo(R.trail[0],R.trail[1]);for(var q=2;q<R.trail.length;q+=2)g.lineTo(R.trail[q],R.trail[q+1]);g.stroke();
      if(R.vy>=-.5||R.y<=R.ty){explode(R);rockets.splice(r,1)}}
    for(var j=parts.length-1;j>=0;j--){var p=parts[j];
      if(p.flash){g.globalAlpha=p.l*.9;var gr=g.createRadialGradient(p.x,p.y,0,p.x,p.y,70);gr.addColorStop(0,"rgba(255,255,255,.9)");gr.addColorStop(1,"rgba(255,200,120,0)");g.fillStyle=gr;g.fillRect(p.x-70,p.y-70,140,140);p.l-=p.d;if(p.l<=0)parts.splice(j,1);continue}
      var ox=p.x,oy=p.y;p.vx*=.982;p.vy=p.vy*.982+p.g;p.x+=p.vx;p.y+=p.vy;p.l-=p.d;
      if(p.l<=0){parts.splice(j,1);continue}
      var al=p.cr?(Math.random()<.5?p.l:p.l*.2):p.l;g.globalAlpha=al;g.strokeStyle=p.c;g.lineWidth=p.w?1.6:2.2;g.beginPath();g.moveTo(p.x-p.vx*3,p.y-p.vy*3);g.lineTo(p.x,p.y);g.stroke()}
    g.globalAlpha=1;g.globalCompositeOperation="source-over";
    g.drawImage(sky,0,0,W,H);
    for(var c=confetti.length-1;c>=0;c--){var f=confetti[c];f.x+=f.vx+Math.sin(t*2+c)*.4;f.y+=f.vy;f.r+=f.vr;if(f.y>H+20){confetti.splice(c,1);continue}
      g.save();g.translate(f.x,f.y);g.rotate(f.r);g.fillStyle=f.c;g.fillRect(-f.s/2,-f.s/4,f.s,f.s/2*Math.abs(Math.cos(f.r*2))+1);g.restore()}
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // 倒數 → 2027 → 主畫面
  var num=document.getElementById("cdNum"),year=document.getElementById("year"),body=document.querySelector(".intro-body");
  var timers=[],shown=false;
  function showBody(){if(shown)return;shown=true;timers.forEach(clearTimeout);num.textContent="";body.classList.add("show");startCount();finale=true}
  function startCount(){
    var house=DATA.filter(function(d){return d.cat==="house"}).length,camp=DATA.filter(function(d){return d.cat==="camp"}).length;
    var targets={plat:6,house:house,camp:camp,route:DATA.length};
    document.querySelectorAll("[data-count]").forEach(function(el){var to=targets[el.getAttribute("data-count")]||0,st=performance.now()+250;
      (function tick(now){var p=Math.min(1,Math.max(0,(now-st)/1200));el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)})(performance.now())});
  }
  if(reduce){showBody()}
  else{
    [5,4,3,2,1].forEach(function(n,i){timers.push(setTimeout(function(){num.textContent=n;num.classList.remove("tick");void num.offsetWidth;num.classList.add("tick");if(n<=2)launch(1)},300+i*620))});
    timers.push(setTimeout(function(){num.textContent="";year.classList.add("show");launch(5);setTimeout(function(){launch(4);confettiBurst(120)},450)},300+5*620));
    timers.push(setTimeout(showBody,300+5*620+1700));
    intro.addEventListener("click",function(e){if(!e.target.closest("button")&&!shown){year.classList.remove("show");showBody();confettiBurst(80)}});
  }
  var btn=document.getElementById("enterBtn");
  function enter(){
    if(entered)return;entered=true;btn.disabled=true;warp=1;launch(4);intro.classList.add("leave");
    setTimeout(function(){alive=false;intro.hidden=true;document.body.classList.remove("locked");var f;while((f=onEnter.shift()))f()},reduce?0:1000);
  }
  btn.addEventListener("click",enter);
  document.body.classList.add("locked");
})();
function whenEntered(f){(entered&&intro.hidden)?f():onEnter.push(f)}

/* ---------- 地圖外框互動 ---------- */
var stage=document.getElementById("stage"),tag=document.getElementById("tag");
var sheet=document.getElementById("sheet"),legend=document.querySelector(".legend");
var map={focus:function(){},filter:function(){},region:function(){}};
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function easeBack(t){var c=1.6;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)}
function showCard(idx){
  var d=DATA[idx];setTab(d.cat);
  var c=document.querySelector('.card[data-idx="'+idx+'"]');if(!c)return;
  document.querySelectorAll(".card.on").forEach(function(x){x.classList.remove("on")});c.classList.add("on");
  c.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"});
}
function openSheet(d){
  sheet.style.setProperty("--c",T[d.tier].color);
  document.getElementById("shIco").textContent=iconOf(d);
  document.getElementById("shName").textContent=d.s;
  document.getElementById("shWhere").textContent=d.where+" · "+d.plat+" · "+d.cap;
  document.getElementById("shPrice").textContent=money(d.price);
  document.getElementById("shTime").textContent=dur(d.mins);
  document.getElementById("shGo").href=d.url;
  document.getElementById("shMore").onclick=function(){showCard(d.idx)};
  sheet.hidden=false;sheet.style.animation="none";void sheet.offsetWidth;sheet.style.animation="";
  legend.style.opacity=0;tag.style.opacity=0;
}
function closeSheet(){sheet.hidden=true;legend.style.opacity=1;tag.style.opacity=1}
document.getElementById("sheetX").addEventListener("click",function(){closeSheet();map.focus(-1)});
document.addEventListener("click",function(e){
  var c=e.target.closest&&e.target.closest(".card");if(!c||e.target.closest("a"))return;
  document.querySelectorAll(".card.on").forEach(function(x){x.classList.remove("on")});c.classList.add("on");
  map.focus(+c.dataset.idx);
  var r=stage.getBoundingClientRect();if(r.bottom<80||r.top>innerHeight*.4)stage.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
});
document.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.classList&&e.target.classList.contains("card"))e.target.click()});
document.querySelectorAll(".rg").forEach(function(b){b.addEventListener("click",function(){map.region(b.dataset.r)})});
function setRegionBtn(r){document.querySelectorAll(".rg").forEach(function(b){b.classList.toggle("on",b.dataset.r===r)})}

/* ---------- 3D 地圖 ---------- */
var MAPTEXT=DATA.map(function(d){return d.s}).join("")+"宜蘭縣桃園市新竹縣苗栗縣台中市南投縣台南市高雄市新北市國道5號・雪山隧道輔大出發宜蘭南投台南間▸小時分0123456789";
var fontReady=(document.fonts&&document.fonts.load)?Promise.race([document.fonts.load("40px Huninn",MAPTEXT),new Promise(function(r){setTimeout(r,3000)})]):Promise.resolve();
whenEntered(function(){fontReady.then(startMap,startMap)});

function startMap(){
try{
  if(!window.THREE||!window.GEO)throw new Error("missing lib");
  var DPR=window.devicePixelRatio||1;
  var MAXPR=Math.min(DPR,3);
  var renderer=new THREE.WebGLRenderer({antialias:DPR<2,alpha:true,powerPreference:"high-performance",stencil:false});
  var pr=MAXPR;renderer.setPixelRatio(pr);
  stage.insertBefore(renderer.domElement,stage.firstChild);
  var scene=new THREE.Scene();
  var cam=new THREE.PerspectiveCamera(42,1,.05,400);
  function resize(){var w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.fov=w/h<.8?50:42;cam.updateProjectionMatrix()}
  resize();addEventListener("resize",resize);
  var SZ=10,SX=10*Math.cos(23.7*Math.PI/180),LAT0=23.7,LNG0=121.0;
  function X(lng){return(lng-LNG0)*SX}
  function Z(lat){return-(lat-LAT0)*SZ}
  function V(lat,lng,y){return new THREE.Vector3(X(lng),y||0,Z(lat))}

  var Q=2,maxAniso=renderer.capabilities.getMaxAnisotropy();
  function canvasTex(c){var t=new THREE.CanvasTexture(c);t.anisotropy=Math.min(8,maxAniso);t.minFilter=THREE.LinearMipmapLinearFilter;t.generateMipmaps=true;return t}
  function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.arcTo(x+w,y,x+w,y+r,r);g.lineTo(x+w,y+h-r);g.arcTo(x+w,y+h,x+w-r,y+h,r);g.lineTo(x+r,y+h);g.arcTo(x,y+h,x,y+h-r,r);g.lineTo(x,y+r);g.arcTo(x,y,x+r,y,r);g.closePath()}
  function label(text,o){
    o=o||{};var fs=(o.size||44)*Q,pad=(o.pad==null?20:o.pad)*Q,c=document.createElement("canvas"),g=c.getContext("2d");
    var font=(o.weight||400)+" "+fs+"px "+(o.font||MAPFONT);g.font=font;
    var w=Math.ceil(g.measureText(text).width)+pad*2,h=Math.ceil(fs*1.25+pad*.9);c.width=w;c.height=h;g=c.getContext("2d");g.font=font;
    if(o.bg){rr(g,2*Q,2*Q,w-4*Q,h-4*Q,(h-4*Q)/2);g.fillStyle=o.bg;g.fill();if(o.border){g.strokeStyle=o.border;g.lineWidth=3*Q;g.stroke()}}
    g.textAlign="center";g.textBaseline="middle";
    if(o.stroke){g.lineJoin="round";g.lineWidth=o.stroke*Q;g.strokeStyle="rgba(5,8,30,.9)";g.strokeText(text,w/2,h/2+fs*.05)}
    g.fillStyle=o.color||"#fff";g.fillText(text,w/2,h/2+fs*.05);
    var m=new THREE.SpriteMaterial({map:canvasTex(c),transparent:true,depthTest:false,depthWrite:false});
    var s=new THREE.Sprite(m);s.userData.aspect=w/h;s.userData.k=o.k||0;s.renderOrder=o.order||20;s.scale.set(w/h*.4,.4,1);return s;
  }
  var texCache={};
  function pinTex(d,rank){
    var key=d.tier+"_"+rank+"_"+iconOf(d);if(texCache[key])return texCache[key];
    var S=Q*1.25,c=document.createElement("canvas");c.width=160*S;c.height=200*S;var g=c.getContext("2d");g.scale(S,S);var col=T[d.tier].color;
    var rg=g.createRadialGradient(80,72,30,80,72,80);rg.addColorStop(0,col);rg.addColorStop(1,"rgba(0,0,0,0)");g.globalAlpha=.5;g.fillStyle=rg;g.fillRect(0,0,160,160);g.globalAlpha=1;
    g.beginPath();g.moveTo(80,196);g.bezierCurveTo(62,150,24,128,24,82);g.arc(80,82,56,Math.PI,0);g.bezierCurveTo(136,128,98,150,80,196);g.closePath();
    var lg=g.createLinearGradient(0,26,0,196);lg.addColorStop(0,"#fff");lg.addColorStop(.12,col);lg.addColorStop(1,col);g.fillStyle=lg;g.fill();g.lineWidth=5;g.strokeStyle="rgba(255,255,255,.95)";g.stroke();
    g.beginPath();g.arc(80,82,42,0,Math.PI*2);g.fillStyle="#fff";g.fill();
    g.font="50px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText(iconOf(d),80,86);
    g.beginPath();g.arc(132,28,25,0,Math.PI*2);g.fillStyle="#0b1029";g.fill();g.lineWidth=4;g.strokeStyle=col;g.stroke();
    g.fillStyle="#fff";g.font="26px "+MAPFONT;g.fillText(String(rank),132,30);
    return texCache[key]=canvasTex(c);
  }
  function dotTex(){
    if(dotTex.t)return dotTex.t;var c=document.createElement("canvas");c.width=c.height=64;var g=c.getContext("2d");
    var gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.3,"rgba(255,255,255,.7)");gr.addColorStop(1,"rgba(255,255,255,0)");
    g.fillStyle=gr;g.fillRect(0,0,64,64);return dotTex.t=new THREE.CanvasTexture(c)}

  var ocean=new THREE.Mesh(new THREE.PlaneGeometry(220,220,1,1),new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,uniforms:{uT:{value:0}},
    vertexShader:"varying vec3 vP;void main(){vec4 w=modelMatrix*vec4(position,1.);vP=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",
    fragmentShader:"precision mediump float;uniform float uT;varying vec3 vP;void main(){float d=length(vP.xz-vec2(0.,-1.));float w=sin(vP.x*1.3+uT*.7)*sin(vP.z*1.1-uT*.5)+sin((vP.x+vP.z)*.7+uT*.9)*.5;float g=smoothstep(1.15,1.45,w);vec3 c=mix(vec3(.03,.05,.16),vec3(.06,.1,.28),smoothstep(40.,0.,d));c+=vec3(.25,.35,.8)*g*.18*smoothstep(45.,5.,d);float a=smoothstep(110.,30.,d);gl_FragColor=vec4(c,a);}"
  }));
  ocean.rotation.x=-Math.PI/2;ocean.position.y=-.02;scene.add(ocean);

  var HOT={"宜蘭縣":1,"桃園市":1,"台中市":.6,"台南市":1,"高雄市":1,"新竹縣":1,"苗栗縣":1,"南投縣":1,"新北市":.6};
  var topPos=[],topCol=[],sidePos=[],borderPts=[],col=new THREE.Color();
  GEO.counties.forEach(function(cty){
    var hot=HOT[cty.n]||0,depth=hot?.3+hot*.12:.2;
    var shapes=cty.p.map(function(ring){var s=new THREE.Shape();ring.forEach(function(p,i){var x=X(p[0]),y=-Z(p[1]);i?s.lineTo(x,y):s.moveTo(x,y)});return s});
    var geo=new THREE.ExtrudeGeometry(shapes,{depth:depth,bevelEnabled:false,curveSegments:1});
    geo.rotateX(-Math.PI/2);var ng=geo.index?geo.toNonIndexed():geo;
    var pos=ng.attributes.position.array,groups=geo.groups;
    col.set(hot?(hot===1?0x1f2c78:0x19235f):0x10153f);
    groups.forEach(function(gr){for(var i=gr.start;i<gr.start+gr.count;i++){var x=pos[i*3],y=pos[i*3+1],z=pos[i*3+2];
      if(gr.materialIndex===0){topPos.push(x,y,z);var shade=y>depth*.5?1:.6;topCol.push(col.r*shade,col.g*shade,col.b*shade)}else sidePos.push(x,y,z)}});
    cty.p.forEach(function(ring){for(var i=0;i<ring.length-1;i++){borderPts.push(X(ring[i][0]),depth+.004,Z(ring[i][1]),X(ring[i+1][0]),depth+.004,Z(ring[i+1][1]))}});
    geo.dispose();if(ng!==geo)ng.dispose();
  });
  var tg=new THREE.BufferGeometry();tg.setAttribute("position",new THREE.Float32BufferAttribute(topPos,3));tg.setAttribute("color",new THREE.Float32BufferAttribute(topCol,3));tg.computeVertexNormals();
  scene.add(new THREE.Mesh(tg,new THREE.MeshLambertMaterial({vertexColors:true,emissive:0x060a2a})));
  var sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.Float32BufferAttribute(sidePos,3));sg.computeVertexNormals();
  scene.add(new THREE.Mesh(sg,new THREE.MeshLambertMaterial({color:0x090d2e})));
  var bgeo=new THREE.BufferGeometry();bgeo.setAttribute("position",new THREE.Float32BufferAttribute(borderPts,3));
  scene.add(new THREE.LineSegments(bgeo,new THREE.LineBasicMaterial({color:0x7b8cff,transparent:true,opacity:.6})));
  scene.add(new THREE.HemisphereLight(0xaab4ff,0x0b1029,.6));
  var sun=new THREE.DirectionalLight(0xfff1d6,.55);sun.position.set(-8,20,12);scene.add(sun);
  var zl=[];
  var CL={"宜蘭縣":[24.6,121.62],"桃園市":[24.93,121.2],"新竹縣":[24.72,121.1],"苗栗縣":[24.48,120.95],"台中市":[24.2,120.95],"南投縣":[23.82,120.98],"台南市":[23.15,120.35],"高雄市":[22.98,120.62],"新北市":[24.95,121.55]};
  Object.keys(CL).forEach(function(n){var s=label(n,{size:40,color:"#d5dbff",stroke:6,order:5,pad:6,k:.036});var p=CL[n];s.position.set(X(p[1]),.9,Z(p[0]));scene.add(s);zl.push(s)});
  var tunnel=label("國道5號・雪山隧道",{size:32,color:"#a8b7ff",stroke:6,order:5,pad:6,k:.028});tunnel.position.set(X(121.74),.85,Z(24.9));scene.add(tunnel);zl.push(tunnel);

  var O=V(25.0365,121.4319,.5);
  var oRing=new THREE.Mesh(new THREE.RingGeometry(.12,.17,48),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.6,side:THREE.DoubleSide,depthWrite:false}));
  oRing.rotation.x=-Math.PI/2;oRing.position.copy(O).setY(.53);scene.add(oRing);
  var oLabel=label("🎓 輔大出發",{size:44,bg:"rgba(255,255,255,.96)",color:"#0b1029",order:30});oLabel.center.set(.5,0);oLabel.position.copy(O).setY(.7);scene.add(oLabel);

  var RV="attribute float aU;attribute float aS;attribute vec2 aN;uniform float uW;varying float vU;varying float vS;void main(){vU=aU;vS=aS;vec3 p=position;p.xz+=aN*aS*uW;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}";
  var RF="precision mediump float;uniform float uT;uniform vec3 uC;uniform float uF;uniform float uV;uniform float uG;varying float vU;varying float vS;void main(){if(vU>uG)discard;float edge=1.-vS*vS;float f=fract(vU*14.-uT*1.2);float dash=smoothstep(.0,.35,f)*smoothstep(1.,.65,f);float a=(.3+uF*(.4+.6*dash))*edge*uV;gl_FragColor=vec4(uC*(1.+uF*.6),a);}";
  function ribbon(pts){
    var n=pts.length,pos=new Float32Array(n*6),au=new Float32Array(n*2),as=new Float32Array(n*2),an=new Float32Array(n*4),idx=[],len=[0];
    for(var i=1;i<n;i++)len.push(len[i-1]+pts[i].distanceTo(pts[i-1]));var L=len[n-1]||1;
    for(i=0;i<n;i++){var a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];var dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;
      pos.set([pts[i].x,pts[i].y,pts[i].z,pts[i].x,pts[i].y,pts[i].z],i*6);an.set([-dz/l,dx/l,-dz/l,dx/l],i*4);au[i*2]=au[i*2+1]=len[i]/L;as[i*2]=-1;as[i*2+1]=1;
      if(i<n-1)idx.push(i*2,i*2+1,i*2+2,i*2+1,i*2+3,i*2+2)}
    var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("aU",new THREE.BufferAttribute(au,1));g.setAttribute("aS",new THREE.BufferAttribute(as,1));g.setAttribute("aN",new THREE.BufferAttribute(an,2));g.setIndex(idx);
    return{geo:g,len:len,L:L};
  }

  var N=DATA.length,pins=[];
  DATA.forEach(function(d,i){var tp=V(d.lat,d.lng,0);pins.push({d:d,i:i,true:tp,pos:tp.clone(),show:0,grow:0,delay:.8+Math.min(i,40)*.035,phase:Math.random()*6.28})});
  for(var it=0;it<90;it++){for(var a=0;a<N;a++)for(var b=a+1;b<N;b++){var A=pins[a].pos,B=pins[b].pos;var dx=B.x-A.x,dz=B.z-A.z,dd=Math.hypot(dx,dz),mn=.5;
    if(dd<mn){if(dd<1e-4){dx=Math.cos(a*2.4);dz=Math.sin(a*2.4);dd=1}var k=(mn-dd)/2/dd;A.x-=dx*k;A.z-=dz*k;B.x+=dx*k;B.z+=dz*k}}}
  var stemPos=new Float32Array(N*6),stemCol=new Float32Array(N*6),glowPos=new Float32Array(N*3),glowCol=new Float32Array(N*3);
  pins.forEach(function(p,i){
    var d=p.d;col.set(T[d.tier].color);
    var sp=new THREE.Sprite(new THREE.SpriteMaterial({map:pinTex(d,rankOf[d.idx]),transparent:true,depthWrite:false}));sp.center.set(.5,0);sp.renderOrder=10;sp.userData.idx=i;scene.add(sp);p.sprite=sp;
    stemCol.set([col.r,col.g,col.b,col.r,col.g,col.b],i*6);glowCol.set([col.r,col.g,col.b],i*3);glowPos.set([p.true.x,.52,p.true.z],i*3);
    if(d.route){var pts=d.route.map(function(q){return V(q[1],q[0],.56)});pts.push(new THREE.Vector3(p.true.x,.56,p.true.z));
      var rb=ribbon(pts);var m=new THREE.Mesh(rb.geo,new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexShader:RV,fragmentShader:RF,
        uniforms:{uT:{value:0},uC:{value:new THREE.Color(T[d.tier].color)},uF:{value:0},uV:{value:0},uG:{value:0},uW:{value:.1}}}));
      m.renderOrder=3;m.frustumCulled=false;scene.add(m);p.route={mesh:m,pts:pts,len:rb.len,L:rb.L};}
  });
  var stemGeo=new THREE.BufferGeometry();stemGeo.setAttribute("position",new THREE.BufferAttribute(stemPos,3));stemGeo.setAttribute("color",new THREE.BufferAttribute(stemCol,3));
  var stems=new THREE.LineSegments(stemGeo,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.85}));stems.frustumCulled=false;scene.add(stems);
  var glowGeo=new THREE.BufferGeometry();glowGeo.setAttribute("position",new THREE.BufferAttribute(glowPos,3));glowGeo.setAttribute("color",new THREE.BufferAttribute(glowCol,3));
  var glowMat=new THREE.PointsMaterial({size:.5,map:dotTex(),vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  var glows=new THREE.Points(glowGeo,glowMat);glows.frustumCulled=false;scene.add(glows);

  var GROUPS=[
    {key:"yilan",name:"宜蘭",test:function(d){return d.lng>121.5&&d.lat>24.45&&d.lat<25},off:[.7,0],anchor:[0,.5]},
    {key:"nantou",name:"南投",test:function(d){return d.lat>23.8&&d.lat<24.1&&d.lng>120.9&&d.lng<121.2},off:[.6,0],anchor:[0,.5]},
    {key:"south",name:"台南",test:function(d){return d.lat>22.95&&d.lat<23.06&&d.lng>120.1&&d.lng<120.26},off:[-.6,0],anchor:[1,.5]}
  ];
  GROUPS.forEach(function(G){G.pins=pins.filter(function(p){return G.test(p.d)});var c=new THREE.Vector3();G.pins.forEach(function(p){c.add(p.true)});c.multiplyScalar(1/Math.max(1,G.pins.length));G.sprites={};
    ["house","camp"].forEach(function(cat){var n=G.pins.filter(function(p){return p.d.cat===cat}).length;if(n<2)return;
      var s=label(G.name+" "+n+" 間 ▸",{size:44,bg:"rgba(245,196,81,.97)",color:"#221a00",order:28});s.center.set(G.anchor[0],G.anchor[1]);s.position.set(c.x+G.off[0],1.1,c.z+G.off[1]);s.userData.group=G.key;s.material.opacity=0;scene.add(s);G.sprites[cat]=s});
    G.pins.forEach(function(p){if(G.sprites[p.d.cat])p.group=G})});

  var car=label("🚗",{size:60,pad:4,order:26});scene.add(car);car.visible=false;
  var timeLbl=label(" ",{size:40});scene.add(timeLbl);timeLbl.visible=false;
  var nameLbl=label(" ",{size:40});scene.add(nameLbl);nameLbl.visible=false;
  var pulse=new THREE.Mesh(new THREE.RingGeometry(.1,.14,40),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));pulse.rotation.x=-Math.PI/2;scene.add(pulse);

  (function(){var n=420,a=new Float32Array(n*3);for(var i=0;i<n;i++){var th=Math.random()*6.283,ph=Math.random()*1.2+.15,r=120;a.set([Math.cos(th)*Math.cos(ph)*r,Math.sin(ph)*r*.6+5,Math.sin(th)*Math.cos(ph)*r],i*3)}
    var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(a,3));
    scene.add(new THREE.Points(g,new THREE.PointsMaterial({color:0xc9d0ff,size:1.1,map:dotTex(),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})))})();
  var FW_N=6,FW_P=80,fwPos=new Float32Array(FW_N*FW_P*3),fwCol=new Float32Array(FW_N*FW_P*3),fwVel=new Float32Array(FW_N*FW_P*3),fwLife=new Float32Array(FW_N),fwBase=[];
  for(var k=0;k<FW_N;k++)fwBase.push(new THREE.Color());
  var fwGeo=new THREE.BufferGeometry();fwGeo.setAttribute("position",new THREE.BufferAttribute(fwPos,3));fwGeo.setAttribute("color",new THREE.BufferAttribute(fwCol,3));
  var fwMat=new THREE.PointsMaterial({size:.5,map:dotTex(),vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  var fw=new THREE.Points(fwGeo,fwMat);fw.frustumCulled=false;scene.add(fw);
  var fwNext=0,PAL=[0xf5c451,0xff7a5c,0x4fd6c4,0xffffff,0xff9bd2,0x9bb5ff];

  var narrow=function(){return cam.aspect<.8};
  var cur={yaw:0,pitch:1.45,dist:120,tx:X(121),tz:Z(23.9)};
  var REG={
    all:function(){return{yaw:-.12,pitch:1.02,dist:narrow()?62:46,tx:X(120.95),tz:Z(23.95)}},
    yilan:function(){return{yaw:-.3,pitch:.92,dist:narrow()?10:7.5,tx:X(121.73),tz:Z(24.72)}},
    north:function(){return{yaw:-.2,pitch:.95,dist:narrow()?17:13,tx:X(121.1),tz:Z(24.72)}},
    central:function(){return{yaw:-.15,pitch:.95,dist:narrow()?13:10,tx:X(121.02),tz:Z(23.96)}},
    south:function(){return{yaw:-.1,pitch:.95,dist:narrow()?24:18,tx:X(120.32),tz:Z(23.0)}}
  };
  var REGNAME={all:"🗺️ 全台",yilan:"🌾 宜蘭・約 1–1.5 小時",north:"🏞️ 桃竹苗・約 1–2 小時",central:"⛰️ 南投・約 3 小時",south:"☀️ 台南高雄・約 3.5–4 小時"};
  var from=null,goal=REG.all(),tween=0,tweenDur=3.2,base={yaw:goal.yaw};
  function flyTo(g,d){from=Object.assign({},cur);goal=g;tween=0;tweenDur=reduce?.01:(d||1.4);base.yaw=g.yaw}
  flyTo(REG.all(),3.2);
  function place(){var cp=Math.cos(cur.pitch);cam.position.set(cur.tx+cur.dist*Math.sin(cur.yaw)*cp,.5+cur.dist*Math.sin(cur.pitch),cur.tz+cur.dist*Math.cos(cur.yaw)*cp);cam.lookAt(cur.tx,.5,cur.tz)}
  var focused=-1,catShow="house",lastInput=0,sway=0;
  function setTag(html){tag.innerHTML=html}
  map.region=function(r){setRegionBtn(r);focused=-1;closeSheet();flyTo(REG[r](),1.6);setTag('<b>'+REGNAME[r]+'</b>')};
  map.focus=function(idx){
    if(idx<0){focused=-1;return}
    var p=pins[idx];if(!p)return;focused=idx;lastInput=performance.now();catShow=p.d.cat;
    var close=narrow()?4.4:3.6;
    flyTo({yaw:cur.yaw,pitch:.8,dist:close,tx:p.pos.x,tz:p.pos.z+close*.13},1.5);
    setRegionBtn("");var d=p.d;
    setTag('<b style="color:'+T[d.tier].color+'">'+iconOf(d)+" "+esc(d.s)+'</b><span class="hint">車程 '+dur(d.mins)+" · "+money(d.price)+"</span>");
    [timeLbl,nameLbl].forEach(function(s){s.material.map.dispose();s.material.dispose();scene.remove(s)});
    timeLbl=label("🚗 "+dur(d.mins),{size:40,bg:"rgba(255,255,255,.96)",color:"#0b1029",order:27});timeLbl.center.set(.5,0);scene.add(timeLbl);
    nameLbl=label(d.s,{size:42,bg:"rgba(11,16,41,.92)",border:T[d.tier].color,color:"#fff",order:29});nameLbl.center.set(.5,1.2);scene.add(nameLbl);
    if(p.route){var mid=p.route.pts[Math.floor(p.route.pts.length*.55)];timeLbl.position.set(mid.x,.75,mid.z)}
    openSheet(d);
  };
  map.filter=function(cat){catShow=cat;map.region("all")};

  var ptr={},down=null,pinch=0,el=renderer.domElement,ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
  el.addEventListener("pointerdown",function(e){ptr[e.pointerId]={x:e.clientX,y:e.clientY};down={x:e.clientX,y:e.clientY,t:performance.now(),moved:0};lastInput=performance.now();if(tween<1&&tween>.05)tween=1;
    var ids=Object.keys(ptr);if(ids.length===2){var a=ptr[ids[0]],b=ptr[ids[1]];pinch=Math.hypot(a.x-b.x,a.y-b.y)}});
  el.addEventListener("pointermove",function(e){var p=ptr[e.pointerId];if(!p)return;var ids=Object.keys(ptr);
    if(ids.length===2){p.x=e.clientX;p.y=e.clientY;var a=ptr[ids[0]],b=ptr[ids[1]],d=Math.hypot(a.x-b.x,a.y-b.y);if(pinch){cur.dist=Math.min(140,Math.max(2.4,cur.dist*pinch/d))}pinch=d;if(down)down.moved=99;return}
    var dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;if(down)down.moved+=Math.abs(dx)+Math.abs(dy);
    cur.yaw-=dx*.006;base.yaw=cur.yaw;if(e.pointerType==="mouse")cur.pitch=Math.min(1.4,Math.max(.45,cur.pitch+dy*.005));
    tween=1;lastInput=performance.now()});
  function up(e){var tap=down&&down.moved<8&&performance.now()-down.t<450&&Object.keys(ptr).length===1;delete ptr[e.pointerId];if(Object.keys(ptr).length<2)pinch=0;
    if(tap){var r=el.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,cam);
      var cand=[];pins.forEach(function(p){if(p.sprite.visible&&p.sprite.material.opacity>.3)cand.push(p.sprite)});
      GROUPS.forEach(function(G){var s=G.sprites[catShow];if(s&&s.visible&&s.material.opacity>.3)cand.push(s)});
      var hit=ray.intersectObjects(cand,false)[0];
      if(hit){if(hit.object.userData.group){var gk=hit.object.userData.group;map.region(gk==="nantou"?"central":gk)}else map.focus(hit.object.userData.idx)}}
    down=null}
  el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
  el.addEventListener("wheel",function(e){e.preventDefault();cur.dist=Math.min(140,Math.max(2.4,cur.dist*(1+e.deltaY*.0012)));tween=1;lastInput=performance.now()},{passive:false});

  var visible=true,running=false,last=0;
  if("IntersectionObserver" in window)new IntersectionObserver(function(en){visible=en[0].isIntersecting;if(visible)kick()}).observe(stage);
  document.addEventListener("visibilitychange",function(){if(!document.hidden)kick()});
  function kick(){if(!running){running=true;last=performance.now();requestAnimationFrame(loop)}}

  var fAcc=0,fN=0,good=0;
  function adapt(dt){fAcc+=dt;fN++;if(fAcc<1)return;var fps=fN/fAcc;fAcc=fN=0;
    if(fps<50&&pr>1){pr=Math.max(1,+(pr-.25).toFixed(2));renderer.setPixelRatio(pr);resize();good=0}
    else if(fps>58&&pr<MAXPR){if(++good>=3){pr=Math.min(MAXPR,+(pr+.25).toFixed(2));renderer.setPixelRatio(pr);resize();good=0}}
    else good=0}

  var t0=performance.now(),fwTimer=1.5,tmp=new THREE.Vector3(),loadEl=document.getElementById("loading");loadEl.style.opacity=0;
  function lerp(a,b,k){return a+(b-a)*k}
  function loop(now){
    if(!visible||document.hidden){running=false;return}
    var dt=Math.min(.05,(now-last)/1000);last=now;var t=(now-t0)/1000;adapt(dt);
    if(tween<1){tween=Math.min(1,tween+dt/tweenDur);var e=ease(tween);for(var key in goal)cur[key]=from[key]+(goal[key]-from[key])*e}
    else if(!reduce&&now-lastInput>5000){sway+=dt*.25;cur.yaw=base.yaw+Math.sin(sway)*.18}
    place();
    var zoom=cur.dist,far=zoom>16,k6=Math.min(1,dt*7);
    var s=Math.max(.18,zoom*.07);
    for(var i=0;i<N;i++){var p=pins[i],d=p.d,sel=i===focused;
      var inCat=d.cat===catShow,hide=far&&p.group&&!sel;
      var want=inCat&&!hide?1:0;p.show=lerp(p.show,want,k6);
      p.grow=reduce?1:Math.min(1,Math.max(0,(t-p.delay)/.7));var g=easeBack(p.grow);
      var sc=s*(sel?1.35:1)*g*(.6+.4*p.show);var y=.6+.25*s+.04*s*Math.sin(t*2.2+p.phase);
      p.sprite.visible=p.show>.02;
      if(p.sprite.visible){p.sprite.scale.set(sc*.8,sc,1);p.sprite.position.set(p.pos.x,y,p.pos.z);p.sprite.material.opacity=Math.min(1,p.show*1.2)*Math.min(1,g*1.5);p.sprite.renderOrder=sel?15:10}
      var o=i*6;stemPos[o]=p.true.x;stemPos[o+1]=.52;stemPos[o+2]=p.true.z;stemPos[o+3]=p.pos.x;stemPos[o+4]=p.show>.05?y:.52;stemPos[o+5]=p.pos.z;
      glowPos[i*3+1]=p.show>.05?.53:-9;
      if(p.route){var u=p.route.mesh.material.uniforms;u.uT.value=t;u.uF.value=lerp(u.uF.value,sel?1:0,Math.min(1,dt*5));
        var tv=focused<0?(inCat?(hide?.35:1):0):(sel?1:.12);u.uV.value=lerp(u.uV.value,tv,Math.min(1,dt*4));p.route.mesh.visible=u.uV.value>.01;
        u.uW.value=zoom*.0042*(1+u.uF.value*.9);u.uG.value=reduce?1:Math.min(1,Math.max(0,(t-.6-Math.min(i,40)*.03)/1.6))}
    }
    stemGeo.attributes.position.needsUpdate=true;glowGeo.attributes.position.needsUpdate=true;glowMat.size=zoom*.05;
    for(var z=0;z<zl.length;z++){var lz=zl[z],h=zoom*lz.userData.k;lz.scale.set(h*lz.userData.aspect,h,1);var lim=lz===tunnel?16:32;lz.material.opacity=lerp(lz.material.opacity,zoom<lim?.9:0,k6);lz.visible=lz.material.opacity>.02}
    GROUPS.forEach(function(G){["house","camp"].forEach(function(cat){var sp=G.sprites[cat];if(!sp)return;var want=(far&&cat===catShow&&focused<0)?1:0;
      sp.material.opacity=lerp(sp.material.opacity,want,k6);sp.visible=sp.material.opacity>.02;var cs=zoom*.05*(1+.04*Math.sin(t*3));sp.scale.set(cs*sp.userData.aspect,cs,1)})});
    if(focused>=0){var fp=pins[focused];
      if(fp.route){var r=fp.route,target=((t*.12)%1)*r.L,j=1;while(j<r.len.length-1&&r.len[j]<target)j++;
        var a1=r.pts[j-1],b1=r.pts[j],f=(target-r.len[j-1])/((r.len[j]-r.len[j-1])||1);tmp.copy(a1).lerp(b1,f);
        car.visible=true;car.position.set(tmp.x,.72,tmp.z);var csz=zoom*.06;car.scale.set(csz,csz,1);
        timeLbl.visible=true;var tsz=zoom*.045;timeLbl.scale.set(tsz*timeLbl.userData.aspect,tsz,1)}
      nameLbl.visible=true;var nsz=zoom*.05;nameLbl.scale.set(nsz*nameLbl.userData.aspect,nsz,1);nameLbl.position.copy(fp.sprite.position);
      var pf=(t*.9)%1,ps=(1+pf*4)*zoom*.06;pulse.scale.set(ps,ps,ps);pulse.position.set(fp.true.x,.54,fp.true.z);pulse.material.opacity=.85*(1-pf);pulse.material.color.set(T[fp.d.tier].color)}
    else{car.visible=false;timeLbl.visible=false;nameLbl.visible=false;pulse.material.opacity=0}
    var of=(t*.7)%1,os=(1+of*3)*zoom*.05;oRing.scale.set(os,os,os);oRing.material.opacity=.7*(1-of);
    var lsz=zoom*.045;oLabel.scale.set(lsz*oLabel.userData.aspect,lsz,1);
    ocean.material.uniforms.uT.value=t;
    if(!reduce){fwTimer-=dt;if(fwTimer<=0&&t>2){fwTimer=.7+Math.random()*1.1;
      var kk=fwNext;fwNext=(fwNext+1)%FW_N;fwLife[kk]=1;fwBase[kk].set(PAL[(Math.random()*PAL.length)|0]);
      var fx=cam.position.x-cur.tx,fz=cam.position.z-cur.tz,fl=Math.hypot(fx,fz)||1,bx=cur.tx-fx/fl*zoom*.9,bz=cur.tz-fz/fl*zoom*.9;
      var side=(Math.random()-.5)*zoom*1.1,cx=bx+(-fz/fl)*side,cz=bz+(fx/fl)*side,cy=.5+zoom*(.45+Math.random()*.3),sp0=zoom*.006;
      for(var q=0;q<FW_P;q++){var ii=(kk*FW_P+q)*3;fwPos[ii]=cx;fwPos[ii+1]=cy;fwPos[ii+2]=cz;var uu=Math.random()*2-1,th=Math.random()*6.283,ss=Math.sqrt(1-uu*uu),spd=sp0*(1+Math.random()*.6);fwVel[ii]=ss*Math.cos(th)*spd;fwVel[ii+1]=uu*spd;fwVel[ii+2]=ss*Math.sin(th)*spd}}}
    var grav=zoom*.00012;
    for(var k2=0;k2<FW_N;k2++){var L=fwLife[k2];if(L<=0)continue;L=Math.max(0,L-dt*.55);fwLife[k2]=L;var bc=fwBase[k2],ff=L*L*(L<.15?L/.15:1);
      for(var q2=0;q2<FW_P;q2++){var i3=(k2*FW_P+q2)*3;fwVel[i3+1]-=grav;fwVel[i3]*=.984;fwVel[i3+1]*=.984;fwVel[i3+2]*=.984;fwPos[i3]+=fwVel[i3];fwPos[i3+1]+=fwVel[i3+1];fwPos[i3+2]+=fwVel[i3+2];fwCol[i3]=bc.r*ff;fwCol[i3+1]=bc.g*ff;fwCol[i3+2]=bc.b*ff}}
    fwGeo.attributes.position.needsUpdate=true;fwGeo.attributes.color.needsUpdate=true;fwMat.size=zoom*.016;
    renderer.render(scene,cam);requestAnimationFrame(loop);
  }
  setTag('<b>🎓 從輔大出發</b><span class="hint">點圖釘看詳情</span>');
  kick();
}catch(err){
  var le=document.getElementById("loading");if(le)le.textContent="這台裝置無法顯示 3D 地圖，下方清單仍可正常使用。";
  if(window.console)console.error(err);
}
}
})();
