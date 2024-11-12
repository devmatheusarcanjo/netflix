# React + Vite

Esse projeto é uma copia da netflix com a intenção de praticar React




#Funcoes

• Listagens de filmes por genero
• Listagem de filmes por data de lançamento 
• Recomendações de filmes baseado no que o usuário clicou/assistiu


#Layout
• Hover crescente exatamente igual o da netflix
• Filtro avançado 

#Sobre o hover
•• como funciona
• Para utilizar o hook useTouchHover, basta importa-lo no componente pai para que o mesmo capture eventos de hover de todos os filhos.

• Importe o useTouchHover como padrao, e styleHover como objeto. exemplo: 'import useTouchHover, {styleHover}'. utilize o useRef para criar a referencia para o objeto pai e passe como parametro para useTouchHover.

• O elemento que você quer que o hover seja aplicado, apenas defina o atributo: data-item='with-hover'. Dessa forma o useHover ira inserir uma tag e aplicar o efeito de hover.

• Por padrão a cor do hover é branca com opacidade de 30%. voce pode mudar isso passando outro atributo para o elemento: (data-color='cor-hover'). precisa ser exatamente dessa forma.