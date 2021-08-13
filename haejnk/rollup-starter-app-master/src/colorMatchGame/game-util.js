
export default class GameUtil
{
	static reDraw(btn, a, b, ca, w, h) {			
		btn.lineStyle(3,ca[b]);
		btn.beginFill(ca[a], 0.7);
		btn.drawRoundedRect(w/3 - 50, h/2, 250, 70);
		btn.endFill();
	}
}
