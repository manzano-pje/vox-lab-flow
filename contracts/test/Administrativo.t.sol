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

    function testAbrirEleicao() public{
        // Chama a função na instância
        adm.abrirEleicao();

        // Verifica o estado interno
        assertEq(adm.situacaoEleicao(), true);
    }

    function testEleicaoJaAberta()public{
        adm.abrirEleicao();

        // Espera que reverta com o erro correto do Ownable
        vm.expectRevert(bytes("Eleicao ja esta aberta"));
        adm.abrirEleicao();
    }

    function testFecharEleicao() public{
        adm.abrirEleicao();
        adm.fecharEleicao();
        assertEq(adm.situacaoEleicao(), false);
    }

    function testEleicaoJaFechada() public{
        vm.expectRevert(bytes("Eleicao ja esta fechada"));
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
        uint256 totalCandidatos = adm.totalCandidatos();
        
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
        assertEq(adm.totalCandidatos(), (totalCandidatos + 1));
    }

    function testEleitorNaoVotou()public{
        bool votou = adm.eleitorJaVotou(voter1);
        assertEq(votou, false);
    }

    function testEleitorjaVotou() public{
        vm.prank(owner);
        adm.abrirEleicao();
        adm.adicionarCandidato(
            10, "Candidato_1","PT", "proposta1","proposta2","proposta3","proposta4",
            "proposta5", "ipfs://token1"
        );
        vm.prank(voter1);
        adm.gravaVotos(10);

        bool votou = adm.eleitorJaVotou(voter1);
        
        assertEq(votou, true);
    }

    function testGravaVotos() public{
        vm.prank(owner);
        adm.abrirEleicao();
        adm.adicionarCandidato(
            10, "Candidato_1","PT", "proposta1","proposta2","proposta3","proposta4",
            "proposta5", "ipfs://token1"
        );
        vm.prank(voter1);
        adm.eleitorJaVotou(voter1);

        uint256 votos = adm.votosCandidato(10);
        adm.gravaVotos(10);

        assertEq(adm.votosCandidato(10), votos + 1);
    }

    function testVotosTotais() public{
        vm.prank(owner);
        adm.abrirEleicao();
        adm.adicionarCandidato(
            10, "Candidato_1","PT", "proposta1","proposta2","proposta3","proposta4",
            "proposta5", "ipfs://token1"
        );
        adm.adicionarCandidato(
             20, "Candidato_2", "PL", "proposta1", "proposta2", "proposta3", "proposta4",
             "proposta5", "ipfs://token2"
        );
        vm.prank(voter1);
        adm.gravaVotos(10);
        vm.prank(voter2);
        adm.gravaVotos(20);

        assertEq(adm.votosTotais(), 2);

    }    

    function testCandidatoVencedor() public {
        vm.prank(owner);
        adm.abrirEleicao();
       
       // Cadastro dos cndidatos
        adm.adicionarCandidato(
            10, "Candidato_1","PT", "proposta1","proposta2","proposta3","proposta4",
            "proposta5", "ipfs://token1"
        );
        adm.adicionarCandidato(
             20, "Candidato_2", "PL", "proposta1", "proposta2", "proposta3", "proposta4",
             "proposta5", "ipfs://token2"
        );
       
        // Votação
        vm.prank(voter1);
        adm.gravaVotos(10);
        vm.prank(voter2);
        adm.gravaVotos(10);
                
        vm.prank(owner);                
        // ✅ Captura dos retornos da função
        (Administrativo.Candidato memory vencedor, uint256 votos) = adm.candidatoVencedor();

        // ✅ Verificações
        assertEq(vencedor.numero, 10);
        assertEq(votos, 2);
    }

    function testTotalDeCandidatos() public{
        vm.prank(owner);
        adm.abrirEleicao();
       
       // Cadastro dos cndidatos
        adm.adicionarCandidato(
            10, "Candidato_1","PT", "proposta1","proposta2","proposta3","proposta4",
            "proposta5", "ipfs://token1"
        );
        adm.adicionarCandidato(
             20, "Candidato_2", "PL", "proposta1", "proposta2", "proposta3", "proposta4",
             "proposta5", "ipfs://token2"
        );

        assertEq(adm.totalDeCandidatos(),2);
    }


}