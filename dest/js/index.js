$(function(){
    
    $('.bxslider').bxSlider({
        adaptiveHeight: "TRUE"
    });





    $('.flexslider').flexslider({
        animation: "slide",
        smoothHeight: true
    });

      $('#slider-1').flexboxslider({
        max_height: 550,
        items: 1,
        interval: 6000,
        timer: true,
    });

      $('#menu-mobile').click(function(){
 
        if(contador == 1){
            $('.mobile').animate({
                right: '0'
            });
            contador = 0;
        } else {
            contador = 1;
            $('.mobile').animate({
                right: '-100%'
            });
        }
 
    });

      $('#sub-menu').click(function(event){
            event.preventDefault();
            $('.container-movile').slideToggle('500');
            $('#sub-menu').toggleClass('fa-plus-circle fa-minus-circle');
      })

      $(".efect").click(function () {
            $(this).toggleClass("menu-on");
    });


    $("li#image-nav").hover(function () { 
        $(this).children(".container-menu").stop().slideDown('fast').show();
            }, function () {
        $(this).children(".container-menu").stop().slideUp('150');
    });

    Waves.init();
    Waves.attach('.btn-efect', ['waves-button', 'waves-float']);
    Waves.attach('ul.promociones li', ['waves-light']);

    $("ul.image-menu li a").hover(function(e){
        e.stopPropagation()
        var ruta = $(this).data('url');
        $('figure.nav-images img').css( 'display', 'none');
        $('figure.nav-images img[src="'+ruta+'"]').css('display', 'block');
        return false; 
});


    videoOverlay();
    subir();
    header();
    calendario();
})


function subir(){
    $('.ir-arriba').click(function(){
            $('body, html').animate({
                scrollTop: '0px'
            }, 300);
        });
     
        $(window).scroll(function(){
            if( $(this).scrollTop() > 0 ){
                $('.ir-arriba').slideDown(300);
            } else {
                $('.ir-arriba').slideUp(300);
            }
        });
}



function header(){
    var altura = $('.contenedor-fixed').offset().top;
        $(window).on('scroll', function(){
            if ( $(window).scrollTop() > altura ){
                $('.contenedor-fixed').addClass('menu-fixed');
            } else {
                $('.contenedor-fixed').removeClass('menu-fixed');
            }
        });
}

var dia = new Array(6);
var meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
var tipo_mes;
var i,j;

var flecha_alante=document.getElementById('adelantar_mes');
var flecha_atras=document.getElementById('atrasar_mes');

var fecha = new Date();

var dia_fecha= fecha.getDate();
var dia_semana= fecha.getDay();
var mes= fecha.getMonth();
var año= (fecha.getYear())+2000-100;

var inicio = dia_fecha;

while(inicio>7)
    inicio-=7;

var contador=1;
var posicion;
var celda_inicial;
var celda_final;

if(dia_semana+1==inicio)
    posicion=0;
else if(dia_semana<inicio)
    posicion=7-inicio+dia_semana;
else if(dia_semana>inicio)
    posicion=dia_semana-inicio;

for(i=0; i<6; i++)
    dia[i]=new Array(7);    
for(i=0; i<6; i++){
    for(j=0; j<7; j++){
        dia[i][j]=document.getElementById('c'+i+j);
    }
}



function limpiar_valores(){
    document.getElementById('mes_año').innerHTML="hi";
    for(i=0; i<6; i++){
        for(j=0; j<7; j++){
            dia[i][j].innerHTML="";
        }
    }
}
function rellenar_mes_año(){
        if(mes==0 || mes==2 || mes==4 || mes==6 || mes==7 || mes==9 || mes==11)
            tipo_mes=31;
        else if(mes==1)
            tipo_mes=28;
        else
            tipo_mes=30;
    document.getElementById('mes_año').innerHTML=meses[mes]+" "+ año;
    
}
function rellenar_dias(){
    for(i=0; i<6; i++){
        for(j=0; j<7; j++){
            if(i==0 && j<posicion){
                dia[i][j].innerHTML="";
            }
            else if(contador<=tipo_mes){
                dia[i][j].style.color="#37474F";
                dia[i][j].style.border="none";
                dia[i][6].style.color="red";
                dia[i][j].innerHTML=contador;
                contador++
            }
            if(contador==dia_fecha+1 && mes==fecha.getMonth() && año==(fecha.getYear())+2000-100){
                dia[i][j].style.color="white";
                dia[i][j].style.background="#FF7100";
            }
                
        }
    }
}
function establecer_inicio_fin(){
    for(i=0; i<6; i++){
        for(j=0; j<7; j++){
            if(dia[i][j].innerHTML==1)
                celda_inicial=j;
            if(dia[i][j].innerHTML==tipo_mes)
                celda_fianal=j;
        }
    }
}

function mes_alante(){
    limpiar_valores();
    mes+=1;
    if(mes==12){
        mes=0;
        año+=1;
    }
    rellenar_mes_año();
    contador=1;
    posicion=celda_fianal+1;
    if(posicion==7){
        posicion=0;
    }
    rellenar_dias();
    establecer_inicio_fin();
    
}
function mes_atras(){
    limpiar_valores();
    mes-=1;
    if(mes == -1){
    mes=11;
    año-=1;
    }
    rellenar_mes_año();
    contador=tipo_mes;
    posicion=celda_inicial-1
    for(i=5; i>=0; i--){
        for(j=6; j>=0; j--){
            if(i==5 && j>posicion)
                dia[i][j].innerHTML=="";
            else if(contador>=1){
                if(contador==1)
                    posicion=j;
                contador--;
            }
        }
    }
    contador=1;
    rellenar_dias();
    establecer_inicio_fin();
}
function inicio_rellenar(){
    limpiar_valores();
    rellenar_mes_año();
    rellenar_dias();
    establecer_inicio_fin();
    flecha_alante.addEventListener('click', mes_alante);
    flecha_atras.addEventListener('click', mes_atras);
}

inicio_rellenar();




function videoOverlay(){

     $( "figure a.video-play-button" ).click(function() {
               var url=$(this).attr('href');
               var titulo=$(this).attr('data-nombre');
               var sala=$(this).attr('data-sala');
                $("#video-overlay").append('<div class="cat-video-over">'+sala+'</div>');
                $("#video-overlay").append('<div class="titulo-video"> '+titulo+' </div>');
                $('#video-overlay').addClass('open');
                $("#video-overlay").append('<iframe width="560" height="315" src="'+url+'" frameborder="0" allowfullscreen></iframe>');
               return false; 
          });
     
    $('.video-overlay, .video-overlay-close').on('click', function(e){
        e.preventDefault();
        close_video();
    });

    $(document).keyup(function(e){
        if(e.keyCode === 27) { close_video(); }
    });

    function close_video() {
        $('.video-overlay.open').removeClass('open').find('iframe').remove();
    };

}

function calendario(){

   $('#calendar').datepicker({
      inline:true,
      firstDay: 1,
      showOtherMonths:false,
      showMonthAfterYear: true,
      onSelect: function(date) {
            console.log(date);
        },
      dayNamesMin:['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Juli0", "Augosto", "Septimbre", "Octubre", "Noviembre", "Diciembre" ]
    });

    
}








