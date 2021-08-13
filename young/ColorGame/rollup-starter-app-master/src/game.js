import * as PIXI from 'pixi.js';

export default class {
    constructor(){
        //application으로 pixi화면 구성
        const app = new PIXI.Application();
        document.body.appendChild(app.view);

        //게임 배경 설정
        const background = PIXI.Sprite.from('images/bg_button.jpg');
        background.width = app.screen.width;
        background.height = app.screen.height;
        app.stage.addChild(background);

        //게임 스코어 텍스트 설정
        const basicText = new PIXI.Text('SCORE : ');
        const scoreText = new PIXI.Text(0);
        basicText.x = 580;
        basicText.y = 50;
        scoreText.x = 700;
        scoreText.y = 50;
        app.stage.addChild(basicText);
        app.stage.addChild(scoreText);

        //게임 제한시간 코드
        const timer = new PIXI.Text(60);
        timer.x = 100;
        timer.y = 50;
        app.stage.addChild(timer);

        //게임 남은 시간 확인 애니메이션 ( 구현 못함!!! )
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xDE3249);
        graphics.drawRect(100, 90, 120, 15);
        graphics.endFill();
        app.stage.addChild(graphics);

        //게임에서 사용할 캐릭터 가져오기
        app.loader
            .add('egghead', 'images/egghead.png')
            .add('flowerTop', 'images/flowerTop.png')
            .add('helmlok', 'images/helmlok.png')
            .add('skully', 'images/skully.png')
            .load(onAssetsLoaded);

        //게임 초기화
        const SYMBOL_SIZE = 200; //캐릭터 height
        var score = 0; //게임 점수
        var time = 60; //제한시간 
        
        //게임에 사용할 캐릭터
        const slotTextures = [
            PIXI.Texture.from('images/eggHead.png'),
            PIXI.Texture.from('images/flowerTop.png'),
            PIXI.Texture.from('images/helmlok.png'),
            PIXI.Texture.from('images/skully.png'),
        ];

        
        //게임 화면 맨 처음에 랜덤한 캐릭터를 reels배열에 넣고, 화면에 출력
        const reels = []; //reel의 객체를 넣을 배열
        function onAssetsLoaded(){
            //랜덤한 심볼을 넣을 컨테이너 객체 생성 코드
            const reelContainer = new PIXI.Container();
                //각각의 캐릭터마다 컨테이너를 제작하여 스프라이트 넣기
                for(let i=0; i<10; i++){
                    const rc = new PIXI.Container();
                    rc.y = i * SYMBOL_SIZE;
                    reelContainer.addChild(rc);
                    let num = Math.floor(Math.random() * slotTextures.length);
                    const symbol = new PIXI.Sprite(slotTextures[num]);
                    const reel = {
                        parent : reelContainer,
                        container : rc,
                        symbol : num
                    }
                    reels.push(reel);
                    rc.addChild(symbol);
                }

            //컨테이너 위치.. 
            app.stage.addChild(reelContainer);
            reelContainer.x = app.screen.width / 2; 
            reelContainer.y = app.screen.height / 2.2;
            reelContainer.pivot.x = reelContainer.width / 2;
            reelContainer.pivot.y = reelContainer.height / 2;
            reelContainer.scale.set(0.25);
        }
        
        //버튼 화면 구성
        const bcarr = [];
        const buttonContainer = new PIXI.Container();
        for(let h=0;h<slotTextures.length;h++){
            const bc = new PIXI.Container();
            const button = new PIXI.Sprite(slotTextures[h]);
            button.anchor.set(0.5);
            bc.addChild(button);
            bc.x = h * 70;
            bc.scale.set(0.3);
            buttonContainer.addChild(bc);

            const bcattribute = {
                bc : bc,
                symbol : h,
                button : button
            }
            bcarr.push(bcattribute);
            button.interactive = true;
            button.buttonMode = true;
        }

        app.stage.addChild(buttonContainer);
        buttonContainer.x = app.screen.width / 2 ;
        buttonContainer.y = app.screen.height - 50;
        buttonContainer.pivot.x = buttonContainer.width/2;
        buttonContainer.pivot.y = buttonContainer.height/2;

