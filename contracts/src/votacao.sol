// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Administrativo.sol";

contract Votacao is Ownable(msg.sender){ 
    Administrativo public adm;

    constructor(address enderecoAdm){
        adm = Administrativo(enderecoAdm);
    }

    function votacao(uint256 numeroCandidato) external{
        adm.gravaVotos(numeroCandidato);
    }
}