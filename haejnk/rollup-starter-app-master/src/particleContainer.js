import * as PIXI from 'pixi.js';
import { PlaneGeometry } from 'pixi.js';

export default class _
{
	constructor()
	{
		const app = new PIXI.Application();
		document.body.appendChild(app.view);

		const sprites = new PIXI.ParticleContainer(1000, {
			scale: true, 
			position: true,
			rotation: true,
			uvs: true,
			alpha: true,
		});
		// ParticleContainer : 속도만을 위해 구축된 컨테이너의 정말 빠른 버전
		// 많은 스프라이트나 파티클이 필요할 때 사용
		// uvs > uv 매핑? >> 2차원 그림을 3차원 모델로 만드는 3차원 모델링 프로세스
		// false : 미적용 | true : 적용

		app.stage.addChild(sprites);

		const maggots = [];
		// => 애플리케이션의 렌더러가 픽시렌더러 클래스에 속하면 10000, 아니면 100을 
		// 토탈스프라이트에 대입
		const totalSprites = app.renderer instanceof PIXI.Renderer ? 10000 : 100;
		// instanceof : 생성자의 prototype 속성이 객체의 프로토타입 체인 어딘가 존재하는지 판별
		// => 0부터 10000 또는 100 까지 반복
		for (let i = 0; i < totalSprites; i++) {
			// => 제공된 소스를 바탕으로 스프라이트 생성
			const dude = PIXI.Sprite.from('images/maggot_tiny.png');
			// => 스프라이트의 원점을 중심으로 설정, 크기를 랜덤으로 설정
			dude.anchor.set(0.5);
			dude.scale.set(0.8 + Math.random() * 0.3);
			// => x, y 좌표를 애플리케이션의 화면 크기를 제한으로, 랜덤으로 설정
			dude.x = Math.random() * app.screen.width;
			dude.y = Math.random() * app.screen.height;
			// => 색조 랜덤 설정
			dude.tint = Math.random() * 0x808080;
			// => 스프라이트의 방향과 선회속도 랜덤 설정
			dude.direction = Math.random() * Math.PI * 2;
			dude.turningSpeed = Math.random() - 0.8;
			// => 이동 속도 랜덤 설정
			dude.speed = (2 + Math.random() * 2) * 0.2;
			// => ?
			dude.offset = Math.random() * 100;
			// offset : 벌충하다, 상쇄하다
			maggots.push(dude);

			sprites.addChild(dude);
		}

		// => 사각형의 패딩 값 설정
		const dudeBoundsPadding = 100;
		// => 사각형 개체 생성
		const dudeBounds = new PIXI.Rectangle(
				-dudeBoundsPadding,
				-dudeBoundsPadding,
				app.screen.width + dudeBoundsPadding * 2,
				app.screen.height + dudeBoundsPadding * 2,
		);

		let tick = 0;

		app.ticker.add(() => {
				
			for (let i = 0; i < maggots.length; i++) {
				const dude = maggots[i];
				// => 세로 크기를 변화시킨다
				dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
				dude.direction += dude.turningSpeed * 0.01;
				// => sin, cos 값을 줘서 움직임을 다르게 표현
				dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
				dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
				// => 0 >> 360 >> 0  ...
				dude.rotation = -dude.direction + Math.PI;

				
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

				tick += 0.1;
		});
		
		/* 정리
		=> 아무 설정 없이 애플리케이션 객체 생성 후
		애플리케이션 렌더러 참조를 바디 요소의 자식 요소로 추가

		크기, 위치, 회전, 매핑, 투명값 속성을 적용(true) 으로 설정한
		정말 빠른 버전의 컨테이너 생성
		스테이지에 컨테이너를 자식 요소로 추가

		나중에 다루기 편하도록 빈 배열을 하나 생성한다
		애플리케이션의 렌더러가 픽시 렌더러의 프로토타입 체인상에 존재하는지를 판별 후
		참이면 10000, 거짓이면 100으로 값 설정

		판별된 값을 제한으로
		스프라이트를 생성 후
		원점, 크기, (x, y) 좌표, 색조, 방향, 선회속도, 오프셋 값을 설정한 뒤
		배열에 넣은 뒤
		빠른 버전의 컨테이너에 저장

		패딩값을 설정하고 사각형 객체를 생성

		애플리케이션의 업데이트 함수에
		배열을 돌며
		이미지의 세로 크기, 방향, (x, y) 좌표, 회전값을
		변경시키는 이벤트 핸들러 추가

		이미지는 사각형 영역 내에서 이동
		*/
	}
}
