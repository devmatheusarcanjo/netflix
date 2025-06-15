import { useEffect, useRef, useState } from 'react';

interface useModalDetailsInterface {
  containerRef: React.RefObject<HTMLElement>;
  modalRef: React.RefObject<HTMLElement>;
}

export default function useModalDetails({
  containerRef,
  modalRef,
  setIdDataModal,
  positionModal,
  setPositionModal,
}) {
  // Referencia para usar no timeout que aguarda o popup sumir para exibir sobre outro card de filme e nao alterar a posicao e dados de forma brusca
  const timeoutRef = useRef<boolean>(false);

  useSaveCordenadas({
    containerRef,
    positionModal,
    setPositionModal,
    setIdDataModal,
    timeoutRef,
  });
}

// Função para alterar o estado do position modal
function useSaveCordenadas({
  containerRef,
  positionModal,
  setPositionModal,
  setIdDataModal,
  timeoutRef,
}) {
  useEffect(() => {
    if (!containerRef.current) return;

    // Registro do evento de hover que sera executado somente sobre os cards dos filmes que é necessario exibir os detalhes
    containerRef.current.addEventListener('mouseover', mouseOver);

    function mouseOver({ target }) {
      // data-show-details com o valor true é para quando o motal aparecer sobre o width do filme, nao executar esse evento novamente, por tanto o modal tem o valor diferente nessa tag data-show-details
      const isSlide = target.closest('[data-show-details="slide-item"]');
      let c = isSlide?.getBoundingClientRect();

      // Se for o item de slide, E o modal não estiver visivel E não tiver nenhum modal que esta sendo removido
      if (isSlide && !positionModal.visible && !timeoutRef.current) {
        console.log('sobre');
        setIdDataModal(Number(isSlide.dataset.id));
        setPositionModal((d) => ({
          ...d,
          visible: true,
          x: c.x,
          y: c.y,
          width: c.width,
          height: c.height,
          top: c.top,
          right: c.right,
          bottom: c.bottom,
          left: c.left,
        }));

        // Se não, entao verifica se o mouse esta sobre algum slide e se tem algum modal esperando para sumir. Se estiver visivel e esperando, remova, e exiba o conteudo do novo slide. {Se o evento de hover for executado novamente, limpe o timeout para nao exibir os detalhes do primeiro item que recebeu o hover}
      } else if (isSlide || timeoutRef.current) {
        // Ao passar o mouse sobre varios slides, essa fucao é executada, e isso faz com que o codigo fique preso a referencia do primeiro slide que o usuario passou. dessa forma se o usuario passou por vvarios e parou em um especifico, o popup que deve ser exibido é o ultimo, por isso o timeout deve ser reciado para atualizar a referencia do ultimo popup que esta com o evento de hover
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          console.log('depois');
          console.log(c);
          setIdDataModal(Number(isSlide.dataset.id));

          setPositionModal((d) => ({
            ...d,
            visible: true,
            x: c.x,
            y: c.y,
            width: c.width,
            height: c.height,
            top: c.top,
            right: c.right,
            bottom: c.bottom,
            left: c.left,
          }));

          timeoutRef.current = false;
        }, 800);
      }
    }

    // Remover o evento se o componente for desmontado
    return () => {
      containerRef.current.removeEventListener('mouseover', mouseOver);
    };
  }, [positionModal]);
}
