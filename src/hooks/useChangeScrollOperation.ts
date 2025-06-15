import { useEffect } from 'react';
import useDeviceDetection from './useDeviceDetection';

export default function useChangeScrollOperation({
  moviesContainer,
  moviesParentContainer,
  arrowLeft,
  positionScroll,
  setPositionScroll,
  arrowRight,
}) {
  const device = useDeviceDetection().device;

  useEffect(() => {
    // Só passa se todas as referencias estiverem visiveis
    if (
      !moviesContainer.current ||
      !moviesParentContainer.current ||
      !arrowLeft.current
    )
      return;

    // pixels define quantos pixels sera utilizado no scroll, ele pega a largura total do pai que é overflow hidden
    const pixels = moviesParentContainer.current.offsetWidth - 300;

    // Executa o scroll horizontal de acordo com o tipo de dispositivo.
    // - Em dispositivos desktop, utiliza `transform: translateX` para mover os elementos manualmente.
    //   Isso é necessário porque os cards de filmes expandem ao passar o mouse (hover), revelando detalhes adicionais.
    //   Para que essa expansão funcione corretamente, o contêiner pai precisa ter `overflow: visible` —
    //   o que impede o uso do scroll nativo.
    // - Em dispositivos móveis, como não há interação de hover nem expansão dos cards, usamos `scrollIntoView` com scroll nativo.
    //   Assim, mantemos o layout mais simples e funcional em telas menores.

    executarScroll({
      device,
      moviesContainer,
      moviesParentContainer,
      positionScroll,
      pixels,
      setPositionScroll,
    });

    // Adiciona poiter events no botao da esqueda quando nao tiver mais scroll pra esquerda
    adicionarPoiterEvents({
      positionScroll,
      arrowLeft,
      arrowRight,
      moviesContainer,
      pixels,
    });
  }, [positionScroll]);
}

// Executa o scroll da forma correta de acordo com o dispositivo. Se for o ceular, o scroll sera o nativo, se for computador, o scroll sera manual
function executarScroll({
  device,
  moviesContainer,
  moviesParentContainer,
  positionScroll,
  pixels,
  setPositionScroll,
}) {
  const evitar = evitarPassarDoFinal({
    moviesContainer,
    moviesParentContainer,
    positionScroll,
    pixels,
    setPositionScroll,
  });

  if (device === 'desktop') {
    scrollWithScrollTo({ moviesContainer, pixels, positionScroll }, 0);
    scrollWithTransform({ moviesContainer, pixels, positionScroll }, evitar);
  }

  if (!(device === 'desktop')) {
    scrollWithScrollTo({ moviesContainer, pixels, positionScroll }, evitar);
    scrollWithTransform({ moviesContainer, pixels, positionScroll }, 0);
  }
}

// Função para remover os botoes de seta do scroll manual desktop quando chegar ao fim
function adicionarPoiterEvents({
  positionScroll,
  arrowLeft,
  arrowRight,
  moviesContainer,
  pixels,
}) {
  const ifLeft = verificarSeChegouAoFim(
    { moviesContainer, positionScroll, pixels },
    'left'
  );

  const ifRight = verificarSeChegouAoFim(
    { moviesContainer, positionScroll, pixels },
    'right'
  );

  if (ifLeft) {
    arrowLeft.current.style.opacity = 0;
    arrowLeft.current.style.pointerEvents = 'none';
  } else {
    arrowLeft.current.style.opacity = '';
    arrowLeft.current.style.pointerEvents = '';
  }

  if (ifRight) {
    arrowRight.current.style.opacity = 0;
    arrowRight.current.style.pointerEvents = 'none';
  } else {
    arrowRight.current.style.opacity = '';
    arrowRight.current.style.pointerEvents = '';
  }
}

function verificarSeChegouAoFim(
  { moviesContainer, positionScroll, pixels },
  lado: string
) {
  if (lado === 'left') {
    return positionScroll.position < 1;
  } else if (lado === 'right') {
    const larguraView = moviesContainer.current.offsetWidth;
    const larguraTotal = moviesContainer.current.scrollWidth;
    const result = calculoPixelsParaOScroll({ positionScroll, pixels });

    return result + larguraView > larguraTotal;
  }
}

function evitarPassarDoFinal({
  moviesContainer,
  moviesParentContainer,
  positionScroll,
  pixels,
  setPositionScroll,
}) {
  const larguraView = moviesContainer.current.offsetWidth;
  const larguraTotal = moviesContainer.current.scrollWidth;
  const result = calculoPixelsParaOScroll({ positionScroll, pixels });

  if (result + larguraView > larguraTotal) {
    const r = -(larguraTotal - larguraView);
    // Consicionão para evitar loop infinito, pois ao mudar o estado, essa funcao pode ser executada novamente
    if (!positionScroll.blockAddition) {
      setPositionScroll((a) => ({ ...a, blockAddition: true }));
    }
    return r;
  } else {
    // Consicionão para evitar loop infinito, pois ao mudar o estado, essa funcao pode ser executada novamente
    if (positionScroll.blockAddition) {
      setPositionScroll((a) => ({ ...a, blockAddition: false }));
    }

    return false;
  }
}

function calculoPixelsParaOScroll({ positionScroll, pixels }): number {
  return 1957 * positionScroll.position;
}

function scrollWithTransform(
  { moviesContainer, pixels, positionScroll },
  left: number | boolean | string
) {
  moviesContainer.current.style.transform = `translate3d(${
    left !== false
      ? left
      : -calculoPixelsParaOScroll({ positionScroll, pixels })
  }px,0,0)`;
}

function scrollWithScrollTo(
  { moviesContainer, pixels, positionScroll },
  left: number | boolean | string
) {
  moviesContainer.current.scrollTo({
    behavior: 'smooth',
    left:
      left !== false
        ? left
        : calculoPixelsParaOScroll({ positionScroll, pixels }),
  });
}
