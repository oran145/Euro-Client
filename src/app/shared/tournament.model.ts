import { User } from "./user.model";

export class Tournament {
  constructor(
    public tournamentName: string,
    public groupStageScore: {
      exactResult: number;
      correctlyWinnigTeam: number;
    },
    public top16Score: {
      exactResult: number;
      correctlyWinnigTeam: number;
      howTheGameOverResult: number;
    },
    public quarterFinalsScore: {
      exactResult: number;
      correctlyWinnigTeam: number;
      howTheGameOverResult: number;
    },
    public halfFinalsScore: {
      exactResult: number;
      correctlyWinnigTeam: number;
      howTheGameOverResult: number;
    },
    public finalScore: {
      exactResult: number;
      correctlyWinnigTeam: number;
      howTheGameOverResult: number;
    },
    public participants: User[],
    public tournamentManager: string
  ) {}
}
