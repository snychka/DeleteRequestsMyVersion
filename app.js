var express = require('express');
var app = express();
//var cors = require('cors');

app.use(express.static('public'));
//por uma questão de segurança temos que chamar a biblioteca cors
//app.use(cors());

//PRIMEIRO CHAMAMOS O MIDDLEWARE A QUE CHAMAMOS 'bodyParser'.
var bodyParser = require('body-parser');
//depois fazemos o parser do url, com a função urlenconded = 0false' para forçar o uso do query parser module do node - querystring.
//o valor que retorna é uma função middleware que ficará guardada na variável parserUrlencode.
var parserUrlencode = bodyParser.urlencoded({extended:false});

//DINAMIC ROUTES - vamos supor que queremos criar páginas dinamicas, para isso configuramos no route uma variavel e vamos trata-la de acordo com o seu nome.
//Para isso vamos supor que em vez de um array de blocos temos um objectos que tem propriedades e uma descrição para cada propriedade 
//e o que queremos é que de cada vez que chamamos uma propriedade  nos seja devolvida a sua descrição


var blocks = {
  'Fixo': 'Cinto de segurança apertado',
  'Movel': 'Capaz de mover',
  'Rotativo': 'Rodar à volta do seu centro'
};

app.param('name',function(request,response, next){
	//request.params.[nome que estamos a procurar]
	var name = request.params.name;
	var block = name[0].toUpperCase()+name.slice(1).toLowerCase();
	request.blockname=block;
	next();
});


app.get('/blocks',function(request,response){
  response.json(Object.keys(blocks));
});

app.get('/blocks/:name', function(request, response){
var description = blocks[request.params.name];
if(!description){
	//E se o URL não existir? 404 isto request.params.name passa a unfdefined que é falso! logo podemos testar com um if
  response.status(404).json("UPS..não encontramos descrição para " + request.params.name)
} else {
  response.json(description);
}
});

//A SEGUIR CRIAMOS MULTIPLOS HANDLERS DO POST REQUEST, QUE SERÃO CHAMADOS EM SEQUÊNCIA
app.post('/blocks',parserUrlencode, function(request,response){
	//os dados do post estão guardados no requsest.body
	var newBlock = request.body;
	blocks[newBlock.name] = newBlock.description;
	response.status(201).json(newBlock.description);

});


app.delete('/blocks/:name', function(request,response){
	console.log('entrou');
	delete blocks[request.blockName];
	//usamos a função sendStatus 200 para OK, quando não queremos devolver HTML, isto porque alguns clientes não respondem bem a respostas vazias, como o jquery.
	response.sendStatus(200);
});

app.listen(3001, function(){
  console.log("Running Express");
});
