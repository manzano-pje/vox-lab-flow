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
    <Card className="vote-card vote-card-hover border-2 border-transparent p-4 sm:p-6 w-full sm:min-w-[280px] sm:max-w-[360px]">
      <div className="flex flex-col items-center">
        {/* Photo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 sm:mb-4 ring-4 ring-primary/20">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Candidate Info */}
        <h3 className="text-lg sm:text-xl font-bold text-vote-text-primary text-center mb-1">
          {candidate.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">{candidate.party}</p>
        <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-1 rounded-full mb-3 sm:mb-4">
          <span className="text-base sm:text-lg font-bold">{candidate.number}</span>
        </div>

        {/* Proposals */}
        <div className="w-full mb-4 sm:mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-vote-text-primary mb-2 sm:mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            Propostas
          </h4>
          <ul className="space-y-1.5 sm:space-y-2">
            {candidate.proposals.map((proposal, index) => (
              <li
                key={index}
                className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-primary mt-0.5 sm:mt-1">•</span>
                <span>{proposal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vote Button */}
        <Button
          onClick={() => onVote(candidate)}
          disabled={hasVoted}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base"
          size="sm"
        >
          {hasVoted ? "Você já votou" : "Votar"}
        </Button>
      </div>
    </Card>
  );
};

export default CandidateCard;
