import { createSvgTextElement } from './createSvgTextElement';
import { getParsedSvgDocument } from './getParsedSvgDocument';

export const initResultsSvg = async () => {
  const fontSizeInput = document.querySelector<HTMLInputElement>('#font-size')!;
  const resultingSvg = document.querySelector<SVGElement>('#result')!;
  const textToAnimateInput =
    document.querySelector<HTMLInputElement>('#text-to-anim')!;

  const parsedSvgDocument = await getParsedSvgDocument();

  const viewBoxValues = parsedSvgDocument.documentElement
    .getAttribute('viewBox')!
    .split(' ')
    .map(Number);

  const [minX, minY, width, height] = viewBoxValues;

  let adjustedMinY = minY - fontSizeInput.valueAsNumber;
  let adjustedHeight = height + Math.abs(adjustedMinY);

  resultingSvg.innerHTML = '';
  resultingSvg.setAttribute(
    'viewBox',
    [minX, adjustedMinY, width, adjustedHeight].join(' ')
  );

  const uniqueChars = [...new Set(textToAnimateInput.value).values()];

  for (const char of uniqueChars) {
    const symbolEl = createSvgTextElement('symbol', char);
    resultingSvg.appendChild(symbolEl);
  }
};
