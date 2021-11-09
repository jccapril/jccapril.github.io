(function () {
    'use strict';

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-28 18:22
    */
    class GunController extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:btn_Left, tips:"提示文本", type:Node, default:null}*/
            this.btn_Left=null;
            /** @prop {name:btn_Right, tips:"提示文本", type:Node, default:null}*/
            this.btn_Right=null;
            /** @prop {name:txt_BallType, tips:"提示文本", type:Node, default:null}*/
            this.txt_BallType=null;
            /** @prop {name:BallCount, tips:"提示文本", type:Node, default:null}*/
            this.BallCount=null;
            /** @prop {name:txt_Hint, tips:"提示文本", type:Node, default:null}*/
            this.txt_Hint=null;
            /** @prop {name:txt_BallCount, tips:"提示文本", type:Node, default:null}*/
            this.txt_BallCount=null;
            /** @prop {name:btn_Add, tips:"提示文本", type:Node, default:null}*/
            this.btn_Add=null;

            //发射球的类型
            //0小球 1强力球 2闪电球
            this.ballType=0;
            this.ballUrlArr=["UI/ball.png","UI/qlq.png","UI/sdq.png"];
            this.ballTextArr=["小球","强力球","闪电球"];
            this.colorArr=["#a1a1a1","#db54e7","#eadc38"];
            //强力球和闪电球的数量
            this.ballCountArr=[1000,1000];
        }
        //减少强力球和闪电球的数量
        reduceBallCount(){
            if(this.ballType==0)return;
            this.txt_BallCount.text=--this.ballCountArr[this.ballType-1];
        }
        //增加强力球和闪电球的数量
        addBallCount(count){
            if(this.ballType==0)return;
            this.ballCountArr[this.ballType-1]+=count;
            this.txt_BallCount.text=this.ballCountArr[this.ballType-1];
        }
        //隐藏左右切换的按钮
        IsShowChangeBtn(isShow){
            this.btn_Left.visible=isShow;
            this.btn_Right.visible=isShow;
        }

        onClose(){
            var data="";
            for(var i=0;i<this.ballCountArr.length;i++){
                if(i!=this.ballCountArr.length-1){
                    data+=this.ballCountArr[i]+",";
                }
                else{
                    data+=this.ballCountArr[i];
                }
            }
            Laya.LocalStorage.setItem("BallCount",data);
        }
        onAwake() {
            //监听浏览器关闭的事件码
            Laya.stage.on(Laya.Event.BLUR,this,this.onClose);

            //从本地读取储存的球数量
            var data=Laya.LocalStorage.getItem("BallCount");
            if(data!=null){
                var dataArr=data.split(',');
                for(var i=0;i<dataArr.length;i++){
                    this.ballCountArr[i]=Number.parseInt(dataArr[i]);
                }
            }

            this.sp_Ball=this.owner.getChildByName("gun").getChildByName("sp_Ball");
            this.btn_Left.on(Laya.Event.CLICK,this,function(){
                this.ballType--;
                if(this.ballType<0){
                    this.ballType=2;
                }
                this.changeBallType();
            });
            this.btn_Right.on(Laya.Event.CLICK,this,function(){
                this.ballType++;
                if(this.ballType>2){
                    this.ballType=0;
                }
                this.changeBallType();
            });

            //增加球按钮点击
            this.btn_Add.on(Laya.Event.CLICK,this,function(){
                Laya.stage.event("ShowAddBallPanel");
            });
        }
        changeBallType(){
            if(this.ballType>0){
                //显示当前球类型对应的球数量
                this.txt_BallCount.text=this.ballCountArr[this.ballType-1];
                
                this.BallCount.visible=true;
                this.txt_Hint.visible=true;
                if(this.ballType==1){
                    this.txt_Hint.text="每球拥有3点威力";
                }
                else if(this.ballType==2){
                    this.txt_Hint.text="造成2点消行威力";
                }
            }else{
                this.BallCount.visible=false;
                this.txt_Hint.visible=false;
            }
            this.sp_Ball.texture=this.ballUrlArr[this.ballType];
            this.txt_BallType.text=this.ballTextArr[this.ballType];
            this.txt_BallType.color=this.colorArr[this.ballType];
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-30 10:56
    */
    let rewardedVideoAd=null;
    class AddBallPanel extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:btn_Cancel, tips:"提示文本", type:Node, default:null}*/
            this.btn_Cancel=null;
            /** @prop {name:btn_Ok, tips:"提示文本", type:Node, default:null}*/
            this.btn_Ok=null;

            this.gunController=null;
        }

        onAwake() {
            if(Laya.Browser.onWeiXin){
                rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-35b1ba8db683ea59' });
                rewardedVideoAd.onError(err => {
                    console.log(err);
                });
                rewardedVideoAd.onLoad(() => {
                    console.log('激励视频 广告加载成功');
                });
                rewardedVideoAd.onClose(res => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if (res && res.isEnded || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        //监听激励视频广告的回调，判断用户是否获得奖励
                        //增加一定量的球，并且隐藏界面
                        this.owner.visible=false;
                        this.gunController.addBallCount(100);
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                    }
        
                    rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-35b1ba8db683ea59' });
                });
            }

            Laya.stage.on("ShowAddBallPanel",this,this.show);

            this.btn_Cancel.on(Laya.Event.CLICK,this,function(){
                this.owner.visible=false;
            });
            this.btn_Ok.on(Laya.Event.CLICK,this,function(){
                if(Laya.Browser.onWeiXin){
                    //加载激励视频广告
                    rewardedVideoAd.show().catch(err => {
                        rewardedVideoAd.load()
                        .then(() => rewardedVideoAd.show());
                    });
                }
                this.gunController.addBallCount(100);
            });

            this.gunController=this.owner.parent.getChildByName("gun").getComponent(GunController);
        }
        onDestroy(){
            Laya.stage.off("ShowAddBallPanel",this,this.show);
        }
        show(){
            this.owner.visible=true;
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-25 18:57
    */
    class Jia extends Laya.Script {

        constructor() {
            super();
            this.rowId=0;
        }
        Init(rowId){
            this.rowId=rowId;
        }
        onTriggerEnter(other){
            if(other.owner.name=="ball"){
                Laya.stage.event("AddShootCount");
                this.recover();
            }
        }
        recover(){
            this.owner.visible=false;
            this.owner.active=false;
            Laya.Pool.recover("Jia",this.owner);
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-24 17:18
    */
    class Ball extends Laya.Script {

        constructor() {
            super();

            this.rig=null;

            this.damage=1;
            this.isDamageRow=false;
        }
        onAwake(){
            this.rig=this.owner.getComponent(Laya.RigidBody);
        }
        onUpdate(){
            if(this.rig.linearVelocity.y<-20){
                var velocity=this.rig.linearVelocity;
                this.rig.linearVelocity={x:velocity.x*0.8,y:velocity.y*0.8};
            }
        }
        onTriggerEnter(other){
            if(other.owner==null)return;
            if(other.owner.name=="left1"){
                this.recoverAni(50);
            }
            if(other.owner.name=="right1"){
                this.recoverAni(1030);
            }
        }
        onTriggerExit(other){
            if(other.owner==null)return;
            if(other.owner.name=="recover_Left"){
                this.recoverAni(50);
            }
            if(other.owner.name=="recover_Right"){
                this.recoverAni(1030);
            }
            if(other.owner.name=="recover_Bottom"){
                var value=Math.random();
                if(value<=0.5){
                    this.owner.pos(270,340);
                }else{
                    this.owner.pos(810,340);
                }
            }
        } 
        recoverAni(targetX){
            if(this.rig.type=="static")return;
            this.rig.type="static";
            this.owner.pos(targetX,1700);
            
            Laya.Tween.to(this.owner,{x:targetX,y:-70},500,null,
                new Laya.Handler(this,function(){
                    Laya.stage.event("RecoverBall");

                    //先隐藏一下这个物体
                    this.owner.visible=false;
                    this.damage=1;
                    this.isDamageRow=false;
                    Laya.Pool.recover("Ball",this.owner);
                }));
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-25 18:04
    */
    class Prop extends Laya.Script {

        constructor() {
            super();

            this.rowId=0;
            this.txt_Count=null;
            this.count=0;
            this.sign=null;
        }
        Init(count,rowId,sign){
            this.rowId=rowId;
            this.count=count;
            this.txt_Count.text=count;
            this.sign=sign;
            Laya.stage.on("DamageRow",this,this.onDamageRow);
        }
        onAwake() {
            this.txt_Count=this.owner.getChildByName("txt_Count");
        }
        /**
         * 当收到闪电球碰撞事件码
         */
        onDamageRow(rowId,damage){
            //代表在同一行
            if(rowId==this.rowId){
                this.reduceCount(damage);
            }
        }
        reduceCount(damage){
            Laya.stage.event("AddScore",[damage]);
            this.count-=damage;
            this.txt_Count.text=this.count;
            if(this.count<=0){
                this.recover();
            }
        }
        recover(){
            Laya.stage.off("DamageRow",this,this.onDamageRow);
            //回收进对象池
            this.owner.visible=false;
            this.owner.active=false;
            Laya.Pool.recover(this.sign,this.owner);
        }
        //和球碰撞检测
        onTriggerEnter(other){
            if(other.owner.name=="ball"){
                var damage = other.owner.getComponent(Ball).damage;
                //对当前这个元素所在的一整行都要减去damage的操作
                var damageRow = other.owner.getComponent(Ball).isDamageRow;
                if(damageRow){
                    //TODO特效
                    Laya.stage.event("DamageRow",[this.rowId,damage]);
                }
                else{
                    this.reduceCount(damage);
                }
                
                if(this.count<=0)return;
                this.playAni();
            }
        }
        playAni(){
            var sp=this.owner.getChildByName("sp");
            Laya.Tween.clearAll(sp);

            //初始化位置（还原位置
            sp.pos(0,0);

            var x=sp.x;
            var y=sp.y;
            var offset=4;
            Laya.Tween.to(sp,{x:x-offset},10,null,
                new Laya.Handler(this,function(){
                    Laya.Tween.to(sp,{x:x+offset},10*2,null,
                        new Laya.Handler(this,function(){
                            Laya.Tween.to(sp,{x:x},10,null,
                                new Laya.Handler(this,function(){
                                    Laya.Tween.to(sp,{y:y-offset},10,null,
                                        new Laya.Handler(this,function(){
                                            Laya.Tween.to(sp,{y:y+offset},10*2,null,
                                                new Laya.Handler(this,function(){
                                                    Laya.Tween.to(sp,{y:y},10);
                                                }));
                                        }));
                                }));
                        }));
                }));
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-24 15:43
    */
    class ShootManager extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:gun, tips:"提示文本", type:Node, default:null}*/
            this.gun = null;
            /** @prop {name:ballPre, tips:"提示文本", type:Prefab, default:null}*/
            this.ballPre = null;
            /** @prop {name:txt_ShootCount, tips:"提示文本", type:Node, default:null}*/
            this.txt_ShootCount = null;
            /** @prop {name:txt_SpeedUp, tips:"提示文本", type:Node, default:null}*/
            this.txt_SpeedUp = null;

            //鼠标是否按下
            this.isMouseDown = false;
            this.shootCount = 0;
            this.canNextShoot = true;
            this.recoverCount = 0;
            this.canShootCount = 1;
            this.addCount = 0;

            this.gunController = null;
        }

        onAwake() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);

            this.txt_ShootCount.text = this.canShootCount;
            Laya.stage.on("RecoverBall", this, this.RecoverBall);
            Laya.stage.on("AddShootCount", this, this.AddShootCount);

            this.gunController = this.gun.parent.getComponent(GunController);
        }
        onDestroy() {
            Laya.stage.off("RecoverBall", this, this.RecoverBall);
            Laya.stage.off("AddShootCount", this, this.AddShootCount);
        }
        AddShootCount() {
            this.addCount++;
        }
        //回收上一局发射出去的球
        RecoverBall() {
            this.recoverCount++;
            if (this.recoverCount >= this.canShootCount) {
                this.recoverCount = 0;

                this.canShootCount += this.addCount;
                this.addCount = 0;
                this.shootCount = this.canShootCount;
                this.txt_ShootCount.text = this.shootCount;
                this.canNextShoot = true;
                Laya.stage.event("SpawnNextRow");

                //显示球类型切换按钮
                this.gunController.IsShowChangeBtn(true);

                //清理 加速功能 延时执行
                this.txt_SpeedUp.visible = false;
                Laya.timer.clear(this, this.speedUp);
                Laya.timer.scale = 1;
            }
        }
        mouseDown(e) {
            var str=e.target.name;
            if(str.length>=7){
                str=str.slice(str.length-7,str.length);
                if(str=="_Ignore")return;
            }

            if (this.canNextShoot == false) return;
            this.isMouseDown = true;
            this.lookAtMouse();
        }
        mouseMove(e) {
            var str=e.target.name;
            if(str.length>=7){
                str=str.slice(str.length-7,str.length);
                if(str=="_Ignore")return;
            }

            if (this.canNextShoot == false) return;
            if (this.isMouseDown) {
                this.lookAtMouse();
            }
        }
        mouseUp(e) {
            var str=e.target.name;
            if(str.length>=7){
                str=str.slice(str.length-7,str.length);
                if(str=="_Ignore")return;
            }

            if (this.isMouseDown == false) return
            this.isMouseDown = false;
            if (this.canNextShoot == false) return;
            this.canNextShoot = false;

            //隐藏球类型切换按钮
            this.gunController.IsShowChangeBtn(false);

            this.shootCount = this.canShootCount;

            var delX = Laya.stage.mouseX - this.gun.x;
            var delY = Laya.stage.mouseY - this.gun.y;
            //当鼠标抬起的时候立即生成一个球
            this.spawnBall(delX, delY);

            if (this.shootCount > 0) {
                //循环定时射击
                Laya.timer.loop(100, this, this.loopSpawnBall, [delX, delY]);
            }
            //开启延时加速
            Laya.timer.once(2000, this, this.speedUp);
        }
        //开启游戏加速
        speedUp() {
            Laya.timer.scale = 4;
            this.txt_SpeedUp.visible = true;
        }
        lookAtMouse() {
            var delX = Laya.stage.mouseX - this.gun.x;
            var delY = Laya.stage.mouseY - this.gun.y;
            var du = Math.atan2(delX, delY) * 180 / Math.PI;
            this.gun.rotation = -du;
        }
        loopSpawnBall(delX, delY) {
            if (this.shootCount <= 0) {
                Laya.timer.clear(this, this.loopSpawnBall);
            } else {
                this.spawnBall(delX, delY);
            }
        }
        //生成一个射击球
        spawnBall(delX, delY) {
            //创建（实例化）一个球
            var ball = Laya.Pool.getItemByCreateFun("Ball",function(){
                return this.ballPre.create()
            },this);

            ball.visible=true;
            this.owner.addChild(ball);
            ball.pos(this.gun.x, this.gun.y);
            ball.getComponent(Laya.RigidBody).type="dynamic";
            ball.getComponent(Laya.RigidBody).linearVelocity = { x: delX, y: delY };

            //根据球类型确定对应的UI图路径
            var ballType = this.gunController.ballType;
            ball.texture = this.gunController.ballUrlArr[ballType];
            
            var ballCom=ball.getComponent(Ball);
            if (ballType==1){//强力球
                ballCom.damage=3;
            }
            else if(ballType==2){//闪电球
                ballCom.damage=2;
                ballCom.isDamageRow=true;
            }
            this.gunController.reduceBallCount();

            this.shootCount--;
            this.txt_ShootCount.text = this.shootCount;
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-25 16:43
    */
    class GameManager extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:txt_Score, tips:"提示文本", type:Node, default:null}*/
            this.txt_Score=null;

            this.signArr=["Jia","SanJiao","Yaun","Zfx"];
            //行ID，用来标记这一行的元素
            this.rowId=0;
            //游戏结束时最高层这一行的ID是多少
            this.overRowId=0;
            this.preArr=new Array();
            this.shootManager=null;
            this.score=0;
        }

        onAwake() {
            this.shootManager=this.owner.getComponent(ShootManager);
            Laya.stage.on("Revive",this,this.Revive);
            Laya.stage.on("SpawnNextRow",this,this.spawnRow);
            Laya.stage.on("AddScore",this,this.addScore);
            this.txt_Score.text=this.score;

            var resArr=[
                {url:"prefab/jia.json",type:Laya.Loader.PREFAB},
                {url:"prefab/sanjiao.json",type:Laya.Loader.PREFAB},
                {url:"prefab/yuan.json",type:Laya.Loader.PREFAB},
                {url:"prefab/zfx.json",type:Laya.Loader.PREFAB}
            ];
            Laya.loader.load(resArr,new Laya.Handler(this,function(){
                resArr.forEach(element => {
                    this.preArr.push(Laya.loader.getRes(element.url));
                });

                this.spawnRow();
            }));
        }
        onDestroy(){
            Laya.stage.off("Revive",this,this.Revive);
            Laya.stage.off("SpawnNextRow",this,this.spawnRow);
            Laya.stage.off("AddScore",this,this.addScore);
        }
        //加分
        addScore(value){
            this.score+=value;
            this.txt_Score.text=this.score;
        }
        spawnRow(){
            this.propMoveUp();

            //y 1500 间隔120
            //x 180 -900 间隔120
            var xArr=[180,300,420,540,660,780,900];
            //先随机一下这一行要生成的元素数量
            var count=this.getRandom(1,4);
            for(var i=0;i<count;i++){
                var ranIndex=this.getRandom(0,this.preArr.length-1);
                //按照ranIndex下标从对象池取出对应的对象
                var sign=this.signArr[ranIndex];
                var myEle=Laya.Pool.getItemByCreateFun(sign,function(){
                    return this.preArr[ranIndex].create()
                },this);
                myEle.visible=true;
                myEle.active=true;
                this.owner.addChild(myEle);
                //随机取出一个x位置下标
                var xindex=this.getRandom(0,xArr.length-1);
                var x=xArr[xindex];
                xArr.splice(xindex,1);
                myEle.pos(x,1500);
                if(myEle.getComponent(Prop)!=null){
                    var propCount=this.getRandom(this.shootManager.canShootCount,this.shootManager.canShootCount*3);
                    myEle.getComponent(Prop).Init(propCount,this.rowId,sign);
                }
                if(myEle.getComponent(Jia)!=null){
                    myEle.getComponent(Jia).Init(this.rowId);
                }
            }

            this.rowId++;
        }
        //让旧的元素整体往上移动一下
        propMoveUp(){
            for(var i=0;i<this.owner.numChildren;i++){
                var child=this.owner.getChildAt(i);
                if(child.active==false)continue;

                if(child.getComponent(Prop)!=null){
                    if(child.y<=450){
                        //游戏结束
                        this.overRowId=child.getComponent(Prop).rowId;
                        Laya.stage.event("ShowGameOverPanel");
                    }
                    child.y-=120;
                }
                if(child.getComponent(Jia)!=null){
                    if(child.y<=450){
                        //游戏结束
                        this.overRowId=child.getComponent(Jia).rowId;
                        Laya.stage.event("ShowGameOverPanel");
                    }
                    child.y-=120;
                }
            }
        }
        /**
         * 复活，（消除最上面三行）
         */
        Revive(){
            for(var i=0;i<this.owner.numChildren;i++){
                var child=this.owner.getChildAt(i);
                if(child.active==false)continue;

                if(child.getComponent(Prop)!=null){
                    var prop=child.getComponent(Prop);
                    for(var id=this.overRowId;id<this.overRowId+3;id++){
                        if(prop.rowId==id){
                            //回收
                            prop.recover();
                        }
                    }
                }
                if(child.getComponent(Jia)!=null){
                    var jia=child.getComponent(Jia);
                    for(var id=this.overRowId;id<this.overRowId+3;id++){
                        if(jia.rowId==id){
                            //回收
                            jia.recover();
                        }
                    }
                }
            }
        }
        getRandom(min,max){
            //2 5  //2345
            var value=(max-min)*Math.random();//0 -3
            value=Math.round(value);//0123
            return value+min//2345
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-30 17:15
    */
    class GameOverPanel extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:btn_Restart, tips:"提示文本", type:Node, default:null}*/
            this.btn_Restart=null;
            /** @prop {name:btn_Revive, tips:"提示文本", type:Node, default:null}*/
            this.btn_Revive=null;
        }

        onAwake() {
            Laya.stage.on("ShowGameOverPanel",this,this.show);

            this.btn_Restart.on(Laya.Event.CLICK,this,function(){
                Laya.Pool.clearBySign("Ball");
                var signArr=["Jia","SanJiao","Yaun","Zfx"];
                signArr.forEach(element => {
                    Laya.Pool.clearBySign(element);
                });

                Laya.Scene.open("Main.json");
            });
            this.btn_Revive.on(Laya.Event.CLICK,this,function(){
                Laya.stage.event("Revive");
                this.owner.visible=false;
            });
        }
        onDestroy(){
            Laya.stage.off("ShowGameOverPanel",this,this.show);
        }
        show(){
            this.owner.visible=true;
        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("scripts/GunController.js",GunController);
    		reg("scripts/AddBallPanel.js",AddBallPanel);
    		reg("scripts/GameManager.js",GameManager);
    		reg("scripts/ShootManager.js",ShootManager);
    		reg("scripts/GameOverPanel.js",GameOverPanel);
    		reg("scripts/Ball.js",Ball);
    		reg("scripts/Jia.js",Jia);
    		reg("scripts/Prop.js",Prop);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 1920;
    GameConfig.scaleMode ="fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;

    GameConfig.init();

    class Main {
    	constructor() {
    		//根据IDE设置初始化引擎		
    		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    		Laya["Physics"] && Laya["Physics"].enable();
    		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    		Laya.stage.scaleMode = GameConfig.scaleMode;
    		Laya.stage.screenMode = GameConfig.screenMode;
    		Laya.stage.alignV = GameConfig.alignV;
    		Laya.stage.alignH = GameConfig.alignH;
    		//兼容微信不支持加载scene后缀场景
    		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    		if (GameConfig.stat) Laya.Stat.show();
    		Laya.alertGlobalError(true);

    		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    	}

    	onVersionLoaded() {
    		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    	}

    	onConfigLoaded() {
    		//加载IDE指定的场景
    		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    	}
    }
    //激活启动类
    new Main();

}());
