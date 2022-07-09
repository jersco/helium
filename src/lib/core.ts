const enum Positions {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export type Anchor = HTMLElement;

export type Floating = HTMLElement;

export type Position = 'top' | 'bottom' | 'left' | 'right';

type Cords = { x: number; y: number };

export type Strategy = 'fixed' | 'absolute' | 'relative' | 'sticky' | 'static';

export type Middlware = () => Cords;

export type Middlewares = Middlware[];

export const getBoundingClientRect = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();

  let scaleX = 1;
  let scaleY = 1;

  const x = rect.left / scaleX;
  const y = rect.top / scaleY;

  const width = rect.width / scaleX;
  const height = rect.height / scaleY;

  return {
    x,
    y,
    width,
    height,
    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
  };
};

export const computeCords = (
  anchor: HTMLElement,
  floating: HTMLElement,
  position: Position
): Cords => {
  const anchorRect = getBoundingClientRect(anchor);
  console.log('ANCHOR');
  console.log({ anchorRect });

  const floatingRect = getBoundingClientRect(floating);
  console.log('FLOATING');
  console.log({ floatingRect });

  const x = anchorRect.x + anchorRect.width / 2 - floatingRect.width / 2;
  const y = anchorRect.y + anchorRect.height / 2 - floatingRect.height / 2;

  switch (position) {
    case Positions.Top: {
      return { x, y: anchorRect.y - floatingRect.height };
    }
    case Positions.Bottom: {
      return { x, y: anchorRect.y + anchorRect.height };
    }
    case Positions.Left: {
      return { x: anchorRect.x - floatingRect.width, y };
    }
    case Positions.Right: {
      return { x: anchorRect.x + anchorRect.width, y };
    }
    default: {
      return { x, y };
    }
  }
};

type ComputePositionReturn = Promise<{
  anchor: HTMLElement;
  floating: HTMLElement;
  x: number | null;
  y: number | null;
  position: Position;
  strategy: Strategy;
}>;

export const computePosition = async (
  anchor: Anchor,
  floating: Floating,
  position: Position,
  strategy: Strategy,
  middlewares?: Middlewares
): ComputePositionReturn => {
  const { x, y } = computeCords(anchor, floating, position);

  return {
    anchor,
    floating,
    x,
    y,
    position,
    strategy,
  };
};

export const updatePosition = () => {};
