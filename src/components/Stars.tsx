import { children, createEffect } from 'solid-js';
import { createMouseToElement } from '@solid-primitives/mouse';

export function Stars(props) {
  const c = children(() => props.children);
  const [{ x, y, width, height, isInside }] = createMouseToElement(
    () => (c() as Element).children[0]
  );
  createEffect(() => {
    const offsetX = ((x() - width() / 2) / width()) * 2;
    const offsetY = ((y() - height() / 2) / height()) * 2;
    const elem = (c() as HTMLElement).children[0] as HTMLElement;
    if (isInside()) {
      elem.style.setProperty('--offsetX', offsetX.toString());
      elem.style.setProperty('--offsetY', offsetY.toString());
    }
  });

  return <div $ServerOnly>{c()}</div>;
}
