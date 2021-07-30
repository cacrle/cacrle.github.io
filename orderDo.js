/*region 全局变量*/
//绘图对象
var cav=document.getElementById("cav");
//绘图上下文
var ctx=cav.getContext("2d");
//点击对象集
var clickItems=[];
//对象块宽度
var itemWidth=50;
//对象间隔
var itemHDis=69;
//对象块上方位置
var itemTop=598;
//对象块上下间距
var itemDis=0;
//interId
var inv;
//格网初始左上角x
var gridx=10;
//格网初始左上角y
var gridy=40;
//格网宽度
var gridWidth=12;
//是否绘制火种
var bFire=true;
//是否播放音效
var bAudio=true;
/*region 图片缓存加载*/
var images=["map1_12.png","add.png","gostraight.png","turnleft.png","turnRight.png","喷水2.png","抽水.png"
    ,"警报.jpg","Mapoption.png","car1.png","fresh.png","run.png","火.png","完成.png"];
for (let i=0;i<images.length;i++){
    images[i]="Image/"+images[i];
}
var imagesCount=images.length;
var imageTruck=["FireTruckL.png","FireTruckU.png","FireTruckR.png","FireTruckD.png","ChouShui01.png"
    ,"ChouShui02.png","ChouShui03.png","ChouShui04.png","ChouShui05.png","ChouShui06.png","ChouShui07.png"
    ,"PSL01.png","PSL02.png","PSL03.png","PSL04.png","PSL05.png"];
for (let i=0;i<imageTruck.length;i++){
    imageTruck[i]="Image/FireFightingTruck/"+imageTruck[i];
}
imagesCount+=imageTruck.length-4;
let imgForm = new Image();
ImgLoad(imgForm,images[0]);
let imggostraight = new Image();
ImgLoad(imggostraight,images[2]);
let imgturnleft = new Image();
ImgLoad(imgturnleft,images[3]);
let imgturnRight = new Image();
ImgLoad(imgturnRight,images[4]);
let imgPen = new Image();
ImgLoad(imgPen,images[5]);
let imgChou = new Image();
ImgLoad(imgChou,images[6]);
let imgWarn = new Image();
ImgLoad(imgWarn,images[7]);
let imgfresh = new Image();
ImgLoad(imgfresh,images[10]);
let imgFire = new Image();
ImgLoad(imgFire,images[12]);
let imgSuccess = new Image();
ImgLoad(imgSuccess,images[13]);
let imgFireTruckL = new Image();
ImgLoad(imgFireTruckL,imageTruck[0]);
let imgFireTruckU = new Image();
ImgLoad(imgFireTruckU,imageTruck[1]);
let imgFireTruckR = new Image();
ImgLoad(imgFireTruckR,imageTruck[2]);
let imgFireTruckD = new Image();
ImgLoad(imgFireTruckD,imageTruck[3]);
let ChouShui01 = new Image();
ImgLoad(ChouShui01,imageTruck[4]);
let ChouShui02 = new Image();
ImgLoad(ChouShui02,imageTruck[5]);
let ChouShui03 = new Image();
ImgLoad(ChouShui03,imageTruck[6]);
let ChouShui04 = new Image();
ImgLoad(ChouShui04,imageTruck[7]);
let ChouShui05 = new Image();
ImgLoad(ChouShui05,imageTruck[8]);
let ChouShui06 = new Image();
ImgLoad(ChouShui06,imageTruck[9]);
let ChouShui07 = new Image();
ImgLoad(ChouShui07,imageTruck[10]);
let PSL01 = new Image();
ImgLoad(PSL01,imageTruck[11]);
let PSL02 = new Image();
ImgLoad(PSL02,imageTruck[12]);
let PSL03 = new Image();
ImgLoad(PSL03,imageTruck[13]);
let PSL04 = new Image();
ImgLoad(PSL04,imageTruck[14]);
let PSL05 = new Image();
ImgLoad(PSL05,imageTruck[15]);
let CarDirection=[imgFireTruckL,imgFireTruckU,imgFireTruckR,imgFireTruckD];
let ChouShui=[ChouShui01,ChouShui02,ChouShui03,ChouShui04,ChouShui05,ChouShui06,ChouShui07];
let PSL=[PSL01,PSL02,PSL03,PSL04,PSL05];
let Truck=[CarDirection,ChouShui,PSL];
//小车对象
var car=new DynCar("car",Truck);
//火种对象
var fire=new DynFire("fire",imgFire);
/*endregion*/
/*endregion*/

/*region 事件操作*/
//图像加载
function ImgLoad(imgName,imageAddress){
    imgName.src = imageAddress;
    let varTimer = setInterval(() => {
        if (imgName.complete) {
            clearInterval(varTimer);
            imagesCount--;
        }
    }, 50);
}

