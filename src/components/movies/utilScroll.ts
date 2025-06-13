export default function utilScroll(data) {
  if (data.isDesktop) return desktop(data);
  if (!data.isDesktop) return mobile(data);
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

  moviesContainer.current.scrollTo({
    behavior: 'smooth',
    left: pixels * positionScroll - 50,
  });

  if (positionScroll < 1) {
    arrowLeft.current.style.opacity = 0;
    arrowLeft.current.style.pointerEvents = 'none';
  } else {
    arrowLeft.current.style.opacity = '';
    arrowLeft.current.style.pointerEvents = '';
  }
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

  moviesContainer.current.scrollTo({
    behavior: 'smooth',
    left: pixels * positionScroll - 50,
  });

  if (positionScroll < 1) {
    arrowLeft.current.style.opacity = 0;
    arrowLeft.current.style.pointerEvents = 'none';
  } else {
    arrowLeft.current.style.opacity = '';
    arrowLeft.current.style.pointerEvents = '';
  }
}
