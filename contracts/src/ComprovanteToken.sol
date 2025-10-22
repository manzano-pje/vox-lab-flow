//SPDX-License-Informer: MIT
pragma solidity ^0.8.20;

                      
import "openzeppelin/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin/access/Ownable2Steps.sol";

contract ComprovanteToken. is ERC721URIStorage, Ownable(msg.sender){
    uint256 private _tokenIdCounter;

    constructor()  ERC721("ComprovanteVotacao", "CVT") {}// parâmetros herdados de ERC721URIStorage

    function mintComprovante(address to, string memory tokenURI) external onlyOwner returns(uint256){
        _tokenIdCounter++;  /// aumenta de 1 posição o id do token
        uint256 newTokenId = _tokenIdCounter; // coverte od do token para variável interna
        _mint(to, newTokenId); // executa mint do token para com o endereço e nº do id do token
        _setTokenURI(newTokenId, tokenURI); // associa o tokenid ao endereço no IPFS
        return newTokenId; // retorna o id do token atual
    }
  
}
