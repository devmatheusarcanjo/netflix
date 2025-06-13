export default function utilScroll(data) {
  if (data.isDesktop) return desktop(data);
  if (!data.isDesktop) return mobile(data);
}

function mobile({
  moviesContainer,
  moviesParentContainer,
  arrowLeft,
  positionScroll,
  isDesktop,
}) {
  if (
    !moviesContainer.current ||
    !moviesParentContainer.current ||
    !arrowLeft.current
  )
    return;
  const pixels = moviesParentContainer.current.offsetWidth;

  const evitar = evitarPassarDoFinal({
    moviesContainer,
    moviesParentContainer,
    positionScroll,
    pixels,
  });

  if (evitar !== false) {
    scrollWithScrollTo({ moviesContainer, pixels, positionScroll }, evitar);
    scrollWithTransform({ moviesContainer, pixels, positionScroll }, 0);
  } else {
    scrollWithScrollTo({ moviesContainer, pixels, positionScroll }, false);
    scrollWithTransform({ moviesContainer, pixels, positionScroll }, 0);
  }

  // scrollWithScrollTo({ moviesContainer, pixels, positionScroll }, false);
  // scrollWithTransform({ moviesContainer, pixels, positionScroll }, 0);

  adicionarPoiterEvents({ positionScroll, arrowLeft });
}

function desktop({
  moviesContainer,
  moviesParentContainer,
  arrowLeft,
  positionScroll,
  isDesktop,
}) {
  if (
    !moviesContainer.current ||
    !moviesParentContainer.current ||
    !arrowLeft.current
  )
    return;
  const pixels = moviesParentContainer.current.offsetWidth;

  const evitar = evitarPassarDoFinal({
    moviesContainer,
    moviesParentContainer,
    positionScroll,
    pixels,
  });

  if (evitar !== false) {
    scrollWithScrollTo({ moviesContainer, pixels, positionScroll }, 0);
    scrollWithTransform({ moviesContainer, pixels, positionScroll }, evitar);
  } else {
    scrollWithScrollTo({ moviesContainer, pixels, positionScroll }, 0);
    scrollWithTransform({ moviesContainer, pixels, positionScroll }, false);
  }

  console.log('entrou');
  adicionarPoiterEvents({ positionScroll, arrowLeft });
}

function adicionarPoiterEvents({ positionScroll, arrowLeft }) {
  if (positionScroll < 1) {
    arrowLeft.current.style.opacity = 0;
    arrowLeft.current.style.pointerEvents = 'none';
  } else {
    arrowLeft.current.style.opacity = '';
    arrowLeft.current.style.pointerEvents = '';
  }
}

function evitarPassarDoFinal({
  moviesContainer,
  moviesParentContainer,
  positionScroll,
  pixels,
}) {
  const larguraView = moviesContainer.current.offsetWidth;
  const larguraTotal = moviesContainer.current.scrollWidth;
  const result = calculoPixelsParaOScroll({ positionScroll, pixels });
  console.log(result);
  console.log(larguraTotal);
  console.log(larguraView);

  console.log(result + larguraView > larguraTotal);
  if (result > larguraTotal) {
    return -larguraTotal + larguraView;
  } else {
    return false;
  }
}

function calculoPixelsParaOScroll({ positionScroll, pixels }): number {
  return pixels * positionScroll - 50;
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
