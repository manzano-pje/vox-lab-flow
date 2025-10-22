import { useState } from "react";
import VotingHeader from "@/components/voting/VotingHeader";
import CandidateCard from "@/components/voting/CandidateCard";
import VoteConfirmationModal from "@/components/voting/VoteConfirmationModal";
import AdminDashboard from "@/components/voting/AdminDashboard";
import { useVoting } from "@/hooks/useVoting";
import { Candidate } from "@/types/voting";
import { Info } from "lucide-react";

const Index = () => {
  const {
    wallet,
    candidates,
    stats,
    isOwner,
    connectWallet,
    disconnectWallet,
    castVote,
    endElection,
  } = useVoting();

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

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
        <div className="flex items-center justify-center min-h-[calc(100vh-88px)]">
          <div className="text-center max-w-md px-4">
            <div className="bg-accent/50 text-accent-foreground p-4 rounded-lg mb-6 flex items-start gap-3">
              <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-left">
                Para votar, você precisa conectar sua carteira Web3. Clique no botão "Conectar Carteira" acima.
              </p>
            </div>
            <h2 className="text-3xl font-bold text-vote-text-primary mb-4">
              Bem-vindo à Urna Descentralizada
            </h2>
            <p className="text-muted-foreground">
              Um sistema de votação transparente e seguro baseado em blockchain.
              Conecte sua carteira para participar da eleição.
            </p>
          </div>
        </div>
      ) : isAdminView ? (
        <AdminDashboard stats={stats} onEndElection={endElection} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-vote-text-primary mb-2">
              Escolha seu Candidato
            </h2>
            <p className="text-muted-foreground">
              Role horizontalmente para ver todos os candidatos e suas propostas
            </p>
          </div>

          {/* Candidates Carousel */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 w-max">
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
            <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold text-primary">
                ✓ Seu voto foi registrado com sucesso na blockchain!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
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
