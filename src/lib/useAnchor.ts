import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { computePosition, Middlewares, Position, Strategy } from './core';

type UseAnchorProps = {
  middlware?: Middlewares;
  position?: Position;
  strategy?: Strategy;
};

export const useAnchor = ({
  middlware = [],
  position = 'bottom',
  strategy = 'absolute',
}: UseAnchorProps) => {
  const [anchorData, setAnchorData] = React.useState<{
    x: number | null;
    y: number | null;
    position: Position;
    strategy: Strategy;
  }>({
    x: null,
    y: null,
    position,
    strategy,
  });

  const anchor = React.useRef<HTMLElement | null>(null);

  const floating = React.useRef<HTMLElement | null>(null);

  const cleanupRef = React.useRef<(() => void) | void | null>(null);

  const update = React.useCallback(async () => {
    if (anchor.current && floating.current) {
      const data = await computePosition(
        anchor.current,
        floating.current,
        position,
        strategy,
        middlware
      );
      setAnchorData({ ...data });
    } else {
      return;
    }

    if (!isMounted) {
      ReactDOM.flushSync(() => {
        setAnchorData({ x: null, y: null, position, strategy });
      });
    }
  }, []);

  React.useLayoutEffect(() => {
    // Skip first update
    if (isMounted.current) {
      update();
    }
  }, [update]);

  const isMounted = React.useRef(false);

  React.useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const runElementMountCallback = React.useCallback(() => {
    if (anchor.current && floating.current) {
      update();
    }
  }, [update]);

  const setAnchorRef = React.useCallback((node: HTMLElement | null) => {
    anchor.current = node;
    runElementMountCallback();
  }, []);

  const setFloatRef = React.useCallback((node: HTMLElement | null) => {
    floating.current = node;
    runElementMountCallback();
  }, []);

  const refs = React.useMemo(() => ({ anchor, floating }), []);

  return {
    ...anchorData,
    anchorRef: setAnchorRef,
    floatRef: setFloatRef,
    refs,
  };
};
