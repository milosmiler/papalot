$( document ).ready(function() {
        
       $("article.calendario").hide('');
          $("#show_horarios").click(function(){
            $("article.izquiera").hide('');
             $("article.derecha").hide('');
            $("article.calendario").show('');
          });

          $("article.calendario > div.item3 > span.close").click(function(){
              $("article.izquiera").show('5');
              $("article.derecha").show('5');
             $("article.calendario").hide('15');
          });


	$('#newsletter').bind('keypress', function(e) {
            if(e.keyCode==13){
            
            var newsletter= "/newsletter";
            var email = $("#newsletter").val();	
             
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            	
            	if( !emailReg.test( email ) ) {
                		$("#newsletter-respuesta").text("Este no es un correo valido");
                		$("#newsletter-respuesta").css("display", "block");
                	} else {
                		$.post(newsletter, { email: email})
                      		.done(function( data ) { 
                      			$("#newsletter").hide('100');
                      			$("#newsletter-respuesta").text("Te has suscrito correctamente");
                      		    $("#newsletter-respuesta").css("display", "block");           
                      	});
                	}
           

            }
    });

	var contador=0;
	$("#check").click(function(){
             contador=contador+1;
     });

    $( "#send" ).click(function() {
  				var url= "/send-email";
                 var nombre=$("#nombre").val();
                 var email=$("#correo").val();
                 var departamento=$("#departamento").val();
                 var mensaje=$("#mensaje").val();
                 if(contador%2==0){
                   $("#error").text('Tienes que aceptar, los terminos y condiciones');
                   $("#error").show('');
                   
                 }else{
                 	$("#error").text('');
                   if( nombre.length === 0 && email.length === 0  && mensaje.length === 0 ){
                     $("#error").text('Todos los campos son obligatorios');
                     $("#error").show('');
                    }else{

                    	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            	
		            	if( !emailReg.test( email ) ) {
		                		$("#error").text("Este no es un correo valido");
		                		$("#error").show('');
		                	} else {
		                		$.post(url, { nombre: nombre , email: email, departamento:departamento, mensaje:mensaje })
			                       .done(function( data ) {
			                         $("#respuesta-descripcion").text(data);
			                         $("#formulario").hide('');
			                         $("#respuesta").css("display", "block");
			                       });
		                	}
                    	//
                       
                    }
                 }
	});
});