import * as PIXI from 'pixi.js';
// import { PlaneGeometry } from 'pixi.js';
import P from './colorMatchGame-play-ele';
// import R from './colorMatchGame-result';

export default class _
{
	constructor(APP = null, NEXT = false)
	{
		console.log("here");
		const that = this;
		this.APP = APP;
		
		if(!NEXT) {
			return;
		} else {
			const startBtnContainer = new PIXI.Container();
	
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
				})
			];
			const colorArr = [0xa8ff78, 0x78ffd6, 0x88df58, 0x58dfb6];
			
			let startText = new PIXI.Text('START', textStyle[0]);
			startText.x = this.APP.view.width/3 - 15;
			startText.y = this.APP.view.height/2 + 4;
	
			const startBtn = new PIXI.Graphics();
	
			function reDraw(btn, a, b) {
				btn.lineStyle(3,colorArr[b]);
				btn.beginFill(colorArr[a], 0.7);
				btn.drawRoundedRect(that.APP.view.width/3 - 50, that.APP.view.height/2, 250, 70);
				btn.endFill();
			}
			reDraw(startBtn, 0, 1);
			
			startBtn.interactive = true;
			startBtn.buttonMode = true;
	
			startBtn
			.on('pointerdown', onButtonDown)
			.on('pointerup', onButtonUp);
	
			startBtn.addChild(startText);
			startBtnContainer.addChild(startBtn);
			this.APP.stage.addChild(startBtnContainer);
	
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
	
				that.setStart(true);
	
				startBtn.addChild(startText);
				
				if(that.getStart()) {
					// console.log(that.getStage());
					that.getClear().removeChild(startBtnContainer);
					
					new P(that.APP, true);
				}
			}
		}
	}

	setStart(v) {
		this.START = v;
	}

	getStart() {
		return this.START;
	}

	getClear() {
		return this.APP.stage;
	}
}
