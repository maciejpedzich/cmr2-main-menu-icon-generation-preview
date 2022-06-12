import './style.css';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import SVGPathCommander from 'svg-path-commander';

import { initResultsSvg } from './lib/initResultsSvg';
import { getDescriptionsFromSvgFile } from './lib/getDescriptionsFromSvgFile';
import { getCharsToAnimate } from './lib/getCharsToAnimate';
import { createSvgTextElement } from './lib/createSvgTextElement';
import { isSvgFilePresent } from './lib/isSvgFilePresent';

gsap.registerPlugin(MotionPathPlugin);

const paramsForm = document.querySelector<HTMLFormElement>('#params')!;
const animationDurationInput =
  document.querySelector<HTMLInputElement>('#anim-dur')!;
const resultingSvg = document.querySelector<SVGElement>('#result')!;

paramsForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const svgFilePresent = isSvgFilePresent();

  if (!svgFilePresent) {
    return alert('You need to select an SVG file to proceed');
  }

  await initResultsSvg();

  const descriptions = (await getDescriptionsFromSvgFile())!;
  const charsToAnimate = getCharsToAnimate();

  for (const pathDescription of descriptions) {
    const pathCommander = new SVGPathCommander(pathDescription, {
      round: 'auto'
    });
    const totalPathLength = pathCommander.getTotalLength();
    let start = 0;
    let repeatCount = 0;

    while (start < 1) {
      const textElement = createSvgTextElement(
        charsToAnimate[repeatCount % charsToAnimate.length]
      );

      gsap.to(textElement, {
        motionPath: {
          path: pathDescription,
          start,
          end: start + 1,
          autoRotate: true
        },
        ease: 'none',
        duration: animationDurationInput.valueAsNumber,
        repeat: -1
      });
      resultingSvg.appendChild(textElement);

      start += (textElement.getComputedTextLength() * 2) / totalPathLength;
      repeatCount++;
    }
  }
});
