export interface Candidate {
  id: number;
  name: string;
  party: string;
  number: string;
  photo: string;
  proposals: string[];
}

export interface VoteStats {
  totalVoters: number;
  votedCount: number;
  candidates: {
    id: number;
    name: string;
    votes: number;
  }[];
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  hasVoted: boolean;
}
