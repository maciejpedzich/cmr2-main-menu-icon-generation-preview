const textToAnimateInput =
  document.querySelector<HTMLInputElement>('#text-to-anim')!;

export const getCharsToAnimate = () =>
  textToAnimateInput.value.trim().split('');
