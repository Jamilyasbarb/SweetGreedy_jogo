// var nome = prompt("Digite seu nome:");
var pandaLadoX = 300;
var pandaCimaY = 300;
var fase = 1;
var pontos = 0;
var armazenaRecord = localStorage.getItem("record");

const Jogador = {
  nome: localStorage.getItem("Jogador")
}

function iniciaModal(){
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'flex';
}

function fechaModal() {
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'none';
}

function recebendoNome(){
  const nome = document.querySelector('#name');
  localStorage.setItem("Jogador", nome.value);
}

function load() {
  if (record == null) {
    record = 0;
  }
  aux = document.getElementById("mudaFase");
  document.getElementById("record").innerHTML = "Record: " + armazenaRecord;
  verificaPonto();
  document.addEventListener("keydown", tecla);
}


function novaMoeda(){
  var nMoeda = document.getElementById("moeda");
  nMoeda.style.top = (Math.floor(Math.random()*50)*10 + 50)+ "px";
  var eita = nMoeda.style.left = (Math.floor(Math.random() * (1140 - 307 + 1) + 307)) + "px";
  console.log(eita);;
}
      
function tecla() {
  var tecla = event.keyCode;
  var jg = document.getElementById("jogador");
  var bambuPosicao = document.getElementById("moeda").getBoundingClientRect();
  
  
  if (tecla == 37 && pandaLadoX > 307) {
      //Esquerda
      pandaLadoX -= 40;
      jg.style.left = pandaLadoX + "px";
      
    } else if (tecla == 39 && pandaLadoX  < 1140) {
      //Direita
      pandaLadoX += 40;
      jg.style.left = pandaLadoX + "px";
    }
  if (tecla == 38 && pandaCimaY > 50) {
    //Cima
    pandaCimaY -= 40;
    jg.style.top = pandaCimaY + "px";

  } else if (tecla == 40 && pandaCimaY < 550) {
      //baixo
      pandaCimaY += 40;
      jg.style.top = pandaCimaY + "px";
    }
    
    
    //Criando limitações
    // Exemplo:
    // P1#######################P2
    // #                         #
    // #                         #
    // #                         #
    // #                         #
    // #                         #
    // #                         #
    // P3#######################P4
    
    
    // Lado P1
    if (pandaLadoX >= bambuPosicao.x &&
      pandaLadoX <= bambuPosicao.x + 50 &&
      pandaCimaY >= bambuPosicao.y &&
      pandaCimaY <= bambuPosicao.y + 50
          ) { 
            pontos++;
            novaMoeda();
        }

        // Lado P2
        if (pandaLadoX + 50 >= bambuPosicao.x &&
          pandaLadoX + 50 <= bambuPosicao.x + 50 &&
          pandaCimaY >= bambuPosicao.y &&
          pandaCimaY <= bambuPosicao.y + 50
          ) {    
          pontos++;
          novaMoeda();
        }
        
        //Lado P3
        if (pandaLadoX >= bambuPosicao.x &&
            pandaLadoX <= bambuPosicao.x + 50 &&
            pandaCimaY + 50 >= bambuPosicao.y &&
            pandaCimaY + 50 <= bambuPosicao.y + 50
            ) {
          pontos++;
          novaMoeda();
        }
        
        if (pandaLadoX + 50 >= bambuPosicao.x &&
          pandaLadoX + 50 <= bambuPosicao.x + 50 &&
            pandaCimaY + 50 >= bambuPosicao.y &&
            pandaCimaY + 50 <= bambuPosicao.y + 50
            ) {
              pontos++;
              novaMoeda();
            }
            
        // mudaFase();
  document.getElementById("pontos").innerHTML= pontos;
  document.getElementById("fase").innerHTML= fase;
  document.getElementById("nome").innerHTML= "Nome: " + Jogador.nome;
}

function verificaPonto() {
  var totSegundos = 60;
  var dificuldade = 60;
  var intervaloHandler;
  
  iniciaTimer();
  
  function iniciaTimer(){
    intervaloHandler = setInterval(mudaFase, 1000); 
    flagAtivo = true;
  } 
  
  function mudaFase() {
    aux.innerHTML = totSegundos;
    totSegundos--;
    console.log(totSegundos);

    if (totSegundos < 10) {
      document.getElementById("mudaFase").style.color = "red";
    }
    
    if (pontos < 10 && totSegundos < 1) {
      alert("Tempo Esgotado! Você perdeu!");
      clearInterval(intervaloHandler);

      if(fase > armazenaRecord){
        localStorage.setItem("record", fase);
        document.getElementById("record").innerHTML = "Record: " + localStorage.getItem("record");
      }
      dificuldade = 60;
      totSegundos = dificuldade;
      document.getElementById("mudaFase").style.color = "green";
      pontos = 0;
      fase = 1;
      iniciaTimer();

      }else if( pontos >= 10 && totSegundos >= 1 ) {
        console.log('entrou');
        clearInterval(intervaloHandler);
        fase++;
        dificuldade -= 3;
        totSegundos = dificuldade;
        pontos = 0;
        iniciaTimer();
      }
    }
  }


window.addEventListener("load", load);