//não é usado este ficheiro

var express = require('express');
var app = express();

//O MIDDLEWARE BODYPARSER NÃO VEM COM O EXPRESS, TEMOS QUE INSTALAR

//PRIMEIRO CHAMAMOS O MIDDLEWARE A QUE CHAMAMOS 'bodyParser'.
var bodyParser = require('body-parser');
//depois fazemos o parser do url, com a função urlenconded = 0false' para forçar o uso do query parser module do node - querystring.
//o valor que retorna é uma função middleware que ficará guardada na variável parserUrlencode.
var parserUrlencode = bodyParser.urlencoded({extended:false});

//A SEGUIR CRIAMOS MULTIPLOS HANDLERS DO POST REQUEST, QUE SERÃO CHAMADOS EM SEQUÊNCIA
app.post('/blocks',parserUrlencode, function(request,response){
	//os dados do post estão guardados no requsest.body
	var newBlock = request.body;
	blocks[newBlock.name] = newBlock.description;
	response.status(201).json(newBlock.description);

});

app.use(express.static('public'));



app.listen(3000, function(){
  console.log("Running Express");
});
