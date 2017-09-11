// executa o código quando o documento estiver pronto (ready), ou seja, após 
// seu carregamento completo
$(document).ready(function () {

    // trata o evento input do slider min: quando mudar, deve atualizar o span 
    // minPreco e a lista de produtos, de acordo com o novo valor desse filtro
    $('#min').on('input', function () {
        atualizaMinPreco();
        atualizaProdutos();
    });

    // trata o evento input do slider max: quando mudar, deve atualizar o span 
    // maxPreco e a lista de produtos, de acordo com o novo valor desse filtro
    $('#max').on('input', function () {
        atualizaMaxPreco();
        atualizaProdutos();
    });

    // função para atualizar o span minPreco com o valor do slider min
    function atualizaMinPreco() {
        var min = $('#min').val();
        $('#minPreco').html(min);
    }

    // função para atualizar o span maxPreco com o valor do slider max
    function atualizaMaxPreco() {
        var max = $('#max').val();
        $('#maxPreco').html(max);
    }

    // função para carregar os produtos que estão no arquivo produtos.json
    function loadProdutos() {
        $.ajax({
            url: 'produtos.json',
            method: 'GET',
            success: function (data) {
                // coloca a lista de produtos que veio em data na nossa 
                // variável que guarda os produtos e chama a função para 
                // atualizar a lista
                produtos = data;
                atualizaProdutos();
            }
        });
    }

    var produtos = [];

    // função para atualizar a lista de produtos de acordo com a variável 
    // produtos e de acordo com os filtros min e max
    function atualizaProdutos() {
        var min = $('#min');
        var max = $('#max');
        var precoMin = max.val(); // Fica com o maior valor para no if trocar sempre pelo menor
        var precoMax = min.val(); // Fica com o menor valor para no if trocar sempre pelo maior
        var msg = true;

        // limpa a lista, antes de preenchê-la com os produtos
        $('#produtos').html('');

        // passa pela nossa variável que guarda os produtos, filtrando-a de 
        // acordo com os valores em min e max
        for (p of produtos) {
            if (p.preco >= min.val() && p.preco <= max.val()) {
            	$('#produtos').append('<div class="col-xs-4"><div class="panel panel-default"><div class="panel-heading">' + p.nome + '</div><div class="panel-body"> R$ ' + p.preco.toFixed(2) + '</div></div></div>')
                msg = false;
            }
            
            if (p.preco < precoMin) {
            	precoMin = p.preco;
            }
            
            if (p.preco > precoMax) {
            	precoMax = p.preco;
            }
        }
        
        min.attr('min', precoMin).attr('max', precoMax).attr('value', precoMin);
        max.attr('min', precoMin).attr('max', precoMax).attr('value', precoMax);
        
        atualizaMinPreco();
        atualizaMaxPreco();
        
        if (msg) {
        	$('#produtos').append('<div class="alert alert-warning" role="alert">Nenhum produto atende aos critérios especificados nos filtros.</div>')
        }
    }

    /* inicialmente, os spans minPreco e maxPreco estão sem valores; assim, 
     * quando o documento for carregado (ready), quero atualizar o minPreco e o 
     * maxPreco com os valores dos seus respectivos sliders; para isso, basta 
     * chamarmos as funções que fizemos para esse fim: */
    atualizaMinPreco();
    atualizaMaxPreco();

    /* além disso, queremos carregar os produtos que estão no servidor para 
     * dentro da lista de produtos que, inicialmente, está vazia; para isso, 
     * chamamos a função adequada: */
    loadProdutos();
});
