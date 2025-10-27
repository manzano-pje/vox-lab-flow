// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/ComprovanteToken.sol";
import "forge-std/Test.sol";

contract ComprovanteTokenTest is Test {

    ComprovanteToken private token; // criação de uma instância do contrato ComprovanteToken
    address private owner; // endereço do proprietário do contrato
    address private voter1; // endereço do eleitor 1
    address private voter2; // endereço do eleitor 2

    // Configuração inicial do teste
    function setUp() public { 
        owner = address(this); // o contrato de teste atua como o proprietário
        voter1 = address(0x1); // endereço fictício para o eleitor 1
        voter2 = address(0x2); // endereço fictício para o eleitor 2
        token = new ComprovanteToken("ComprovanteVotacao", "CVT", owner); //openzeppelin
    }

    function testMintingByOwner() public { // Testa a cunhagem de tokens pelo proprietário
        token.mint(voter1, 1); // o proprietário cunha um token para o eleitor 1
        assertEq(token.balanceOf(voter1), 1); // verifica se o eleitor 1 possui 1 token
    }

    function testMintingByNonOwner() public { // Testa a cunhagem de tokens por um não proprietário
        vm.prank(voter1); // simula a chamada da função pelo eleitor 1
        vm.expectRevert("Ownable: caller is not the owner");   // espera que a chamada reverta com a mensagem de erro
        token.mint(voter1, 1); //  o eleitor 1 tenta cunhar um token para si mesmo
    }

    function testTransferability() public { // Testa a transferibilidade dos tokens
        token.mint(voter1, 1); // o proprietário cunha um token para o eleitor 1
        vm.prank(voter1); // simula a chamada da função pelo eleitor 1
        token.transfer(voter2, 1); // o eleitor 1 transfere o token para o eleitor 2
        assertEq(token.balanceOf(voter2), 1); // verifica se o eleitor 2 possui 1 token
        assertEq(token.balanceOf(voter1), 0); // verifica se o eleitor 1 não possui mais tokens
    }
}

