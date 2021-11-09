(function () {
    'use strict';

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-09 12:55
    */
    class CameraMove extends Laya.Script {

        constructor() {
            super();

            this.gameManager=null;
        }
        Init(gameManager){
            this.gameManager=gameManager;
        }
        onUpdate(){
            var pos=new Laya.Vector3();
            Laya.Vector3.lerp(this.owner.transform.localPosition,
                new Laya.Vector3(this.gameManager.lastFloorPos.x,0,
                    this.gameManager.lastFloorPos.z),0.05,pos);
            
            this.owner.transform.localPosition=pos;
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-08 15:44
    */
    class Player extends Laya.Script {

        constructor() {
            super();

            this.gameManager=null;
            this.anim=null;
            this.xuLiEffect=null;

            this.lastCollisionFloor=null;

            this.canJump=false;
            this.isMouseDown=false;
            this.xuLiTime=0.05;
            this.jumpTime=0.5;
        }
        Init(gameManager){
            this.gameManager=gameManager;
        }
        onAwake() {
            this.xuLiEffect=this.owner.getChildByName("XuLi");
            this.anim=this.owner.getChildByName("Capsule").getComponent(Laya.Animator);
            Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP,this,this.mouseUp);
        }
        onUpdate(){
            if(this.isMouseDown&&this.xuLiTime<3){
                this.xuLiTime+=Laya.timer.delta/1000;
                if(this.xuLiTime>3){
                    this.xuLiTime=3;
                }
            }
            if(this.owner.transform.localPositionY<=-0.5){
                if(this.gameManager.isGameOver==false){
                    this.gameManager.showGameOverPanel();
                }
            }
        }
        mouseDown(e){
            if(e.target.name=="bg"||e.target.name=="btn_Play")return;
            if(this.canJump==false)return;

            this.xuLiTime=0.05;
            this.isMouseDown=true;
            this.anim.play("XuLi");
            this.xuLiEffect.active=true;
        }
        mouseUp(e){
            if(e.target.name=="bg"||e.target.name=="btn_Play")return;
            if(this.canJump==false)return;
            this.canJump=false;
            
            this.xuLiEffect.active=false;
            this.isMouseDown=false;
            this.anim.play("Jump");
            this.jump();
        }
        jump(){
            var jumpLength=this.xuLiTime*6;
            var fromPos=new Laya.Vector3(
                this.owner.transform.localPosition.x,
                this.owner.transform.localPosition.y,
                this.owner.transform.localPosition.z
            );
            var nextPos=this.gameManager.nextPos;
            var movePos=this.Vector3Reduce(nextPos,fromPos);
            Laya.Vector3.normalize(new Laya.Vector3(movePos.x,0,movePos.z),movePos);
            movePos=this.Vector3Multiply(movePos,jumpLength);

            var timeLength=this.jumpTime;
            Laya.timer.loop(1,this,function(){
                if(timeLength<=0){
                    this.anim.play("Idle");
                    Laya.timer.clearAll(this);
                    return;
                }
                timeLength-=0.02;
                var bili=(this.jumpTime-timeLength)/this.jumpTime;//0-1
                var x=fromPos.x+movePos.x*bili;
                var y=fromPos.y+this.paoWuXian(jumpLength*bili,
                    jumpLength/2,3);
                var z=fromPos.z+movePos.z*bili;
                this.owner.transform.localPosition=new Laya.Vector3(x,y,z);
            
                if(this.gameManager.isLeft){
                    this.owner.transform.localRotationEuler=new Laya.Vector3(360*bili,0,0);
                }else{
                    this.owner.transform.localRotationEuler=new Laya.Vector3(0,0,360*bili);
                }
            });
        }
        paoWuXian(x,k,top){
            if(k==0)k=1;
            return -(top*(x-k)*(x-k)/(k*k)-top)
        }
        Vector3Reduce(pos1,pos2){
            return new Laya.Vector3(pos1.x-pos2.x,
                pos1.y-pos2.y,
                pos1.z-pos2.z)
        }
        Vector3Multiply(pos,value){
            return new Laya.Vector3(pos.x*value,
                pos.y*value,
                pos.z*value)
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-09 12:23
    */
    class Floor extends Laya.Script3D {

        constructor() {
            super();

            this.isFirstEnter=true;
            this.timer=0;
            this.canReward=false;
        }
        Reset(){
            this.isFirstEnter=true;
            this.timer=0;
            this.canReward=false;
        }
        onCollisionEnter(collision){
            if(this.isFirstEnter==false)return;
            this.isFirstEnter=false;

            var otherTrans=collision.other.owner.transform;
            var ownerTrans=this.owner.transform;
            var delX=otherTrans.localPositionX-ownerTrans.localPositionX;
            var delZ=otherTrans.localPositionZ-ownerTrans.localPositionZ;
            var dis=Math.sqrt(delX*delX+delZ*delZ);
            dis=Number.parseFloat(dis.toFixed(2));
            
            var player=collision.other.owner.getComponent(Player);
            var fallEffect=collision.other.owner.getChildByName("playerFall").particleSystem;
            if(dis<=0.1){
                //判断一下当前平台是不是Player上一次碰到的平台
                //如果是，就不要重复奖励和生成下一个平台
                if(this.owner!=player.lastCollisionFloor){
                    //超级奖励
                    if(player.lastCollisionFloor!=null){
                        Laya.stage.event("AddScore",[2]);
                        Laya.stage.event("ShowRewardHint",[this.owner.transform.localPosition,"+2"]);
                    }
                    Laya.stage.event("ShowGQEffect",[this.owner.transform.localPositionX,
                        this.owner.transform.localPositionZ]);
                    
                    Laya.stage.event("SpawnNextFloor");
                }
                fallEffect.play();
                player.canJump=true;
            }
            else if(dis<=ownerTrans.localScaleX/2+0.02){
                if(this.owner!=player.lastCollisionFloor){
                    //普通奖励
                    Laya.stage.event("AddScore");
                    Laya.stage.event("SpawnNextFloor");
                }
                fallEffect.play();
                player.canJump=true;
            }
            else{
                //游戏结束
            }
            player.lastCollisionFloor=this.owner;
            console.log(dis);
        }
        onCollisionExit(collision){
            this.isFirstEnter=true;
        }
        onCollisionStay(collision){
            if(this.canReward){
                this.timer+=Laya.timer.delta/1000;
                if(this.timer>=5){
                    console.log("获得奖励");
                    Laya.stage.event("AddScore",5);
                    Laya.stage.event("ShowRewardHint",[this.owner.transform.localPosition,"+5"]);
                    this.canReward=false;
                    this.timer=0;
                }
            }
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-11 11:09
    */
    class RewardHint extends Laya.Script {

        constructor() {
            super();
        }
        Excute(camera,worldPos){
            var timer=0;
            var v4=new Laya.Vector4();
            Laya.timer.loop(1,this,function(){
                timer+=Laya.timer.delta/1000;
                if(timer>=1){
                    Laya.timer.clearAll(this);
                    this.owner.visible=false;
                    Laya.Pool.recover("RewardHint",this.owner);
                    return;
                }
                worldPos.y+=0.05;
                camera.worldToViewportPoint(worldPos,v4);
                this.owner.pos(v4.x,v4.y);
                this.owner.visible=true;
            });
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-11 11:56
    */
    class RewardHintManager extends Laya.Script {

        constructor() {
            super();
            
            this.rewardPre=null;
            this.camera=null;
        }
        Init(camera){
            this.camera=camera;
        }
        onAwake() {
            Laya.stage.on("ShowRewardHint",this,this.ShowHint);
            Laya.loader.load("prefab/rewardPre.json",
            new Laya.Handler(this,function(pre){
                this.rewardPre=pre;
            }),null,Laya.Loader.PREFAB);
        }
        onDestroy(){
            Laya.stage.off("ShowRewardHint",this,this.ShowHint);
        }
        ShowHint(worldPos,txt){
            worldPos.y=0;
            var temp=Laya.Pool.getItemByCreateFun("RewardHint",function(){
                var reward=this.rewardPre.create();
                //显示在舞台上
                this.owner.addChild(reward);
                return reward
            },this);
            temp.text=txt;
            temp.getComponent(RewardHint).Excute(this.camera,worldPos);
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-06-08 12:25
    */
    class GameManager extends Laya.Script {

        constructor() {
            super();

            this.isLeft=false;
            this.scene3D=null;
            this.nextPos=new Laya.Vector3();
            this.lastFloorPos=new Laya.Vector3();

            this.skyMatIndex=0;
            this.skyMatArr=[new Laya.Vector4(0.4862745,1,0.9184825,1),
                new Laya.Vector4(0.4,0.5,0.6,1),
                new Laya.Vector4(0.5,0.52,0.8,1),
                new Laya.Vector4(0.7,0.26,0.1,1),
                new Laya.Vector4(0.56,0.3,0.58,1),
                new Laya.Vector4(0.31,1,0.37,1)];

            this.floorArr=[];

            this.isGameOver=false;

            this.score=0;
        }
        showGameOverPanel(){
            this.isGameOver=true;
            this.gameOverPanel.visible=true;
        }
        btnRestartClick(){
            //Laya.Scene.open("Main.json")
            this.score=0;
            this.txt_Score.text=this.score;

            this.player.transform.localPosition=new Laya.Vector3(0,3,0);
            this.player.getComponent(Laya.Rigidbody3D).linearVelocity=new Laya.Vector3();
            this.player.getComponent(Player).lastCollisionFloor=null;

            //遍历场景中所有的平台，对其回收
            this.floorArr.forEach(element => {
                element.active=false;
                element.getComponent(Floor).Reset();
                Laya.Pool.recover("Floor",element);
            });
            this.floorArr.length=0;

            var newFloor=this.createFloor();
            newFloor.transform.localPosition=new Laya.Vector3(0,-5,0);

            this.camera.transform.localPosition=new Laya.Vector3();

            this.nextPos=new Laya.Vector3();
            this.lastFloorPos=new Laya.Vector3();

            this.isGameOver=false;
            this.gameOverPanel.visible=false;
        }
        addScore(value=1){
            this.score+=value;
            this.txt_Score.text=this.score;
            Laya.Tween.to(this.txt_Score,{scaleX:1.3,scaleY:1.3},100,null,
                new Laya.Handler(this,function(){
                    Laya.Tween.to(this.txt_Score,{scaleX:1,scaleY:1},100);
            }));
        }
        onAwake() {
            var startPanel=this.owner.getChildByName("StartPanel");
            startPanel.getChildByName("btn_Play").on(Laya.Event.CLICK,this,function(){
                startPanel.visible=false;
                this.txt_Score.visible=true;
            });
            this.txt_Score=this.owner.getChildByName("txt_Score");
            this.gameOverPanel=this.owner.getChildByName("GameOverPanel");
            this.gameOverPanel.getChildByName("btn_Restart").on(Laya.Event.CLICK,this,this.btnRestartClick);

            Laya.stage.on("AddScore",this,this.addScore);
            Laya.stage.on("ShowGQEffect",this,this.showGuangQuanEffect);
            Laya.stage.on("SpawnNextFloor",this,this.spawnNextFloor);
            var sceneUrl="res/LayaScene_SampleScene/Conventional/SampleScene.ls";
            Laya.Scene3D.load(sceneUrl,new Laya.Handler(this,this.LoadSceneFin));
        }
        onDestroy(){
            Laya.stage.off("AddScore",this,this.addScore);
            Laya.stage.off("ShowGQEffect",this,this.showGuangQuanEffect);
            Laya.stage.off("SpawnNextFloor",this,this.spawnNextFloor);
        }
        /**
         * 3D场景加载完成
         * @param {*} scene 
         */
        LoadSceneFin(scene){
            this.scene3D=scene;
            //将3D场景显示出来（作为当前脚本所在物体的子物体
            this.owner.addChild(scene);

            var light=scene.getChildByName("Directional Light");
            light.shadowMode=Laya.ShadowMode.SoftHigh;

            //制作平台预制体
            var floor=scene.getChildByName("Floor");
            floor.addComponent(Floor);
            this.floorPre=Laya.Sprite3D.instantiate(floor);
            floor.destroy();

            //生成默认的第一个平台
            var newFloor=this.createFloor();
            newFloor.transform.localPosition=new Laya.Vector3(0,-5,0);
            
            this.guangQuanEffect=scene.getChildByName("GuangQuan");
            this.skyPlane=scene.getChildByName("Camera").getChildByName("SkyPlane");
            this.camera=scene.getChildByName("Camera");
            this.camera.addComponent(CameraMove).Init(this);
            this.player=scene.getChildByName("Player");
            this.player.addComponent(Player).Init(this);

            //给RewardHintManager传递Main Camera
            this.owner.getComponent(RewardHintManager).Init(this.camera.getChildByName("Main Camera"));

            Laya.timer.loop(20000,this,this.changeSkyPlaneMat);
        }
        //生成下一个平台
        spawnNextFloor(){
            this.lastFloorPos=this.nextPos;

            this.isLeft=this.getRandomInt(0,1)==0?false:true;

            var length=this.getRandomFloat(3,6);

            var nextFloor=this.createFloor();
            
            if(this.isLeft){
                this.nextPos=new Laya.Vector3(this.nextPos.x,-6,
                    this.nextPos.z+length);
            }
            else{
                this.nextPos=new Laya.Vector3(this.nextPos.x-length,-6,
                    this.nextPos.z);
            }
            nextFloor.transform.localPosition=this.nextPos;
            Laya.Tween.to(nextFloor.transform,{localPositionY:-5},200,Laya.Ease.cubicOut);
        }
        createFloor(){
            //如果平台数组长度超出限制，把最前面的平台销毁掉，并移除数组
            if(this.floorArr.length>4){
                //移除一个元素并返回
                var floor=this.floorArr.shift();
                floor.getComponent(Floor).Reset();
                Laya.Pool.recover("Floor",floor);
                floor.active=false;
            }
            
            var nextFloor=Laya.Pool.getItemByCreateFun("Floor",function(){
                return Laya.Sprite3D.instantiate(this.floorPre,this.scene3D)
            },this);
            nextFloor.active=true;

            var scale=this.getRandomFloat(1,2.5);
            nextFloor.transform.localScale=new Laya.Vector3(scale,9,scale);
            
            //随机颜色
            var color=Laya.Color.RED;
            var value=this.getRandomFloat(0,10);
            //限制第一个平台，不能是额外奖励平台
            if(value<=8 || this.floorArr.length==0){
                var ranColor=this.getRandomInt(0,4);
                switch(ranColor){
                    case 0:
                        color=Laya.Color.RED;
                        break;
                    case 1:
                        color=Laya.Color.GREEN;
                        break;
                    case 2:
                        color=Laya.Color.CYAN;
                        break;
                    case 3:
                        color=Laya.Color.YELLOW;
                        break;
                    case 4:
                        color=Laya.Color.MAGENTA;
                        break;
                }
            }
            else{
                //生成带有额外奖励的平台
                color=new Laya.Color(0.2626839,0,0.490566,1);
                nextFloor.getComponent(Floor).canReward=true;
            }
            nextFloor.meshRenderer.material.albedoColor=new Laya.Vector4(
                color.r,color.g,color.b,color.a);

            this.floorArr.push(nextFloor);
            return nextFloor
        }
        getRandomInt(min,max){
            var value=Math.random()*(max-min);
            value=Math.round(value);
            return min+value;
        }
        getRandomFloat(min,max){
            var value=Math.random()*(max-min);
            value=Number.parseFloat(value.toFixed(1));
            return min+value;
        }
        showGuangQuanEffect(x,z){
            this.guangQuanEffect.transform.localPosition=new Laya.Vector3(x,-0.48,z);
            this.guangQuanEffect.particleSystem.play();
        }
        changeSkyPlaneMat(){
            this.skyMatIndex++;
            if(this.skyMatIndex>this.skyMatArr.length-1){
                this.skyMatIndex=0;
            }
            var color=this.skyMatArr[this.skyMatIndex];
            this.skyPlane.meshRenderer.material.albedoColor=color;
        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("scripts/GameManager.js",GameManager);
    		reg("scripts/RewardHintManager.js",RewardHintManager);
    		reg("scripts/RewardHint.js",RewardHint);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 1920;
    GameConfig.scaleMode ="noborder";
    GameConfig.screenMode = "vertical";
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
