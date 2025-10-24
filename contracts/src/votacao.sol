// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ComprovanteToken.sol";
import "openzeppelin/access/Ownable.sol";

contract Votacao is Ownable(msg.sender){ 
    ComprovanteToken public comprovante;

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

    struct resultadoParcial{
        uint256 numero;
        uint256 votos;
    }
    // Events
    event CancidatoVencedor (string candidato, string partido, uint256 numero, uint256 votos);
    event ConfirmaVoto (address indexed eleitor, string candidato, string partido, uint256 numero);

    // Mappings
    mapping (uint256 => Candidato) public listaCandidatos;
    mapping (uint256 => uint256) public votosCandidato;
    mapping (address => bool) public jaVotou;
    
    // State Variables
    uint256 public totalVotos = 0;
    bool public eleicaoAberta = false;
    uint256 public totalCandidatos = 0;
    uint256[] public numerosCandidatos;

    constructor(address _comprovante){
        comprovante = ComprovanteToken(_comprovante);
    }

    modifier situacaoEleicao() {
        require (eleicaoAberta, "Fora do horario de votacao.");
        _;
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
    ) external onlyOwner {
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
        numerosCandidatos.push(numero);
        totalCandidatos++;
    }

    function abrirEleicao() external onlyOwner {
        eleicaoAberta = true;
    }

    function fecharEleicao() external onlyOwner {
        eleicaoAberta = false;
    }
    
    function gravaVotos(uint256 numero) external situacaoEleicao() {
        require(!jaVotou[msg.sender], "Eleitor ja votou.");
        require(listaCandidatos[numero].existe, "Candidato nao existe.");

        votosCandidato[numero]++;
        totalVotos++;
        jaVotou[msg.sender] = true;

        Candidato storage cand = listaCandidatos[numero];
        uint256 tokenId = comprovante.mintComprovante(msg.sender, cand.uri);
        emit ConfirmaVoto(msg.sender, cand.nome, cand.partido, numero);
    }
    
    function listarCandidatos () public view returns(Candidato [] memory){
    require(totalCandidatos != 0, "Nao existem candidatos cadastrados");

    Candidato[] memory candidatos = new Candidato[](totalCandidatos);
    for (uint256 i = 0; i < totalCandidatos; i++){
        uint256 numero = numerosCandidatos[i];
        candidatos[i] = listaCandidatos[numero];

    }
    return candidatos;
    }    

    function votosTotais() external view returns (uint256) {
        return totalVotos;
    }

    function votosPorCandidato(uint256 numero) external view returns (uint256) {
        return votosCandidato[numero];
    }

    function totalDeCandidatos() external view returns (uint256) {
        return totalCandidatos;
    }   

    function eleicaoEstaAberta() external view returns (bool) {
        return eleicaoAberta;
    }

    function jaEleitorVotou(address eleitor) external view returns (bool) {
        return jaVotou[eleitor];
    }

    function listarVotosPorCandidato(uint256 numero) external view returns (uint256) {
        return votosCandidato[numero];
    }

    function candidatoVencedor() external view returns (Candidato memory vencedor, uint256 votos) {
        uint256 maiorVoto = 0;
        uint256 numeroVencedor = 0;

        for (uint256 i = 0; i < totalCandidatos; i++) {
            uint256 numero = numerosCandidatos[i];
            if (votosCandidato[numero] > maiorVoto) {
                maiorVoto = votosCandidato[numero];
                numeroVencedor = numero;
            }
        }
        vencedor = listaCandidatos[numeroVencedor];
        votos = maiorVoto;
    }

    function VotosPorCandidato() external view returns (resultadoParcial[] memory) {
        uint256 candidatos = totalCandidatos;
        uint256 numero;
        resultadoParcial[] memory resultado = new resultadoParcial[](candidatos);
        for (uint256 i = 0; i < candidatos; i++) {      
            resultado[i] = resultadoParcial({
                            numero: numero,
                            votos: votosCandidato[numero]
            });
        }
        return resultado;
    }
}