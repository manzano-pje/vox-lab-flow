# Urna Descentralizada - Sistema de Votação Blockchain

## 🗳️ Visão Geral

Sistema moderno de votação descentralizada baseado em blockchain, desenvolvido com React, TypeScript e preparado para integração com smart contracts.

## ✨ Funcionalidades Implementadas

### Para Eleitores
- ✅ Conexão de carteira Web3 (estrutura pronta)
- ✅ Visualização de candidatos em carousel horizontal
- ✅ Cards detalhados com foto, propostas e informações
- ✅ Modal de confirmação de voto
- ✅ Sistema de voto único por eleitor
- ✅ Feedback visual após votação

### Para Administradores (Owner)
- ✅ Dashboard administrativo completo
- ✅ Estatísticas em tempo real:
  - Taxa de participação
  - Total de votos
  - Líder atual
- ✅ Ranking de candidatos com porcentagens
- ✅ Botão para encerrar eleição

## 🎨 Design System

### Paleta de Cores
- **Verde Primário**: `#00B074` (hsl(162, 100%, 35%))
- **Azul Secundário**: `#007BFF` (hsl(211, 100%, 50%))
- **Fundo**: `#F5F6F8` (hsl(210, 17%, 97%))
- **Texto Principal**: `#212529` (hsl(210, 11%, 15%))
- **Texto Secundário**: `#6C757D` (hsl(210, 6%, 46%))
- **Hover Background**: `#E7F1FF` (hsl(211, 96%, 96%))

### Componentes Customizados
- Cards com bordas arredondadas e sombras suaves
- Botões com estados hover e disabled
- Modal de confirmação com animações
- Progress bars para estatísticas
- Layout responsivo

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   └── voting/
│       ├── VotingHeader.tsx          # Cabeçalho com logo e conexão
│       ├── CandidateCard.tsx         # Card de candidato
│       ├── VoteConfirmationModal.tsx # Modal de confirmação
│       └── AdminDashboard.tsx        # Painel administrativo
├── hooks/
│   └── useVoting.ts                  # Lógica de votação (mock)
├── lib/
│   └── web3/
│       └── contracts.ts              # Estrutura para smart contracts
├── types/
│   └── voting.ts                     # Tipos TypeScript
└── pages/
    └── Index.tsx                     # Página principal
```

## 🔗 Integração com Smart Contract

### Estrutura Preparada

O projeto está estruturado para integração com Web3:

1. **Arquivo de Contratos** (`src/lib/web3/contracts.ts`)
   - Configuração de endereço e ABI
   - Funções placeholder para Web3

2. **Hook de Votação** (`src/hooks/useVoting.ts`)
   - Atualmente com dados mock
   - Preparado para substituir por chamadas reais ao contrato

### Próximos Passos para Integração

1. **Instalar Dependências**
   ```bash
   npm install ethers @web3-react/core @web3-react/injected-connector
   ```

2. **Adicionar Variáveis de Ambiente**
   ```env
   VITE_CONTRACT_ADDRESS=0x...
   VITE_CHAIN_ID=1
   ```

3. **Implementar Conexão Real**
   - Substituir mock no `useVoting.ts`
   - Implementar funções em `contracts.ts`
   - Adicionar ABI do contrato

### Estrutura Sugerida do Smart Contract

```solidity
contract VotingSystem {
    struct Candidate {
        uint id;
        string name;
        string party;
        string number;
        uint voteCount;
    }
    
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    
    uint public candidatesCount;
    address public owner;
    bool public electionEnded;
    
    event VoteCast(address indexed voter, uint indexed candidateId);
    event ElectionEnded(uint indexed winnerId, string winnerName);
    
    function vote(uint _candidateId) public;
    function endElection() public onlyOwner;
    function getResults() public view returns (...);
}
```

## 🚀 Como Executar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**
   ```bash
   npm run dev
   ```

3. **Build para produção**
   ```bash
   npm run build
   ```

## 👤 Teste de Funcionalidades

### Como Eleitor
1. Clique em "Conectar Carteira"
2. Navegue pelos candidatos no carousel
3. Clique em "Votar" no candidato desejado
4. Confirme o voto no modal

### Como Administrador
1. Conecte com o endereço do owner: `0x1234567890123456789012345678901234567890`
2. Visualize o dashboard com estatísticas
3. Use "Encerrar Eleição" para finalizar

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablets (768px - 1919px)
- Mobile (< 768px)

## 🔒 Segurança

- ✅ Voto único por endereço
- ✅ Verificação de carteira conectada
- ✅ Validação de owner para funções administrativas
- ✅ Confirmação de voto antes de processar
- 🔄 Aguardando integração com smart contract para segurança blockchain

## 🎯 Próximas Melhorias

- [ ] Integração real com Web3/MetaMask
- [ ] Deploy do smart contract
- [ ] Sistema de autenticação adicional
- [ ] Histórico de eleições
- [ ] Exportação de resultados
- [ ] Suporte a múltiplas redes blockchain

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.
