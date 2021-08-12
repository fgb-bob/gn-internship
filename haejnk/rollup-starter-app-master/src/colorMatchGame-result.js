import * as PIXI from 'pixi.js';
// import { PRECISION } from 'pixi.js';
import S from './colorMatchGame-start';

export default class _
{
	constructor(APP = null, NEXT = false, SCORE = 0)
	{
		this.APP = APP;
		const that = this;

		let ticker = PIXI.Ticker.shared;
		ticker.autoStart = false;
		ticker.stop();
		
		if(!NEXT) {
			return;
		} else {
			if(NEXT) {
				ticker.start();
			}
			// PIXI.Ticker.system.stop();
			// ticker.start();
			const TextContainer = new PIXI.Container();
			const rePlayBtnContainer = new PIXI.Container();
			const rePlayContainer = new PIXI.Container();
	
			const colorPick = [
				0x8323d0,
				0x2948ff,
				0x1CB5E0,
				0x000046,
			];
	
			rePlayContainer.addChild(TextContainer);
			rePlayContainer.addChild(rePlayBtnContainer);

			// 점수 텍스트
			const scoreStyle = new PIXI.TextStyle({
				fontFamily: 'Arial',
				fontSize: 60,
				fontWeight: 'bold',
				fill: ['#FF4E50', '#F9D423'],
				stroke: '#00F260',
				strokeThickness: 5,
				dropShadowAlpha: 0.6,
				dropShadow: true,
				dropShadowColor: '#0575E6',
				dropShadowBlur: 3,
				dropShadowAngle: Math.PI / 9,
				dropShadowDistance: 6
			});
	
			const scoreText = new PIXI.Text(`${SCORE*10}`, scoreStyle);
			scoreText.x = this.APP.view.width / 2 - 50;
			scoreText.y = this.APP.view.height / 5;
			
			// 리플레이 버튼 도형
			const rePlayBtn = new PIXI.Graphics();
		
			function reDraw(obj, lineColor, fillColor) {
				obj.lineStyle(4, lineColor);
				obj.beginFill(fillColor, 0.3);
				obj.drawRoundedRect(that.APP.view.width/5 + 25, that.APP.view.height/2, 250, 80);
				obj.endFill();
			}
			reDraw(rePlayBtn, colorPick[1], colorPick[0]);
	
			rePlayBtn.interactive = true;
			rePlayBtn.buttonMode = true;
			
			// 리플레이 버튼 텍스트
			const rePlayTextStyle = new PIXI.TextStyle({
				fontFamily: 'Roboto',
				fontSize: 45,
				fontWeight: 'bold',
				fill: ['#78ffd6', '#007991'],
			});
			const rePlayText = new PIXI.Text("RePlay", rePlayTextStyle);
			rePlayText.x = this.APP.view.width/3 + 10;
			rePlayText.y = this.APP.view.height/2 + 10;

			TextContainer.addChild(scoreText);
			rePlayBtn.addChild(rePlayText);
			rePlayBtnContainer.addChild(rePlayBtn);
			this.APP.stage.addChild(rePlayContainer);
	
			this.APP.ticker;

			rePlayBtn
			.on('pointerdown', () => {
				console.log("down");
				rePlayBtn.clear();
	
				reDraw(rePlayBtn, colorPick[3], colorPick[2]);
			})
			.on('pointerup', () => {
				console.log("up");
				rePlayBtn.clear();
				
				reDraw(rePlayBtn, colorPick[1], colorPick[0]);
				
				// 시작 페이지로 넘어가기
				this.APP.stage.removeChild(rePlayContainer);

				new S(this.APP, true);
			});
	
			

			// function onButtonDown() {
			// }
	
			// function onButtonUp() {
			// }
		}
	}
}
