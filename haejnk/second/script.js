class Player {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.phase = null; // 0 가위 | 1 바위 | 2 보
    this.win = false; // true 승 | false 패 
  }

  // 승패 설정
  setWin(_win) {
    this.win = _win;
  }

  // 승패 결과 반환
  getWin() {
    return this.win;
  }

  // 덱 설정
  setPhase(_phase) {
    this.phase = _phase;
  }

  // 덱 반환
  getPhase() {
    return this.phase;
  }

  // 플레이어 이름 반환
  getName() {
    return this.name;
  }
} ////

class Game {
  constructor(members) {
    this.members = members; // 플레이어 수
    this.playerArr = []; // 플레이어 객체 배열
    this.phaseArr = ["가위", "바위", "보"]; // 문자열 배열
    this.scissors = []; // 가위 배열
    this.rock = []; // 바위 배열
    this.paper = []; // 보 배열
    this.draw = false; // true : 무승부 / false : 승부 결정
  }

  // 플레이어 수만큼 플레이어 객체 생성
  // ascii code 65 == "A"
  // let str = String.fromCharCode(65);
  // console.log(str);
  setPlayerMembers() {
    // 아스키 코드로 플레이어 이름 설정
    let code = 65;
    for(let i = 0; i < this.members; i++) {
      // 이름과 번호 설정
      this.playerArr[i] = new Player(String.fromCharCode(code++), i+1);
      // console.log(`${this.playerArr[i].number} ${this.playerArr[i].name}`);
    }
  }

  // 플레이어들의 덱에 따라 각 배열에 할당
  share(pArr) {
    for(let i = 0; i < pArr.length; i++) {
      if(pArr[i].getPhase() === 0) {
        this.scissors.push(pArr[i]);
      } else if(pArr[i].getPhase() === 1) {
        this.rock.push(pArr[i]);
      } else {
        this.paper.push(pArr[i]);
      }
    }
    const newS = this.scissors;
    const newR = this.rock;
    const newP = this.paper;
    // 구분
    this.separate(newS, newR, newP);
  }

  getMembers() {
    return this.members;
  }

  // 무승부 여부 설정
  setDraw(_draw) {
    this.draw = _draw;
  }

  // 무승부 여부 반환
  getDraw() {
    return this.draw;
  }
  
  // 수 - 문자열로 변환
  tradePhase(n) {
    return this.phaseArr[n];
  }

  // 무승부 체크
  deckCheck() {
    this.setDraw(true);
  }

  // 배열 비우기
  clearArr(array) {
    array.splice(0);
  }

  // 반복문을 도는 콜백함수
  callbackFunc(a) {
    for(let i = 0; i < a.length; i++) {
      console.log(`${a[i].getName()} : ${this.tradePhase(a[i].getPhase())}`);
    }
    console.log(`--- 인원 : ${a.length} 명 ---`);
  }

  // 무승부 처리
  endDraw(s, r, p, val) {
    console.log(`-------- 무승부 --------`);
    if(val) {
      // 셋으로 분산된 경우
      // true 전달
      this.callbackFunc(s);
      this.callbackFunc(r);
      this.callbackFunc(p);
    } else {
      // 하나로 몰린 경우
      // false 전달
      const n = s.length < 0 ? (r.length < 0 ? p : r): s;
      this.callbackFunc(n);
    }
    console.log(`총 인원 : ${this.getMembers()} 명`);
  }

  // 플레이어들의 덱 설정
  setGamePhase() {
    for(let i = 0; i < this.members; i++) {
      this.playerArr[i].setPhase(Math.floor(Math.random() * 3));
      // console.log(this.playerArr[i].name, this.playerArr[i].getPhase());
    }
    const newPlayerArr = this.playerArr;
    // 그 후 배역에 할당
    this.share(newPlayerArr);
  }

  // 배열 구분
  separate(s, r, p) {
    // 무승부
    if(((s.length > 0) && (r.length > 0) && (p.length > 0)) ||
      ((s.length === 0) && (r.length === 0)) ||
      ((r.length === 0) && (p.length === 0)) ||
      ((p.length === 0) && (s.length === 0))) {
      this.deckCheck();
      this.endDraw(s, r, p, (s.length?(r.length? p.length : false) : false));
      this.clearArr(s);
      this.clearArr(r);
      this.clearArr(p);
    } else if(((s.length > 0) && (r.length > 0) && (p.length === 0)) || 
              ((s.length > 0) && (r.length === 0) && (p.length > 0)) || 
              ((s.length === 0) && (r.length > 0) && (p.length > 0))) {
      if(s.length === 0) { // winner 
        this.internalSeparateDeck(p);
      } else if(r.length === 0) {
        this.internalSeparateDeck(s);
      } else {
        this.internalSeparateDeck(r);
      }
    }
  }

  // 결과 출력
  displayResult(w) {
    // 반복문을 돌려서
    console.log("-------- 승리자 명단 --------\n"); 
    for(let i = 0; i < w.length; i++) {
      // 승리자를 화면에 출력한다
      console.log(`${w[i].getName()} : ${this.tradePhase(w[i].getPhase())}`);
    }
    console.log(`총 인원 : ${this.getMembers()} 명`);
  }

  // 승부 
  internalSeparateDeck(winner) {
    for(let i = 0; i < winner.length; i++) {
      winner[i].setWin(true);
    }
    
    // 결과 출력 호출
    this.displayResult(winner);
  }
}////

function play() {
  // 랜덤으로
  const game = new Game(Math.floor(Math.random() * 8 + 2));
  // 플레이어 생성
  game.setPlayerMembers();
  
  function gameSet() {
    // 플레이어 덱 설정
    game.setGamePhase();

    // true : 무승부 / false : 승부 결정
    if(!game.getDraw()) {
      // 게임 종료
      console.log(`게임 마침`);
      clearTimeout(start);
    } else {
      // 무승부 일 경우 1-3초 사이로 재실행
      console.log(`@ 게임 재시작`);
      game.setDraw(false);
      start = setTimeout(gameSet, (Math.floor(Math.random() * 3 + 1)) * 1000);
    }
  }
  let start = setTimeout(gameSet, (Math.floor(Math.random() * 3 + 1)) * 1000);
}

play();