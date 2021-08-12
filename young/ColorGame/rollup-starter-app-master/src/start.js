import * as PIXI from 'pixi.js';
import game from './game';
//

export default class {
    constructor(){
        //application으로 화면 생성
        const app = new PIXI.Application();
        document.body.appendChild(app.view);


        // ------------------- 화면 구성하는 이미지들 설정 코드 ---------------------------
        //게임 배경 설정
        const background = PIXI.Sprite.from('images/bg_rotate.jpg');
        background.width = app.screen.width;
        background.height = app.screen.height;
        app.stage.addChild(background);

        //버튼의 이미지 설정
        const textureButton = PIXI.Texture.from('images/button.png');
        const textureButtonDown = PIXI.Texture.from('images/button_down.png');
        const textureButtonOver = PIXI.Texture.from('images/button_over.png');

        //버튼의 위치와 속성 설정
        const button = new PIXI.Sprite(textureButton);
        button.x = app.screen.width / 2;
        button.y = app.screen.height / 2 ;
        button.anchor.set(0.5);
        button.interactive = true;
        button.buttonMode = true;
        button
            .on('pointerdown', onButtonDown)
            .on('pointerup', onButtonUp)
            .on('pointerupoutside',onButtonUp)
            .on('pointerover', onButtonOver)
            .on('pointerout', onButtonOut);
        app.stage.addChild(button);


        //----------------- 버튼에 마우스를 올렸을 때 호출되는 동작들 -------------------

        //마우스를 눌렀을 때
        function onButtonDown(){
            this.isdown = true;
            this.texture = textureButtonDown;
            //버튼을 클릭하면 기존의 body 부분에 있던 내용은 지우고 new game.js 를 호출
            document.body.removeChild(app.view);
            new game();
        }

        //마우스클릭을 떼었을 때
        function onButtonUp(){
            this.isdown = false;
            if (this.isOver){
                this.texture = textureButtonOver;
            }else {
                this.texture = textureButton;
            }
        }

        //마우스를 올려두었을 때
        function onButtonOver(){
            this.isOver = true;
            if(this.isdown){
                return;
            }
            this.texture = textureButtonOver;
        }

        //마우스가 버튼영역 밖으로 나갔을 때
        function onButtonOut(){
            this.isOver = false;
            if (this.isdown){
                return;
            }
            this.texture = textureButton;
        }
    }
}