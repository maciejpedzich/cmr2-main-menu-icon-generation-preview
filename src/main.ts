import './style.css';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import SVGPathCommander from 'svg-path-commander';

import { initResultsSvg } from './lib/initResultsSvg';
import { getDescriptionsFromSvgFile } from './lib/getDescriptionsFromSvgFile';
import { createSvgTextElement } from './lib/createSvgTextElement';
import { isSvgFilePresent } from './lib/isSvgFilePresent';

gsap.registerPlugin(MotionPathPlugin);

const paramsForm = document.querySelector<HTMLFormElement>('#params')!;
const resultingSvg = document.querySelector<SVGElement>('#result')!;

const textToAnimateInput =
  document.querySelector<HTMLInputElement>('#text-to-anim')!;

const animationDurationInput =
  document.querySelector<HTMLInputElement>('#anim-dur')!;

paramsForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const svgFilePresent = isSvgFilePresent();

  if (!svgFilePresent) {
    return alert('You need to select an SVG file to proceed');
  }

  await initResultsSvg();

  const pathDescriptions = (await getDescriptionsFromSvgFile())!;
  const charsToAnimate = textToAnimateInput.value.split('');

  for (const path of pathDescriptions) {
    const pathCommander = new SVGPathCommander(path, {
      round: 'auto'
    });
    const totalPathLength = pathCommander.getTotalLength();

    let start = 0;
    let repeatCount = 0;

    while (start < 1) {
      const currentChar = charsToAnimate[repeatCount % charsToAnimate.length];
      const textElement = createSvgTextElement('use', currentChar);

      gsap.to(textElement, {
        motionPath: {
          path,
          start,
          end: start + 1,
          autoRotate: true
        },
        ease: 'none',
        duration: animationDurationInput.valueAsNumber,
        repeat: -1
      });
      resultingSvg.appendChild(textElement);

      start +=
        (textElement.getBoundingClientRect().width * 2.35) / totalPathLength;
      repeatCount++;
    }
  }
});

window.addEventListener('blur', () => gsap.globalTimeline.pause());

window.addEventListener('focus', () => gsap.globalTimeline.resume());
