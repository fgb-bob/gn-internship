import * as PIXI from 'pixi.js';
import P from './colorMatchGame-play-ele';

import Util from './game-util';

export default class _
{
	createStartBtn()
	{
		this.startContainer = new PIXI.Container();
		// 시작 버튼 컨테이너를 생성
		this.startBtnContainer = new PIXI.Container();

		// 시작 버튼에 넣을 텍스트 생성
		this.startText = new PIXI.Text('START', this.textStyle[0]);
		this.startText.x = this.app.view.width/3 - 15;
		this.startText.y = this.app.view.height/2 + 4;

		// 시작 버튼의 도형 생성
		this.startBtn = new PIXI.Graphics();
			
		// 도형 그리기를 함수로 작성
		Util.reDraw(this.startBtn, 0, 1, this.colorArr, this.app.view.width, this.app.view.height);
		// 시작 버튼의 상호작용 적용, 버튼 모드 설정
		this.startBtn.interactive = true;
		this.startBtn.buttonMode = true;
		// 버튼에 이벤트 장착
		this.startBtn
		.on('pointerdown', () => { this.onButtonDown(); })
		.on('pointerup', () => { this.onButtonUp(); });
	
		this.startBtn.addChild(this.startText);
		this.startBtnContainer.addChild(this.startBtn);
		for(let i = 0; i < this.textArr.length; i++) {
			this.startContainer.addChild(this.textArr[i]);
		}

		this.startContainer.addChild(this.startBtnContainer);
		this.app.stage.addChild(this.startContainer);
	}

	initExp()
	{
		// 스타일 정의
		this.textStyle = [
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

		this.colorArr = [0xa8ff78, 0x78ffd6, 0x88df58, 0x58dfb6];
		
		//color | match | game
		this.textArr = [
			new PIXI.Text('Color', this.textStyle[2]),
			new PIXI.Text('Match', this.textStyle[2]),
			new PIXI.Text('Game', this.textStyle[2])
		];

		for(let i = 0; i < this.textArr.length; i++) {
			this.textArr[i].x = (this.app.view.width * (2 + i*3)) / 10;
			this.textArr[i].y = this.app.view.height/3;
			this.textArr[i].anchor.set(0.5);
			this.textArr[i].rotation = (i - 1) * 0.5;
		}
	}

	constructor(app)
	{
		if (app == null)
		{
			throw new Error("Invalid arguments!");
		}

		this.app = app;

		this.initExp();
		this.createStartBtn();
	}

	// 눌렀을 때
	onButtonDown() {
		this.startBtn.clear();
		this.startText.destroy();

		this.startText = new PIXI.Text('START', this.textStyle[1]);
		this.startText.x = this.app.view.width/3 - 15;
		this.startText.y = this.app.view.height/2 + 4;
		Util.reDraw(this.startBtn, 2, 3, this.colorArr, this.app.view.width, this.app.view.height);

		this.startBtn.addChild(this.startText);
	}

	// 땠을 때
	onButtonUp() {
		this.startBtn.clear();
		this.startText.destroy();

		this.startText = new PIXI.Text('START', this.textStyle[0]);
		this.startText.x = this.app.view.width/3 - 15;
		this.startText.y = this.app.view.height/2 + 4;
		Util.reDraw(this.startBtn, 0, 1, this.colorArr, this.app.view.width, this.app.view.height);

		this.startBtn.addChild(this.startText);
		// 버튼을 누른 경우, 화면에 그려놓은 도형과 텍스트를 지우고
		this.app.stage.removeChild(this.startContainer);
		// 플레이 페이지를 생성한다
		new P(this.app, true);
	}
}
