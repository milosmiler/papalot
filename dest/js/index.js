$(function(){

    $('.bxslider').bxSlider();
    
    $('.flexslider').flexslider({
        animation: "slide"
    });

      $('#slider-1').flexboxslider({
        max_height: 500,
        items: 1,
        interval: 6000,
        timer: true,
        // show_nav:false,
        // animation_duration: 600,
        // easing:'easeOutSine' //with jquery ui
        // etc ...
    });
})


$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select select-url"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        var val = $this.val();
         $('#catcher').attr('href', val);
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

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
    document.getElementById('mes_año').innerHTML="";
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
                dia[i][j].style.color="#000";
                dia[i][j].style.border="none";
                dia[i][6].style.color="red";
                dia[i][j].innerHTML=contador;
                contador++
            }
            if(contador==dia_fecha+1 && mes==fecha.getMonth() && año==(fecha.getYear())+2000-100){
                dia[i][j].style.color="white";
                dia[i][j].style.background="#00B3D0";
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


$('#play-video').click(function(e){
    e.preventDefault();

      $('#video-overlay').addClass('open');
      $("#video-overlay").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/ngElkyQ6Rhs" frameborder="0" allowfullscreen></iframe>');
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
