interface IRound {
  points: number;
  finished: boolean;
  inProgress: boolean;
}
export default class RoundController {
  static roundsMax = 10;
  private rounds: IRound[] = [];
  private currentRound: number = -1;
  private minPointsForRound: number = 300;
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
    return this.rounds.findIndex((round) => round.inProgress);
  }
  startNewRound() {
    this.currentRound = this.currentRound + 1;
    this.rounds[this.currentRound].inProgress = true;
  }
  finishRound(points: number) {
    this.rounds[this.currentRound].finished = true;
    this.rounds[this.currentRound].inProgress = false;
    this.rounds[this.currentRound].points = points;
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
}
