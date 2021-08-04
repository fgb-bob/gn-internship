class Rnd_result {
    constructor(rnd_user1,rnd_user2){
        this.rnd_user1 = rnd_user1;
        this.rnd_user2 = rnd_user2;
        console.log(rnd_user1, rnd_user2);
        this.check(rnd_user1, rnd_user2);
    }

    check(rnd_user1,rnd_user2){
        if(rnd_user1 == rnd_user2){
            this.winner = "무승부";
        }
        else if((rnd_user1 == 1 && rnd_user2 == 2) ||
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



