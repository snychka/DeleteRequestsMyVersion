$(function(){

//retorna blocks em formato json
	$.get('/blocks', appendToList);
	console.log('TESTE');
	
	function appendToList(blocks){
		var list = [];
		var content, block;
		for (var i in blocks){
			block = blocks[i];
			console.log(block);
			content = '<li><a href="#" data-block="'+block+'"><img src="./del.png" width="10px" height="10px"></a><a href="/blocks/'+ block + '/">'+ block +'</a><li>';
			list.push(content);
			// content = '<a href="/blocks/'+ block + '/">'+ block +'</a>' + 
			// '<a href="#" data-block="'+block+'"><img src="./del.png" width="10px" height="10px"></a>';
			// list.push($('<li>',{html:content}));
		}
		$('.block-list').append(list)
	}


//escuta de deletes
$('.block-list').on('click','a[data-block]',function(deleteEvent){

console.log(deleteEvent);
	if(!confirm('Are you sure ?')){
		//se cancelarmos
	 	return false;

	} 
	var target = $(deleteEvent.currentTarget);
	
	// var target= $(this).attr('data-block');

	$.ajax({
		type:'DELETE', 
		url: '/blocks/' + target.data('block')
		// url: '/blocks/' + target
	}).done(function(){
		target.parents('li').remove();
	});

});


//colocamos um evento à escuta às submissões do form
$('form').on('submit', function(submitEvent){
	//depois a prevent default para não submeter imediatamente
	event.preventDefault();
	//guardamos o form num objecto $this para ser mais fácil trabalha-lo
	var form = $(this);
	//por fim chamamos a função serialize ao objecto form pois vai transformar a informação do form em URL encoded notation 
	//e fica guardada na variavel blockData, que será enviado como propriedade 'data' da chamada ajax, que é um 'request POST' 
	//do endereço '/blocks'
	
	var blockData = form.serialize();

	$.ajax({
		type:'POST',
		url:'/blocks',
		data:blockData //estes dados vao via URL codificado e são descodificados na função blockname
	}).done(function(blockname){
		console.log(blockname);
		appendToList([blockname])//para adicionar um bloco usamos a função appendToList no entatno está função está à espera de um array, daí [blobkname]
		form.trigger('reset');//limpa o form
	});
	});
});
