import { createSignal, children, createEffect, onMount } from 'solid-js';
import {
  createMouseInElement,
  createMouseToElement,
} from '@solid-primitives/mouse';

interface Position {
  x: number;
  y: number;
}
export function Stars(props) {
  const c = children(() => props.children);
  // const [{ x, y, sourceType, isInside }, { stop, start }] =
  //   createMouseToElement(() => c() as any, {
  //     followTouch: false,
  //   });
  const [{ x, y, top, left, width, height, isInside }, manualUpdate] =
    createMouseToElement(() => (c() as Element).children[0]);
  createEffect(() => {
    const offsetX = ((x() - width() / 2) / width()) * 2;
    const offsetY = ((y() - height() / 2) / height()) * 2;
    if (isInside()) {
      (c() as HTMLElement).children[0].style.setProperty(
        '--offsetX',
        offsetX.toString()
      );
      (c() as HTMLElement).children[0].style.setProperty(
        '--offsetY',
        offsetY.toString()
      );
    }
  });
  const [pos, posSet] = createSignal<Position>({ x: 0, y: 0 });
  return <>{c()}</>;
}

// export function Tracker({children, ...props}) {
//   return (
//     {children onMouseMove={(pos) => console.log(pos.clientX)}>
//   )
// }