//图像绘制
function ImgDraw(imgName,borderColor,itemType,itemId,x,y,w,h){
    if(borderColor!="none"){
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(x, y, w, h);
    }
    if(imgName!="none"){
        ctx.drawImage(imgName, x, y, w, h);
        switch (itemType){
            case "ConBtn":
                clickItems.push(new ConBtn(itemId, imgName, x, y, w, h));
                break;
            case "MyItem":
                clickItems.push(new MyItem(itemId, imgName, x, y, w, h));
                break;
        }
    }
}

//加载初始化
function DoLoad() {
    ctx.clearRect(0, 0, cav.width, cav.height);
    ctx.lineWidth=1;
    //显示主图
    ImgDraw(imgForm,"none","none","form",0,0,cav.width,588);
    //指令部分
    ImgDraw(imgfresh,"blue","ConBtn","run3",10 + itemHDis * 4, itemTop+itemDis, itemWidth, itemWidth);
    ImgDraw(imggostraight,"blue","ConBtn","opt2",10 + itemHDis * 5, itemTop+itemDis, itemWidth, itemWidth);
    ImgDraw(imgturnleft,"blue","ConBtn","opt3",10 + itemHDis * 6, itemTop+itemDis, itemWidth, itemWidth);
    ImgDraw(imgturnRight,"blue","ConBtn","opt4",10 + itemHDis *7, itemTop+itemDis, itemWidth, itemWidth);
    ImgDraw(imgPen,"blue","ConBtn","opt5",10 + itemHDis * 8, itemTop+itemDis, itemWidth, itemWidth);
    ImgDraw(imgChou,"blue","ConBtn","opt6",10 + itemHDis * 9, itemTop+itemDis, itemWidth, itemWidth);
    ImgDraw(imgWarn,"blue","ConBtn","opt7",10 + itemHDis * 10, itemTop+itemDis, itemWidth, itemWidth);

    /*显示火种*/
    fire.Draw(bFire);
}

//鼠标点击响应
function cavForm_onMousedown(e) {
    // 取得画布上被单击的点
    var clickX = e.pageX - cav.offsetLeft;
    var clickY = e.pageY - cav.offsetTop;

    // 查找被单击的对象
    for (let i = 0; i < clickItems.length; i++) {
        let clickItem = clickItems[i];
        let ifInner = clickX > clickItem.x1 && clickX < clickItem.x2 && clickY > clickItem.y1 && clickY < clickItem.y2;
        // 判断这个点是否在矩形对象中
        if (ifInner) {
            switch(clickItem.id)
            {
                case "opt1":
                    car.IniCar();
                    break;
                case "opt2":
                    car.run(1);
                    break;
                case "opt3":
                    car.run(2);
                    break;
                case "opt4":
                    car.run(3);
                    break;
                case "opt5":
                    car.run(4);
                    break;
                case "opt6":
                    car.run(5);
                    break;
                case "opt7":
                    car.run(6);
                    break;
                    break;
                case "run3":
                    Redo();
                    break;
                case "success":
                    window.clearInterval(inv);
                    Redo();
                    break;
            }
            break;
        }
    }
}

//初始化
function Redo(){
    window.clearInterval(inv);
    fire.RandomLocation();
    //结束成功显示
    bFire=true;
    DoLoad();
    car.IniCar();
}

//成功提示
function showSuccess() {
    let w = 200;
    let pos = 0;
    let cha = 0;
    let inter = 5;
    window.clearInterval(inv);
    inv = setInterval(frame, 200);

    function frame() {
        if (pos == 40) {
            inter = -5;
        }
        else if (pos == 0) {
            inter = 5;
        }
        pos += inter;
        cha = pos;
        bFire=false;
        DoLoad();
        car.Draw();
        ImgDraw(imgSuccess,"none","MyItem","success",1200 / 2 - w / 2-cha/2, 600 / 2 - w / 2-cha/2, w+cha, w+cha);
    }
}

//自动播放
function autoPlay(){
    var myAuto = document.getElementById('myaudio');
    myAuto.play();
}

//暂停播放
function pausePlay(){
    var myAuto = document.getElementById('myaudio');
    myAuto.pause();
}
/*endregion*/

//region 事件交互
cav.onmousedown=cavForm_onMousedown;
//endregion

//region 程序运行
var run=function (){

    let varTimer = setInterval(() => {
        // alert(imagesCount);
        if (imagesCount==0) {
            // alert("do");
            clearInterval(varTimer);
            DoLoad();
            car.IniCar();
            fire.Draw(true);
        }
    }, 50);
}();
//endregion
