export const createSvgTextElement = (textContent: string) => {
  const fontSizeInput = document.querySelector<HTMLInputElement>('#font-size')!;
  const textElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  );

  textElement.style.fontFamily = 'Arial';
  textElement.style.fontSize = `${fontSizeInput.value}px`;
  textElement.style.fill = 'rgba(255, 255, 255, 0.4)';
  textElement.textContent = textContent;
  return textElement;
};
