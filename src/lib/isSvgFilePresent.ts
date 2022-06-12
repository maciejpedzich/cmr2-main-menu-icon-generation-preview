export const isSvgFilePresent = () => {
  const svgFileInput = document.querySelector<HTMLInputElement>('#svg-file')!;
  const svgFileBlob = svgFileInput.files!.item(0);

  return !!svgFileBlob;
};
