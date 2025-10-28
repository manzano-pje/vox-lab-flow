 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/votacao.sol";
import "forge-std/Test.sol";

contract voracaoTest is Test{

    Votacao private votacao;
    address private owner;
    address private voter1;
    address private voter2;
    uint256 private totalVotos;
    uint256 private totalCandidatos;
    iunt256 private listaCandidatos;
    bool private eleicaoAberta;
    bool private jaVotou;

    function setUp() public{

        owner = adderss(this);
        voter1 = address(0x123);
        voter2 = address(0xabcd);   

        votacao = new Votacao();  
        eleicaoAberta = votacao.eleicaoAberta(true);
    }

    function testGravaVotosFalse() public{
        vm.prank(voter1);
        vm.expectRevert("Candidato nao existe.");
        votacao.gravaVotos(10);
    }

    function testGravaVotosOk() public{
        vm.prank(voter1);
        votacao.gravaVotos(1);
        uint256 total = votacao.getTotalVotos(1);
        assertEq(total, 1, "Voto nao gravado corretamente");
    }



}