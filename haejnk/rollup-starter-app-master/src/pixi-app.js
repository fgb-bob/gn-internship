// import * as PIXI from 'pixi.js';
// import { PlaneGeometry } from 'pixi.js';

// export default class _
// {
// 	constructor()
// 	{
// 		const app = new PIXI.Application({ width: 400, height: 600, backgroundColor: 0x1099bb });
// 		document.body.appendChild(app.view);

// 	}
// }


export default class Start
{
	constructor(startEvent, endEvent)
	{
		this.startEvent = startEvent;
		this.endEvent = endEvent;

		this.onStart();

		setTimeout(() => { this.onEnd(); }, 5000);
	}

	onStart()
	{
		this.startEvent();
	}

	onEnd()
	{
		this.endEvent();
	}
}