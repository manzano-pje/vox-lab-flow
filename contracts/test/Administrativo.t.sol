// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Administrativo.sol";

contract testAdministrativo is Test{
    Administrativo public adm;
    Administrativo.Candidato public candidato1;
    Administrativo.Candidato public candidato2;
    ComprovanteToken public comprovante;
    address public owner;
    address public voter1;
    address public voter2;
    uint256 public totalVotos;
    uint256 public numeroCandidato1;
    uint256 public numeroCandidato2;
    bool public situacaoEleicao;
    string public uri ;
    
    function setUp() public {
        owner = address(this);
        voter1 = makeAddr("voter1");  // Create a labeled address for voter1
        voter2 = makeAddr("voter2");  // Create a labeled address for voter2
        numeroCandidato1 = 10;
        numeroCandidato2 = 20;
        adm = new Administrativo();
        candidato1 = Administrativo.Candidato({
            idCandidato: 1,
            numero: 10,
            nome: "Candidato_1",
            partido: "PT",
            proposta1: "proposta1",
            proposta2: "proposta2",
            proposta3: "proposta3",
            proposta4: "proposta4",
            proposta5: "proposta5",
            uri: "ipfs://token1",
            existe:true
        });
        candidato2 = Administrativo.Candidato({
            idCandidato: 2,
            numero: 20,
            nome: "Candidato_2",
            partido: "PL",
            proposta1: "proposta1",
            proposta2: "proposta2",
            proposta3: "proposta3",
            proposta4: "proposta4",
            proposta5: "proposta5",
            uri: "ipfs://token2",
            existe: true
        });
        situacaoEleicao = true;
    }

    function testEleicaoAberta() public{
        assertEq(adm.abrirEleicao(),true);
    }

    function testEleicaoJaAberta() public{
        vm.expectRevert("Eleicao ja esta aberta");
        adm.abrirEleicao();
    }
    
    function testEleicaoFechada() public{
        assertEq(adm.fecharEleicao(),true);
    }

    function testEleicaoJaFechada(){
        vm.expectRevert("Eleicao ja esta fechada");
        adm.fecharEleicao();
    }

    function testAdicionarCandidatoSemOwner() public {
        // Espera que reverta com o erro correto do Ownable
        vm.expectRevert(abi.encodeWithSelector(
            Ownable.OwnableUnauthorizedAccount.selector, 
            voter1
        ));

        // Configura endereço não-owner e tenta a operação
        vm.prank(voter1);
        adm.adicionarCandidato(
            10,
            "Candidato_1",
            "PT",
            "proposta1",
            "proposta2",
            "proposta3",
            "proposta4",
            "proposta5",
            "ipfs://token1"
        );
    }

    
    function testAdicionarCandidatoComOwner() public{
        uint256 totalCandidatos = 0;
        uint256 totalAntes = 0;

        adm.adicionarCandidato(candidato1);
        totalCandidatos = adm.totalCandidatos();    
        assertEq(totalCandidatos, (totalAntes + 1));
    }
}