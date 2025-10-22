import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Candidate } from "@/types/voting";
import { CheckCircle2 } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (candidate: Candidate) => void;
  hasVoted: boolean;
}

const CandidateCard = ({ candidate, onVote, hasVoted }: CandidateCardProps) => {
  return (
    <Card className="vote-card vote-card-hover border-2 border-transparent p-6 min-w-[320px] max-w-[360px]">
      <div className="flex flex-col items-center">
        {/* Photo */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Candidate Info */}
        <h3 className="text-xl font-bold text-vote-text-primary text-center mb-1">
          {candidate.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">{candidate.party}</p>
        <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full mb-4">
          <span className="text-lg font-bold">{candidate.number}</span>
        </div>

        {/* Proposals */}
        <div className="w-full mb-6">
          <h4 className="text-sm font-semibold text-vote-text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Propostas
          </h4>
          <ul className="space-y-2">
            {candidate.proposals.map((proposal, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-primary mt-1">•</span>
                <span>{proposal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vote Button */}
        <Button
          onClick={() => onVote(candidate)}
          disabled={hasVoted}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {hasVoted ? "Você já votou" : "Votar"}
        </Button>
      </div>
    </Card>
  );
};

export default CandidateCard;
