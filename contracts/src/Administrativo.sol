//SPDX license-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin/access/Ownable.sol";
import "./ComprovanteToken.sol";

contract Administrativo is Ownable(msg.sender){

    address public administrador;
    ComprovanteToken public comprovante;
    
    struct  Candidato {
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
        string nome;
        uint256 votos;
    }

    //// EVENTS ////
     event CancidatoVencedor (string candidato, string partido, uint256 numero, uint256 votos);
     event ConfirmaVoto(address eleitor, string nomeCandidato, string partidoCandidato,  uint256 numeroCandidato);

    /// MAPPINGS /// 
    mapping (uint256 => Candidato) listaCandidatos;
    mapping (uint256 => uint256) public votosCandidato;
    mapping (address => bool) public jaVotou;


    /// STATE VARIABLES ///
    uint256 public totalCandidatos = 0;
    uint256 public totalVotos = 0;
    bool public situacaoEleicao = false;
    uint256[] public numerosCandidatos;

    constructor(){
        administrador = msg.sender;
        comprovante = new ComprovanteToken();
    }

    modifier apenasAdministrador() {
        require(msg.sender == administrador, "Apenas o administrador pode executar esta acao.");
        _;
    }
    modifier statusEleicao() {
        require (situacaoEleicao, "Fora do horario de votacao.");
        _;
    }

    function adicionarCandidato(
        uint256 numero,
        string memory nome,
        string memory partido,
        string memory proposta1,
        string memory proposta2,
        string memory proposta3,
        string memory proposta4,
        string memory proposta5,
        string memory uri
    ) external onlyOwner {
        require(!listaCandidatos[numero].existe, "Candidato ja existe com este numero.");
        Candidato memory novoCandidato = Candidato({
            idCandidato: numero,
            numero: numero,
            nome: nome,
            partido: partido,
            proposta1: proposta1,
            proposta2: proposta2,
            proposta3: proposta3,
            proposta4: proposta4,
            proposta5: proposta5,
            uri: uri,
            existe: true
        });
        listaCandidatos[numero] = novoCandidato;
        numerosCandidatos.push(numero);
        totalCandidatos++;
    }

    function abrirEleicao() external onlyOwner {
        require(situacaoEleicao == false, "Eleicao ja esta aberta");
        situacaoEleicao = true;
    }

    function fecharEleicao() external onlyOwner {
        require(situacaoEleicao == true, "Eleicao ja esta fechada");
        situacaoEleicao = false;
    }
        
    function listarCandidatos () public onlyOwner view returns(Candidato[] memory){
        require(totalCandidatos != 0, "Nao existem candidatos cadastrados");

        Candidato[] memory candidatos = new Candidato[](totalCandidatos);
        for (uint256 i = 0; i < totalCandidatos; i++){
            uint256 numero = numerosCandidatos[i];
            candidatos[i] = listaCandidatos[numero];

        }
        return candidatos;
    }    

    function eleitorJaVotou(address eleitor) public onlyOwner view returns (bool) {
        return jaVotou[eleitor];
    }

    function gravaVotos(uint256 numero) public statusEleicao(){

        require(!eleitorJaVotou(msg.sender), "Eleitor ja votou.");
        require(listaCandidatos[numero].existe, "Candidato nao existe.");

        votosCandidato[numero]++;
        totalVotos++;
        jaVotou[msg.sender] = true;

        Candidato storage cand = listaCandidatos[numero];
        uint256 tokenId = comprovante.mintComprovante(msg.sender, cand.uri);
        emit ConfirmaVoto(msg.sender, cand.nome, cand.partido, numero);
    }

    function votosPorCandidato(uint256 numero) external onlyOwner view returns (uint256) {
        return votosCandidato[numero];
    }
    
    function votosTotais() external onlyOwner view returns (uint256) {
        return totalVotos;
    }

    function candidatoVencedor() external onlyOwner view returns (Candidato memory vencedor, uint256 votos) {
        uint256 maiorVoto = 0;
        uint256 numeroVencedor = 0;

        for (uint256 i = 0; i < totalCandidatos; i++) {
            uint256 numero = numerosCandidatos[i];
            if (votosCandidato[numero] > maiorVoto) {
                maiorVoto = votosCandidato[numero];
                numeroVencedor = numero;
            }
        }
        vencedor = listaCandidatos[numeroVencedor];
        votos = maiorVoto;
    }

    function totalDeCandidatos() external onlyOwner view returns (uint256) {
        return totalCandidatos;
    } 

    function estatisticasParciais() public onlyOwner view returns (resultadoParcial[] memory) {
        resultadoParcial[] memory resultados = new resultadoParcial[](totalCandidatos);
        for (uint256 i = 0; i < totalCandidatos; i++) {
            uint256 numero = numerosCandidatos[i];
            string memory nome = listaCandidatos[i].nome;
            resultados[i] = resultadoParcial({
                numero: numero,
                nome: nome,
                votos: votosCandidato[numero]
            });
        }
        return resultados;
    }

    
}   