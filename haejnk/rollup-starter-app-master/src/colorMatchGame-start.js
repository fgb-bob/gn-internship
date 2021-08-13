import * as PIXI from 'pixi.js';
import P from './colorMatchGame-play-ele';

export default class _
{
	constructor(APP = null, NEXT = false)
	{
		// main 에서 받아온 Application - 배경 위에 컨테이너 배치
		const that = this;
		this.APP = APP;
		// NEXT 값이 true 가 아니면 실행하지 않음
		if(!NEXT) {
			return;
		} else {
			const startContainer = new PIXI.Container();
			// 시작 버튼 컨테이너를 생성
			const startBtnContainer = new PIXI.Container();
			// 스타일 정의
			const textStyle = [
				new PIXI.TextStyle({
					fontFamily: 'Arial',
					fontSize: 55,
					fontWeight: 'bold',
					fill: ['#dd1818', '#333333'],
				}),
				new PIXI.TextStyle({
					fontFamily: 'Arial',
					fontSize: 55,
					fontWeight: 'bold',
					fill: ['#333333', '#dd1818'],
				}),
				new PIXI.TextStyle({
					fontFamily: 'Roboto',
					fontSize: 45,
					fontWeight: 'bold',
					fill: ['#12c2e9', '#c471ed', '#f64f59'],
					stroke: '#141E30',
					strokeThickness: 5,
				}),
			];
			const colorArr = [0xa8ff78, 0x78ffd6, 0x88df58, 0x58dfb6];
			// 시작 버튼에 넣을 텍스트 생성
			let startText = new PIXI.Text('START', textStyle[0]);
			startText.x = this.APP.view.width/3 - 15;
			startText.y = this.APP.view.height/2 + 4;
			
			//color | match | game
			const textArr = [
				new PIXI.Text('Color', textStyle[2]),
				new PIXI.Text('Match', textStyle[2]),
				new PIXI.Text('Game', textStyle[2])
			];

			for(let i = 0; i < textArr.length; i++) {
				textArr[i].x = (this.APP.view.width * (2 + i*3)) / 10;
				textArr[i].y = this.APP.view.height/3;
				textArr[i].anchor.set(0.5);
				textArr[i].rotation = (i - 1) * 0.5;
			}
			
			// 시작 버튼의 도형 생성
			const startBtn = new PIXI.Graphics();
	
			function reDraw(btn, a, b) {
				btn.lineStyle(3,colorArr[b]);
				btn.beginFill(colorArr[a], 0.7);
				btn.drawRoundedRect(that.APP.view.width/3 - 50, that.APP.view.height/2, 250, 70);
				btn.endFill();
			}
			// 도형 그리기를 함수로 작성
			reDraw(startBtn, 0, 1);
			// 시작 버튼의 상호작용 적용, 버튼 모드 설정
			startBtn.interactive = true;
			startBtn.buttonMode = true;
			// 버튼에 이벤트 장착
			startBtn
			.on('pointerdown', onButtonDown)
			.on('pointerup', onButtonUp);
	
			startBtn.addChild(startText);
			startBtnContainer.addChild(startBtn);
			for(let i = 0; i < textArr.length; i++) {
				startContainer.addChild(textArr[i]);
			}
			startContainer.addChild(startBtnContainer);
			this.APP.stage.addChild(startContainer);
	
			// 눌렀을 때
			function onButtonDown() {
				startBtn.clear();
				startText.destroy();
	
				startText = new PIXI.Text('START', textStyle[1]);
				startText.x = that.APP.view.width/3 - 15;
				startText.y = that.APP.view.height/2 + 4;
				reDraw(startBtn, 2, 3);
	
				startBtn.addChild(startText);
			}
	
			// 땠을 때
			function onButtonUp() {
				startBtn.clear();
				startText.destroy();
	
				startText = new PIXI.Text('START', textStyle[0]);
				startText.x = that.APP.view.width/3 - 15;
				startText.y = that.APP.view.height/2 + 4;
				reDraw(startBtn, 0, 1);
	
				startBtn.addChild(startText);
				// 버튼을 누른 경우, 화면에 그려놓은 도형과 텍스트를 지우고
				that.getClear().removeChild(startContainer);
				// 플레이 페이지를 생성한다
				new P(that.APP, true);
			}
		}
	}

	getClear() {
		return this.APP.stage;
	}
}
