import * as PIXI from 'pixi.js';
import R from './colorMatchGame-result';

export default class _
{
	constructor(APP = null, NEXT = false)
	{		
		this.APP = APP;
		const that = this;
		this.score = 0;
		let _score = 0;
		// ticker 안에서 방어를 취할 변수 설정
		this.COUNT = 0;

		if(!NEXT) {
			return;
		} else {			
			// 플레이를 담당하는 컨테이너
			const playContainer = new PIXI.Container();
	
			// timer / 타이머를 담당하는 컨테이너
			const timerContainer = new PIXI.Container();
	
			const timerTextStyle = new PIXI.TextStyle({
				fontFamily: 'Gill Sans',
				fontSize: 50,
				fill: ['#91EAE4', '#000C40'],
				align: 'center',
				stroke: '#000C40',
				strokeThickness: 2,
			});
			// 화면에 플레이 시간을 텍스트로 표시한다
			this.time = 60;
			let timerText = new PIXI.Text(`${this.time}`, timerTextStyle);
			const timerBack = new PIXI.Graphics();
			const timer = new PIXI.Graphics();
			
			timerText.x = this.APP.view.width / 2 - 15;
			timerText.y = 5;
			// 타이머 게이지를 그래픽으로 구현하여 화면 상단에 표시한다
			let timerWidth = this.APP.view.width * 3 / 4;
			timerBack.lineStyle(1, 0x203A43)
			timerBack.beginFill(0x2C5364);
			timerBack.drawRoundedRect(60, 60, timerWidth+2, 32, 3);
			timerBack.endFill();
	
			timer.beginFill(0x4286f4);
			timer.drawRoundedRect(61, 61, timerWidth, 30, 3);
			timer.endFill();
	
			timerBack.addChild(timer);
			timerContainer.addChild(timerText);
			timerContainer.addChild(timerBack);
	
			// elements lists / 오브젝트들을 담당하는 컨테이너
			const elementsListContainer = new PIXI.Container();
			const elementList = [];
			const elementColorList = [];
			const colorList = [0xef0000, 0x00ef00, 0x0000ef];
			const darkColorList = [0xaf0000, 0x00af00, 0x0000af];
			const n = 10;
			let circleX = this.APP.view.width / 2;
			let circleY = 150;
			let diffY = 35;
			
			function reDraw(j = 0) {
				elementList[j] = new PIXI.Graphics();
				elementList[j].lineStyle(2, darkColorList[elementColorList[j]]);
				elementList[j].beginFill(colorList[elementColorList[j]], 0.6);
				elementList[j].drawCircle(circleX, circleY + (j * diffY), 25);
				elementList[j].endFill();
			}

			let colorPick;
			// 그래픽을 사용하여 게임 내 오브젝트 생성
			for(let i = 0; i < n; i++) {
				// 색상은 기존의 값 그대로 가져가야 하기 때문에 배열에 따로 저장
				colorPick = Math.floor(Math.random() * 3);
				elementColorList[i] = colorPick;
				
				reDraw(i);
	
				elementsListContainer.addChild(elementList[i]);
			}
	
			// R G B buttons / RGB 버튼들을 담당하는 컨테이너
			const rgbBtnsContainer = new PIXI.Container();
			// 버튼을 배열에 넣어서 생성
			const rgbBtns = [
				new PIXI.Graphics(),
				new PIXI.Graphics(),
				new PIXI.Graphics(),
			];
	
			const style = new PIXI.TextStyle({
				fontFamily: 'Arial',
				fontSize: 40,
				fontWeight: 'bold',
				fill: ['#91EAE4', '#000C40'],
				stroke: '#000C40',
				strokeThickness: 2,
			});
	
			const rgbTxts = [
				new PIXI.Text('R', style),
				new PIXI.Text('G', style),
				new PIXI.Text('B', style)
			];
			
			this.yAxis = this.APP.view.height - 40;
			for(let i = 0; i < rgbBtns.length; i++) {
				// 각 버튼에 요구되는 색상 부여
				let xAxis = (this.APP.view.width) * (i+1) / 4;
				let btnColor = rgbBtns[i] === rgbBtns[0] ? colorList[0] : 
					(rgbBtns[i] === rgbBtns[1] ? colorList[1] : colorList[2]);
				let btnBorderColor = rgbBtns[i] === rgbBtns[0] ? darkColorList[0] : 
					(rgbBtns[i] === rgbBtns[1] ? darkColorList[1] : darkColorList[2]);
				
				rgbBtns[i].lineStyle(3, btnBorderColor);
				rgbBtns[i].beginFill(`${btnColor}`);
				rgbBtns[i].drawCircle(xAxis, this.yAxis, 33);
				rgbBtns[i].endFill();
	
				rgbBtns[i].interactive = true;
				rgbBtns[i].buttonMode = true;
				rgbBtns[i].addListener('pointerdown', onButtonDown);
	
				xAxis -= 15;
				rgbTxts[i].x = rgbTxts[i] === rgbTxts[0] ? xAxis :
					(rgbTxts[i] === rgbTxts[1] ? xAxis - 2 : xAxis);
				rgbTxts[i].y = this.yAxis - 23;
	
				rgbBtns[i].addChild(rgbTxts[i]);
				rgbBtnsContainer.addChild(rgbBtns[i]);
			}
	
			function keepGoing(el) {
				// 렌더링 리스트에서 앞에서 제거
				el.clear();
				// 배열에서 뒤 요소 제거
				elementList.pop();
				elementColorList.pop();
				for(let i = 0; i < elementList.length; i++) {
					// 기존의 그래픽 제거
					elementList[i].clear();
					elementList.pop();
				}
	
				colorPick = Math.floor(Math.random() * 3);
				elementColorList.unshift(colorPick);
				// 화면 에서는 가장 뒤에 생성되는 것처럼 보이게..
				// 그래픽에서는 가장 처음 그려진 요소가
				// 레이어 구조에서 가장 아래쪽에 위치하게 된다
				const newInsert = new PIXI.Graphics();
				newInsert.lineStyle(2, darkColorList[elementColorList[0]]);
				newInsert.beginFill(colorList[elementColorList[0]], 0.6);
				newInsert.drawCircle(circleX, circleY + (0 * diffY), 25);
				newInsert.endFill();
				// 배열 앞에 새로 만든 도형 집어넣기
				elementList.unshift(newInsert);
				elementsListContainer.addChild(elementList[0]);
		
				for(let i = 1; i < n; i++) {
					// 기존의 색상을 가지고 와 새로 다시 그리기
					reDraw(i);
		
					elementList.push();
					elementsListContainer.addChild(elementList[i]);
				}
			}
		
			this.tick = 60;
			let decreaseTime = 60;
			// 타이머 게이지를 감소시킬 값 설정
			this.timerRatio = timerWidth / (this.tick * decreaseTime);
			// 게임 내 실제 돌아가는 총 시간
			this.totalTime = this.tick * decreaseTime;
	
			const k = 9;
			function onButtonDown(e) {
				// btn : 0 R | 1 G | 2 B
				if(elementList[k]._lineStyle.color === e.target._lineStyle.color) {
					// 오브젝트를 제거한 뒤 다시 생성해주는 함수 작성
					// 배열의 뒤 요소 제거
					that.score = ++_score;
					console.log(that.score);
					keepGoing(elementList[k]);
				} else {
					// 설정값을 1로 뒀을 때 남은 1초 때문에 ticker 가 한 번 더 실행되는 문제가 있었다
					// 설정값을 0으로 뒀을 때는 ticker 도 더 실행할 수 없게 되어 결과 페이지를 더 생성하는 문제를 일으키지 않는다
					decreaseTime = 0;
					timerWidth = 0;
					// 게임 종료 / 기존 그래픽을 지우고 결과 페이지로 넘어가기
					that.getClear().removeChild(playContainer);
					new R(APP, true, that.score);
				}
			}
			
			playContainer.addChild(timerContainer, elementsListContainer, rgbBtnsContainer);
			this.APP.stage.addChild(playContainer);

			// 타이머 => 시작 페이지에서 플레이 페이지로 넘어갔을 때
			// ticker 에서 바로 시작해버리기 때문데
			// 약간의 시간차를 줘서 ticker 의 시작을 조금 늦추는 효과를 줬다
			setTimeout(() => {
				this.APP.ticker.add((delta) => {
					if(timerWidth < 0) {
						timerWidth = 0;
					}
		
					if(this.totalTime % (this.tick * decreaseTime) === 0) {
						decreaseTime -= 1;
						this.time = decreaseTime;
					}

					// 문제의 코드 부분...
					if(this.time <= 0 && this.COUNT < 1) {
						this.time = 0;
						this.COUNT++;
						// COUNT 변수 하나로도 제어 가능한 것 같다..
						that.getClear().removeChild(playContainer);
						new R(APP, true, this.score);
					}
					// 타이머의 텍스트와 게이지를 지우고 새로 다시 그리는 코드
					timerText.destroy();
					timerText = new PIXI.Text(`${this.time}`, timerTextStyle);
					timerText.x = this.APP.view.width / 2 - 15;
					timerText.y = 5;
					timerContainer.addChild(timerText);
		
					timer.clear();
					timer.beginFill(0x4286f4, 1);
					timer.drawRoundedRect(61, 61, timerWidth, 30, 3);
					timer.endFill();

					timerWidth -= this.timerRatio;
					this.totalTime--;
		
					timerBack.addChild(timer);
				});
			}, 600);
		}
	}

	getPlay() {
		return this.PLAY;
	}

	getScore() {
		return this.score * 10;
	}

	getClear() {
		return this.APP.stage;
	}
}
