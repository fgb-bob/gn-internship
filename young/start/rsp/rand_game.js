class Rnd_result {


    constructor(rnd_user1,rnd_user2){
        this.rock = 1;
        this.scissors = 2;
        this.paper = 3;
        //상수로 가위바위보로 정해놓고 하는게 가독성이 좋아보인다.

        this.rnd_user1 = rnd_user1;
        this.rnd_user2 = rnd_user2;
        console.log(rnd_user1, rnd_user2);
        this.check(); // 인자로 변수 넘겨주지않아도 check함수에서 this를 이용하여 constructor 변수에 접근가능하다.
    }

    check(){
        if(this.rnd_user1 == rnd_user2){
            this.winner = "무승부";
        }
        else if((rnd_user1 == 1 && rnd_user2 == 2) || //this이용해서 가위바위보 상수 불러오는게 좋음.
                (rnd_user1 == 2 && rnd_user2 == 3) ||
                (rnd_user1 == 3 && rnd_user2 == 1)){
                    this.winner = 'user2';
        } else {
            this.winner = 'user1';
        }
    }

    result(){
        if( this.winner == "무승부" ){
            console.log("무승부입니다.");
        } else {
            console.log(`이긴사람 ${this.winner} 입니다.`);
        }        
    }
}

const rnd_user1 = Math.floor(Math.random()*3+1);
const rnd_user2 = Math.floor(Math.random()*3+1);

const rnd_result = new Rnd_result(rnd_user1, rnd_user2);
//const winner = rnd_result.winner;

rnd_result.result();


//플레이어수가 2~10명 랜덤으로 정해지고, 정햇진 랜덤값이 n, n...n 이라고 했을때, 각각 다른 값을 가진다고 했을때, 승부가 나면, 결과로 알려주고, 무승부가 n(1~3초)초 뒤에 나면 다시 돌아감 
//예를들어서 가위바위보 5명이 한다고 했을떄, 무승부나면 다시 하는 것과 같은 느낌으로 제작.
