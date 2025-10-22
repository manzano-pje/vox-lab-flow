import { Button } from "@/components/ui/button";
import { Vote } from "lucide-react";

interface VotingHeaderProps {
  isConnected: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const VotingHeader = ({ isConnected, address, onConnect, onDisconnect }: VotingHeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-3 rounded-xl">
              <Vote className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-vote-text-primary">
                Urna Descentralizada
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistema de Votação Blockchain
              </p>
            </div>
          </div>
          
          <div>
            {isConnected && address ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Carteira Conectada</p>
                  <p className="text-sm font-mono font-semibold text-vote-text-primary">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                </div>
                <Button variant="outline" onClick={onDisconnect}>
                  Desconectar
                </Button>
              </div>
            ) : (
              <Button onClick={onConnect} className="bg-primary hover:bg-primary/90">
                Conectar Carteira
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default VotingHeader;
