import React, { useEffect, useCallback, useMemo } from 'react';
import styleHover from './css/useTouchHover.module.css';

function touchstart(event, container) {
  const { target } = event;
  /* Esse card gerado pelo component MovieItem */
  const card = target.closest('[data-item="with-hover"]');

  if (!card) return;

  /* Over é o elemento dentro do card que é responsavel por exibir o efeito visual de hover */
  const over = createHoverElement();
  card.appendChild(over);

  // Atributo que pega a cor e opacidade do hover, esses dados sao inseridos diretamente no componente, junto com a tag data-item="with-hover"

  // Para informar a cor e opacidade especifica para um item, utilize o atributo data-color='cor-opacodade'
  const attributes = getColor(card.getAttribute('data-color'));

  if (attributes[0] && attributes[1] != undefined) {
    over.style.backgroundColor = attributes[0];
    over.style.opacity = attributes[1];
  } else {
    over.style.opacity = 0.2;
  }

  /* Essa linha serve para obter as posições do clique baseado na viewport */
  const touch = event.touches[0];

  /* Calculo para obter a posição exata do clique dentro do card */
  const X = touch.clientX - card.getBoundingClientRect().left;
  const Y = touch.clientY - card.getBoundingClientRect().top;

  /* Define a posição do elemento de hover para o ponto exato que o usuario clicou, dessa forma o hover ira crescer a partir do ponto de clique */
  over.style.top = `${Y}px`;
  over.style.left = `${X}px`;

  /* Acionabdo o efeito de hover no item clicado */
  over.classList.add(styleHover.crescer);

  /* Event listener para remover o hover após o usuario remover o dedo da tela */
  container.addEventListener(
    'touchend',
    (event) => {
      if (over) over.classList.remove(styleHover.crescer);
      over.remove();
    },
    { once: true }
  );
}

function createHoverElement() {
  const hover = document.createElement('div');
  hover.setAttribute('data-item', 'hover');
  return hover;
}

export default function useTouchHover(content) {
  useEffect(() => {
    if (content) {
      //  container.current.classList.add(styles.global)
      const container = content.current;
      container.addEventListener('touchstart', (event) => {
        touchstart(event, container);
      });

      /* Apos o componente ser destruido, remover o listener de evento do componente que executou esse hook */
      return () => container.removeEventListener('touchstart', touchstart);
    }
  }, []);
}

function getColor(dado) {
  if (!dado) return [undefined, undefined];
  return dado.split('-');
}

export { styleHover };
