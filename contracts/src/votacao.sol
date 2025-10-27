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

    // Events
    event CancidatoVencedor (string candidato, string partido, uint256 numero, uint256 votos);
    event ConfirmaVoto (address indexed eleitor, string candidato, string partido, uint256 numero);

    // Mappings
    mapping (uint256 => Candidato) public listaCandidatos;
    mapping (uint256 => uint256) public votosCandidato;
    mapping (address => bool) public jaVotou;
    
    // State Variables
    uint256 private totalVotos = 0;
    bool private eleicaoAberta = false;
    uint256 private totalCandidatos = 0;

    constructor(address _comprovante){
        comprovante = ComprovanteToken(_comprovante);
    }

    modifier situacaoEleicao() {
        require (eleicaoAberta, "Fora do horario de votacao.");
        _;
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
            candidatos[i] = listaCandidatos[i];
        }
        return candidatos;
    }    
}