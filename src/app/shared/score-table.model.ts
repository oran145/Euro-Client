export class ScoreTable {
  constructor(
    public displayName: string,
    public imagePath: string,
    public exactScoreline: number,
    public outcome: number,
    public points: number
  ) {}
}
