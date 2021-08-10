import * as PIXI from 'pixi.js';
import { PlaneGeometry } from 'pixi.js';

export default class _
{
	constructor()
	{
		// => 아무 설정 없이 애플리케이션 오브젝트 생성 후 
		const app = new PIXI.Application();
		// => 애플리케이션의 렌더러 참조를 바디 요소의 자식 요소로 추가
		document.body.appendChild(app.view);

		// => 배경이 될 스프라이트를 생성한다
		const background = PIXI.Sprite.from('images/bg_rotate.jpg');
		background.width = app.screen.width;
		background.height = app.screen.height;
		app.stage.addChild(background);

		// => 스프라이트를 집어넣을 배열을 생성한다
		const dudeArray = [];

		const totaldudes = 20;

		for (let i = 0; i < totaldudes; i++) {
				// => 스프라이트 생성
				const dude = PIXI.Sprite.from('images/flowerTop.png');

				dude.anchor.set(0.5);

				// => 랜덤 크기 설정
				dude.scale.set(0.8 + Math.random() * 0.3);

				// => 랜덤으로 위치 설정
				dude.x = Math.floor(Math.random() * app.screen.width);
				dude.y = Math.floor(Math.random() * app.screen.height);

				// => 블렌드 모드를 ADD (1) 로 설정한다
				dude.blendMode = PIXI.BLEND_MODES.ADD;
				// blend : 섞다, 혼합
				// add : 추가하다, 합하다

				// => 0 에서 360 사이의 랜덤값 방향으로 설정
				dude.direction = Math.random() * Math.PI * 2;
				// 움직임을 제어할 몇가지 추가 속성 만들기

				// => 선회속도 설정 > 방향을 수정하는데 사용된다 
				dude.turningSpeed = Math.random() - 0.8;

				// => 이동속도를 랜덤으로 설정
				dude.speed = 2 + Math.random() * 2;

				// => 쉽게 접근하기 위해 배열에 스프라이트 추가
				dudeArray.push(dude);
				// => 애플리케이션의 루트 컨테이너(스테이지)에 스프라이트를 자식 요소로 추가
				app.stage.addChild(dude);
		}

		// => 사각형 영역의 패딩값 설정 
		const dudeBoundsPadding = 100;
		// => 사각형 영역 생성
		const dudeBounds = new PIXI.Rectangle(
				-dudeBoundsPadding,
				-dudeBoundsPadding,
				app.screen.width + dudeBoundsPadding * 2,
				app.screen.height + dudeBoundsPadding * 2,
		);

		app.ticker.add(() => {
				// => 반복하여, 스프라이트의 방향과 위치(x, y), 회전값을 업데이트
				for (let i = 0; i < dudeArray.length; i++) {
						const dude = dudeArray[i];
						dude.direction += dude.turningSpeed * 0.01;
						dude.x += Math.sin(dude.direction) * dude.speed;
						dude.y += Math.cos(dude.direction) * dude.speed;
						dude.rotation = -dude.direction - Math.PI / 2;

						// => 사각형 영역안에 스프라이트 울타리 치기
						if (dude.x < dudeBounds.x) {
								dude.x += dudeBounds.width;
						} else if (dude.x > dudeBounds.x + dudeBounds.width) {
								dude.x -= dudeBounds.width;
						}

						if (dude.y < dudeBounds.y) {
								dude.y += dudeBounds.height;
						} else if (dude.y > dudeBounds.y + dudeBounds.height) {
								dude.y -= dudeBounds.height;
						}
				}
		});

		/* 정리
		=> 애플리케이션 객체 생성 후 렌더러 참조를 바디 요소의 자식 요소로 추가

		배경이 될 스프라이트 생성 및 스테이지에 추가

		스프라이트 배열 생성
		총 개수 설정

		스프라이트 생성
		원점, 크기, (x, y) 좌표, 블렌드 모드, 방향, 선회속도, 이동 속도를 설정 후
		배열에 넣은 뒤 스테이지에 스프라이트 추가

		패딩 값 설정, 사각형 영역 생성

		업데이트 함수에 
		스프라이트의 방향, (x, y) 좌표, 회전값을 업데이트 하는 이벤트 추가

		스프라이트는 사각형 영역 내에 있게 된다
		 */
	}
}
