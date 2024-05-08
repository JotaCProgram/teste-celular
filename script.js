$(document).ready(function() {
    var isDragging = false;
    var startX;
    var scrollLeft;

    var num = $('.ui-card').length;
    var even = num / 2;
    var odd = (num + 1) / 2;
// Seleciona as divs ativas, prev e next
    if (num % 2 == 0) {
        $('.ui-card:nth-child(' + even + ')').addClass('active');
        $('.ui-card:nth-child(' + even + ')').prev().addClass('prev');
        $('.ui-card:nth-child(' + even + ')').next().addClass('next');
    } else {
        $('.ui-card:nth-child(' + odd + ')').addClass('active');
        $('.ui-card:nth-child(' + odd + ')').prev().addClass('prev');
        $('.ui-card:nth-child(' + odd + ')').next().addClass('next');
    }

    // Remover números na frente das imagens de fundo
    $('.ui-card:before').css('content', 'none');



    // Evento mousedown nas divs de cartão
    $('.ui-card').on('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX;
        scrollLeft = $('.container').scrollLeft();
    });

    // Evento mousemove nas divs de cartão
    $('.ui-card').on('mousemove', function(e) {
        if (!isDragging) return;
        var mouseX = e.pageX;
        var diff = mouseX - startX;
        $('.container').scrollLeft(scrollLeft - diff);
    });

    // Evento mouseup nas divs de cartão
    $('.ui-card').on('mouseup', function() {
        isDragging = false;
    });

    // Evento mouseleave nas divs de cartão
    $('.ui-card').on('mouseleave', function() {
        isDragging = false;
    });

    $('.ui-card').click(function() {
        var slide = $('.active').width();
        var leftPos = $('.active').position().left;
        
        if ($(this).hasClass('next')) {
            $('.container').stop(false, true).animate({left: '-=' + slide});
        } else if ($(this).hasClass('prev')) {
            $('.container').stop(false, true).animate({left: '+=' + slide});
        }
        
        $(this).removeClass('prev next');
        $(this).siblings().removeClass('prev active next');
        
        $(this).addClass('active');
        $(this).prev().addClass('prev');
        $(this).next().addClass('next');

        // Após a navegação, centraliza o cartão selecionado
        scrollToSelectedCard();
    });

    // Função para centralizar o cartão selecionado na tela
    function scrollToSelectedCard() {
        // Seleciona o contêiner
        var container = $('.container');
        // Obtém a posição do cartão selecionado em relação ao contêiner
        var selectedCardPosition = $('.ui-card.active').position().left;
        // Obtém a largura visível do contêiner
        var containerWidth = container.width();
        // Calcula a posição para centralizar o cartão selecionado
        var scrollPosition = selectedCardPosition - (containerWidth / 2) + ($('.ui-card.active').width() / 2);
        // Aplica a rolagem horizontal para centralizar o cartão selecionado
        container.scrollLeft(scrollPosition);
    }

    // Navegação por teclado
    $(document).keydown(function(e) {
        if (e.keyCode == 37) { // seta esquerda
            $('.active').prev().trigger('click');
        } else if (e.keyCode == 39) { // seta direita
            $('.active').next().trigger('click');
        }
    });
});
