import { useState } from "react";
import { Candidate, VoteStats, WalletState } from "@/types/voting";
import { toast } from "sonner";

// Mock data - será substituído pela integração com smart contract
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: "Ana Silva",
    party: "Partido Progressista",
    number: "10",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    proposals: [
      "Educação digital inclusiva",
      "Transparência blockchain governamental",
      "Saúde descentralizada",
      "Economia verde sustentável",
      "Inovação tecnológica pública"
    ]
  },
  {
    id: 2,
    name: "Carlos Mendes",
    party: "Partido Digital",
    number: "20",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    proposals: [
      "Internet universal gratuita",
      "Criptomoeda municipal",
      "Reforma tributária digital",
      "Dados abertos governamentais",
      "Smart cities integradas"
    ]
  },
  {
    id: 3,
    name: "Mariana Costa",
    party: "Partido da Mudança",
    number: "30",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    proposals: [
      "Moradia acessível blockchain",
      "Educação STEM gratuita",
      "Mobilidade urbana verde",
      "Segurança cidadã inteligente",
      "Cultura descentralizada"
    ]
  },
  {
    id: 4,
    name: "Roberto Santos",
    party: "Partido Inovador",
    number: "40",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    proposals: [
      "DAO para decisões municipais",
      "Tokenização de serviços públicos",
      "Energia renovável comunitária",
      "Agricultura urbana tecnológica",
      "Transporte público NFT"
    ]
  }
];

const OWNER_ADDRESS = "0x1234567890123456789012345678901234567890";

export const useVoting = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    hasVoted: false,
  });

  const [candidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  
  const [stats, setStats] = useState<VoteStats>({
    totalVoters: 100,
    votedCount: 42,
    candidates: MOCK_CANDIDATES.map(c => ({
      id: c.id,
      name: c.name,
      votes: Math.floor(Math.random() * 30)
    }))
  });

  const connectWallet = async () => {
    // Simulação de conexão de carteira
    // TODO: Integrar com Web3/Ethers.js
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
    
    setWallet({
      address: mockAddress,
      isConnected: true,
      hasVoted: false,
    });

    toast.success("Carteira conectada com sucesso!");
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      hasVoted: false,
    });
    
    toast.info("Carteira desconectada");
  };

  const castVote = async (candidateId: number) => {
    // Simulação de voto
    // TODO: Integrar com smart contract
    
    if (wallet.hasVoted) {
      toast.error("Você já votou!");
      return false;
    }

    // Simular delay de transação blockchain
    await new Promise(resolve => setTimeout(resolve, 1500));

    setWallet(prev => ({ ...prev, hasVoted: true }));
    
    setStats(prev => ({
      ...prev,
      votedCount: prev.votedCount + 1,
      candidates: prev.candidates.map(c =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      )
    }));

    toast.success("Voto registrado com sucesso na blockchain!");
    return true;
  };

  const endElection = () => {
    const winner = stats.candidates.reduce((prev, current) =>
      current.votes > prev.votes ? current : prev
    );

    toast.success(`Eleição encerrada! Vencedor: ${winner.name} com ${winner.votes} votos!`, {
      duration: 5000,
    });
  };

  const isOwner = wallet.address?.toLowerCase() === OWNER_ADDRESS.toLowerCase();

  return {
    wallet,
    candidates,
    stats,
    isOwner,
    connectWallet,
    disconnectWallet,
    castVote,
    endElection,
  };
};
