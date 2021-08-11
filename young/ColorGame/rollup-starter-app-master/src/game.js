import * as PIXI from 'pixi.js';

export default class {
    constructor(){
        const app = new PIXI.Application();
        document.body.appendChild(app.view);

        //게임 배경 설정
        const background = PIXI.Sprite.from('images/bg_button.jpg');
        background.width = app.screen.width;
        background.height = app.screen.height;
        app.stage.addChild(background);

        //게임에서 사용할 캐릭터 가져오기
        //const texture = PIXI.Texture.from('images/bunny.png');
        app.loader
            .add('egghead', 'images/egghead.png')
            .add('flowerTop', 'images/flowerTop.png')
            .add('helmlok', 'images/helmlok.png')
            .add('skully', 'images/skully.png')
            .load(onAssetsLoaded);

        const SYMBOL_SIZE = 200;

        //게임 초기화
        let score = 0;
        let time = 60;
        
        //게임에 사용할 캐릭터
        const slotTextures = [
            PIXI.Texture.from('images/eggHead.png'),
            PIXI.Texture.from('images/flowerTop.png'),
            PIXI.Texture.from('images/helmlok.png'),
            PIXI.Texture.from('images/skully.png'),
        ];

        const reels = []; //reel의 객체를 넣을 배열
        //랜덤한 심볼을 저장하는 기능
        function onAssetsLoaded(){
            //랜덤한 심볼을 넣을 컨테이너 객체 생성 코드
            const reelContainer = new PIXI.Container();
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

        //버튼을 클릭하면 맨 밑에 있는 아이콘이 사라지는 코드 ( 수정할 필요가 다분해 보임.)
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
            //reels[0].container.y = 40 + SYMBOL_SIZE;

            for(let i = 0; i<reels.length ; i++){
                const rc = reels[i].container;
                rc.y = i * SYMBOL_SIZE;
            }
        }

        function newCharacter() {
            const reelContainer = reels[0].parent;
            const rc = new PIXI.Container();
            //rc.y = SYMBOL_SIZE;
            reelContainer.addChild(rc);
            let num = Math.floor(Math.random() * slotTextures.length);
            const symbol = new PIXI.Sprite(slotTextures[num]);

            reels.unshift({parent: reelContainer, symbol : num , container:rc});
            console.log(reels[0].symbol);
            rc.addChild(symbol); 
        }
            app.stage.addChild(buttonContainer);
            buttonContainer.x = app.screen.width / 2 ;
            buttonContainer.y = app.screen.height - 50;
            buttonContainer.pivot.x = buttonContainer.width/2;
            buttonContainer.pivot.y = buttonContainer.height/2;
    }
}