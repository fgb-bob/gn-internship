import * as PIXI from 'pixi.js';
import { PlaneGeometry } from 'pixi.js';

export default class _
{
	constructor()
	{
		const app = new PIXI.Application({ transparent: true });
		document.body.appendChild(app.view);

		// => 이번에는 이미지를 텍스처로 만들지 않고
		// 바로 스프라이트로 이미지 생성
		const bunny = PIXI.Sprite.from('images/bunny.png');
		// Texture 는 디스플레이 목록에 직접 추가할 수는 없다
		// 대신 Sprite 의 텍스처로는 사용이 가능하다

		bunny.anchor.set(0.5);

		// => 이미지의 x 좌표를 애플리케이션의 화면 너비의 절반으로 설정
		bunny.x = app.screen.width / 2;
		// screen : 렌더러의 화면 사각형에 대한 참조
		// => 이미지의 y 좌표를 애플리케이션의 화면 높이의 절반으로 설정
		bunny.y = app.screen.height / 2;
		// => 애플리케이션의 루트 컨테이너에 이미지를 자식요소로 추가
		app.stage.addChild(bunny);
		// => 애플리케이션의 업데이트 루프를 실행하는 티커에 이벤트 핸들러 장착
		app.ticker.add(() => {
			// => 이미지의 회전 속성을 시계 방향으로 증가
			bunny.rotation += 0.1;
		});

		/* 정리
		=> 투명함 속성을 적용시킨 애플리케이션 객체를 생성한 뒤 
		애플리케이션 렌더러 참조를 바디 요소의 자식 요소로 추가

		(이미지를 텍스처로 생성하지 않고)
		바로 스프라이트로 생성

		스프라이트의 회전중심축, x 좌표, y 좌표 를 설정한 뒤
		애플리케이션의 루트 컨테이너(스테이지)에 자식 요소로 추가

		애플리케이션의 티커(업데이트 함수)에 
		스프라이트를 회전시키는 이벤트 핸들러 추가
		*/
	}
}
