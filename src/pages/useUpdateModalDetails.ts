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
        setPositionModal((e) => ({ ...e, visible: false }));
      }
    }

    return () => {
      document.body.removeEventListener('mouseover', mouseover);
    };
  }, [positionModal]);

  // Efeito pra atualizar a posição do modal quando o conteudo mudar e quando a posição mudar
  useEffect(() => {
    if (!modalRef.current) return;

    const modal = modalRef.current;
    // let largura = getComputedStyle(modal).width;

    // const novaLargura = String(larguraAntes + larguraAntes / 2);

    // modal.style.width = positionModal.visible ? novaLargura + 'px' : '';
    // let novaAltura = +getComputedStyle(modal).height.replace('px', '');
    // modal.style.width = positionModal.visible ? larguraAntes + 'px' : '';

    // const { left, top } = calcularPosicao(positionModal, {
    //   novaLargura,
    //   novaAltura,

    // });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      modal.style.transformOrigin = 'center';

      // Poiter events para evitar interação com o modal quando ele estiver oculto
      modal.style.width = positionModal.width + 'px';

      modal.style.pointerEvents = positionModal.visible ? '' : 'none';
      modal.style.cursor = positionModal.visible ? 'auto' : 'pointer';

      // Essa linha faz com que a animação de transform sempre seja de 200ms, mas a opacidade, deve ser mais rapida quando o popup aparecer, e mais lenta quando for sumir
      const transformStyle = 'transform 300ms'.concat(
        positionModal.visible ? ', opacity 300ms' : ', opacity 500ms'
      );

      // Aplicar 1.3 de escala quando o modal for exibido, e voltar ao tamanho normal quando for removido
      modal.style.transform = positionModal.visible ? 'scale(1.3)' : 'scale(1)';

      // Atualizar a posição do modal com base na posição do width que aivou o evento de over
      modal.style.top = positionModal.top + 'px';
      modal.style.left = positionModal.left + 'px';
      modal.style.transition = transformStyle;

      // Condicional para aplicar um atraso na mudança de opacidade apenas quando o modal for removido, pra dar a sensação que ele tivesse voltado para o lugar original
      if (!positionModal.visible) {
        setTimeout(() => {
          modal.style.opacity = '0';
        }, 100);
      } else {
        modal.style.opacity = '1';
      }

      //   // Poiter events para evitar interação com o modal quando ele estiver oculto
      //   modal.style.width = positionModal.width + 'px';
      //   modal.style.pointerEvents = positionModal.visible ? '' : 'none';

      //   // Essa linha faz com que a animação de transform sempre seja de 200ms, mas a opacidade, deve ser mais rapida quando o popup aparecer, e mais lenta quando for sumir
      //   const transformStyle = 'transform 200ms'.concat(
      //     positionModal.visible ? ', opacity 300ms' : ', opacity 500ms'
      //   );
      //   modal.style.transition = transformStyle;

      //   // Aplicar 1.3 de escala quando o modal for exibido, e voltar ao tamanho normal quando for removido
      //   modal.style.transform = positionModal.visible ? 'scale(1.3)' : 'scale(1)';

      //   // Atualizar a posição do modal com base na posição do width que aivou o evento de over
      //   modal.style.top = positionModal.top + 'px';
      //   modal.style.left = positionModal.left + 'px';

      //   // Condicional para aplicar um atraso na mudança de opacidade apenas quando o modal for removido, pra dar a sensação que ele tivesse voltado para o lugar original
      //   if (!positionModal.visible) {
      //     setTimeout(() => {
      //       modal.style.opacity = '0';
      //     }, 100);
      //   } else {
      //     modal.style.opacity = '1';
      //   }
    }, 700);
  }, [dataModal, positionModal]);
}

function calcularPosicao(t, { novaLargura, novaAltura }) {
  // const t = {
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

  const left = (t.right - t.left) / 2 + t.left - novaLargura / 2;
  const top = (t.bottom - t.top) / 2 + t.top - novaAltura / 3;
  // const top = (t.bottom - t.top) / 2 + t.top;s
  // const left = (t.right - t.left) / 2 + t.left;
  // const top = (t.bottom - t.top) / 2 + t.top;

  return { left, top };
}
