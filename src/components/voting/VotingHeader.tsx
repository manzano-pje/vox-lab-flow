import { Button } from "@/components/ui/button";
import { Vote, ShieldCheck, Users } from "lucide-react";

interface VotingHeaderProps {
  isConnected: boolean;
  address: string | null;
  isAdminView: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onToggleAdminView: () => void;
}

const VotingHeader = ({ isConnected, address, isAdminView, onConnect, onDisconnect, onToggleAdminView }: VotingHeaderProps) => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 sm:p-3 rounded-xl">
              <Vote className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-vote-text-primary">
                Urna Descentralizada
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Sistema de Votação Blockchain
              </p>
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            {isConnected && address ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <Button
                  variant={isAdminView ? "default" : "outline"}
                  onClick={onToggleAdminView}
                  className="gap-2 w-full sm:w-auto text-sm"
                  size="sm"
                >
                  {isAdminView ? (
                    <>
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Voltar para Votação</span>
                      <span className="sm:hidden">Votação</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span className="hidden sm:inline">Painel Admin</span>
                      <span className="sm:hidden">Admin</span>
                    </>
                  )}
                </Button>
                <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 bg-muted/50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-muted-foreground">Carteira Conectada</p>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-vote-text-primary">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </p>
                  </div>
                  <Button variant="outline" onClick={onDisconnect} size="sm" className="text-sm">
                    Desconectar
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={onConnect} className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm" size="sm">
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
