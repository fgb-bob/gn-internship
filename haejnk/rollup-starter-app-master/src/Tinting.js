import * as PIXI from 'pixi.js';
import { PlaneGeometry } from 'pixi.js';

export default class _
{
	constructor()
	{
		// => 아무 설정 없이 애플리케이션 오브젝트 생성
		const app = new PIXI.Application();
		// => 애플리케이션의 렌더러 참조를 바디 자식 요소로 추가
		document.body.appendChild(app.view);

		// => 빈 배열 생성
		const aliens = [];
		// => 총 수 20으로 설정
		const totalDudes = 20;
		// => 0부터 20까지 반복
		for(let i = 0; i < totalDudes; i++) {
			// => 텍스처를 사용않고 바로 스프라이트로 이미지 생성
			const dude = PIXI.Sprite.from('images/eggHead.png');
			// => 이미지의 원점, 중심으로 설정
			dude.anchor.set(0.5);
			// => 이미지의 사이즈(x, y) 를 0.8에서 1.09999.. 사이 랜덤값으로 설정
			dude.scale.set(0.8 + Math.random() * 0.3);
			// => 이미지의 x 좌표, y 좌표를 0에서 애플리케이션의 화면 너비, 높이 사이의 랜덤값으로 설정
			dude.x = Math.random() * app.screen.width;
			dude.y = Math.random() * app.screen.height;
			// => 이미지의 색조를 랜덤값으로 설정
			dude.tint = Math.random() * 0xFFFFFF;
			// tint : 색조
			// 0xFFFFFF 는 색조 효과 제거
			// => 이미지의 시작방향 랜덤 설정
			dude.direction = Math.random() * Math.PI * 2;
			// direction : 방향
			dude.turningSpeed = Math.random() - 0.8;
			// turningSpeed : 선회 속도
			// 음수 : 시계 방향 | 양수 : 시계 반대방향
			// 이미지의 회전반경(절대값이 클수록 중심축으로부터 멀어짐) 과
			// 속도(절대값이 클수록 빨라짐) 에 영향을 줌
			// => 이미지의 이동속도를 2에서 4 사이의 랜덤값으로 설정
			dude.speed = 2 + Math.random() * 2;
			// => 배열에 위의 설정들이 세팅된 이미지를 집어 넣는다
			aliens.push(dude);
			// => 애플리케이션의 루트 컨테이너에 값들이 세팅된 이미지를 자식 요소로 추가한다
			app.stage.addChild(dude);
		}
		// => 경계 패딩 값 100으로 설정
		const dudeBoundsPadding = 100;
		// => x : -100, y : -100, 너비 : 애플리케이션 화면 너비 + 200, 높이 : 애플리케이션 화면 높이 + 200 로 설정된
		// 사각형 영역을 만든다
		const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding,
			app.screen.width + dudeBoundsPadding * 2, 
			app.screen.height + dudeBoundsPadding * 2);
			// Rectangle : 왼쪽 위 모러시 지점(x, y)과 너비 및 높이
			// 로 표시되는 위치로 정의되는 영역입니다
		// => 애플리케이션의 티커에 이벤트 핸들러 장착
		app.ticker.add(() => {
			// => 0 부터 20까지 반복
			for(let i = 0; i < aliens.length; i++) {
				// => 배열의 각 요소(이미지)를 가져온다
				const dude = aliens[i];
				// => 선회속도에 0.01을 곱한 값을 방향로 추가, 증가
				dude.direction += dude.turningSpeed * 0.01;
				// => 사인값 * 속도를 이미지의 x 좌표로 추가, 증가
				dude.x += Math.sin(dude.direction) * dude.speed;
				// => 코사인 * 속도를 이미지의 y 좌표로 추가, 증가
				dude.y += Math.cos(dude.direction) * dude.speed;
				// => 0 >> 360 >> 0 ... 반복
				dude.rotation = -dude.direction - Math.PI / 2;
				// => 이미지의 x 좌표가 -100보다 작으면
				if(dude.x < dudeBounds.x) {
					// => 이미지의 x 좌표에서 사각형 영역의 너비(애플리케이션 화면 + 200) 추가
					dude.x += dudeBounds.width;
					// => 이미지의 x 좌표가 -100 + 사각형 영역의 너비(애플리케이션 화면 + 200) 보다 크면
				} else if(dude.x > dudeBounds.x + dudeBounds.width) {
					// => 이미지의 x 좌표에서 사각형 영역의 너비(애플리케이션 화면 + 200) 감소 
					dude.x -= dudeBounds.width;
				}
				// => 이미지의 y 좌표가 -100 보다 작으면
				if(dude.y < dudeBounds.y) {
					// => 이미지의 y 좌표에 사각형 영역의 높이(애플리케이션 화면 + 200) 추가
					dude.y += dudeBounds.height;
					// => 이미지의 y 좌표가 -100 + 사각형 영역의 높이(애플리케이션 화면 + 200) 보다 크면
				} else if(dude.y > dudeBounds.y + dudeBounds.height) {
					// => 이미지의 y 좌표에서 사각형 영역의 높이(애플리케이션 화면 + 200) 감소
					dude.y -= dudeBounds.height;
				}
			}
		});

		/* 정리
		=> 아무 설정 없이 애플리케이션 객체 생성 후
		애플리케이션 렌더러 참조를 바디 요소의 자식 요소로 추가

		나중에 다루기 편하도록 스프라이트를 담을 빈 배열을 하나 생성 후
		반복할 값(총 스프라이트의 개수) 설정

		스프라이트를 생성한 뒤
		스프라이트의 원점, 크기, (x, y) 좌표, 색조, 시작 방향(각도), 선회 속도, 이동 속도를 설정한 뒤
		배열에 스프라이트를 담은 뒤
		애플리케이션의 루트 컨테이너(스테이지)에 자식 요소로 추가.

		패딩 값을 설정하고
		(x, y) 꼭짓점의 좌표와 너비와 높이가 설정된 사각형 영역 생성

		애플리케이션의 업데이트함수-티커에 
		각 배열을 순차적으로 돌며
		방향, (x, y) 좌표, 회전값을 변경시키는 이벤트 핸들러 추가
		
		스프라이트는 사각형 영역 내에 있게 된다
		*/
	}
}
