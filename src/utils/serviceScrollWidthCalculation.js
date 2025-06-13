export default function useServiceScrollWidthCalculation({
  event,
  condition,
  setCondition,
}) {
  const { target } = event;

  // Largura total com scroll
  const scrollWidth = target.scrollWidth;
  // Largura visivel para o usuario
  const clientWidth = target.clientWidth;
  // Posição do scroll a partir da esquerda
  const scrollLeft = target.scrollLeft;
  // Calculo pra obter a posição do scroll a partir da direita
  const scrollRight = scrollWidth - clientWidth - scrollLeft;

  const integer = parseInt(scrollRight);

  if (integer < 300 && !condition.includes(scrollWidth)) {
    return [...condition, scrollWidth];
  }
}
