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

        //랜덤한 심볼을 저장하는 기능
        function onAssetsLoaded(){
            //랜덤한 심볼을 넣을 컨테이너 객체 생성 코드
            const reelContainer = new PIXI.Container();
            for(let i=0; i<10; i++){
                const rc = new PIXI.Container();
                rc.y = i * SYMBOL_SIZE;
                reelContainer.addChild(rc);

                const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
                rc.addChild(symbol);
                
            }
            app.stage.addChild(reelContainer);
            reelContainer.x = app.screen.width / 2; 
            reelContainer.y = app.screen.height / 2;
            reelContainer.pivot.x = reelContainer.width / 2;
            reelContainer.pivot.y = reelContainer.height / 2;
            reelContainer.scale.set(0.2);
        }

        //버튼 화면 구성
        
        const buttonContainer = new PIXI.Container();
        for(let h=0;h<slotTextures.length;h++){
            const bc = new PIXI.Container();
            const button = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            bc.addChild(button);
            bc.x = h * SYMBOL_SIZE;
            bc.scale.set(0.2);
            buttonContainer.addChild(bc);
        }
            app.stage.addChild(buttonContainer);





        // app.ticker.add((delta) => {
        //     container.rotation -= 0.01*delta;
        // });
    }
}