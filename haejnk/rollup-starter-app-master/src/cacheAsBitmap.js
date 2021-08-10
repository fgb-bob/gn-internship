import * as PIXI from 'pixi.js';
import { PlaneGeometry } from 'pixi.js';

export default class _
{
	constructor()
	{
		// => 아무 설정 없이 애플리케이션 오브젝트 생성
		const app = new PIXI.Application();
		// => 애플리케이션의 렌더러 참조를 바디 요소의 자식 요소로 추가
		document.body.appendChild(app.view);
		// => 렌더링 중지
		app.stop();
		// stop() : 렌더링을 중지하는 편리한 방법
		// => 애플리케이션 로더에 로딩할 자원을 추가한 뒤 로딩이 완료되면 콜백 함수를 호출한다
		app.loader.add('spritesheet','images/monsters.png').load(onAssetsLoaded);
		// loader : 애셋 로딩에 도움이 되는 로더 인스턴스
		// add() : 로더 대기열에 자원 (또는 여러 자원)을 추가한다
		// load() : 대기 중인 리소스 로드를 시작한다
		// load("여기") : '완료' 이벤트에 바인딩 되는 선택적 콜백 함수
		// load : 적재 | 컴퓨터에서 로드 란 데이터를 메모리에 적재(올림)하는 것을 의미한다
		const aliens = [];
		const alienFrames = [
			'eggHead.png',
			'flowerTop.png',
			'helmlok.png',
			'skully.png',
		];

		let count = 0;

		const alienContainer = new PIXI.Container();
		alienContainer.x = 400;
		alienContainer.y = 300;
		// => 애플리케이션의 스테이지의 상호작용 속성을 참으로 설정
		// 이렇게 되면 사용자의 액션에 상호작용을 하게 된다
		app.stage.interactive = true;
		app.stage.addChild(alienContainer);

		function onAssetsLoaded() {
			for(let i = 0; i < 100; i++) {
				// => 배열 안 이미지를 0번째에서 3번째까지
				// 반복적으로 선택하여 가져온다
				const frameName = alienFrames[i % 4];
				// => 가져온 이미지를 스프라이트로 만든다
				const alien = PIXI.Sprite.from(frameName);
				// => 스프라이트의 색조를 랜덤하게 바꾼다
				alien.tint = Math.random() * 0xFFFFFF;
				// => 스프라이트의 x, y 좌표를 제한된 랜덤값으로 설정
				alien.x = Math.random() * 800 - 400;
				alien.y = Math.random() * 600 - 300;
				// => 스프라이트의 원점을 중심으로 설정
				alien.anchor.x = 0.5;
				alien.anchor.y = 0.5;
				// => (처음에 빈) 배열에 스프라이트 추가
				aliens.push(alien);
				// => 컨테이너에 스프라이트를 자식 요소로 추가
				alienContainer.addChild(alien);
			}
			// => 애플리케이션을 렌더링한다
			app.start();
			// start() : 렌더링을 시작하기 위한 편리한 방법
			// 렌더링이란 : 브라우저에 뿌려주는 과정
		}
		// => 애플리케이션의 스테이지에 이벤트 리스너와 해당 이벤트의 핸들러 추가
		app.stage.on('pointertap', onClick);
		// on() : 주어진 이벤트에 대한 리스너를 추가한다
		// js 의 addEventLister 와 역할이 비슷해 보인다
		// pointertap : 포인터 장치 버튼을 눌렀다가 놓을 때 발생

		function onClick() {
			// => 함수를 호출할 때마다 true, false 값을 번갈아 저장한다
			// 이렇게 되면 true 일 때는 스냅샷을 찍었다가
			// false 일 때는 스냅샷 속성을 제거한다
			alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;
			// cacheAsBitmap : 그 순간의 디스플레이 객체의 스냅샷을 찍는다
			// true : 비트맵으로 캐시한다 | false : 제거
			// cache : 주기억 장치와 자기 디스크 사이의 고속 기억 장치
		}

		app.ticker.add(() => {
			for(let i = 0; i < 100; i++) {
				// => 배열에서 스프라이트를 하나씩 꺼내어
				const alien = aliens[i];
				// => 회전값을 증가시켜 회전시킨다
				alien.rotation += 0.1;
			}

			count += 0.01;
			// => x 축 방향 크기와 y 축 방향 크기를
			// 사인 함수를 사용하여 컨테이너의 크기를 키웠다, 줄였다를 반복한다
			alienContainer.scale.x = Math.sin(count);
			alienContainer.scale.y = Math.sin(count);
			// sin 값이 계속 증가하여도, 그 결과값은 원형을 이룬다
			// => 컨테이너의 회전값을 증가시켜 회전시킨다
			alienContainer.rotation += 0.01;
		});

		/* 정리
		=> 아무 설정없이 애플리케이션 객체 생성
		애플리케이션 렌더러 참조를 바디 요소의 자식 요소로 추가

		렌더링 중지

		애플리케이션의 로더에 로딩할 자원을 추가한 뒤 로딩이 완료되면 콜백함수 호출

		나중에 다루기 편하도록 스프라이트를 담을 빈 배열을 하나 생성 후
		나중에 다룰 이미지들을 배열에 담는다

		크기를 다룰 때 사용될 값을 담을 변수 설정

		컨테이너를 생성한 뒤 (x, y) 좌표 설정

		애플리케이션의 루트 컨테이너(스테이지)의 속성 중
		사용자와 상호작용하는 속성을 참으로 설정한 뒤
		스테이지에 위에서 만든 컨테이너를 자식 요소로 추가

		로딩이 완료되면 호출될 콜백함수 : 
		이미지배열에서 하나씩 가져와서 스프라이트로 만든 뒤
		색조와 (x, y) 좌표, 회전 중심축을 설정한 뒤
		배열에 담고, 컨테이너에도 자식 요소로 추가한다
		반복을 끝내면 애플리케이션을 렌더링한다

		애플리케이션의 스테이지에
		클릭할 때마다 스냅샷 속성을 켰다 껏따를 전환하는
		이벤트 추가

		애플리케이션의 업데이트 함수에
		배열의 스프라이트를 하나씩 꺼내어 회전값을 증가시키고
		컨테이너의 크기를 키웠다 줄였다를 반복하고
		컨테이너를 회전시키는 이벤트 핸들러 장착
		*/
	}
}
