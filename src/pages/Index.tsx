import { useState } from "react";
import VotingHeader from "@/components/voting/VotingHeader";
import CandidateCard from "@/components/voting/CandidateCard";
import VoteConfirmationModal from "@/components/voting/VoteConfirmationModal";
import AdminDashboard from "@/components/voting/AdminDashboard";
import { useVoting } from "@/hooks/useVoting";
import { Candidate } from "@/types/voting";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const {
    wallet,
    candidates,
    stats,
    isOwner,
    electionEnded,
    connectWallet,
    disconnectWallet,
    castVote,
    endElection,
  } = useVoting();

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  const connectAsOwner = () => {
    // Conecta diretamente como owner para testes
    const ownerAddress = "0x1234567890123456789012345678901234567890";
    connectWallet();
    // O hook useVoting já detectará automaticamente que é o owner
  };

  const handleVoteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleConfirmVote = async () => {
    if (selectedCandidate) {
      const success = await castVote(selectedCandidate.id);
      if (success) {
        setIsModalOpen(false);
        setSelectedCandidate(null);
      }
    }
  };

  const handleCancelVote = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleToggleAdminView = () => {
    setIsAdminView(!isAdminView);
  };

  return (
    <div className="min-h-screen bg-background">
      <VotingHeader
        isConnected={wallet.isConnected}
        address={wallet.address}
        isAdminView={isAdminView}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onToggleAdminView={handleToggleAdminView}
      />

      {/* Main Content */}
      {!wallet.isConnected ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-88px)] p-4">
          <div className="text-center max-w-md w-full">
            <div className="bg-accent/50 text-accent-foreground p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-left">
                Para votar, você precisa conectar sua carteira Web3. Clique no botão "Conectar Carteira" acima.
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-vote-text-primary mb-3 sm:mb-4">
              Bem-vindo à Urna Descentralizada
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              Um sistema de votação transparente e seguro baseado em blockchain.
              Conecte sua carteira para participar da eleição.
            </p>
            
            {/* Botão Owner */}
            <div className="pt-4 sm:pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2 sm:mb-3">Ambiente de testes</p>
              <Button
                variant="secondary"
                onClick={connectAsOwner}
                className="bg-muted hover:bg-muted/80 text-muted-foreground w-full sm:w-auto text-sm"
                size="sm"
              >
                Conectar como Owner do Contrato
              </Button>
            </div>
          </div>
        </div>
      ) : isAdminView ? (
        <AdminDashboard stats={stats} electionEnded={electionEnded} onEndElection={endElection} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-vote-text-primary mb-2">
              Escolha seu Candidato
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="hidden sm:inline">Role horizontalmente para ver todos os candidatos e suas propostas</span>
              <span className="sm:hidden">Deslize para ver todos os candidatos</span>
            </p>
          </div>

          {/* Candidates Carousel */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 md:overflow-visible">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:w-full w-max">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onVote={handleVoteClick}
                  hasVoted={wallet.hasVoted}
                />
              ))}
            </div>
          </div>

          {wallet.hasVoted && (
            <div className="mt-6 sm:mt-8 bg-primary/10 border border-primary/20 rounded-lg p-4 sm:p-6 text-center">
              <p className="text-base sm:text-lg font-semibold text-primary">
                ✓ Seu voto foi registrado com sucesso na blockchain!
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Obrigado por participar do processo democrático descentralizado.
              </p>
            </div>
          )}
        </div>
      )}

      <VoteConfirmationModal
        isOpen={isModalOpen}
        candidate={selectedCandidate}
        onConfirm={handleConfirmVote}
        onCancel={handleCancelVote}
      />
    </div>
  );
};

export default Index;
