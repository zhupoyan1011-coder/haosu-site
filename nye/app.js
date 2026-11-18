(function(){
"use strict";
var ORIGIN={lat:25.0365,lng:121.4319};
var T={
 A:{label:"🥇 卡拉OK＋烤肉都有",desc:"第一優先",color:"#f5c451",h:2.3},
 B:{label:"🥈 只有烤肉",desc:"可自備藍牙喇叭小聲唱",color:"#ff6b5a",h:1.6},
 C:{label:"🥉 卡拉OK和烤肉都沒有",desc:"價格或地點有優勢",color:"#8f98c9",h:1.05},
 D:{label:"⛺ 懶人露營",desc:"營區禁止卡拉OK，多數可烤肉",color:"#4fd6c4",h:1.35}
};
var NEAR={
 yl_sanxing:["安農溪分洪堰、落羽松步道","三星蔥文化館、蔥油餅","羅東夜市（車程約 15 分）"],
 yl_dongshan:["梅花湖環湖騎腳踏車","冬山河親水公園","羅東夜市（車程約 10 分）","新寮瀑布步道"],
 yl_toucheng:["外澳海灘、烏石港","蘭陽博物館","頭城老街","礁溪溫泉（車程約 15 分）"],
 yl_wujie:["國立傳統藝術中心","冬山河親水公園","羅東夜市（車程約 10 分）"],
 yl_jiaoxi:["礁溪溫泉、湯圍溝公園","龍潭湖","跑馬古道"],
 yl_luodong:["羅東夜市（車程約 5 分）","羅東林業文化園區","冬山河親水公園"],
 yl_yuanshan:["金車噶瑪蘭威士忌酒廠","宜農牧場","望龍埤"],
 tn_jiangjun:["將軍漁港、將軍吼","青鯤鯓扇形鹽田","北門井仔腳瓦盤鹽田看夕陽","七股鹽山"],
 tn_city:["國華街、永樂市場小吃","神農街、海安路","赤崁樓、林百貨","正興街"],
 tn_baihe:["關子嶺溫泉、泥漿溫泉","火山碧雲寺","水火同源"],
 ks_qishan:["旗山老街、香蕉冰","美濃客家文物館、粄條","佛光山（車程約 25 分）"],
 hc_guanxi:["六福村","關西老街、仙草","馬武督探索森林"],
 ty_fuxing:["石門水庫","大溪老街、豆干","小烏來天空步道"],
 yl_datong:["太平山（需購票、注意路況）","鳩之澤溫泉","明池森林遊樂區"],
 tc_fengyuan:["廟東夜市","后里馬場","麗寶樂園（車程約 20 分）"],
 ty_luzhu:["竹圍漁港吃海鮮","大園看飛機起降","青埔華泰名品城"]
};
var BK="?checkin=2026-12-31&checkout=2027-01-02&group_adults=8";
var DATA=[
 {cat:"house",tier:"A",name:"宜蘭三星包棟（免費 KTV、麻將、庭院 BBQ）",where:"宜蘭三星",price:27400,plat:"Airbnb",rating:"4.91（188 則）",cap:"4–14 人",ktv:1,bbq:1,mins:87,km:87,lat:24.65842,lng:121.67346,near:"yl_sanxing",url:"https://www.airbnb.com.tw/rooms/21858754?check_in=2026-12-31&check_out=2027-01-02&adults=8",note:"CP 值最高；可帶寵物"},
 {cat:"house",tier:"A",name:"台南將軍港 雙吉船之棧（海景 BBQ、KTV 包廂）",where:"台南將軍",price:17794,plat:"Airbnb",rating:"新房源，尚無評價",cap:"最多 16 人",ktv:1,bbq:1,mins:216,km:299,lat:23.2088,lng:120.0983,near:"tn_jiangjun",url:"https://www.airbnb.com.tw/rooms/1368395010706795139?check_in=2026-12-31&check_out=2027-01-02&adults=8",note:"貨櫃屋；KTV、BBQ 是否另收費要先問"},
 {cat:"house",tier:"A",name:"拇指園民宿",where:"新竹關西",price:36040,plat:"Booking",rating:"9.8（9 則）",cap:"未標示整棟",ktv:1,bbq:1,mins:46,km:52,lat:24.804753,lng:121.132786,near:"hc_guanxi",url:"https://www.booking.com/hotel/tw/taiwan-thumb-up-b-amp-b.zh-tw.html"+BK,note:"車程最短；不確定是整棟還是多間客房，要問"},
 {cat:"house",tier:"A",name:"自在如家獨棟民宿",where:"宜蘭頭城",price:57000,plat:"Booking",rating:"9.6（28 則）",cap:"3 房、5 張雙人床",ktv:1,bbq:1,mins:65,km:63,lat:24.8605469,lng:121.8290935,near:"yl_toucheng",url:"https://www.booking.com/hotel/tw/zi-zai-ru-jia-du-dong-min-su.zh-tw.html"+BK,note:"宜蘭這組離輔大最近；入住時付款"},
 {cat:"house",tier:"A",name:"粉紅城堡民宿",where:"宜蘭冬山（梅花湖旁）",price:62000,plat:"Booking",rating:"尚無評分",cap:"4 房、6 張加大雙人床",ktv:1,bbq:1,mins:78,km:79,lat:24.6657401,lng:121.7415349,near:"yl_dongshan",url:"https://www.booking.com/hotel/tw/yi-lan-min-su-fen-hong-cheng-bao-min-su.zh-tw.html"+BK},
 {cat:"house",tier:"A",name:"奇凡小花園 獨棟包棟",where:"宜蘭冬山（梅花湖旁）",price:75600,plat:"Booking／Agoda",rating:"9.3（4 則）",cap:"5 房",ktv:1,bbq:1,mins:77,km:79,lat:24.664868,lng:121.741018,near:"yl_dongshan",url:"https://www.booking.com/hotel/tw/xiao-hua-yuan.zh-tw.html"+BK},
 {cat:"house",tier:"A",name:"微風民宿（10 人包棟）",where:"宜蘭冬山",price:76000,plat:"台灣宿配網",rating:"—",cap:"10 人包棟起",ktv:1,bbq:1,mins:85,km:82,lat:24.635,lng:121.745,near:"yl_dongshan",url:"https://twstay.com/order.aspx?Area=yilan&BNB=breezebnb&OrderType=1&RID=ORDER",note:"押金 5,000；烤肉另收場地費 1,000"},
 {cat:"house",tier:"A",name:"HHouse 時尚會館",where:"宜蘭冬山",price:84000,plat:"Booking",rating:"7.0（1 則）",cap:"整棟 Villa、10 張雙人床",ktv:1,bbq:1,mins:76,km:78,lat:24.667041,lng:121.749647,near:"yl_dongshan",url:"https://www.booking.com/hotel/tw/h-houseshi-shang-hui-guan.zh-tw.html"+BK,note:"評價數太少"},
 {cat:"house",tier:"A",name:"澳根尼會館（KTV、戲水池、電動麻將）",where:"宜蘭五結",price:87000,plat:"Booking",rating:"9.7（54 則）",cap:"5 房",ktv:1,bbq:1,mins:70,km:73,lat:24.6924581,lng:121.7806477,near:"yl_wujie",url:"https://www.booking.com/hotel/tw/ao-gen-ni-hui-guan-auganic6ren-bao-dong-ktvxi-shui-chi-kao-rou-dian-dong-ma-jian.zh-tw.html"+BK,note:"評分最高但價格高"},
 {cat:"house",tier:"B",name:"老村長包棟（可烤肉、可停多台車）",where:"宜蘭冬山／羅東交界",price:15030,plat:"Airbnb",rating:"—",cap:"最多 16 人",ktv:0,bbq:1,mins:78,km:78,lat:24.65256,lng:121.778,near:"yl_dongshan",url:"https://www.airbnb.com.tw/rooms/33204808?check_in=2026-12-31&check_out=2027-01-02&adults=8",note:"全部最便宜的包棟"},
 {cat:"house",tier:"B",name:"沐樂親子館（包棟 12 人）",where:"宜蘭礁溪",price:25251,plat:"Airbnb",rating:"4.57（60 則）",cap:"最多 12 人",ktv:0,bbq:1,mins:71,km:68,lat:24.79096,lng:121.74252,near:"yl_jiaoxi",url:"https://www.airbnb.com.tw/rooms/41632449?check_in=2026-12-31&check_out=2027-01-02&adults=8"},
 {cat:"house",tier:"B",name:"幸福三百米包棟別墅",where:"宜蘭羅東",price:27000,plat:"Airbnb",rating:"—",cap:"整棟",ktv:0,bbq:1,mins:74,km:75,lat:24.66655,lng:121.78912,near:"yl_luodong",url:"https://www.airbnb.com.tw/rooms/15321152?check_in=2026-12-31&check_out=2027-01-02&adults=8"},
 {cat:"house",tier:"B",name:"花鹿米親子民宿 後棟（10 人包棟）",where:"宜蘭冬山",price:38800,plat:"台灣宿配網",rating:"—",cap:"10 人",ktv:0,bbq:1,mins:76,km:78,lat:24.6694516,lng:121.7464174,near:"yl_dongshan",url:"https://twstay.com/order.aspx?Area=yilan&BNB=deerfollowme&OrderType=1&RID=ORDER"},
 {cat:"house",tier:"B",name:"旗山三合院民宿（30 人包棟）",where:"高雄旗山",price:39800,plat:"台灣宿配網",rating:"4.6／5",cap:"30 人",ktv:0,bbq:1,mins:252,km:343,lat:22.9359262,lng:120.5114036,near:"ks_qishan",url:"https://twstay.com/order.aspx?Area=kaohsiung&BNB=sanhoyuanbooking&OrderType=1&RID=ORDER",note:"寫可歡唱但沒確認設備；只收現金，付訂後取消不退"},
 {cat:"house",tier:"B",name:"倚月觀荷民宿",where:"台南白河",price:40320,plat:"Booking",rating:"9.3（18 則）",cap:"整棟、4 房",ktv:0,bbq:1,mins:224,km:298,lat:23.122003,lng:120.419866,near:"tn_baihe",url:"https://www.booking.com/hotel/tw/yi-yue-guan-he-min-su.zh-tw.html"+BK},
 {cat:"house",tier:"B",name:"光與影民宿（20 人包棟）",where:"宜蘭員山",price:51400,plat:"台灣宿配網",rating:"—",cap:"20 人",ktv:0,bbq:1,mins:76,km:74,lat:24.735,lng:121.70,near:"yl_yuanshan",url:"https://twstay.com/order.aspx?Area=yilan&BNB=fan4013c&OrderType=1&RID=ORDER"},
 {cat:"house",tier:"B",name:"曉翠軒親子民宿",where:"宜蘭五結",price:59976,plat:"Booking",rating:"8.4（190 則）",cap:"整棟、4 房",ktv:0,bbq:1,mins:73,km:75,lat:24.68158,lng:121.806562,near:"yl_wujie",url:"https://www.booking.com/hotel/tw/xiao-cui-xuan-min-su.zh-tw.html"+BK},
 {cat:"house",tier:"B",name:"金洙椏民宿（8 人方案）",where:"宜蘭五結",price:67600,plat:"台灣宿配網",rating:"—",cap:"8 人",ktv:0,bbq:1,mins:73,km:74,lat:24.6799,lng:121.804245,near:"yl_wujie",url:"https://twstay.com/order.aspx?Area=yilan&BNB=jinzhuya&OrderType=1&RID=ORDER"},
 {cat:"house",tier:"B",name:"宜蘭童話村生態農場民宿",where:"宜蘭冬山",price:85000,plat:"Booking",rating:"8.0（43 則）",cap:"整棟、5 房",ktv:0,bbq:1,mins:77,km:79,lat:24.665737,lng:121.742437,near:"yl_dongshan",url:"https://www.booking.com/hotel/tw/fair-story-village-farm.zh-tw.html"+BK},
 {cat:"house",tier:"C",name:"康樂多多（6–8 人包棟）",where:"台南中西區",price:28800,plat:"台灣宿配網",rating:"—",cap:"6–8 人",ktv:0,bbq:0,mins:218,km:301,lat:23.0007887,lng:120.1973975,near:"tn_city",url:"https://twstay.com/order.aspx?Area=tainan&BNB=dodo316&OrderType=1&RID=ORDER",note:"市區，可打麻將、煮火鍋"},
 {cat:"house",tier:"C",name:"吟軒雅集民宿",where:"宜蘭三星",price:29600,plat:"Booking",rating:"尚無評分",cap:"整棟、4 房",ktv:0,bbq:0,mins:82,km:85,lat:24.6675212,lng:121.6822094,near:"yl_sanxing",url:"https://www.booking.com/hotel/tw/yin-xuan-ya-ji-min-su-yi-lan-xian.zh-tw.html"+BK},
 {cat:"house",tier:"C",name:"月兒田民宿",where:"宜蘭礁溪",price:41360,plat:"Booking",rating:"9.2（13 則）",cap:"整棟、4 房",ktv:0,bbq:0,mins:67,km:62,lat:24.792579,lng:121.76982,near:"yl_jiaoxi",url:"https://www.booking.com/hotel/tw/yue-er-tian-min-su.zh-tw.html"+BK},
 {cat:"camp",tier:"D",name:"石秀灣五葉松露營區",where:"桃園復興（石門水庫旁）",price:null,plat:"露營樂",rating:"108 則評價",cap:"三晚皆有空位",ktv:0,bbq:1,mins:65,km:69,lat:24.8018611,lng:121.2878123,near:"ty_fuxing",url:"https://www.easycamp.com.tw/Store_2483.html",note:"低海拔、有雨棚、可玩水"},
 {cat:"camp",tier:"D",name:"桃野星晴（露營車）",where:"桃園蘆竹",price:null,plat:"露營樂",rating:"2 則評價",cap:"每晚只剩 2–3 帳",ktv:0,bbq:1,mins:24,km:23,lat:25.0506,lng:121.2917,near:"ty_luzhu",url:"https://www.easycamp.com.tw/Store_2656.html",note:"離輔大最近；露營車（含衛浴）頁面標示 4,000 起"},
 {cat:"camp",tier:"D",name:"山谷樂生態露營園區",where:"宜蘭冬山",price:null,plat:"露營樂",rating:"尚無評價",cap:"每晚約 33 帳",ktv:0,bbq:1,mins:88,km:85,lat:24.618358,lng:121.728336,near:"yl_dongshan",url:"https://www.easycamp.com.tw/Store_2426.html",note:"低海拔、離羅東近"},
 {cat:"camp",tier:"D",name:"斯揚莫那休閒莊園",where:"宜蘭大同",price:null,plat:"露營樂",rating:"2 則評價",cap:"空位最多",ktv:0,bbq:1,mins:120,km:125,lat:24.5125734,lng:121.4363276,near:"yl_datong",url:"https://www.easycamp.com.tw/Store_2502.html",note:"中海拔，冬天夜裡冷，衣服帶夠"},
 {cat:"camp",tier:"D",name:"流星花園幸福樂活園區",where:"台中豐原",price:null,plat:"露營樂",rating:"尚無評價",cap:"每晚約 20 帳",ktv:0,bbq:1,mins:110,km:141,lat:24.2422,lng:120.7185,near:"tc_fengyuan",url:"https://www.easycamp.com.tw/Store_1652.html",note:"座標以豐原區估算，車程僅供參考"}
];
DATA.forEach(function(d,i){d.idx=i});

/* ---------- 清單 ---------- */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function money(n){return n==null?"點連結看":"$"+n.toLocaleString("en-US")}
function per(n){return n==null?"價格依營位":"每人約 $"+Math.round(n/8).toLocaleString("en-US")+"（8 人）"}
function dur(m){var h=Math.floor(m/60);return(h?h+" 小時 ":"")+(m%60)+" 分"}
function card(d,n){
  var near=(NEAR[d.near]||[]).map(function(x){return"<li>"+esc(x)+"</li>"}).join("");
  return '<article class="card" tabindex="0" data-idx="'+d.idx+'" style="--c:'+T[d.tier].color+';--i:'+n+'">'+
  '<div class="top"><div class="rank">'+n+'</div><div><div class="name">'+esc(d.name)+'</div><div class="where">'+esc(d.where)+" · "+esc(d.plat)+" · "+esc(d.cap)+'</div></div></div>'+
  '<div class="pills"><span class="pill '+(d.ktv?"yes":"no")+'">卡拉OK</span><span class="pill '+(d.bbq?"yes":"no")+'">烤肉</span><span class="pill">評價 '+esc(d.rating)+'</span></div>'+
  '<div class="nums"><div class="num"><small>兩晚總價</small><b>'+money(d.price)+'</b><small>'+per(d.price)+'</small></div><div class="num"><small>輔大出發（不塞車）</small><b>'+dur(d.mins)+'</b><small>約 '+d.km+' 公里</small></div></div>'+
  '<div><div class="label">附近可以去</div><ul class="near">'+near+'</ul></div>'+
  (d.note?'<div class="note">'+esc(d.note)+'</div>':"")+
  '<a class="go" href="'+esc(d.url)+'" target="_blank" rel="noopener">打開訂房頁面</a></article>';
}
var ORDER={A:0,B:1,C:2,D:3};
function render(cat,el){
  var items=DATA.filter(function(d){return d.cat===cat}).sort(function(a,b){return ORDER[a.tier]-ORDER[b.tier]});
  var html="",n=0;
  ["A","B","C","D"].forEach(function(t){
    var g=items.filter(function(d){return d.tier===t});if(!g.length)return;
    html+='<div class="tierhead"><h2 style="color:'+T[t].color+'">'+T[t].label+'</h2><span>'+T[t].desc+" · "+g.length+' 間</span></div><div class="grid">';
    g.forEach(function(d){n++;html+=card(d,n)});html+="</div>";
  });
  el.innerHTML=html;return items.length;
}
document.getElementById("cHouse").textContent=render("house",document.getElementById("panel-house"));
document.getElementById("cCamp").textContent=render("camp",document.getElementById("panel-camp"));
var TABS=[["tab-house","panel-house","house"],["tab-camp","panel-camp","camp"]];
TABS.forEach(function(x){document.getElementById(x[0]).addEventListener("click",function(){
  TABS.forEach(function(y){document.getElementById(y[0]).setAttribute("aria-selected",y[0]===x[0]);document.getElementById(y[1]).hidden=y[0]!==x[0]});
  map.filter(x[2]);
})});

/* ---------- 3D 地圖 ---------- */
var stage=document.getElementById("stage"),tag=document.getElementById("tag");
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var map={focus:function(){},filter:function(){}};
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function easeOut(t){return 1-Math.pow(1-t,3)}

try{
  if(!window.THREE)throw new Error("no three");
  var mobile=matchMedia("(pointer: coarse)").matches;
  var renderer=new THREE.WebGLRenderer({antialias:!mobile,alpha:true,powerPreference:"high-performance"});
  var maxPR=Math.min(window.devicePixelRatio||1,mobile?2:2),pr=maxPR;
  renderer.setPixelRatio(pr);
  stage.insertBefore(renderer.domElement,stage.firstChild);
  var scene=new THREE.Scene();scene.fog=new THREE.Fog(0x0b1029,28,80);
  var cam=new THREE.PerspectiveCamera(45,1,.1,200);
  function resize(){var w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;
    cam.fov=w<520?55:45;cam.updateProjectionMatrix()}
  resize();addEventListener("resize",resize);

  var S=11;
  function P(lat,lng){return new THREE.Vector3((lng-120.95)*S,0,-(lat-23.75)*S*1.08)}
  var world=new THREE.Group();scene.add(world);

  // 台灣（簡化輪廓）
  var outline=[[25.29,121.53],[25.13,121.9],[24.85,121.83],[24.6,121.87],[24.3,121.74],[23.9,121.6],[23.4,121.45],[22.9,121.2],[22.6,120.95],[21.9,120.85],[22.0,120.7],[22.45,120.45],[22.8,120.2],[23.1,120.08],[23.5,120.12],[24.0,120.4],[24.4,120.62],[24.75,120.92],[25.05,121.08],[25.15,121.38]];
  var shape=new THREE.Shape();
  outline.forEach(function(p,i){var v=P(p[0],p[1]);i?shape.lineTo(v.x,-v.z):shape.moveTo(v.x,-v.z)});
  var landGeo=new THREE.ExtrudeGeometry(shape,{depth:.4,bevelEnabled:true,bevelThickness:.08,bevelSize:.12,bevelSegments:2,curveSegments:4});
  var land=new THREE.Mesh(landGeo,new THREE.MeshLambertMaterial({color:0x17205a,emissive:0x0a0f33}));
  land.rotation.x=-Math.PI/2;land.position.y=-.4;world.add(land);
  var edge=new THREE.LineSegments(new THREE.EdgesGeometry(landGeo,30),new THREE.LineBasicMaterial({color:0x5a6bd8,transparent:true,opacity:.6}));
  edge.rotation.x=-Math.PI/2;edge.position.y=-.4;world.add(edge);
  // 海面光點格
  var grid=new THREE.GridHelper(70,35,0x1f2862,0x161d4d);grid.position.y=-.45;world.add(grid);
  scene.add(new THREE.HemisphereLight(0x8f9cff,0x0b1029,.55));
  var dl=new THREE.DirectionalLight(0xffffff,.7);dl.position.set(-6,14,10);dl.intensity=.45;scene.add(dl);

  // 輔大
  var O=P(ORIGIN.lat,ORIGIN.lng);
  var star=new THREE.Mesh(new THREE.OctahedronGeometry(.34),new THREE.MeshBasicMaterial({color:0xffffff}));
  star.position.copy(O).setY(1);world.add(star);
  var ringGeo=new THREE.RingGeometry(.35,.45,40);
  var oRing=new THREE.Mesh(ringGeo,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.5,side:THREE.DoubleSide}));
  oRing.rotation.x=-Math.PI/2;oRing.position.copy(O).setY(.02);world.add(oRing);

  // 住宿柱（InstancedMesh 一次畫完）
  var N=DATA.length;
  var pillar=new THREE.InstancedMesh(new THREE.CylinderGeometry(.09,.09,1,8).translate(0,.5,0),new THREE.MeshBasicMaterial(),N);
  var head=new THREE.InstancedMesh(new THREE.SphereGeometry(.17,12,10),new THREE.MeshBasicMaterial(),N);
  pillar.instanceMatrix.setUsage(THREE.DynamicDrawUsage);head.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  world.add(pillar,head);
  var dummy=new THREE.Object3D(),col=new THREE.Color();
  var pins=DATA.map(function(d,i){
    var p=P(d.lat,d.lng);
    // 同區點太密，依序微調一點位置
    var a=i*2.399,r=.18*Math.sqrt(i%5);p.x+=Math.cos(a)*r;p.z+=Math.sin(a)*r;
    col.set(T[d.tier].color);pillar.setColorAt(i,col);head.setColorAt(i,col);
    var mid=O.clone().lerp(p,.5);mid.y=1.2+O.distanceTo(p)*.22;
    var curve=new THREE.QuadraticBezierCurve3(O.clone().setY(.08),mid,p.clone().setY(.08));
    var pts=curve.getPoints(48);
    var lg=new THREE.BufferGeometry().setFromPoints(pts);lg.setDrawRange(0,0);
    var line=new THREE.Line(lg,new THREE.LineBasicMaterial({color:T[d.tier].color,transparent:true,opacity:.22}));
    world.add(line);
    return{d:d,p:p,h:T[d.tier].h,curve:curve,line:line,grow:0,delay:.6+i*.05,phase:Math.random()*6.28,t:Math.random(),vis:1,scale:1};
  });
  pillar.instanceColor.needsUpdate=true;head.instanceColor.needsUpdate=true;

  // 沿弧線流動的光點（一組 Points）
  var sparkPos=new Float32Array(N*3),sparkCol=new Float32Array(N*3);
  pins.forEach(function(p,i){col.set(T[p.d.tier].color);sparkCol.set([col.r,col.g,col.b],i*3)});
  var sparkGeo=new THREE.BufferGeometry();
  sparkGeo.setAttribute("position",new THREE.BufferAttribute(sparkPos,3));
  sparkGeo.setAttribute("color",new THREE.BufferAttribute(sparkCol,3));
  var sparks=new THREE.Points(sparkGeo,new THREE.PointsMaterial({size:.32,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,map:dotTex()}));
  world.add(sparks);

  // 選取時的脈衝光圈
  var pulse=new THREE.Mesh(ringGeo,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));
  pulse.rotation.x=-Math.PI/2;world.add(pulse);

  // 星空（閃爍用兩層交替）
  function starLayer(n,size){var g=new THREE.BufferGeometry(),a=new Float32Array(n*3);
    for(var i=0;i<n;i++){a[i*3]=(Math.random()-.5)*130;a[i*3+1]=6+Math.random()*45;a[i*3+2]=-28-Math.random()*45}
    g.setAttribute("position",new THREE.BufferAttribute(a,3));
    var m=new THREE.Points(g,new THREE.PointsMaterial({color:0xc4cbff,size:size,transparent:true,depthWrite:false,map:dotTex(),blending:THREE.AdditiveBlending}));scene.add(m);return m}
  var stars1=starLayer(260,.35),stars2=starLayer(200,.25);

  // 煙火：固定粒子池，不在播放中新增物件
  var FW_N=5,FW_P=70,fwPos=new Float32Array(FW_N*FW_P*3),fwCol=new Float32Array(FW_N*FW_P*3),fwVel=new Float32Array(FW_N*FW_P*3);
  var fwLife=new Float32Array(FW_N),fwBase=[];for(var k=0;k<FW_N;k++)fwBase.push(new THREE.Color());
  var fwGeo=new THREE.BufferGeometry();fwGeo.setAttribute("position",new THREE.BufferAttribute(fwPos,3));fwGeo.setAttribute("color",new THREE.BufferAttribute(fwCol,3));
  var fw=new THREE.Points(fwGeo,new THREE.PointsMaterial({size:.55,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,map:dotTex()}));
  fw.frustumCulled=false;scene.add(fw);
  var fwNext=0,PAL=[0xf5c451,0xff6b5a,0x4fd6c4,0xffffff,0xff9bd2];
  function burst(){
    var k=fwNext;fwNext=(fwNext+1)%FW_N;fwLife[k]=1;fwBase[k].set(PAL[(Math.random()*PAL.length)|0]);
    var cx=(Math.random()-.5)*30,cy=9+Math.random()*7,cz=-14-Math.random()*12;
    for(var j=0;j<FW_P;j++){var i=(k*FW_P+j)*3;fwPos[i]=cx;fwPos[i+1]=cy;fwPos[i+2]=cz;
      var u=Math.random()*2-1,th=Math.random()*6.283,s=Math.sqrt(1-u*u),sp=.09+Math.random()*.05;
      fwVel[i]=s*Math.cos(th)*sp;fwVel[i+1]=u*sp;fwVel[i+2]=s*Math.sin(th)*sp}
  }

  function dotTex(){
    if(dotTex.t)return dotTex.t;var c=document.createElement("canvas");c.width=c.height=64;var g=c.getContext("2d");
    var gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.25,"rgba(255,255,255,.85)");gr.addColorStop(1,"rgba(255,255,255,0)");
    g.fillStyle=gr;g.fillRect(0,0,64,64);dotTex.t=new THREE.CanvasTexture(c);return dotTex.t}

  // ---- 鏡頭 ----
  var cur={yaw:-.2,pitch:1.35,dist:58,tx:0,tz:-1.5};       // 開場從高空
  var goal={yaw:-.42,pitch:.82,dist:mobile?34:30,tx:1.2,tz:-2.2};
  var from=null,tween=1,tweenDur=2.6;
  var auto=!reduce,lastTouch=0;
  function flyTo(g,dur){from=Object.assign({},cur);goal=g;tween=0;tweenDur=dur||1.4}
  flyTo(goal,reduce?.01:2.8);
  function place(){
    cam.position.set(cur.tx+cur.dist*Math.sin(cur.yaw)*Math.cos(cur.pitch),cur.dist*Math.sin(cur.pitch),cur.tz+cur.dist*Math.cos(cur.yaw)*Math.cos(cur.pitch));
    cam.lookAt(cur.tx,0,cur.tz)}

  // 拖曳：水平拖旋轉，垂直交給頁面捲動
  var drag=null;
  renderer.domElement.addEventListener("pointerdown",function(e){drag={x:e.clientX,y:e.clientY,id:e.pointerId};auto=false;lastTouch=performance.now();tween=1});
  addEventListener("pointermove",function(e){if(!drag||e.pointerId!==drag.id)return;
    cur.yaw-=(e.clientX-drag.x)*.008;if(e.pointerType==="mouse")cur.pitch=Math.min(1.35,Math.max(.4,cur.pitch+(e.clientY-drag.y)*.005));
    drag.x=e.clientX;drag.y=e.clientY;lastTouch=performance.now()});
  addEventListener("pointerup",function(){drag=null});addEventListener("pointercancel",function(){drag=null});
  renderer.domElement.addEventListener("wheel",function(e){e.preventDefault();cur.dist=Math.min(60,Math.max(12,cur.dist+e.deltaY*.02))},{passive:false});

  var focused=-1,pulseT=0,catShow="house";
  map.focus=function(idx){
    focused=idx;var p=pins[idx];if(!p)return;auto=false;lastTouch=performance.now();
    var mid=p.p.clone().lerp(O,.4);var d=O.distanceTo(p.p);
    flyTo({yaw:cur.yaw+.35*(Math.random()<.5?1:-1)*.3,pitch:.78,dist:Math.max(mobile?16:14,Math.min(44,d*1.35+11)),tx:mid.x,tz:mid.z},1.5);
    pulse.position.copy(p.p).setY(.03);pulseT=0;
    var c=T[p.d.tier].color;
    tag.innerHTML='<b style="color:'+c+'">'+esc(p.d.name)+'</b><span class="hint">輔大出發約 '+dur(p.d.mins)+'（不塞車）· '+money(p.d.price)+"</span>";
  };
  map.filter=function(cat){catShow=cat;focused=-1;
    flyTo({yaw:cur.yaw,pitch:.82,dist:mobile?34:30,tx:1.2,tz:-2.2},1.2);
    tag.innerHTML='<b>⭐ 從輔大出發</b><span class="hint">'+(cat==="camp"?"目前顯示：懶人露營":"目前顯示：包棟")+" · 點卡片看位置</span>"};

  // 卡片點擊
  document.addEventListener("click",function(e){
    var c=e.target.closest&&e.target.closest(".card");if(!c||e.target.closest("a"))return;
    document.querySelectorAll(".card.on").forEach(function(x){x.classList.remove("on")});c.classList.add("on");
    map.focus(+c.dataset.idx);
    var r=stage.getBoundingClientRect();if(r.bottom<60||r.top>innerHeight*.5)stage.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
  });
  document.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.classList&&e.target.classList.contains("card"))e.target.click()});

  // 只在看得到時才畫，省電又順
  var visible=true;
  if("IntersectionObserver" in window)new IntersectionObserver(function(en){visible=en[0].isIntersecting;if(visible)kick()},{threshold:0}).observe(stage);
  document.addEventListener("visibilitychange",function(){if(!document.hidden)kick()});

  // 自動調整畫質：前幾秒太慢就降解析度
  var fpsT=0,fpsN=0,checked=0;
  var t0=performance.now(),last=t0,running=false,fwTimer=0;
  function kick(){if(!running){running=true;last=performance.now();requestAnimationFrame(loop)}}
  function loop(now){
    if(!visible||document.hidden){running=false;return}
    var dt=Math.min(.05,(now-last)/1000);last=now;var el=(now-t0)/1000;
    // 畫質
    if(checked<3){fpsT+=dt;fpsN++;if(fpsT>1.5){var fps=fpsN/fpsT;fpsT=0;fpsN=0;checked++;
      if(fps<48&&pr>1){pr=Math.max(1,pr-.5);renderer.setPixelRatio(pr);resize()}}}
    // 鏡頭
    if(tween<1){tween=Math.min(1,tween+dt/tweenDur);var k=ease(tween);
      for(var key in goal)cur[key]=from[key]+(goal[key]-from[key])*k}
    else if(!auto&&!drag&&now-lastTouch>6000&&focused<0)auto=!reduce;
    if(auto&&tween>=1)cur.yaw+=dt*.1;
    place();
    // 柱子長出來＋輕微浮動
    for(var i=0;i<N;i++){var p=pins[i];var want=(p.d.cat===catShow)?1:0;
      p.vis+=(want-p.vis)*Math.min(1,dt*6);
      p.grow=reduce?1:easeOut(Math.min(1,Math.max(0,(el-p.delay)/.9)));
      var sel=(i===focused)?1:0;p.scale+=((sel?1.9:1)-p.scale)*Math.min(1,dt*8);
      var h=p.h*p.grow*(.25+.75*p.vis)*(1+.04*Math.sin(el*2+p.phase))*(sel?1.25:1);
      dummy.position.copy(p.p);dummy.scale.set(p.scale*(.4+.6*p.vis),Math.max(.001,h),p.scale*(.4+.6*p.vis));dummy.updateMatrix();pillar.setMatrixAt(i,dummy.matrix);
      dummy.position.set(p.p.x,h+.14,p.p.z);var s=p.grow*p.scale*(.35+.65*p.vis);dummy.scale.set(s,s,s);dummy.updateMatrix();head.setMatrixAt(i,dummy.matrix);
      // 弧線依序畫出
      var draw=reduce?49:Math.floor(49*Math.min(1,Math.max(0,(el-p.delay-.3)/1.1)));p.line.geometry.setDrawRange(0,draw);
      p.line.material.opacity=(focused<0?.22:(sel?.95:.07))*(.15+.85*p.vis);
      // 流動光點
      if(!reduce)p.t=(p.t+dt*(sel?.55:.28))%1;
      var q=p.curve.getPoint(draw<49?0:p.t);var on=(draw>=49&&p.vis>.5)?1:0;
      sparkPos[i*3]=q.x;sparkPos[i*3+1]=on?q.y:-50;sparkPos[i*3+2]=q.z}
    pillar.instanceMatrix.needsUpdate=true;head.instanceMatrix.needsUpdate=true;sparkGeo.attributes.position.needsUpdate=true;
    star.rotation.y+=dt*1.6;star.position.y=1+.12*Math.sin(el*2.2);
    var rs=1+((el*.8)%1)*1.8;oRing.scale.set(rs,rs,rs);oRing.material.opacity=.55*(1-((el*.8)%1));
    if(focused>=0){pulseT=(pulseT+dt*.9)%1;var ps=1+pulseT*3;pulse.scale.set(ps,ps,ps);pulse.material.opacity=.8*(1-pulseT);pulse.material.color.set(T[pins[focused].d.tier].color)}else pulse.material.opacity=0;
    stars1.material.opacity=.55+.35*Math.sin(el*1.3);stars2.material.opacity=.55+.35*Math.sin(el*1.3+3.1);
    // 煙火
    if(!reduce){fwTimer-=dt;if(fwTimer<=0&&el>1.2){burst();fwTimer=.9+Math.random()*1.1}}
    for(var k2=0;k2<FW_N;k2++){var L=fwLife[k2];if(L<=0)continue;L=Math.max(0,L-dt*.6);fwLife[k2]=L;var b=fwBase[k2],f=L*L;
      for(var j=0;j<FW_P;j++){var ii=(k2*FW_P+j)*3;fwVel[ii+1]-=.0016;fwVel[ii]*=.985;fwVel[ii+1]*=.985;fwVel[ii+2]*=.985;
        fwPos[ii]+=fwVel[ii];fwPos[ii+1]+=fwVel[ii+1];fwPos[ii+2]+=fwVel[ii+2];fwCol[ii]=b.r*f;fwCol[ii+1]=b.g*f;fwCol[ii+2]=b.b*f}}
    fwGeo.attributes.position.needsUpdate=true;fwGeo.attributes.color.needsUpdate=true;
    renderer.render(scene,cam);
    requestAnimationFrame(loop);
  }
  kick();
}catch(err){
  tag.innerHTML="<b>這台裝置無法顯示 3D 地圖</b><span class=\"hint\">下方清單仍可正常使用。</span>";
}
})();
