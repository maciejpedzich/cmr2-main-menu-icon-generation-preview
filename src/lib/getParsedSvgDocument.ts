export const getParsedSvgDocument = async () => {
  const svgFileInput = document.querySelector<HTMLInputElement>('#svg-file')!;
  const svgFileBlob = svgFileInput.files!.item(0)!;

  const svgFileContent = await svgFileBlob.text();
  const parsedSvgDocument = new DOMParser().parseFromString(
    svgFileContent,
    'image/svg+xml'
  );

  return parsedSvgDocument;
};
