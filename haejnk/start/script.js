class Person {
  constructor(name, phase) {
    this.name = name;
    this.phase = phase;
  }
}

class Game {
  // 생성자
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.winner = null;
    this.loser = null;
    this.arr = ["가위", "바위", "보", "무승부"];
  }
  
  // 숫자 - 문자열로 교체
  trade(n) {
    return this.arr[n];
  }
  
  // 승부 비교
  internalCompare(a, b) {
    if((a.phase === 0 && b.phase === 1) 
    || (a.phase === 1 && b.phase === 2) 
    || (a.phase === 2 && b.phase === 0)) {
      // a 패, b 승 (이름, 손)
      this.winner = b;
      this.loser = a;
    } else {
      // a 승, b 패 (이름, 손)
      this.winner = a;
      this.loser = b;
    }
  }
  
  // 비교
  externalCompare() {
    // a 와 b 가 같은 경우
    if(this.a === this.b) {
      // console.log(this.arr[3]);
      this.winner = this.arr[3];
    } else { // a 와 b 가 다른 경우
      this.internalCompare(this.a, this.b);
    }
  }

  // 결과 출력
  displayResult() {
    this.externalCompare();
    // "무승부" 인 경우
    if(this.winner === this.arr[3]) {
      console.log(`${this.a.name} : ${this.trade(this.a.phase)}, ${this.b.name} : ${this.trade(this.b.phase)}\n비겼습니다`);
    } else {
      // 승부가 난 경우
      console.log(`${this.a.name} : ${this.trade(this.a.phase)}, ${this.b.name} : ${this.trade(this.b.phase)}\n${this.winner.name} 가 이겼습니다`);
    }
  }
}

const player1 = new Person("A", Math.floor(Math.random() * 3));
const player2 = new Person("B", Math.floor(Math.random() * 3));
const playGame = new Game(player1, player2);
playGame.displayResult();

// console.log(typeof Person);