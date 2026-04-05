import { useEffect, useRef, useState } from 'react';

export default function useUpdateModalDetails({
  dataModal,
  positionModal,
  modalRef,
  setPositionModal,
}) {
  const timeoutRef = useRef<number | null>();

  // Aciciona o evento para remover o popup quando o mouse sair de cima
  useEffect(() => {
    // if (!ref.current) return;

    document.body.addEventListener('mouseover', mouseover);
    function mouseover(event) {
      // selecionar o pai pai proximo que seja data-show-details, isso faz com que o evento só seja removido se o mouse sair dos elementos que tem essa tag
      const pai = event.target.closest('[data-show-details="modal"]');
      if (!pai && positionModal.visible) {
        // clearTimeout(timeoutRef.current);
        setPositionModal((e) => ({ ...e, visible: false, immediately: false }));
      }
    }

    // Remover o modal se o usuario der scroll na pagina
    document.addEventListener('scroll', scrollBody);
    function scrollBody() {
      if (!positionModal.visible) return;
      setPositionModal((e) => ({ ...e, visible: false, immediately: true }));
    }

    return () => {
      document.body.removeEventListener('mouseover', mouseover);
      document.removeEventListener('scroll', scrollBody);
    };
  }, [positionModal]);

  // Efeito pra atualizar a posição do modal quando o conteudo mudar e quando a posição mudar
  useEffect(() => {
    if (!modalRef.current) return;

    const modal = modalRef.current;
    // let largura = getComputedStyle(modal).width;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => {
        // Poiter events para evitar interação com o modal quando ele estiver oculto
        modal.style.width = positionModal.width + 'px';

        modal.style.pointerEvents = positionModal.visible ? '' : 'none';
        modal.style.cursor = positionModal.visible ? 'auto' : 'pointer';

        // Essa linha faz com que a animação de transform sempre seja de 200ms, mas a opacidade, deve ser mais rapida quando o popup aparecer, e mais lenta quando for sumir
        const transformStyle = 'transform 700ms'.concat(
          positionModal.visible ? ', opacity 300ms' : ', opacity 500ms'
        );

        modal.style.transition = transformStyle;

        // Aplicar 1.3 de escala quando o modal for exibido, e voltar ao tamanho normal quando for removido
        // modal.style.transform = positionModal.visible
        //   ? 'scale(1.3)'
        //   : 'scale(1)';

        // Atualizar a posição do modal com base na posição do width que aivou o evento de over
        calcularPosicao({ positionModal, modal });

        // modal.style.top = positionModal.top + 'px';
        // modal.style.left = positionModal.left + 'px';

        // Condicional para aplicar um atraso na mudança de opacidade apenas quando o modal for removido, pra dar a sensação que ele tivesse voltado para o lugar original
        if (!positionModal.visible) {
          positionModal.slide.style.opacity = 1;

          setTimeout(() => {
            modal.style.opacity = '';
          }, 100);
        } else {
          modal.style.opacity = '1';
        }
      },
      positionModal.immediately && !positionModal.visible ? 0 : 600
    );
  }, [dataModal, positionModal]);
}

function calcularPosicao({ positionModal, modal }) {
  modal.style.transformOrigin = 'center';

  // const positionModal = {
  //   left: 825.703125,
  //   top: 206.359375,
  //   visible: true,
  //   x: 825.703125,
  //   y: 206.359375,
  //   width: 250.234375,
  //   height: 133.109375,
  //   right: 1075.9375,
  //   bottom: 339.46875,
  // };

  let left, right, overflowRight;

  const larguraView = document.body.offsetWidth;
  console.log(larguraView);
  const larguraSlide = positionModal.width;

  if (positionModal.right > larguraView) {
    overflowRight = 100;
    console.log('Right ultrapassou');
  }

  if (overflowRight) {
    modal.style.top = positionModal.top + 'px';
    modal.style.left = positionModal.left + 'px';

    modal.style.transformOrigin = 'right top';

    modal.style.transform = 'translateX(-100px) '.concat(
      positionModal.visible ? 'scale(1.3)' : 'scale(1)'
    );

    positionModal.slide.style.opacity = 0;
  } else {
    modal.style.top = positionModal.top + 'px';
    modal.style.left = positionModal.left + 'px';
    modal.style.transformOrigin = 'right top';
    modal.style.transform =
      '' + positionModal.visible ? 'scale(1.3)' : 'scale(1) translateX(0px)';
  }
}
