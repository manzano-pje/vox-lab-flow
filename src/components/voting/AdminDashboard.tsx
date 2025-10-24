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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-vote-text-primary">
          Painel Administrativo
        </h2>
        <Button
          onClick={handleEndElection}
          disabled={electionEnded}
          variant="destructive"
          className="gap-2 w-full sm:w-auto text-sm"
          size="sm"
        >
          <XCircle className="h-4 w-4" />
          <span className="hidden sm:inline">{electionEnded ? "Eleição Encerrada" : "Encerrar Eleição"}</span>
          <span className="sm:hidden">{electionEnded ? "Encerrada" : "Encerrar"}</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="vote-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Taxa de Participação
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              {participationRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.votedCount} de {stats.totalVoters} eleitores votaram
            </p>
            <Progress value={participationRate} className="mt-2 sm:mt-3" />
          </CardContent>
        </Card>

        <Card className="vote-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total de Votos
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-vote-text-primary">
              {totalVotes}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Votos computados
            </p>
          </CardContent>
        </Card>

        <Card className="vote-card border-2 border-primary sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              {electionEnded ? "Vencedor da Eleição" : "Líder Atual"}
            </CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-primary">
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
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Ranking de Candidatos</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {stats.candidates
              .sort((a, b) => b.votes - a.votes)
              .map((candidate, index) => {
                const percentage = totalVotes > 0 
                  ? (candidate.votes / totalVotes) * 100 
                  : 0;
                
                return (
                  <div key={candidate.id} className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 ${
                          index === 0 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <span className="font-bold text-sm sm:text-base">{index + 1}</span>
                        </div>
                        <span className="font-semibold text-vote-text-primary text-sm sm:text-base truncate">
                          {candidate.name}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-vote-text-primary text-sm sm:text-base">
                          {candidate.votes} <span className="hidden sm:inline">votos</span>
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-1.5 sm:h-2" />
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
