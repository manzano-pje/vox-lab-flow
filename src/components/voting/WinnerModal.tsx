import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, PartyPopper } from "lucide-react";

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: {
    name: string;
    votes: number;
    percentage: number;
  };
  totalVotes: number;
}

const WinnerModal = ({ isOpen, onClose, winner, totalVotes }: WinnerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-8 w-8 text-primary" />
            Eleição Encerrada!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            A votação foi finalizada com sucesso
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="relative">
            <PartyPopper className="h-16 w-16 text-primary animate-pulse" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-muted-foreground">
              Vencedor da Eleição
            </h3>
            <h2 className="text-3xl font-bold text-primary">
              {winner.name}
            </h2>
          </div>

          <div className="bg-accent/50 rounded-lg p-6 w-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total de Votos:</span>
              <span className="font-bold text-vote-text-primary text-lg">
                {winner.votes}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Porcentagem:</span>
              <span className="font-bold text-primary text-lg">
                {winner.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-muted-foreground">Votos Totais:</span>
              <span className="font-semibold text-vote-text-primary">
                {totalVotes}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal;
