interface IRound {
  points: number;
  finished: boolean;
  inProgress: boolean;
  zonk?: boolean;
}
export default class RoundController {
  static roundsMax = 10;
  private rounds: IRound[] = [];
  private currentRound: number = -1;
  private minPointsForRound: number = 300;
  private minPointsToWin: number = 5000;
  private gameFinished: boolean = false;
  static instance: RoundController;
  constructor() {
    if (RoundController.instance) {
      return RoundController.instance;
    }
    RoundController.instance = this;
  }
  init() {
    for (let i = 0; i < RoundController.roundsMax; i++) {
      this.rounds.push({ points: 0, finished: false, inProgress: false });
    }
  }
  setRounds(newRounds: IRound[]) {
    this.rounds = newRounds;
  }
  getRounds() {
    return this.rounds;
  }
  getCurentRound() {
    return this.currentRound;
  }
  startNewRound() {
    this.currentRound = this.currentRound + 1;
    this.rounds[this.currentRound].inProgress = true;
  }
  finishRound(points: number) {
    this.rounds[this.currentRound].finished = true;
    this.rounds[this.currentRound].inProgress = false;
    this.rounds[this.currentRound].points = points;
    if (this.currentRound + 1 === RoundController.roundsMax) {
      this.gameFinished = true;
    }
  }
  zonkRound() {
    this.rounds[this.currentRound].finished = true;
    this.rounds[this.currentRound].inProgress = false;
    this.rounds[this.currentRound].points = 0;
    this.rounds[this.currentRound].zonk = true;
    if (this.currentRound + 1 === RoundController.roundsMax) {
      this.gameFinished = true;
    }
  }
  getPreviousRound() {
    return this.currentRound - 1;
  }
  getAllPoints() {
    return this.rounds.reduce((acc, round) => round.points + acc, 0);
  }
  getMinPointsForRound() {
    return this.minPointsForRound;
  }
  isGameFinished() {
    return this.gameFinished;
  }
  isWin() {
    const gamePoints = this.getAllPoints();
    return gamePoints > this.minPointsToWin;
  }
}
