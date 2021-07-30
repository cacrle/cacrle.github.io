//基础对象
class MyItem{
    constructor(id,imgs,x=0,y=0,w=0,h=0){
        this.id=id;
        this.imgs=imgs;
        this.x1=x;
        this.y1=y;
        this.w=w;
        this.h=h;
        this.x2=x+w;
        this.y2=y+h;
    }

}
//小车对象
class DynCar extends MyItem{
    //id:标记名
    //imgs:图片对象集[][]
    constructor(id,imgs,x=0,y=0,w=0,h=0) {
        super(id,imgs,x=0,y=0,w=0,h=0);
        this.directionNum=0;
    }
    directionNum=0;

    //小车位置初始化
    IniCar(){
        this.w=120;
        this.h=110;
        this.x=100-this.w*0.5;
        this.y=298-this.h*0.75;
        ImgDraw(this.imgs[0][0],"none","none","none",this.x,this.y,this.w,this.h);
    }

    //小车执行动作
    //RunId:执行动作序号
    async run(RunId){
        switch (RunId){
            case 1:
                //执行直行1
                this.CarMove();
                break;
            case 2:
                //执行左转2
                this.directionNum+=1;
                DoLoad();
                if(this.directionNum%4==0||this.directionNum%4==2){
                    this.x=this.x+this.w*0.9-this.w*0.5;
                    this.y=this.y+this.h*0.5-this.h*0.75;
                }
                else if(this.directionNum%4==1||this.directionNum%4==3){
                    this.x=this.x+this.w*0.5-this.w*0.9;
                    this.y=this.y+this.h*0.75-this.h*0.5;
                }
                ImgDraw(this.imgs[0][this.directionNum%4],"none","none","none",this.x,this.y,this.w,this.h);
                break;
            case 3:
                //执行右转3
                this.directionNum-=1;
                if(this.directionNum<0){
                    this.directionNum+=4;
                }
                DoLoad();
                if(this.directionNum%4==0||this.directionNum%4==2){
                    this.x=this.x+this.w*0.9-this.w*0.5;
                    this.y=this.y+this.h*0.5-this.h*0.75;
                }
                else if(this.directionNum%4==1||this.directionNum%4==3){
                    this.x=this.x+this.w*0.5-this.w*0.9;
                    this.y=this.y+this.h*0.75-this.h*0.5;
                }
                ImgDraw(this.imgs[0][this.directionNum%4],"none","none","none",this.x,this.y,this.w,this.h);
                break;
            case 4:
                //执行喷水4
                if(this.directionNum%4==0) {
                    this.y-=10;
                    this.h+=10;
                    this.w+=58;
                    for (let i=0;i<5;i++){
                        for (let j=0;j<5;j++){
                            DoLoad();
                            ImgDraw(this.imgs[2][j], "none", "none", "none", this.x, this.y, this.w, this.h);
                            await sleep(100);
                        }
                    }
                    //喷水完成
                    //还原
                    this.y+=10;
                    this.h-=10;
                    this.w-=58;
                    DoLoad();
                    this.Draw();
                    await sleep(500);
                    ImgDraw("none","red","none","none",this.x+this.w+58-40,this.y+(this.h+10)/4-10-40,80,80);
                    ImgDraw("none","blue","none","none",fire.x,fire.y,fire.w,fire.h);
                    if(Math.abs(fire.x+fire.w/2-(this.x+this.w+58))<50 && Math.abs(fire.y+fire.h/2-(this.y+(this.h+10)/4-10))<50){
                        showSuccess();
                    }
                    else{
                        if(confirm("灭火失败，请重新开始！")){
                            Redo();
                        }
                    }
                }
                //外部判断是否灭火
                break;
            case 5:
                //抽水5
                this.IniCar();
                for (let i=0;i<5;i++){
                    for (let j=0;j<7;j++){
                        DoLoad();
                        ImgDraw(this.imgs[1][j], "none", "none", "none", this.x, this.y, this.w, this.h);
                        await sleep(100);
                    }
                }
                DoLoad();
                this.IniCar();
                break;
            case 6:
                //执行警报6
                if(bAudio){
                    autoPlay();
                    bAudio=!bAudio;
                }
                else{
                    pausePlay();
                    bAudio=!bAudio;
                }
                break;
        }
    }

    //绘制
    Draw(){
        ImgDraw(this.imgs[0][0],"none","none","none",this.x, this.y, this.w, this.h);
    }

    //小车移动操作
    CarMove(){
        let direction=this.directionNum%4;
        let count=0;
        let inv=setInterval(()=>{
            DoLoad();
            switch(direction){
                case 0://右移
                    this.x+=6;
                    ImgDraw(this.imgs[0][0],"none","none","none",this.x,this.y,this.w,this.h);
                    break;
                case 1://上移
                    this.y-=6;
                    ImgDraw(this.imgs[0][1],"none","none","none",this.x,this.y,this.w,this.h);
                    break;
                case 2://左移
                    this.x-=6;
                    ImgDraw(this.imgs[0][2],"none","none","none",this.x,this.y,this.w,this.h);
                    break;
                case 3://下移
                    this.y+=6;
                    ImgDraw(this.imgs[0][3],"none","none","none",this.x,this.y,this.w,this.h);
                    break;
            }
            // alert(count);
            // alert(direction);
            count++;
            if(count==10){
                window.clearInterval(inv);
            }
        },100);
    }
}

//火种类
class DynFire extends MyItem{
    constructor(id,imgs,x=0,y=0,w=0,h=0) {
        super(id,imgs,x=0,y=0,w=0,h=0);

        this.RandomLocation();
        this.w=40;
        this.h=64;
    }

    //生成随机位置
    RandomLocation(){
        let rdx=0;
        let rdy=0;
        let b=true;
        while(b){
            rdx=Math.floor(Math.random()*9);
            rdy=Math.floor(Math.random()*4);
            b=(rdx==0&&rdy==1);
            if(!b){
                if(rdx==5){
                    if(rdy==1||rdy==2||rdy==3){
                        b=true;
                    }
                }
                else if(rdx==6){
                    if(rdy==1||rdy==2||rdy==3){
                        b=true;
                    }
                }
            }
        }
        this.x=rdx*120+90-this.w/2;
        this.y=rdy*120+78;
    };

    Draw(bFire){
        if(bFire){
            ImgDraw(this.imgs,"none","none","none",this.x,this.y,this.w,this.h);
        }
    }
}

//按钮类
class ConBtn extends MyItem{
    constructor(id,imgs,x,y,w,h) {
        super(id,imgs,x,y,w,h);
    }
}

//线程暂停sleep
//time:时间ms
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}