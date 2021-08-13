// import Game from './game';
// import Start from './colorMatchGame/colorMatchGame-start'

// const game = new Game();

// new Start(game.Application);

import Start from './pixi-app';

class Manager
{
  constructor()
  {
    this.init();
  }

  init()
  {
    this.last = new Start(() => { this.onStartStart(); }, () => { this.onStartEnd(); });

  }

  onStartStart()
  {
    console.log('start');

  }

  onStartEnd()
  {
    console.log('end');
  }
}

new Manager();