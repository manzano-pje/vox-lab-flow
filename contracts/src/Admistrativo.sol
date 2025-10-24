//SPDX license-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin/access/Ownable.sol";
import "./Votacao.sol";

contract Administrativo is Ownable{
    address public administrador;

    struct Candidato{
        uint256 idCandidato;
        uint256 numero;
        string nome;
        string partido;
        string proposta1;
        string proposta2;
        string proposta3;
        string proposta4;
        string proposta5;
        string uri;
        bool existe;
    }

    mapping (uint256 => Candidato) listaCandidatos;
    uint256 private totalCandidatos = 0;

    constructor(){
        administrador = msg.sender;
    }

    modifier apenasAdministrador() {
        require(msg.sender == administrador, "Apenas o administrador pode executar esta acao.");
        _;
    }

    function alterarAdministrador(address novoAdministrador) external apenasAdministrador {
        require(novoAdministrador != address(0), "Endereco invalido para administrador.");
        administrador = novoAdministrador;
    }

    function adicionarCandidato(
        uint256 numero,
        string memory nome,
        string memory partido,
        string memory proposta1,
        string memory proposta2,
        string memory proposta3,
        string memory proposta4,
        string memory proposta5,
        string memory uri
    ) external apenasAdministrador {
        require(!listaCandidatos[numero].existe, "Candidato ja existe com este numero.");

        Candidato memory novoCandidato = Candidato({
            idCandidato: numero,
            numero: numero,
            nome: nome,
            partido: partido,
            proposta1: proposta1,
            proposta2: proposta2,
            proposta3: proposta3,
            proposta4: proposta4,
            proposta5: proposta5,
            uri: uri,
            existe: true
        });

        listaCandidatos[numero] = novoCandidato;
    }

        function listarCandidatos () public view returns(Candidato [] memory){
        require(totalCandidatos != 0, "Nao existem candidatos cadastrados");
    
        Candidato[] memory candidatos = new Candidato[](totalCandidatos);
        for (uint256 i = 0; i < totalCandidatos; i++){
            candidatos[i] = listaCandidatos[i];
        }
        return candidatos;
    }    

    address public votacaoAddress;  // endereço do contrato Votacao
    
    constructor(address _votacaoAddress) Ownable(msg.sender) {
        administrador = msg.sender;
        votacaoAddress = _votacaoAddress;
    }

    function votosTotais() external view returns (uint256) {
        Votacao votacao = Votacao(votacaoAddress);
        return votacao.totalVotos();
    }




// Função para retornar o total de votos
// Função para retornar o total de votos de um candidato específico
// Função para retornar informações completa do candidato
// Função para retornar todos os candidatos
// Função retornar estatísticas gerais da votação

}   