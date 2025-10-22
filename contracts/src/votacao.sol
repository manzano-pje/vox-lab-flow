//SPDX-License-Informer: MIT
pragma solidity ^0.8.20;

import "./ComprovanteToken.sol";
import "lib/OpenZeppelin-Contracts/contracts/access/Ownable2Step.sol";

contract votacao is ownable{ 
    struct candidato{
        uint idCandidato;
        uint numero;
        string nome;
        string partido;
        string proposta1;
        string proposta2;
        string proposta3;
        string proposta4;
        string proposta5;
        bool existe;
    }

    // Events
    event CancidatoVencedor (string candidato, string partido, uint numero, uint votos);
    event ConfirmaVoto (address indexed eleitor, string candidato, string partido, uint numero);

    // Mappings
    mapping (uint => candidatos) public candidatos;
    mapping (uint => uint) public votosCandidato;
    mapping (address => bool) public jaVotou;
    mapping ()

    // State Variables
    uint private TOTALVOTOS = 0;

    function gravaVotos(address _eleitor, uint numero) external{
        require(_eleitor != 0, "Carteira invalida");
        require(candidatos[candidato].existe, "Candidato nao existe.");
        votosCandidato[nmero]++;
        
        TOTALVOTOS++;

        
        jaVotou[msg.sender] = true;



    }

    function listarCandidatos () public view returns(string [] memory){

    }
    



}