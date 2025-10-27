// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ComprovanteToken.sol";
import "openzeppelin/access/Ownable.sol";
import "./Admistrativo.sol";

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
}