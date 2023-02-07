export const createSvgTextElement = (
  elType: 'symbol' | 'use',
  textContent: string
) => {
  const fontSizeInput = document.querySelector<HTMLInputElement>('#font-size')!;
  const resultingSvg = document.querySelector<SVGElement>('#result')!;

  const rootEl = document.createElementNS('http://www.w3.org/2000/svg', elType);

  if (elType === 'symbol') {
    const textEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );

    textEl.textContent = textContent;
    textEl.style.fontFamily = 'Arial';
    textEl.style.fontSize = `${fontSizeInput.value}px`;
    textEl.style.fill = 'rgba(255, 255, 255, 0.4)';

    rootEl.setAttribute('viewBox', resultingSvg.getAttribute('viewBox')!);
    rootEl.id = textContent;
    rootEl.innerHTML = textEl.outerHTML;
  } else {
    rootEl.setAttribute('href', `#${textContent}`);
  }

  return rootEl;
};
