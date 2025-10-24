//SPDX-License-Informer: MIT
pragma solidity ^0.8.20;

import "./ComprovanteToken.sol";
import "lib/OpenZeppelin-Contracts/contracts/access/Ownable2Step.sol";

contract Votacao is Ownable{ 
    struct Candidato{
        uint idCandidato;
        uint numero;
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
    event CancidatoVencedor (string candidato, string partido, uint numero, uint votos);
    event ConfirmaVoto (address indexed eleitor, string candidato, string partido, uint numero);

    // Mappings
    mapping (uint => candidato) public listaCandidatos;
    mapping (uint => uint) public votosCandidato;
    mapping (address => bool) public jaVotou;
    
    // State Variables
    uint private TOTALVOTOS = 0;
    bool private ELEICAOABERTA = false;
    uint private TOTALCANDIDATOS = 0;

    modifier eleicaoAberta() {
        require (aberta, "Fora do horario de votacao.");
        _;
    }

    modifier jaVotou(address _eleitor) {
        require(!jaVotou[_eleitor], "Eleitor ja votou.");
        _;
    }

    function gravaVotos(address _eleitor, uint numero) external eleicaoAberta() {

        require(_eleitor != address(0), "Carteira invalida");
        require(!jaVotou[_eleitor], "Eleitor ja votou.");
        require(listaCandidatos[numero].existe, "Candidato nao existe.");

        votosCandidato[numero]++;
        TOTALVOTOS++;       

        jaVotou[msg.sender] = true;
        Candidato memory cand = Candidato[numero];
        emit ConfirmaVoto(_eleitor, cand.nome, cand.partido, numero);
    }

    function listarCandidatos () public view returns(candidato [] memory){
        require(TOTALCANDIDATOS != 0, "Nao existem candidatos cadastrados");
        uint contador = 0;

        Candidato[] memory candidatos = new Candidato[](TOTALCANDIDATOS);
        for (uint i = 0; i < TOTALCANDIDATOS; i++){
            candidatos[i] = listaCandidatos[i];
        }
        return candidatos;
    }    
}