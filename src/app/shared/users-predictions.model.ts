export class UsersPredictions {
  constructor(
    public userEmail: string,
    public tournamentId: string,
    public gamesPredictions: gamePrediction[]
  ) {}
}

export class gamePrediction {
  constructor(
    public gameId: string,
    public groupAPrediction: number,
    public groupBPrediction: number,
    public howTheGameOver?: string,
    public MovedToNextStage?: string
  ) {}
}
