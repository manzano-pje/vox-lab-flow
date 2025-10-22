import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types/voting";
import { AlertCircle } from "lucide-react";

interface VoteConfirmationModalProps {
  isOpen: boolean;
  candidate: Candidate | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const VoteConfirmationModal = ({
  isOpen,
  candidate,
  onConfirm,
  onCancel,
}: VoteConfirmationModalProps) => {
  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertCircle className="h-6 w-6 text-primary" />
            Confirmar Voto
          </DialogTitle>
          <DialogDescription className="text-base">
            Você está prestes a votar. Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20">
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-vote-text-primary mb-2">
              {candidate.name}
            </h3>
            <p className="text-muted-foreground mb-1">{candidate.party}</p>
            <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full inline-block">
              <span className="text-xl font-bold">{candidate.number}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Confirmar Voto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoteConfirmationModal;
