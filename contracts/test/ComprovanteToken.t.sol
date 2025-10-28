// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ComprovanteToken.sol";

contract ComprovanteTokenTest is Test {
    ComprovanteToken public token;
    address public owner;
    address public voter1;

    function setUp() public {
        owner = address(this);       // o contrato de teste será o owner
        voter1 = address(0x1);       // simulando outro usuário
        token = new ComprovanteToken(); // deploy do contrato
    }

    // Testa cunhagem pelo owner
    function testMintByOwner() public {
        string memory uri = "ipfs://token1";
        uint256 tokenId = token.mintComprovante(owner, uri);

        // Verifica se o tokenId retornado é 1
        assertEq(tokenId, 1);

        // Verifica se o owner realmente possui o token
        assertEq(token.ownerOf(tokenId), owner);

        // Verifica se o tokenURI foi definido corretamente
        assertEq(token.tokenURI(tokenId), uri);
    }

    // Testa que um não-owner não pode mintar
    function testMintByNonOwnerReverts() public {
        string memory uri = "ipfs://token2";

        // Simula chamada pelo voter1
        vm.prank(voter1);

        // Espera que reverta com a mensagem do Ownable
        // Agora ownable não recebe string e sim uma resposta custmomizada
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                voter1
            )
        );

        // Tentativa de cunhar pelo não-owner
        token.mintComprovante(voter1, uri);
    }
}
