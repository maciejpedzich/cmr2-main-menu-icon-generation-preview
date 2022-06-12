import { getParsedSvgDocument } from './getParsedSvgDocument';

export const initResultsSvg = async () => {
  const fontSizeInput = document.querySelector<HTMLInputElement>('#font-size')!;
  const resultingSvg = document.querySelector<SVGElement>('#result')!;
  const parsedSvgDocument = await getParsedSvgDocument();
  const viewBoxValues = parsedSvgDocument.documentElement
    .getAttribute('viewBox')!
    .split(' ')
    .map(Number);

  let [minX, minY, width, height] = viewBoxValues;
  let adjustedMinX = minX - fontSizeInput.valueAsNumber;
  let adjustedMinY = minY - fontSizeInput.valueAsNumber;
  let adjustedWidth = width + Math.abs(adjustedMinX);
  let adjustedHeight = height + Math.abs(adjustedMinY);

  resultingSvg.innerHTML = '';
  resultingSvg.setAttribute(
    'viewBox',
    [adjustedMinX, adjustedMinY, adjustedWidth, adjustedHeight].join(' ')
  );
};
