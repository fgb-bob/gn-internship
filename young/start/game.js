class Game{
    gameResult(){
        if(user1 == user2){
            console.log("무승부입니다");
            this.winner = '무승부';
            //alert(`무승부입니다.`);
        }
        else if((user1 == "가위" && user2 =="바위") ||
                (user1 == "바위" && user2 =="보") ||
                (user1 == "보" && user2 == "가위")){
                    console.log("user2이 이겼습니다");
                    //alert(`${user2} : user2이 이겼습니다`);
                    this.winner = 'user2';
        } else {
            console.log("user1가 이겼습니다.");
            //alert(`${user1} : user1가 이겼습니다`);
            this.winner = 'user1';
        }
    }
}

class Result extends Game{
    constructor(user1, user2){ 
        super();
        this.user1 = user1;
        this.user2 = user2;
        super.gameResult();
    }
}

const user1 = prompt("user1 : 가위바위보를 내세요");
const user2 = prompt("user2 : 가위바위보를 내세요");
const result = new Result(user1, user2);
alert(`${result.winner} 입니다.`);
