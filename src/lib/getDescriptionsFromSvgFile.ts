import { getParsedSvgDocument } from './getParsedSvgDocument';

export const getDescriptionsFromSvgFile = async () => {
  const parsedSvgDocument = (await getParsedSvgDocument())!;
  const definedPaths = Array.from(parsedSvgDocument.querySelectorAll('path'))
    .map((path) => path.getAttribute('d')!)
    .filter((path) => path);

  if (definedPaths.length === 0) {
    alert('The SVG file has to consist of at least one path element');
    return;
  }

  return definedPaths;
};
