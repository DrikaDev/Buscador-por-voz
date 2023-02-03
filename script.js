
function buscarPorVoz (){
    var btnSpeak = document.querySelector('#btn_search');
    var resultSpeak = document.querySelector('#result_speak');

    if(window.SpeechRecognition || window.webkitSpeechRecognition){
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var myRecognition = new SpeechRecognition();
        myRecognition.lang = 'pt-BR';

        btnSpeak.addEventListener('click', function(){

            try{
                myRecognition.start();
                resultSpeak.innerHTML = "Estou te ouvindo!"
            }catch(erro){
                alert('erro:' + erro.message);
            }

        }, false);

        myRecognition.addEventListener('result', function(evento){
          var resultSpeaker = evento.results[0][0].transcript;
          console.log(resultSpeak);
          resultSpeak.innerHTML = resultSpeaker;

          switch(resultSpeaker.toLowerCase()){
            case 'clarear':
                document.body.style.background = 'linear-gradient(to right, #ee9ca7, #ffdde1)';
                document.body.style.color = 'black';
                break;
            case 'escurecer':
                document.body.style.background = 'linear-gradient(to right, #1f1c2c, #928dab)';
                document.body.style.color = 'white';
                break;
          }

          if(resultSpeaker.match(/buscar por/)){
            resultSpeak.innerHTML = 'Redirecionando...';
            setTimeout(function(){
                var resultado = resultSpeaker.split('buscar por');
                window.location.href = 'https://www.google.com.br/search?q=' +
                resultado[1];
            }, 2000);
          }

        }, false);

        myRecognition.addEventListener('error', function(evento){
            resultSpeak.innerHTML = "Você disse alguma coisa? Não ouvi muito bem!";
        })

    }else{
        resultSpeak.innerHTML = "Seu navegador não suporta tanta tecnologia!";
    }
}

buscarPorVoz();