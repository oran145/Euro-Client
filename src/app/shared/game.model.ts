export class Game {
  constructor(
    public groupA: string,
    public groupB: string,
    public stage: string,
    public gameStartDate: Date,
    public groupAResult90Min?: number,
    public groupBResult90Min?: number,
    public moveToNextStage?: string,
    public howTheGameOver?: string,
    public groupAResultExtraTime?: number,
    public groupBResultExtraTime?: number
  ) {}
}
