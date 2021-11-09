(function () {
    'use strict';

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-05-28 10:49
    */
    class CameraFollow extends Laya.Script {

        constructor() {
            super();
            
            this.offset=new Laya.Vector3();
            this.target=null;
        }
        Init(target){
            this.target=target;
            var x=this.owner.transform.localPositionX-target.localPositionX;
            var y=this.owner.transform.localPositionY-target.localPositionY;
            var z=this.owner.transform.localPositionZ-target.localPositionZ;
            this.offset=new Laya.Vector3(x,y,z);
        }
        onLateUpdate(){
            var x=this.target.localPositionX+this.offset.x;
            var y=this.target.localPositionY+this.offset.y;
            var z=this.target.localPositionZ+this.offset.z;
            this.owner.transform.localPosition=new Laya.Vector3(x,y,z);
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-05-29 12:39
    */
    class GamePanel extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:btn_Restart, tips:"提示文本", type:Node, default:null}*/
            this.btn_Restart=null;
            /** @prop {name:txt_BestScore, tips:"提示文本", type:Node, default:null}*/
            this.txt_BestScore=null;
        }

        onAwake() {
            this.btn_Restart.on(Laya.Event.CLICK,this,function(){
                Laya.Scene.open("Main.json");
            });
        }
        ShowPanel(bestScore){
            this.owner.visible=true;
            this.txt_BestScore.text="BEST SCORE:"+bestScore;
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-05-29 10:06
    */
    class Player extends Laya.Script {

        constructor() {
            super();

            //0blue 1red 2green
            //0cube 1Sphere 2Tetra
            this.index=0;

            this.cube=null;
        }

        onAwake() {
            this.cube=this.owner.getChildAt(0);
            Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
        }
        mouseDown(){
            if(GameManager.CanGameStart==false)return;
            
            this.index++;
            if(this.index>2){
                this.index=0;
            }

            if(GameManager.GameType==GameManager.GameTypeEnum.Color){
                var color=Laya.Color.BLUE;
                //处理模型颜色
                switch(this.index){
                    case 0:
                        color=Laya.Color.BLUE;
                        break;
                    case 1:
                        color=Laya.Color.RED;
                        break;
                    case 2:
                        color=Laya.Color.GREEN;
                        break;
                }
                this.cube.meshRenderer.material.albedoColor=
                new Laya.Vector4(color.r,color.g,color.b,color.a);
            }
            else{
                for(var i=0;i<this.owner.numChildren;i++){
                    if(i==this.index){
                        this.owner.getChildAt(i).active=true;
                    }else{
                        this.owner.getChildAt(i).active=false;
                    }
                }
            }
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-05-28 14:07
    */
    class Wall extends Laya.Script3D {

        constructor() {
            super();

            //对象池对象类型标识字符
            this.sign="";

            this.index=0;
            //当前墙是否是障碍物
            this.isGate=false;
        }

        Init(sign){
            this.sign=sign;
        }
        AnimationIn(){
            this.owner.transform.localPositionY+=3;
            var targetY=this.owner.transform.localPositionY-3;
            Laya.Tween.to(this.owner.transform,{localPositionY:targetY},150,
                Laya.Ease.linearIn);
        }
        AnimationOut(){
            var targetY=this.owner.transform.localPositionY-2;
            Laya.Tween.to(this.owner.transform,{localPositionY:targetY},150,
                Laya.Ease.linearOut,new Laya.Handler(this,function(){
                    for(var i=1;i<this.owner.numChildren;i++){
                        this.owner.getChildAt(i).active=false;
                    }
                    if(this.owner.numChildren>1){
                        this.owner.getChildAt(this.index+1).meshRenderer.
                            material.albedoColor=new Laya.Vector4(0,0.005,0.735,0.521);
                    }
                    this.isGate=false;
                    this.owner.active=false;
                    Laya.Pool.recover(this.sign,this.owner);
                }));
        }
        //当前墙被选中为障碍点，显示障碍物
        ShowGate(){
            this.isGate=true;
            var cubeGate= this.owner.getChildByName("cubeGate");
            cubeGate.active=true;

            if(GameManager.CanGameStart==false)return;
            this.index=this.getRandom(0,2);
            
            if(GameManager.GameType==GameManager.GameTypeEnum.Color){
                var color=Laya.Color.BLUE;
                switch(this.index){
                    case 0:
                        color=Laya.Color.BLUE;
                        break;
                    case 1:
                        color=Laya.Color.RED;
                        break;
                    case 2:
                        color=Laya.Color.GREEN;
                        break;
                }
                cubeGate.meshRenderer.material.albedoColor=
                new Laya.Vector4(color.r,color.g,color.b,color.a);
            }
            else{
                for(var i=1;i<this.owner.numChildren;i++){
                    if(i==this.index+1){
                        this.owner.getChildAt(i).active=true;
                    }else{
                        this.owner.getChildAt(i).active=false;
                    }
                }
            }
        }
        getRandom(min,max){
            var value= Math.random()*(max-min);
            value=Math.round(value);
            return min+value;
        }
        onTriggerEnter(other){
            if(this.isGate){
                if(this.index==other.owner.getComponent(Player).index){
                    //修改通过时障碍物颜色
                    if(GameManager.GameType==GameManager.GameTypeEnum.Color){
                        this.owner.getChildAt(1).meshRenderer.
                        material.albedoColor=new Laya.Vector4(1,0.38,0,1);
                    }else{
                        this.owner.getChildAt(this.index+1).meshRenderer.
                        material.albedoColor=new Laya.Vector4(1,0.38,0,1);
                    }
                    console.log("通过");
                    Laya.stage.event("AddScore");
                    Laya.SoundManager.playSound("https://cube3d.oss-cn-beijing.aliyuncs.com/audio/success.wav",1);
                }else{
                    console.log("游戏结束");
                    Laya.stage.event("GameOver");
                    Laya.SoundManager.playSound("https://cube3d.oss-cn-beijing.aliyuncs.com/audio/whack.mp3",1);
                    Laya.SoundManager.playMusic("https://cube3d.oss-cn-beijing.aliyuncs.com/audio/bg1.mp3",0);
                }
            }
        }
    }

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-05-28 08:52
    */
    class GameManager extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:gameOverPanel, tips:"提示文本", type:Node, default:null}*/
            this.gameOverPanel=null;
            /** @prop {name:txt_Score, tips:"提示文本", type:Node, default:null}*/
            this.txt_Score=null;

            this.wallArray=new Array();

            this.scene3D=null;
            this.player=null;
            this.camera=null;

            this.wallPre=null;
            this.wallCurvePre=null;

            this.direction=new Laya.Vector3();
            this.leftDir=new Laya.Vector3(1,0,0);
            this.frontDir=new Laya.Vector3(0,0,1);
            //每个方向生成多少个墙
            this.dirSpawnCount=0;
            this.nextPos=new Laya.Vector3();

            this.gateIndex=0;

            this.playerMoveTime=300;
        }

        onAwake() {
            Laya.stage.on("AddScore",this,this.AddScore);
            Laya.stage.on("GameOver",this,this.gameOver);
            this.direction=this.leftDir;
            this.dirSpawnCount=this.getRandom(5,9);
            var sceneUrl="res/LayaScene_game/Conventional/game.ls";
            Laya.Scene3D.load(sceneUrl,new Laya.Handler(this,this.LoadSceneFin));
        }
        onDestroy(){
            Laya.stage.off("GameOver",this);
            Laya.stage.off("AddScore",this);
            Laya.Pool.clearBySign("CurveWall");
            Laya.Pool.clearBySign("Wall");
            GameManager.Score=0;
        }
        //增加成绩
        AddScore(){
            GameManager.Score++;
            this.txt_Score.text=GameManager.Score;

            this.playerMoveTime=300-GameManager.Score/2;
            if(this.playerMoveTime<150)this.playerMoveTime=150;
        }
        //游戏结束的处理
        gameOver(){
            //将本局的成绩和最好成绩作比较，存放最高成绩
            var bestScore=Laya.LocalStorage.getItem("BestScore");
            if(bestScore==null)bestScore=0;
            if(GameManager.Score>bestScore){
                bestScore=GameManager.Score;
                Laya.LocalStorage.setItem("BestScore",GameManager.Score);
            }

            GameManager.CanGameStart=false;
            //人物移动暂停
            Laya.Tween.clearAll(this.player.transform);
            Laya.timer.clearAll(this);
            //摄像机动画
            Laya.Tween.to(this.camera,{fieldOfView:20},500,
                Laya.Ease.bounceOut,new Laya.Handler(this,function(){
                    this.gameOverPanel.getComponent(GamePanel).ShowPanel(bestScore);
                }));
        }
        /**
         * 3D场景加载完成之后的调用
         * @param {*3D场景} scene 
         */
        LoadSceneFin(scene){
            this.scene3D=scene;
            this.owner.addChild(scene);
            this.player=scene.getChildByName("PlayerObject");
            this.player.transform.localPositionY+=3;
            this.camera=scene.getChildByName("Main Camera");
            
            //制作普通墙预制体
            var wall=scene.getChildByName("wallObject");
            wall.addComponent(Wall);
            this.wallPre=Laya.Sprite3D.instantiate(wall);
            wall.destroy();
            //制作拐弯墙预制体
            var wallCurve=scene.getChildByName("wallCurveObject");
            wallCurve.addComponent(Wall);
            this.wallCurvePre=Laya.Sprite3D.instantiate(wallCurve);
            wallCurve.destroy();

            Laya.timer.loop(150,this,function(){
                if(this.wallArray.length<10){
                    this.generateRaceTrack();
                }else{
                    GameManager.CanGameStart=true;
                }
            });
        }
        gameStart(){
            this.txt_Score.visible=true;
            this.player.getChildByName("PlayerAvatarCube").active=true;
            Laya.Tween.to(this.player.transform,{localPositionY:0.7},300,
                Laya.Ease.bounceOut,
                new Laya.Handler(this,function(){
                    this.camera.addComponent(CameraFollow).Init(this.player.transform);
                    this.player.addComponent(Player);
                    this.playerMove();
            }));
        }
        /**
         * 玩家移动
         */
        playerMove(){
            var targetX=this.wallArray[1].transform.localPositionX;
            var targetZ=this.wallArray[1].transform.localPositionZ;
            Laya.Tween.to(this.player.transform,
                {localPositionX:targetX,localPositionZ:targetZ},this.playerMoveTime,null,
                new Laya.Handler(this,function(){
                    //移动到下一个目标位置了
                    var temp=this.wallArray.shift();
                    temp.getComponent(Wall).AnimationOut();
                    this.playerMove();
                }));
        }
        //创建赛道
        generateRaceTrack(){
            if(this.dirSpawnCount==0){
                //切换生成方向
                if(this.direction==this.leftDir)
                    this.direction=this.frontDir;
                else
                    this.direction=this.leftDir;

                //重置生成数量
                this.dirSpawnCount=this.getRandom(5,9);

                //随机这一行的障碍物位置
                this.gateIndex=this.getRandom(3,this.dirSpawnCount-1);

                //生成一个拐角墙
                this.generateWall(true);
            }else{
                //生成一个普通墙
                this.generateWall(false);
            }
            this.dirSpawnCount--;
        }
        generateWall(isCurve){
            var wall=null;
            if(isCurve){
                if(this.direction==this.leftDir){
                    wall=this.spawnCurveWall(new Laya.Vector3(0,90,0));
                }
                else{
                    wall=this.spawnCurveWall(new Laya.Vector3(0,-90,0));
                }
            }
            else{
                if(this.direction==this.leftDir){
                    wall=this.spawnWall(new Laya.Vector3(0,0,0));
                }
                else{
                    wall=this.spawnWall(new Laya.Vector3(0,90,0));
                }
            }

            if(this.gateIndex==this.dirSpawnCount){
                wall.getComponent(Wall).ShowGate();
            }
            //把生成的墙添加进数组里
            this.wallArray.push(wall);
            var x=this.nextPos.x+this.direction.x;
            var y=this.nextPos.y+this.direction.y;
            var z=this.nextPos.z+this.direction.z;
            this.nextPos=new Laya.Vector3(x,y,z);
        }
        //生成普通墙
        spawnWall(euler){
            //从对象池根据标识符获取对象，如果没有就使用创建方法创建一个
            var wall=Laya.Pool.getItemByCreateFun("Wall",function(){
                var temp=Laya.Sprite3D.instantiate(this.wallPre,this.scene3D);
                return temp;
            },this);
            
            wall.active=true;
            wall.transform.localPosition=this.nextPos;
            wall.transform.localRotationEuler=euler;
            wall.getComponent(Wall).Init("Wall");
            wall.getComponent(Wall).AnimationIn();
            return wall;
        }
        //生成拐角墙
        spawnCurveWall(euler){
            //从对象池根据标识符获取对象，如果没有就使用创建方法创建一个
            var wall=Laya.Pool.getItemByCreateFun("CurveWall",function(){
                var temp=Laya.Sprite3D.instantiate(this.wallCurvePre,this.scene3D);
                return temp;
            },this);
            wall.active=true;
            wall.transform.localPosition=this.nextPos;
            wall.transform.localRotationEuler=euler;
            wall.getComponent(Wall).Init("CurveWall");
            wall.getComponent(Wall).AnimationIn();
            return wall;
        }
        getRandom(min,max){ //3 6
            //0-1 //0 5  //0 -5
            var value= Math.random()*(max-min);
            value=Math.round(value);
            //0 - 5
            return min+value;
        }
    }
    GameManager.GameTypeEnum={
        Color:"Color",
        Form:"Form"
    };
    GameManager.GameType=GameManager.GameTypeEnum.Color;
    GameManager.CanGameStart=false;
    GameManager.Score=0;

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-05-29 11:00
    */
    class StartPanel extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:btn_Color, tips:"提示文本", type:Node, default:null}*/
            this.btn_Color=null;
            /** @prop {name:btn_Form, tips:"提示文本", type:Node, default:null}*/
            this.btn_Form=null;
            /** @prop {name:txt_BestScore, tips:"提示文本", type:Node, default:null}*/
            this.txt_BestScore=null;
            this.gameManager=null;
        }

        onAwake() {
            Laya.SoundManager.musicVolume=0.3;
            Laya.SoundManager.playMusic("https://cube3d.oss-cn-beijing.aliyuncs.com/audio/bg2.mp3",0);

            this.gameManager=this.owner.parent.getComponent(GameManager);

            this.btn_Color.on(Laya.Event.CLICK,this,function(){
                if(GameManager.CanGameStart==false)return;
                GameManager.GameType=GameManager.GameTypeEnum.Color;
                this.owner.visible=false;
                this.gameManager.gameStart();
                Laya.SoundManager.playMusic("https://cube3d.oss-cn-beijing.aliyuncs.com/audio/bg1.mp3",0);
            });

            this.btn_Form.on(Laya.Event.CLICK,this,function(){
                if(GameManager.CanGameStart==false)return;
                GameManager.GameType=GameManager.GameTypeEnum.Form;
                this.owner.visible=false;
                this.gameManager.gameStart();
                Laya.SoundManager.playMusic("https://cube3d.oss-cn-beijing.aliyuncs.com/audio/bg1.mp3",0);
            });

            var bestScore= Laya.LocalStorage.getItem("BestScore");
            if(bestScore==null)bestScore=0;
            this.txt_BestScore.text=bestScore;
        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("scripts/GameManager.js",GameManager);
    		reg("scripts/StartPanel.js",StartPanel);
    		reg("scripts/GamePanel.js",GamePanel);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 1920;
    GameConfig.scaleMode ="noborder";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
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
