import { useEffect, useRef, useState } from 'react';

interface useModalDetailsInterface {
  containerRef: React.RefObject<HTMLElement>;
  modalRef: React.RefObject<HTMLElement>;
}

export default function useModalDetails({
  containerRef,
  modalRef,
  setIdDataModal,
}: useModalDetailsInterface) {
  const [positionModal, setPositionModal] = useState({
    left: 0,
    top: 0,
    visible: false,
  });

  // Referencia para usar no timeout e evitar renderização quando o mouse ja tiver saido de cima
  const timeoutRef = useRef<number | null>();

  useEffect(
    () =>
      saveCordenadas({
        containerRef,
        positionModal,
        setPositionModal,
        setIdDataModal,
      }),
    [containerRef, modalRef]
  );

  useEffect(() => {
    if (!modalRef.current) return;
    document.body.addEventListener('mouseover', mouseover);

    function mouseover(event) {
      // selecionar o pai pai proximo que seja data-show-details, isso faz com que o evento só seja removido se o mouse sair dos elementos que tem essa tag
      const pai = event.target.closest('[data-show-details]');
      if (!pai && positionModal.visible) {
        setPositionModal((e) => ({ ...e, visible: false }));
      }
    }

    return () => {
      document.body.removeEventListener('mouseover', mouseover);
    };
  }, [modalRef, positionModal]);

  useEffect(() => {
    if (!modalRef.current) return;
    const modal = modalRef.current;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      modal.style.transformOrigin = 'center';

      // Poiter events para evitar interação com o modal quando ele estiver oculto
      modal.style.pointerEvents = positionModal.visible ? '' : 'none';

      // Essa linha faz com que a animação de transform sempre seja de 200ms, mas a opacidade, deve ser mais rapida quando o popup aparecer, e mais lenta quando for sumir
      const transformStyle = 'transform 200ms'.concat(
        positionModal.visible ? ', opacity 300ms' : ', opacity 500ms'
      );
      modal.style.transition = transformStyle;

      // Aplicar 1.3 de escala quando o modal for exibido, e voltar ao tamanho normal quando for removido
      modal.style.transform = positionModal.visible ? 'scale(1.3)' : 'scale(1)';

      // Atualizar a posição do modal com base na posição do width que aivou o evento de over
      modal.style.top = positionModal.top + 'px';
      modal.style.left = positionModal.left + 'px';

      // Condicional para aplicar um atraso na mudança de opacidade apenas quando o modal for removido, pra dar a sensação que ele tivesse voltado para o lugar original
      if (!positionModal.visible) {
        setTimeout(() => {
          modal.style.opacity = '0';
        }, 100);
      } else {
        modal.style.opacity = '1';
      }
    }, 1000);
  }, [positionModal]);
}

// Função para alterar o estado do position modal
function saveCordenadas({
  containerRef,
  positionModal,
  setPositionModal,
  setIdDataModal,
}) {
  if (!containerRef.current) return;

  // Registro do evento de hover que sera executado somente sobre os cards dos filmes que é necessario exibir os detalhes
  containerRef.current.addEventListener('mouseover', mouseOver);

  function mouseOver({ target }) {
    // data-show-details com o valor true é para quando o motal aparecer sobre o width do filme, nao executar esse evento novamente, por tanto o modal tem o valor diferente nessa tag data-show-details
    const pai = target.closest('[data-show-details="slide-item"]');
    if (pai && !positionModal.visible) {
      setIdDataModal(Number(pai.dataset.id));
      const c = pai.getBoundingClientRect();
      setPositionModal((d) => ({
        ...d,
        left: c.left,
        top: c.top,
        visible: true,
      }));
    }
  }

  // Remover o evento se o componente for desmontado
  return () => {
    containerRef.current.removeEventListener('mouseover', mouseOver);
  };
}
