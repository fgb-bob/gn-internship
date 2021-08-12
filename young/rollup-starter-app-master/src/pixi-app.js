import * as PIXI from 'pixi.js';

export default class {
    constructor(){
        const app = new PIXI.Application({ //pixi.application 클래스를 이용하여 픽시화면 생성.
            width: 300, height: 300, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(app.view); //docuemt.body에 (app.view)를 넣어 화면에 출력한다.

        const container = new PIXI.Container(); //화면에 출력할과 bunny이미지를 모아넣을 컨테이너.

        app.stage.addChild(container); //pixi.application으로 제작된 app객체의 자식으로 container를 넣는다.

        // Create a new texture
        const texture = PIXI.Texture.from('images/bunny.png'); //bunny.png로 texture로 만든다.


        const container_p = new PIXI.Container();
        app.stage.addChild(container_p);


        function bunny_1(){
            const bunny_t = new PIXI.Sprite(texture);
            bunny_t.anchor.set(0);
            bunny_t.x = 100;
            bunny_t.y = 40;
            bunny_t.tint = Math.random() * 0xffffff;
            bunny_t.scale.set(0.8 + Math.random() * 0.3);
            console.log(bunny_t.scale);
            container_p.addChild(bunny_t);
        }

        function bunny_2(){
            const bunny_t = new PIXI.Sprite(texture);
            bunny_t.anchor.set(0);
            bunny_t.x = 100;
            bunny_t.y = 0;
            bunny_t.blendMode = PIXI.BLEND_MODES.ADD;
            console.log(bunny_t.scale + "2");
            container_p.addChild(bunny_t);
        }
        
    
        container_p.x = app.screen.width /2 ;
        container_p.y = app.screen.height /2;

        container_p.pivot.x = container.width ;
        container_p.pivot.y = container.height ;

        bunny_1();
        bunny_2();


        // Create a 5x5 grid of bunnies
        for (let i = 0; i < 25; i++) { //5*5의 bunny grid를 만들어 container안에 넣어 자식으로 만들 반복문.
            const bunny = new PIXI.Sprite(texture); //texture로 저장한 bunny.png를 스프라이트로 하나의 스프라이트 이미지로 저장한다.
            bunny.anchor.set(0.5); //bunny 스프라이트의 어느 부분을 기준점으로 할 것인지.
            bunny.x = (i % 5) * 40; //i가 증가 할 수록, 
            bunny.y = Math.floor(i / 5) * 40; //i/5을 정수로 받아서 5의 배수가 될때만 y축으로 한개의 열이 추가
            container.addChild(bunny); //컨테이너의 자식요소로 한개의 스프라이트를 추가.
        }

        // Move container to the center
        //app을 기준으로 app의 가운데에 container를 위치하게하는 코드
        container.x = app.screen.width /2;
        container.y = app.screen.height / 2;

        // Center bunny sprite in local container coordinates
        //container의 기준점을 container의 가운데에 위치하게 하는 코드
        container.pivot.x = container.width /2;
        container.pivot.y = container.height /2 ;



        // Listen for animate update
        app.ticker.add((delta) => {
            // rotate the container!
            // use delta to create frame-independent transform
            container.rotation -= 0.01 * delta;
        });
    }
}