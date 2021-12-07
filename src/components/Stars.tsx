import { children, createEffect } from 'solid-js';
import { createMouseToElement } from '@solid-primitives/mouse';

export function Stars(props) {
  const c = children(() => props.children);
  const [{ x, y, width, height, isInside }] = createMouseToElement(
    // () => (c() as Element).children[0]
    () => globalThis.document.querySelector('main')
  );
  createEffect(() => {
    const offsetX = (((x() - width() / 2) / width()) * 2) % 1;
    const offsetY = (((y() - height() / 2) / height()) * 2) % 1;
    console.log(offsetX, offsetY);
    const elem = [
      (c() as HTMLElement).children[0] as HTMLElement,
      (c() as HTMLElement).children[1] as HTMLElement,
    ];
    if (x()) {
      for (const el of elem) {
        el.style.setProperty('--offsetX', offsetX.toString());
        el.style.setProperty('--offsetY', offsetY.toString());
      }
    }
  });

  return <div>{c()}</div>;
}
