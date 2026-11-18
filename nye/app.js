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
var SHORT=["三星包棟","將軍雙吉船","拇指園","自在如家","粉紅城堡","奇凡小花園","微風民宿","HHouse","澳根尼會館","老村長","沐樂親子館","幸福三百米","花鹿米","旗山三合院","倚月觀荷","光與影","曉翠軒","金洙椏","童話村","康樂多多","吟軒雅集","月兒田","石秀灣","桃野星晴","山谷樂","斯揚莫那","流星花園"];
var ICON={A:"🎤",B:"🍖",C:"🏠",D:"⛺"};
DATA.forEach(function(d,i){d.s=SHORT[i]||d.name;d.route=(window.GEO&&GEO.routes[i])||null});

var stage=document.getElementById("stage"),tag=document.getElementById("tag");
var sheet=document.getElementById("sheet"),legend=document.querySelector(".legend");
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var map={focus:function(){},filter:function(){},region:function(){}};
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function easeOut(t){return 1-Math.pow(1-t,3)}
function easeBack(t){var c=1.6;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)}

function showCard(idx){
  var d=DATA[idx];TABS.forEach(function(y){var on=y[2]===d.cat;document.getElementById(y[0]).setAttribute("aria-selected",on);document.getElementById(y[1]).hidden=!on});
  var c=document.querySelector('.card[data-idx="'+idx+'"]');if(!c)return;
  document.querySelectorAll(".card.on").forEach(function(x){x.classList.remove("on")});c.classList.add("on");
  c.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"});
}
function openSheet(d){
  sheet.style.setProperty("--c",T[d.tier].color);
  document.getElementById("shIco").textContent=ICON[d.tier];
  document.getElementById("shName").textContent=d.name;
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

// 卡片 → 地圖
document.addEventListener("click",function(e){
  var c=e.target.closest&&e.target.closest(".card");if(!c||e.target.closest("a"))return;
  document.querySelectorAll(".card.on").forEach(function(x){x.classList.remove("on")});c.classList.add("on");
  map.focus(+c.dataset.idx,true);
  var r=stage.getBoundingClientRect();if(r.bottom<80||r.top>innerHeight*.4)stage.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
});
document.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.classList&&e.target.classList.contains("card"))e.target.click()});
document.querySelectorAll(".rg").forEach(function(b){b.addEventListener("click",function(){map.region(b.dataset.r)})});
function setRegionBtn(r){document.querySelectorAll(".rg").forEach(function(b){b.classList.toggle("on",b.dataset.r===r)})}