        //버튼을 클릭하면 맨 밑에 있는 아이콘이 사라지는 코드
        bcarr[0].button.on('pointerdown', onClick0);
        bcarr[1].button.on('pointerdown', onClick1);
        bcarr[2].button.on('pointerdown', onClick2);
        bcarr[3].button.on('pointerdown', onClick3);

        function onClick0(){
           if(reels[9].symbol === bcarr[0].symbol){
                //캐릭터와 같은모양의 버튼을 눌렀을 때 맨 아래에 있는 컨테이너가 사라지게 하는 코드
                correctCharacter();
                newCharacter();
            }
        }

        function onClick1(){
            if(reels[9].symbol === bcarr[1].symbol){
                 //캐릭터와 같은모양의 버튼을 눌렀을 때 맨 아래에 있는 컨테이너가 사라지게 하는 코드
                correctCharacter();
                newCharacter();
             }
         }
         function onClick2(){
            if(reels[9].symbol === bcarr[2].symbol){
                 //캐릭터와 같은모양의 버튼을 눌렀을 때 맨 아래에 있는 컨테이너가 사라지게 하는 코드
                 correctCharacter();
                 newCharacter();
             }
         }
         function onClick3(){
            if(reels[9].symbol === bcarr[3].symbol){
                 //캐릭터와 같은모양의 버튼을 눌렀을 때 맨 아래에 있는 컨테이너가 사라지게 하는 코드
                 correctCharacter();
                 newCharacter();
             }
         }

        function correctCharacter() {
            const reelContainer = reels[9].parent;
            reelContainer.removeChild(reels[9].container);
            const pops = reels.pop();

            //점수 상승 & 점수 화면 표시 코드
            score++;
            scoreText.text = score;

            for(let i = 0; i<reels.length ; i++){
                const rc = reels[i].container;
                rc.y = (i+1) * SYMBOL_SIZE;
            }
        }

        function newCharacter() {
            const reelContainer = reels[0].parent;
            const rc = new PIXI.Container();
            reelContainer.addChild(rc);
            let num = Math.floor(Math.random() * slotTextures.length);
            const symbol = new PIXI.Sprite(slotTextures[num]);
            rc.addChild(symbol); 

            //캐릭터 배열 0번에 추가
            reels.unshift({parent: reelContainer, symbol : num , container:rc});
        }

        function gameResult() {
            //점수판으로 제작할 객체생성
            const resultContainer = new PIXI.Container();
            const resultText = new PIXI.Text("최종 스코어 : " + score + " 점");
            const resultBox = new PIXI.Graphics();

            //점수판 속성 설정
            resultBox.beginFill(0xffffff);
            resultBox.drawRect(0, 0, 400, 200);
            resultBox.endFill();

            //점수판에 출력될 텍스트 속성 설정
            resultText.x = resultBox.width/2;
            resultText.y = resultBox.height/2;
            resultText.pivot.x = resultText.x/2;
            resultText.pivot.y = resultText.y/2;

            //최종점수 출력하는 컨테이너 설정
            resultContainer.x = app.screen.width / 2 ;
            resultContainer.y = app.screen.height / 2 ;
            resultContainer.pivot.x = resultContainer.x/2;
            resultContainer.pivot.y = resultContainer.y/2;

            //app stage에 컨테이너와 점수판, 텍스트 추가
            resultContainer.addChild(resultBox);
            resultContainer.addChild(resultText);
            app.stage.addChild(resultContainer);
        }

        setInterval(function() {
            //this.time 으로 하면, timer.text에 들어가지 않음. 
            time--;
            timer.text = time;
            // 초가 줄어들 수록 시간막대의 길이를 줄이고 싶은데, width 값을 변경 할때 마다 막대가 왼쪽으로 움직임.
            // 중요한 건, width는 변경되지 않음.
            graphics.width = time;
        },1000);

        app.ticker.add(() => {
            if(time < 58){
                app.ticker.stop();
                gameResult();
            }
         });
    }
}