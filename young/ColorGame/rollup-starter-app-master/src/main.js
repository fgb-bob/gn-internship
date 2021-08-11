import update from './update.js';
//import App from './start'; 게임 시작 화면
import App from './game'; //게임 실행 화면


// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
// console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

// update();

new App();