try{
  if(!window.THREE||!window.GEO)throw new Error("missing lib");
  var mobile=matchMedia("(pointer: coarse)").matches;
  var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});
  var pr=Math.min(window.devicePixelRatio||1,2);renderer.setPixelRatio(pr);
  
  stage.insertBefore(renderer.domElement,stage.firstChild);
  var scene=new THREE.Scene();
  var cam=new THREE.PerspectiveCamera(42,1,.05,400);
  function resize(){var w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.fov=w/h<.8?50:42;cam.updateProjectionMatrix()}
  resize();addEventListener("resize",resize);

  /* 投影：經緯度 → 平面（1 度緯度 = 10 單位） */
  var SZ=10,SX=10*Math.cos(23.7*Math.PI/180),LAT0=23.7,LNG0=121.0;
  function X(lng){return(lng-LNG0)*SX}
  function Z(lat){return-(lat-LAT0)*SZ}
  function V(lat,lng,y){return new THREE.Vector3(X(lng),y||0,Z(lat))}

  /* 文字與圖示貼圖 */
  var texCache={};
  function canvasTex(c){var t=new THREE.CanvasTexture(c);t.anisotropy=4;t.minFilter=THREE.LinearMipmapLinearFilter;return t}
  function label(text,o){
    o=o||{};var fs=o.size||44,pad=o.pad==null?18:o.pad,c=document.createElement("canvas"),g=c.getContext("2d");
    var font=(o.weight||700)+" "+fs+"px PingFang TC, Noto Sans TC, Microsoft JhengHei, sans-serif";g.font=font;
    var w=Math.ceil(g.measureText(text).width)+pad*2,h=fs+pad*1.3;c.width=w;c.height=h;g=c.getContext("2d");g.font=font;
    if(o.bg){g.fillStyle=o.bg;var r=h/2;g.beginPath();g.moveTo(r,0);g.lineTo(w-r,0);g.arc(w-r,r,r,-Math.PI/2,Math.PI/2);g.lineTo(r,h);g.arc(r,r,r,Math.PI/2,Math.PI*1.5);g.fill();
      if(o.border){g.strokeStyle=o.border;g.lineWidth=4;g.stroke()}}
    g.fillStyle=o.color||"#fff";g.textAlign="center";g.textBaseline="middle";
    if(!o.bg){g.shadowColor="rgba(0,0,0,.85)";g.shadowBlur=10}
    g.fillText(text,w/2,h/2+fs*.04);
    var m=new THREE.SpriteMaterial({map:canvasTex(c),transparent:true,depthTest:false,depthWrite:false});
    var s=new THREE.Sprite(m);var base=o.scale||.42;s.scale.set(base*w/h,base,1);
    s.userData.aspect=w/h;s.userData.k=o.k||0;s.renderOrder=o.order||20;return s;
  }
  function pinTex(d,rank){
    var key=d.tier+"_"+rank;if(texCache[key])return texCache[key];
    var c=document.createElement("canvas");c.width=160;c.height=200;var g=c.getContext("2d");var col=T[d.tier].color;
    // 外光暈
    var rg=g.createRadialGradient(80,72,30,80,72,78);rg.addColorStop(0,col);rg.addColorStop(1,"rgba(0,0,0,0)");g.globalAlpha=.45;g.fillStyle=rg;g.fillRect(0,0,160,160);g.globalAlpha=1;
    // 水滴形圖釘
    g.beginPath();g.moveTo(80,196);g.bezierCurveTo(62,150,24,128,24,82);g.arc(80,82,56,Math.PI,0);g.bezierCurveTo(136,128,98,150,80,196);g.closePath();
    g.fillStyle=col;g.fill();g.lineWidth=5;g.strokeStyle="rgba(255,255,255,.9)";g.stroke();
    g.beginPath();g.arc(80,82,42,0,Math.PI*2);g.fillStyle="#fff";g.fill();
    g.font="50px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText(ICON[d.tier],80,86);
    // 名次
    g.beginPath();g.arc(132,28,24,0,Math.PI*2);g.fillStyle="#0b1029";g.fill();g.lineWidth=4;g.strokeStyle=col;g.stroke();
    g.fillStyle="#fff";g.font="700 26px PingFang TC, sans-serif";g.fillText(String(rank),132,30);
    return texCache[key]=canvasTex(c);
  }
  function dotTex(){
    if(dotTex.t)return dotTex.t;var c=document.createElement("canvas");c.width=c.height=64;var g=c.getContext("2d");
    var gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.3,"rgba(255,255,255,.7)");gr.addColorStop(1,"rgba(255,255,255,0)");
    g.fillStyle=gr;g.fillRect(0,0,64,64);return dotTex.t=new THREE.CanvasTexture(c)}

  /* 海面（著色器，便宜又有動態） */
  var ocean=new THREE.Mesh(new THREE.PlaneGeometry(220,220,1,1),new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,uniforms:{uT:{value:0}},
    vertexShader:"varying vec3 vP;void main(){vec4 w=modelMatrix*vec4(position,1.);vP=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",
    fragmentShader:"uniform float uT;varying vec3 vP;void main(){float d=length(vP.xz-vec2(0.,-1.));float w=sin(vP.x*1.3+uT*.7)*sin(vP.z*1.1-uT*.5)+sin((vP.x+vP.z)*.7+uT*.9)*.5;float g=smoothstep(1.15,1.45,w);vec3 c=mix(vec3(.03,.05,.16),vec3(.06,.1,.28),smoothstep(40.,0.,d));c+=vec3(.25,.35,.8)*g*.18*smoothstep(45.,5.,d);float a=smoothstep(110.,30.,d);gl_FragColor=vec4(c,a);}"
  }));
  ocean.rotation.x=-Math.PI/2;ocean.position.y=-.02;scene.add(ocean);

  /* 縣市立體地形 */
  var HOT={"宜蘭縣":1,"桃園市":1,"台中市":1,"台南市":1,"高雄市":1,"新竹縣":1,"新北市":.6};
  var countyMeshes={},borderPts=[];
  var topMatBase=new THREE.MeshLambertMaterial({color:0x1a2260}),sideMatBase=new THREE.MeshLambertMaterial({color:0x0c1236});
  GEO.counties.forEach(function(cty){
    var hot=HOT[cty.n]||0,depth=hot?.32+hot*.12:.22;
    var shapes=cty.p.map(function(ring){var s=new THREE.Shape();ring.forEach(function(p,i){var x=X(p[0]),y=-Z(p[1]);i?s.lineTo(x,y):s.moveTo(x,y)});return s});
    var geo=new THREE.ExtrudeGeometry(shapes,{depth:depth,bevelEnabled:false,curveSegments:1});
    var top=hot?new THREE.MeshLambertMaterial({color:new THREE.Color(0x1f2c72).lerp(new THREE.Color(0x2e43a6),hot===1?.6:0),emissive:0x070c30}):topMatBase;
    var side=hot?new THREE.MeshLambertMaterial({color:0x141c55}):sideMatBase;
    var m=new THREE.Mesh(geo,[top,side]);m.rotation.x=-Math.PI/2;scene.add(m);
    countyMeshes[cty.n]={mesh:m,top:top,depth:depth,hot:hot,base:top.color.clone()};
    cty.p.forEach(function(ring){for(var i=0;i<ring.length-1;i++){borderPts.push(X(ring[i][0]),depth+.004,Z(ring[i][1]),X(ring[i+1][0]),depth+.004,Z(ring[i+1][1]))}});
  });
  var bg=new THREE.BufferGeometry();bg.setAttribute("position",new THREE.Float32BufferAttribute(borderPts,3));
  var borders=new THREE.LineSegments(bg,new THREE.LineBasicMaterial({color:0x6f80ff,transparent:true,opacity:.55}));scene.add(borders);
  scene.add(new THREE.HemisphereLight(0xaab4ff,0x0b1029,.75));
  var sun=new THREE.DirectionalLight(0xfff1d6,.55);sun.position.set(-8,20,12);scene.add(sun);
  // 縣市名稱
  var zl=[];var CL={"宜蘭縣":[24.6,121.62],"桃園市":[24.93,121.2],"新竹縣":[24.72,121.1],"台中市":[24.2,120.95],"台南市":[23.15,120.35],"高雄市":[22.98,120.62],"新北市":[24.95,121.55]};
  Object.keys(CL).forEach(function(n){var s=label(n,{size:40,color:"#c9d0ff",weight:700,scale:.5,order:5,k:.034});var p=CL[n];s.position.set(X(p[1]),.9,Z(p[0]));s.material.opacity=.8;scene.add(s);zl.push(s)});
  var tunnel=label("國道5號・雪山隧道",{size:34,color:"#9fb0ff",scale:.4,order:5,k:.026});tunnel.position.set(X(121.74),.85,Z(24.9));scene.add(tunnel);zl.push(tunnel);

  /* 輔大起點 */
  var O=V(25.0365,121.4319,.5);
  var oRing=new THREE.Mesh(new THREE.RingGeometry(.12,.17,48),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.6,side:THREE.DoubleSide,depthWrite:false}));
  oRing.rotation.x=-Math.PI/2;oRing.position.copy(O).setY(.53);scene.add(oRing);
  var oLabel=label("🎓 輔大出發",{size:44,bg:"rgba(255,255,255,.95)",color:"#0b1029",scale:.55,order:30});oLabel.center.set(.5,0);oLabel.position.copy(O).setY(.7);scene.add(oLabel);

  /* 路線緞帶（實際開車路線） */
  var routeMat=function(col){return new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    uniforms:{uT:{value:0},uC:{value:new THREE.Color(col)},uF:{value:0},uV:{value:1},uG:{value:0},uW:{value:.1}},
    vertexShader:"attribute float aU;attribute float aS;attribute vec2 aN;uniform float uW;varying float vU;varying float vS;void main(){vU=aU;vS=aS;vec3 p=position;p.xz+=aN*aS*uW;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",
    fragmentShader:"uniform float uT;uniform vec3 uC;uniform float uF;uniform float uV;uniform float uG;varying float vU;varying float vS;void main(){if(vU>uG)discard;float edge=1.-vS*vS;float dash=smoothstep(.0,.35,fract(vU*14.-uT*1.2))*smoothstep(1.,.65,fract(vU*14.-uT*1.2));float a=(.32+uF*(.4+.6*dash))*edge*uV;gl_FragColor=vec4(uC*(1.+uF*.6),a);}"
  })};
  function ribbon(pts,w){
    var n=pts.length,pos=new Float32Array(n*6),au=new Float32Array(n*2),as=new Float32Array(n*2),an=new Float32Array(n*4),idx=[],len=[0];
    for(var i=1;i<n;i++)len.push(len[i-1]+pts[i].distanceTo(pts[i-1]));var L=len[n-1]||1;
    for(i=0;i<n;i++){var a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];var dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;var nx=-dz/l,nz=dx/l;
      pos.set([pts[i].x,pts[i].y,pts[i].z,pts[i].x,pts[i].y,pts[i].z],i*6);an.set([nx,nz,nx,nz],i*4);au[i*2]=au[i*2+1]=len[i]/L;as[i*2]=-1;as[i*2+1]=1;
      if(i<n-1)idx.push(i*2,i*2+1,i*2+2,i*2+1,i*2+3,i*2+2)}
    var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("aU",new THREE.BufferAttribute(au,1));g.setAttribute("aS",new THREE.BufferAttribute(as,1));g.setAttribute("aN",new THREE.BufferAttribute(an,2));g.setIndex(idx);
    return{geo:g,len:len,L:L};
  }

  /* 地點圖釘（含避免重疊） */
  var N=DATA.length,pins=[];
  var rankOf={};["house","camp"].forEach(function(cat){var n=0;["A","B","C","D"].forEach(function(t){DATA.forEach(function(d){if(d.cat===cat&&d.tier===t)rankOf[d.idx]=++n})})});
  DATA.forEach(function(d,i){
    var cty=null;var trueP=V(d.lat,d.lng,0);
    var h=.5;var p={d:d,i:i,true:trueP,pos:trueP.clone(),vis:1,show:0,grow:0,delay:1.4+i*.06,phase:Math.random()*6.28};
    pins.push(p);
  });
  // 推開太近的圖釘（只動顯示位置，地面仍有細線指回真實位置）
  for(var it=0;it<80;it++){for(var a=0;a<N;a++)for(var b=a+1;b<N;b++){var A=pins[a].pos,B=pins[b].pos;var dx=B.x-A.x,dz=B.z-A.z,dd=Math.hypot(dx,dz),mn=.5;
    if(dd<mn){if(dd<1e-4){dx=Math.cos(a*2.4);dz=Math.sin(a*2.4);dd=1}var k=(mn-dd)/2/dd;A.x-=dx*k;A.z-=dz*k;B.x+=dx*k;B.z+=dz*k}}}
  var stemPos=new Float32Array(N*6),stemCol=new Float32Array(N*6),glowPos=new Float32Array(N*3),glowCol=new Float32Array(N*3);
  pins.forEach(function(p,i){
    var d=p.d;var col=new THREE.Color(T[d.tier].color);
    var mat=new THREE.SpriteMaterial({map:pinTex(d,rankOf[d.idx]),transparent:true,depthWrite:false,depthTest:true});
    var sp=new THREE.Sprite(mat);sp.center.set(.5,0);sp.renderOrder=10;sp.userData.idx=i;scene.add(sp);p.sprite=sp;
    stemCol.set([col.r,col.g,col.b,col.r,col.g,col.b],i*6);glowCol.set([col.r,col.g,col.b],i*3);
    glowPos.set([p.true.x,.52,p.true.z],i*3);
    // 路線
    if(d.route){var pts=d.route.map(function(q){return V(q[1],q[0],.56)});pts.push(new THREE.Vector3(p.true.x,.56,p.true.z));
      var rb=ribbon(pts,.035);var m=new THREE.Mesh(rb.geo,routeMat(T[d.tier].color));m.renderOrder=3;scene.add(m);p.route={mesh:m,pts:pts,len:rb.len,L:rb.L};}
    p.nameLabel=label(d.s,{size:40,bg:"rgba(11,16,41,.88)",border:T[d.tier].color,color:"#fff",scale:.36,order:25});p.nameLabel.center.set(.5,1.15);scene.add(p.nameLabel);
  });
  var stemGeo=new THREE.BufferGeometry();stemGeo.setAttribute("position",new THREE.BufferAttribute(stemPos,3));stemGeo.setAttribute("color",new THREE.BufferAttribute(stemCol,3));
  scene.add(new THREE.LineSegments(stemGeo,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.85})));
  var glowGeo=new THREE.BufferGeometry();glowGeo.setAttribute("position",new THREE.BufferAttribute(glowPos,3));glowGeo.setAttribute("color",new THREE.BufferAttribute(glowCol,3));
  var glowMat=new THREE.PointsMaterial({size:.5,map:dotTex(),vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  scene.add(new THREE.Points(glowGeo,glowMat));

  // 宜蘭群組氣泡（遠看時代替 17 個圖釘）
  var YI=pins.filter(function(p){return p.d.lng>121.55&&p.d.lat>24.45&&p.d.lat<25});
  var yc=new THREE.Vector3();YI.forEach(function(p){yc.add(p.true)});yc.multiplyScalar(1/YI.length);
  var cluster=label("宜蘭 "+YI.length+" 間 ▸",{size:46,bg:"rgba(245,196,81,.96)",color:"#221a00",scale:.75,order:28});cluster.center.set(0,.5);cluster.position.set(yc.x+.6,1.1,yc.z);scene.add(cluster);

  // 選取用：車子、時間標籤、脈衝圈
  var car=label("🚗",{size:60,pad:4,scale:.55,order:26});scene.add(car);car.visible=false;
  var timeLbl=label(" ",{size:40});scene.add(timeLbl);timeLbl.visible=false;
  var pulse=new THREE.Mesh(new THREE.RingGeometry(.1,.14,40),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));pulse.rotation.x=-Math.PI/2;scene.add(pulse);

  /* 星空與煙火 */
  (function(){var n=420,a=new Float32Array(n*3);for(var i=0;i<n;i++){var th=Math.random()*6.283,ph=Math.random()*1.2+.15,r=120;a.set([Math.cos(th)*Math.cos(ph)*r,Math.sin(ph)*r*.6+5,Math.sin(th)*Math.cos(ph)*r],i*3)}
    var g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(a,3));
    scene.add(new THREE.Points(g,new THREE.PointsMaterial({color:0xc9d0ff,size:1.1,map:dotTex(),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false})))})();
  var FW_N=6,FW_P=80,fwPos=new Float32Array(FW_N*FW_P*3),fwCol=new Float32Array(FW_N*FW_P*3),fwVel=new Float32Array(FW_N*FW_P*3),fwLife=new Float32Array(FW_N),fwBase=[];
  for(var k=0;k<FW_N;k++)fwBase.push(new THREE.Color());
  var fwGeo=new THREE.BufferGeometry();fwGeo.setAttribute("position",new THREE.BufferAttribute(fwPos,3));fwGeo.setAttribute("color",new THREE.BufferAttribute(fwCol,3));
  var fwMat=new THREE.PointsMaterial({size:.5,map:dotTex(),vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  var fw=new THREE.Points(fwGeo,fwMat);fw.frustumCulled=false;scene.add(fw);
  var fwNext=0,PAL=[0xf5c451,0xff6b5a,0x4fd6c4,0xffffff,0xff9bd2,0x9bb5ff];

  /* 鏡頭 */
  var cur={yaw:0,pitch:1.45,dist:120,tx:X(121),tz:Z(23.9)};
  var REG={
    all:function(){return{yaw:-.12,pitch:1.02,dist:cam.aspect<.8?62:46,tx:X(120.95),tz:Z(23.95)}},
    yilan:function(){return{yaw:-.3,pitch:.92,dist:cam.aspect<.8?9:7,tx:X(121.735),tz:Z(24.72)}},
    north:function(){return{yaw:-.2,pitch:.95,dist:cam.aspect<.8?11:8.5,tx:X(121.27),tz:Z(24.91)}},
    south:function(){return{yaw:-.1,pitch:.95,dist:cam.aspect<.8?27:20,tx:X(120.45),tz:Z(23.25)}}
  };
  var from=null,goal=REG.all(),tween=0,tweenDur=3.2,base={yaw:goal.yaw};
  function flyTo(g,dur){from=Object.assign({},cur);goal=g;tween=0;tweenDur=reduce?.01:(dur||1.4);base.yaw=g.yaw}
  flyTo(REG.all(),3.2);
  function place(){var cp=Math.cos(cur.pitch);
    cam.position.set(cur.tx+cur.dist*Math.sin(cur.yaw)*cp,.5+cur.dist*Math.sin(cur.pitch),cur.tz+cur.dist*Math.cos(cur.yaw)*cp);
    cam.lookAt(cur.tx,.5,cur.tz)}

  var focused=-1,catShow="house",regionNow="all",lastInput=0,sway=0;
  map.region=function(r){regionNow=r;setRegionBtn(r);focused=-1;closeSheet();flyTo(REG[r](),1.6);
    tag.innerHTML='<b>'+{all:"🗺️ 全台總覽",yilan:"🌾 宜蘭：大部分包棟都在這",north:"🏞️ 桃竹：車程最短",south:"☀️ 中南部：車程 2–4 小時"}[r]+'</b><span class="hint">點圖釘看詳情</span>'};
  map.focus=function(idx,fromCard){
    if(idx<0){focused=-1;return}
    var p=pins[idx];if(!p)return;focused=idx;lastInput=performance.now();
    if(p.d.cat!==catShow){catShow=p.d.cat}
    var close=cam.aspect<.8?4.2:3.4;
    flyTo({yaw:cur.yaw+(Math.abs(cur.yaw-base.yaw)>.6?0:.15),pitch:.78,dist:close,tx:p.pos.x,tz:p.pos.z+close*.13},1.5);
    setRegionBtn("");
    var d=p.d;
    tag.innerHTML='<b style="color:'+T[d.tier].color+'">'+ICON[d.tier]+" "+esc(d.s)+'</b><span class="hint">輔大出發約 '+dur(d.mins)+"（不塞車）· "+d.km+" 公里</span>";
    timeLbl.material.map.dispose();scene.remove(timeLbl);
    timeLbl=label("🚗 "+dur(d.mins),{size:40,bg:"rgba(255,255,255,.95)",color:"#0b1029",scale:.42,order:27});timeLbl.center.set(.5,0);scene.add(timeLbl);
    if(p.route){var mid=p.route.pts[Math.floor(p.route.pts.length*.55)];timeLbl.position.set(mid.x,.75,mid.z)}
    openSheet(d);
  };
  map.filter=function(cat){catShow=cat;focused=-1;closeSheet();map.region("all")};

  /* 觸控：單指旋轉、兩指縮放、點擊選取 */
  var pts={},down=null,pinch=0,el=renderer.domElement,ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
  el.addEventListener("pointerdown",function(e){pts[e.pointerId]={x:e.clientX,y:e.clientY};down={x:e.clientX,y:e.clientY,t:performance.now(),moved:0};lastInput=performance.now();if(tween<1&&tween>.05)tween=1;
    var ids=Object.keys(pts);if(ids.length===2){var a=pts[ids[0]],b=pts[ids[1]];pinch=Math.hypot(a.x-b.x,a.y-b.y)}});
  el.addEventListener("pointermove",function(e){var p=pts[e.pointerId];if(!p)return;var ids=Object.keys(pts);
    if(ids.length===2){p.x=e.clientX;p.y=e.clientY;var a=pts[ids[0]],b=pts[ids[1]],d=Math.hypot(a.x-b.x,a.y-b.y);if(pinch){cur.dist=Math.min(140,Math.max(2.4,cur.dist*pinch/d));goal.dist=cur.dist}pinch=d;down&&(down.moved=99);return}
    var dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;if(down)down.moved+=Math.abs(dx)+Math.abs(dy);
    cur.yaw-=dx*.006;base.yaw=cur.yaw;if(e.pointerType==="mouse"||Math.abs(dy)>Math.abs(dx)*1.5&&e.pointerType!=="touch")cur.pitch=Math.min(1.4,Math.max(.45,cur.pitch+dy*.005));
    tween=1;lastInput=performance.now()});
  function up(e){var wasTap=down&&down.moved<8&&performance.now()-down.t<400&&Object.keys(pts).length===1;delete pts[e.pointerId];if(Object.keys(pts).length<2)pinch=0;
    if(wasTap){var r=el.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(ndc,cam);
      var cand=pins.filter(function(p){return p.sprite.visible&&p.sprite.material.opacity>.3}).map(function(p){return p.sprite});if(cluster.visible&&cluster.material.opacity>.3)cand.push(cluster);
      var hit=ray.intersectObjects(cand,false)[0];
      if(hit){if(hit.object===cluster)map.region("yilan");else map.focus(hit.object.userData.idx)}}
    down=null}
  el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);el.addEventListener("pointerleave",function(e){if(e.pointerType==="mouse")up(e)});
  el.addEventListener("wheel",function(e){e.preventDefault();cur.dist=Math.min(140,Math.max(2.4,cur.dist*(1+e.deltaY*.0012)));goal.dist=cur.dist;tween=1;lastInput=performance.now()},{passive:false});

  /* 播放控制：看不到就暫停 */
  var visible=true,running=false;
  if("IntersectionObserver" in window)new IntersectionObserver(function(en){visible=en[0].isIntersecting;if(visible)kick()}).observe(stage);
  document.addEventListener("visibilitychange",function(){if(!document.hidden)kick()});
  function kick(){if(!running){running=true;last=performance.now();requestAnimationFrame(loop)}}

  var t0=performance.now(),last=t0,fwTimer=1.5,fpsT=0,fpsN=0,checks=0;
  var loadEl=document.getElementById("loading");loadEl.style.opacity=0;
  var tmp=new THREE.Vector3();
  function loop(now){
    if(!visible||document.hidden){running=false;return}
    var dt=Math.min(.05,(now-last)/1000);last=now;var t=(now-t0)/1000;
    // 自動畫質
    if(checks<4){fpsT+=dt;fpsN++;if(fpsT>1.2){var fps=fpsN/fpsT;fpsT=fpsN=0;checks++;if(fps<45&&pr>1){pr=Math.max(1,pr-.35);renderer.setPixelRatio(pr);resize()}}}
    // 鏡頭動畫
    if(tween<1){tween=Math.min(1,tween+dt/tweenDur);var e=ease(tween);for(var key in goal)cur[key]=from[key]+(goal[key]-from[key])*e}
    else if(!reduce&&now-lastInput>5000){sway+=dt*.25;cur.yaw=base.yaw+Math.sin(sway)*.18}
    place();
    var far=cur.dist>18,zoom=cur.dist;
    // 圖釘
    var s=Math.max(.18,zoom*.07);
    for(var i=0;i<N;i++){var p=pins[i];var inCat=p.d.cat===catShow;var isY=YI.indexOf(p)>=0;
      var want=inCat&&!(far&&isY&&focused!==i)?1:0;p.show+=(want-p.show)*Math.min(1,dt*7);
      p.grow=reduce?1:Math.min(1,Math.max(0,(t-p.delay)/.7));var g=easeBack(p.grow);
      var sel=i===focused;var bob=.04*Math.sin(t*2.2+p.phase);
      var sc=s*(sel?1.35:1)*g*(.6+.4*p.show);
      p.sprite.scale.set(sc*.8,sc,1);p.sprite.position.set(p.pos.x,.6+.25*s+bob*s,p.pos.z);
      p.sprite.material.opacity=Math.min(1,p.show*1.2)*Math.min(1,g*1.5);p.sprite.visible=p.show>.02;
      p.sprite.renderOrder=sel?15:10;
      stemPos.set([p.true.x,.52,p.true.z,p.pos.x,p.sprite.position.y,p.pos.z],i*6);
      if(p.show<.05){stemPos[i*6+4]=.52}
      glowPos[i*3+1]=p.show>.05?.53:-9;
      // 名稱：近看或選取時才出現
      var showName=sel?1:0;
      p.nameLabel.material.opacity+=(showName-p.nameLabel.material.opacity)*Math.min(1,dt*6);p.nameLabel.visible=p.nameLabel.material.opacity>.02;
      var lh=zoom*.045;p.nameLabel.scale.set(lh*p.nameLabel.userData.aspect,lh,1);p.nameLabel.position.copy(p.sprite.position);
      // 路線
      if(p.route){var u=p.route.mesh.material.uniforms;u.uT.value=t;var fT=sel?1:0;u.uF.value+=(fT-u.uF.value)*Math.min(1,dt*5);
        u.uV.value+=(((focused<0?(inCat?1:.15):(sel?1:.25)))-u.uV.value)*Math.min(1,dt*4);
        u.uW.value=zoom*.0042*(1+u.uF.value*.9);u.uG.value=reduce?1:Math.min(1,Math.max(0,(t-.8-i*.04)/1.6))}
    }
    stemGeo.attributes.position.needsUpdate=true;glowGeo.attributes.position.needsUpdate=true;
    glowMat.size=zoom*.05;zl.forEach(function(z){var h=zoom*z.userData.k;z.scale.set(h*z.userData.aspect,h,1)});
    cluster.material.opacity+=(((far&&catShow==="house"&&focused<0)?1:0)-cluster.material.opacity)*Math.min(1,dt*6);cluster.visible=cluster.material.opacity>.02;
    var cs=zoom*.05*(1+.04*Math.sin(t*3));cluster.scale.set(cs*cluster.userData.aspect,cs,1);
    // 選取：車子沿路開、脈衝圈
    if(focused>=0&&pins[focused].route){var r=pins[focused].route;var ct=(t*.12)%1,target=ct*r.L,j=1;while(j<r.len.length-1&&r.len[j]<target)j++;
      var a1=r.pts[j-1],b1=r.pts[j],f=(target-r.len[j-1])/((r.len[j]-r.len[j-1])||1);tmp.copy(a1).lerp(b1,f);
      car.visible=true;car.position.set(tmp.x,.72,tmp.z);var csz=zoom*.06;car.scale.set(csz,csz,1);
      timeLbl.visible=true;var tsz=zoom*.045;timeLbl.scale.set(tsz*timeLbl.userData.aspect,tsz,1);
      var pf=(t*.9)%1,ps=(1+pf*4)*zoom*.06;pulse.scale.set(ps,ps,ps);pulse.position.set(pins[focused].true.x,.54,pins[focused].true.z);pulse.material.opacity=.85*(1-pf);pulse.material.color.set(T[pins[focused].d.tier].color)}
    else{car.visible=false;timeLbl.visible=false;pulse.material.opacity=0}
    // 起點
    var of=(t*.7)%1,os=(1+of*3)*zoom*.05;oRing.scale.set(os,os,os);oRing.material.opacity=.7*(1-of);
    var lsz=zoom*.045;oLabel.scale.set(lsz*oLabel.userData.aspect,lsz,1);
    ocean.material.uniforms.uT.value=t;
    // 煙火：在鏡頭看出去的天空
    if(!reduce){fwTimer-=dt;if(fwTimer<=0&&t>2){fwTimer=.7+Math.random()*1.1;
      var kk=fwNext;fwNext=(fwNext+1)%FW_N;fwLife[kk]=1;fwBase[kk].set(PAL[(Math.random()*PAL.length)|0]);
      var fx=cam.position.x-cur.tx,fz=cam.position.z-cur.tz,fl=Math.hypot(fx,fz)||1;var bx=cur.tx-fx/fl*zoom*.9,bz=cur.tz-fz/fl*zoom*.9;
      var side=(Math.random()-.5)*zoom*1.1,cx=bx+(-fz/fl)*side,cz=bz+(fx/fl)*side,cy=.5+zoom*(.45+Math.random()*.3),sp0=zoom*.006;
      for(var q=0;q<FW_P;q++){var ii=(kk*FW_P+q)*3;fwPos[ii]=cx;fwPos[ii+1]=cy;fwPos[ii+2]=cz;var uu=Math.random()*2-1,th=Math.random()*6.283,ss=Math.sqrt(1-uu*uu),sp=sp0*(1+Math.random()*.6);fwVel[ii]=ss*Math.cos(th)*sp;fwVel[ii+1]=uu*sp;fwVel[ii+2]=ss*Math.sin(th)*sp}}}
    var grav=zoom*.00012;
    for(var k2=0;k2<FW_N;k2++){var L=fwLife[k2];if(L<=0)continue;L=Math.max(0,L-dt*.55);fwLife[k2]=L;var bc=fwBase[k2],ff=L*L*(L<.15?L/.15:1);
      for(var q2=0;q2<FW_P;q2++){var i3=(k2*FW_P+q2)*3;fwVel[i3+1]-=grav;fwVel[i3]*=.984;fwVel[i3+1]*=.984;fwVel[i3+2]*=.984;fwPos[i3]+=fwVel[i3];fwPos[i3+1]+=fwVel[i3+1];fwPos[i3+2]+=fwVel[i3+2];fwCol[i3]=bc.r*ff;fwCol[i3+1]=bc.g*ff;fwCol[i3+2]=bc.b*ff}}
    fwGeo.attributes.position.needsUpdate=true;fwGeo.attributes.color.needsUpdate=true;fwMat.size=zoom*.016;
    renderer.render(scene,cam);requestAnimationFrame(loop);
  }
  kick();
}catch(err){
  var le=document.getElementById("loading");if(le)le.textContent="這台裝置無法顯示 3D 地圖，下方清單仍可正常使用。";
  if(window.console)console.error(err);
}
})();
