# 🗳️ Urna Digital — Sistema de Votação Web3 / Digital Ballot Box (Web3 Voting)

![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/Language-Solidity-blue)
![Framework](https://img.shields.io/badge/Framework-React-yellow)
![Foundry](https://img.shields.io/badge/Tool-Foundry-orange)

**Português:** Urna Digital é um sistema de votação digital que combina contratos inteligentes em Solidity com uma interface front-end em React. Projeto pensado para transparência, auditabilidade e integração com carteiras Web3 (MetaMask, etc.).  
**English:** Urna Digital is a Web3 voting system that pairs Solidity smart contracts with a React frontend. Designed for transparency, auditability and wallet integration.

---

## 🔹 Principais funcionalidades / Key features

- Cadastro e gerenciamento de candidatos / Candidate registration & management  
- Registro de votos on-chain / Vote recording on-chain  
- Apuração e exibição de resultados em tempo real / Real-time results display  
- Integração com carteiras Web3 (MetaMask, WalletConnect) / Web3 wallet integration  
- Ambiente de testes com Foundry / Foundry-based testing environment

---

## 🧭 Estrutura do repositório / Repository structure

/contracts         # Smart contracts (Solidity)
/frontend          # React app (UI + integração Web3)
/scripts           # Scripts de deploy, utilitários
/test              # Testes adicionais
/README.md
/LICENSE

---

## 🛠️ Tecnologias / Technologies

- Solidity (>=0.8.x) — contratos inteligentes  
- Foundry — desenvolvimento e testes de smart contracts (`forge`, `cast`)  
- React + Vite / Create React App — frontend  
- ethers.js / wagmi — integração Web3  
- Node.js (v18+) & npm / yarn

---

## ⚡ Instalação rápida / Quick start

> Clone o repositório e instale dependências para ambos contratos e frontend.

```bash
# Clone
git clone https://github.com/seu-usuario/urna-figital.git
cd urna-figital
```

### Smart contracts (Foundry)
```bash
# Entre na pasta de contratos (se houver)
cd contracts

# Instale Foundry (se necessário) — instructions: https://book.getfoundry.sh
# Compile
forge build

# Rode testes
forge test
```

### Frontend (React)
```bash
cd frontend

# Instale dependências
npm install
# ou
yarn

# Rode em modo desenvolvimento
npm start
# ou
yarn start

# Build para produção
npm run build
# ou
yarn build
```

---

## 🔗 Uso / How to use

1. Abra o frontend (`npm start`) e conecte sua carteira Web3 (MetaMask).  
2. Cadastre candidatos (se você for administrador).  
3. Inicie a votação via contrato (ou interface administrativa).  
4. Eleitores conectam carteira e votam; votos são registrados na blockchain.  
5. Consulte resultados em tempo real pela interface.

---

## 🧪 Testes / Testing

- Use `forge test` para rodar os testes de contratos.  
- Frontend: use `npm test` / `yarn test` conforme o setup do projeto (React testing library / vitest / jest).

---

## 🔐 Segurança / Security notes

- Audite contratos antes de qualquer deploy em mainnet.  
- Proteja chaves privadas e scripts de deploy.  
- Considere limites e validações on-chain (tempo de votação, autorizações, prevenção de replay).

---

## ♻️ Deploy sugerido / Suggested deployment flow

1. Teste local com Foundry + Hardhat/Anvil (fork) para simular rede.  
2. Deploy em testnet (Goerli, Sepolia, ou rede compatível).  
3. Testes end-to-end com frontend apontando para o contrato testnet.  
4. Auditoria externa.  
5. Deploy em mainnet apenas após auditoria e auditoria social (testes de usuário).

---

## 🤝 Contribuição / Contributing

Contribuições são bem-vindas! Siga este fluxo:

1. Fork do repositório  
2. Crie uma branch: `git checkout -b feature/minha-feature`  
3. Commit: `git commit -m "Descrição da feature"`  
4. Push: `git push origin feature/minha-feature`  
5. Abra um Pull Request descrevendo alterações e justificativas

Por favor, inclua testes sempre que possível (contratos + integração frontend).

---

## 📄 Licença / License

Este projeto está sob a **MIT License**. Veja o arquivo `LICENSE` para detalhes.

---

## 📸 Screenshots / Demo

> (Substitua pelas imagens reais do frontend)
- `./assets/screenshot-01.png` — Tela de cadastro de candidatos  
- `./assets/screenshot-02.png` — Tela de votação  
- `./assets/screenshot-03.png` — Apuração de resultados

---

## 🧾 Contato / Contact

**Paulo Manzano**  
- LinkedIn: https://www.linkedin.com/in/paulomanzano  
- E-mail: seu-email@exemplo.com (substitua pelo real)

---

## 📝 Notas finais / Final notes

Este README é um template inicial — ajuste instruções de instalação, comandos e caminhos conforme a organização real do seu repositório. Boa sorte com o projeto — se quiser, eu gero também: badge de CI, templates de issue/PR e um arquivo `CONTRIBUTING.md`.

---
