import * as PIXI from 'pixi.js';

export default class Game 
{
  constructor () //n
  {
    this.app = new PIXI.Application({ 
			width: screen.width / 3, 
			height: screen.height * 3 / 4, 
			backgroundColor: 0x004b30,
			antialias: true,
      sharedTicker: false,
		});

		document.body.appendChild(this.app.view);
  }

  get Application() { return this.app; }
}