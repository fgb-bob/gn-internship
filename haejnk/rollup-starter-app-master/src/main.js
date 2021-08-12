import * as PIXI from 'pixi.js';

// import App from './pixi-app';

// import App from './container';
// import App from './transparentBackground';
// import App from './Tinting';
// import App from './cacheAsBitmap';
// import App from './particleContainer';
// import App from './blendModes';
// import App from './simplePlane';

// import App from './slots';


import Start from './colorMatchGame-start';
// import Play from './colorMatchGame-play-ele';
// import ReStart from './colorMatchGame-result';

class Game 
{
  constructor () //n
  {
    const app = new PIXI.Application({ 
			width: screen.width / 3, 
			height: screen.height * 3 / 4, 
			backgroundColor: 0x004b30,
			antialias: true,
      sharedTicker: false,
		});
		document.body.appendChild(app.view);

    new Start(app, true);
  }
  
}

new Game();