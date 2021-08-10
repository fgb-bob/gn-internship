import * as PIXI from 'pixi.js';
import { PlaneGeometry } from 'pixi.js';

export default class _
{
	constructor()
	{
		// => 애플리케이션 생성
		const app = new PIXI.Application({
			width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
		});
		document.body.appendChild(app.view);
		// => 애플리케이션 로더에 로딩할 자원을 추가한 뒤 로딩이 완료되면 콜백 함수를 호출
		app.loader
			.add('bg_grass', 'images/bg_grass.jpg')
			.load(build);
	
		function build() {
			// 텍스처 생성
			const texture = app.loader.resources.bg_grass.texture;
			// resources : 이 로더의 모든 리소스 이름 키 지정
			// texture : 이미지 및 기타 텍스처를 로드하기 위한 텍스처 참조
	
			// x 축 꼭짓점이 10개, y 축 꼭짓점이 10개 인 평평한 면 생성
			const verticesX = 10;
			// vertices : vertex 의 복수 > 꼭짓점
			const verticesY = 10;
			const plane = new PIXI.SimplePlane(texture, verticesX, verticesY);
			// SimplePlane : 텍스처 크기가 변경되면 지오메트리가 자동으로 업데이트 됨
			// plane : (평평한) 면
			// texture : 사용할 텍스처
			// verticesX : x 축의 꼭짓점 수
			// verticesY : y 축의 꼭짓점 수
	
			// => 위치 (100, 100) 설정
			plane.x = 100;
			plane.y = 100;
	
			// => 스테이지에 자식 요소로 추가
			app.stage.addChild(plane);
	
			// => ?
			const buffer = plane.geometry.getBuffer('aVertexPosition');
			// getBuffer() : 요청된 버퍼 반환
			// getBuffer("여기") : 필요한 버퍼의 이름
			// ? 정점 위치에 대한 버퍼를 가져온다
	
			// 애니메이션 업데이트
			app.ticker.add((delta) => {
					// 정점 위치를 약간 무작위화하여 움직임을 만든다
					for (let i = 0; i < buffer.data.length; i++) {
						// 0부터 버퍼의 데이터의 길이 만큼 반복
							buffer.data[i] += (Math.random() - 0.5);
							// 버퍼의 i 번째 데이터에 랜덤값 추가
					}
					buffer.update();
					// update() : GPU에 업로드해야 하는 것으로 이 버퍼에 플래그를 지정
			});
		}

		/* 정리
		=> 가로 800, 세로 600, 배경색, 해상도가 설정된
		애플리케이션 객체 생성 후 렌더러 참조를 바디 요소의 자식 요소로 추가

		애플리케이션 로더에 로딩할 자원을 추가한 뒤 로딩이 완료되면 콜백 함수를 호출

		텍스처 참조를 변수에 담기

		X 축 꼭짓점, Y 축 꼭짓점 설정

		텍스처 참조와 x, y 꼭짓점으로 
		사용할 텍스처와 꼭짓점이 설정된 면 생성

		면의 (x, y) 좌표를 설정 후 스테이지에 자식 요소로 추가

		면의 기하학 구조와 관련된
		필요한 버퍼를 요청하여 버퍼를 받아온다

		업데이트 함수-티커에
		버퍼의 길이만큼 반복하여
		버퍼의 데이터를 랜덤으로 설정하여
		반복을 한 번 끝낼 때마다
		버퍼를 업데이트 한다
		 */
	}
}
