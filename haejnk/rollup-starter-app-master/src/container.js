import * as PIXI from 'pixi.js';
import { PlaneGeometry } from 'pixi.js';

export default class _
{
	constructor()
	{
		// => 가로 800, 세로 600, 배경색 및 해상도가 설정된 애플리케이션 오브젝트 생성
		const app = new PIXI.Application({
			width: 800, height: 600,
			backgroundColor: 0x1099bb, resolution:window.devicePixelRatio || arguments,
		});
		// Application : 새로운 PIXI 애플리케이션을 생성하기 위한 편의 클래스
		// 이 클래스는 렌더러, 티커 및 루트 컨테이너를 자동으로 생성한다

		// => 애플리케이션의 렌더러 참조를 바디 자식 요소로 추가한다
		document.body.appendChild(app.view);
		// view : 렌더러의 캔버스 요소에 대한 참조

		// => 범용 디스플레이 오브젝트를 생성한다
		const container = new PIXI.Container();
		// Container : 자식을 포함하는 범용 디스플레이 객체
		// Graphics 및 Sprite 를 비롯한 다른 객체의 컨테이너 역할을 하는 모든 디스플레이 객체의 기본 클래스

		// => 애플리케이션의 루트 컨테이너(스테이지)에 범용 디스플레이 오브젝트를 자식으로 추가한다
		app.stage.addChild(container);
		// stage : 렌더링되는 루트 디스플레이 컨테이너
		// addChild : 컨테이너에 하나 이상의 자식을 추가

		// => 제공된 소스를 기반으로 새 텍스터 생성
		const texture = PIXI.Texture.from('images/bunny.png');
		// Texture : 이미지 또는 이미지의 일부를 나타내는 정보를 저장
		// from() : 제공한 소스를 기반으로 새 텍스처를 생성하는 도우미 함수
		
		// => 0 에서 25까지 반복한다
		for(let i = 0; i < 25; i++) {
			// => 텍스처를 스프라이트 이미지(버니)로 생성
			const bunny = new PIXI.Sprite(texture);
			// Sprite : 화면에 렌더링되는 모든 텍스처 개체의 기반
			// => 이미지의 원점을 중심(0.5| x, y)으로 설정한다
			bunny.anchor.set(0.5);
			// anchor : 닻
			// => 이미지의 x 좌표를 0, 40, 80, 120, 160, ... 으로 설정
			bunny.x = (i % 5) * 40;
			// => 이미지의 y 좌표를 0, 0,... 40,40, ... 80,80,... 으로 설정
			bunny.y = Math.floor(i / 5) * 40;
			// => 컨테이너에 원점, x, y 좌표가 설정된 이미지를 자식 요소로 추가
			container.addChild(bunny);
		}

		// => 컨테이너의 x 축의 중심축을 컨테이너의 너비의 절반으로 설정
		container.pivot.x = container.width / 2;
		// pivot : 중심축
		// => 컨테이너의 y 축의 중심축을 컨테이너의 높이의 절반으로 설정
		container.pivot.y = container.height / 2;

		// => 애플리케이션의 업데이트 루프를 실행하는 티커에 델타 값을 받는 이벤트 핸들러 장착
		app.ticker.add((delta) => {
			// ticker : 렌더 업데이트 수행을 위한 티커
			// 유니티의 Update() 와 비슷한 역할을 하는 것 같다
			// add() : 틱 이벤트에 대한 핸들러를 등록.
			// 제거되거나 티커가 중지되지 않는 한 계속해서 호출.
			// => 컨테이너가 시계 반대방향으로 돌게 한다
			container.rotation -= 0.01 * delta;
			// rotation : 회전
			// 음수 : 시계반대방향 | 양수 : 시계방향
		});
		
		/* 정리
		=> 가로 800, 세로 600, 배경색 및 해상도가 설정된 애플리케이션 객체를 생성한 뒤
		애플리케이션 렌더러 참조를 바디 요소의 자식 요소로 추가한다
		
		범용 디스플레이 객체인 컨테이너를 하나 생성한 뒤
		애플리케이션의 루트 컨테이너(스테이지)에 자식요소로 추가한다

		스프라이트로 만들 텍스처 이미지 생성
		원점은 중심이고 x 좌표, y 좌표를 임의의 값으로 설정한 뒤
		스테이지에 자식으로 추가했던 컨테이너에
		자식 요소로 추가.

		스테이지에 자식으로 추가했던 컨테이너의 x 축의 피봇과 y 축의 피봇(회전 중심축)을 설정한 뒤
		애플리케이션의 티커에 
		컨테이너를 회전시키는 이벤트 핸들러 추가
		*/
	}
}
