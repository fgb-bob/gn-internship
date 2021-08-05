class Rsp {
    constructor(player_Info, player_Total){
        this.player_Total = player_Total;
        this.player_Info = player_Info;

        this.rock = 0;
        this.scissors = 0;
        this.paper = 0;

        console.log("함수에 들어왔습니다.");
        this.player_Info_Input();
        //this.game_Result();
    }

    player_Info_Input(){
        this.rock = 0;
        this.scissors = 0;
        this.paper = 0;

        for(let i=1 ; i<=player_Total; i++){
            player_Info.set(i, Math.floor(Math.random()*3+1));
        }
        console.log(player_Info);
        this.player_Result();
    }

    player_Result(){
        for(let j=0;j<player_Total;j++){
            if(player_Info.get(j+1) == 1){
                this.rock++;
            } else if (player_Info.get(j+1) == 2){
                this.scissors++;
            } else {
                this.paper++;
            }
        }
        console.log("바위 가위 보");
        console.log(`${this.rock}   ${this.scissors}   ${this.paper}`);
        this.game_Result();

        
    }

    //게임의 결과를 확인하는 메서드. 
    game_Result(){
        if(this.rock == this.player_Total || this.scissors == this.player_Total || this.paper == this.player_Total){ //를레이어 수와 가위,바위,보 중의 한 결과와 값이 같으면 게임 재시작
            this.reGame();
        } else {
            this.rock === 0 ? this.scissorsWin() : this.scissors === 0 ? this.paperWin() : this.paper === 0 ? this.rockWin() : this.reGame(); 
            // 가위바위보 중 하나의 결과가 0이면 게임종료
        }
    }

    //게임 결과가 나왔을 경우 호출되는 메서드
    scissorsWin(){
        this.winner = "가위";
        console.log(`${this.winner}가 이겼습니다.`);
    }

    rockWin(){
        this.winner = "바위";
        console.log(`${this.winner}가 이겼습니다.`);
    }

    paperWin(){
        this.winner = "보";
        console.log(`${this.winner}가 이겼습니다.`);
    };


    //무승부가 났을 떄 호출되는 메서드
    reGame(){
            console.log("무승부입니다. 3초후에 게임 다시 시작됩니다.");
            setTimeout(() => {
                this.player_Info_Input();
            },3000);  
    }

}

const player_Total = Math.floor(Math.random()*10+2); //플레이어 수를 랜덤으로 정하는 코드. 2~10명 중에 랜덤으로 정해짐.
const player_Info = new Map(); //플레이어의 가위, 바위, 보 결과를 값으로 map을 이용해 매칭

console.log(player_Total);
const rsp = new Rsp(player_Info, player_Total); //가위바위보 게임 클래스
