import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoteStats } from "@/types/voting";
import { Trophy, Users, BarChart3, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import WinnerModal from "./WinnerModal";

interface AdminDashboardProps {
  stats: VoteStats;
  electionEnded: boolean;
  onEndElection: () => { name: string; votes: number };
}

const AdminDashboard = ({ stats, electionEnded, onEndElection }: AdminDashboardProps) => {
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState<{ name: string; votes: number } | null>(null);

  const participationRate = stats.totalVoters > 0
    ? (stats.votedCount / stats.totalVoters) * 100 
    : 0;

  const totalVotes = stats.candidates.reduce((sum, c) => sum + c.votes, 0);
  const currentWinner = stats.candidates.reduce((prev, current) => 
    current.votes > prev.votes ? current : prev
  );

  const handleEndElection = () => {
    const electionWinner = onEndElection();
    setWinner(electionWinner);
    setShowWinnerModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-vote-text-primary">
          Painel Administrativo
        </h2>
        <Button
          onClick={handleEndElection}
          disabled={electionEnded}
          variant="destructive"
          className="gap-2"
        >
          <XCircle className="h-4 w-4" />
          {electionEnded ? "Eleição Encerrada" : "Encerrar Eleição"}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="vote-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Participação
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {participationRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.votedCount} de {stats.totalVoters} eleitores votaram
            </p>
            <Progress value={participationRate} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="vote-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Votos
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vote-text-primary">
              {totalVotes}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Votos computados
            </p>
          </CardContent>
        </Card>

        <Card className="vote-card border-2 border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {electionEnded ? "Vencedor da Eleição" : "Líder Atual"}
            </CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {currentWinner.name}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {currentWinner.votes} votos ({totalVotes > 0 ? ((currentWinner.votes / totalVotes) * 100).toFixed(1) : 0}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Candidates Ranking */}
      <Card className="vote-card">
        <CardHeader>
          <CardTitle className="text-xl">Ranking de Candidatos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.candidates
              .sort((a, b) => b.votes - a.votes)
              .map((candidate, index) => {
                const percentage = totalVotes > 0 
                  ? (candidate.votes / totalVotes) * 100 
                  : 0;
                
                return (
                  <div key={candidate.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index === 0 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <span className="font-semibold text-vote-text-primary">
                          {candidate.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-vote-text-primary">
                          {candidate.votes} votos
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Winner Modal */}
      {winner && (
        <WinnerModal
          isOpen={showWinnerModal}
          onClose={() => setShowWinnerModal(false)}
          winner={{
            name: winner.name,
            votes: winner.votes,
            percentage: totalVotes > 0 ? (winner.votes / totalVotes) * 100 : 0
          }}
          totalVotes={totalVotes}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
