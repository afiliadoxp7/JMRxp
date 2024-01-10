var pageNumber = 0;
//escondendo o loder e o botão da pagina
$(document).ready(function() {
	$("#loader-img").hide();
	$("#fim-btn").hide();
});

// efeito infinte scroll
$(window).scroll(function() {
	
	var scrollTop = $(this).scrollTop();
	var conteudo = $(document).height() - $(window).height();

	//console.log('scrollTop: ', scrollTop, ' | ', 'conteudo', conteudo);

	if (scrollTop >= conteudo) {

		pageNumber++;
		setTimeout(function() {
			loadByScrollBar(pageNumber);
		}, 220);
	}

});

function loadByScrollBar(pageNumber) {

	$.ajax({
		method: "GET",
		url: "/LivroScrollTopSyst/ajax",
		data: {
			page: pageNumber
		},

		//Função de aparecer o botão loader
		beforeSend: function() {
			$("#loader-img").show();
		},

		success: function(response) {
			//console.log("resposta: ", response);
			//console.log("list> ", response.length );

		//Função para aparecer botão loader e o botão no fim da pagina
			if ( response.length > 150 ) {
				$("#systLivro_row").fadeIn(250, function() {
					$(this).append(response)
				});
			} else {
				$("#fim-btn").show(250);
				$("#loader-img").removeClass("loader");
			}
		},
		
		//Função de error o botão loader
		error: function(xhr) {
			alert("Ops, ocorreu um erro: " + xhr.status + " " + xhr.statusText);
		},

		//Função de dezaparecer o botão loader	
		complete: function() {
			$("#loader-img").hide();
		}


	})

};













