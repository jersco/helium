import * as React from 'react';
import * as ReactDOM from 'react-dom';

import styled from '@emotion/styled';

import { useAnchor } from './lib/useAnchor';

const Anchor = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid red;
`;

const Floater = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid blue;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
  border: 1px solid green;
`;

const Portal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, document.body);
};

export function App() {
  const { anchorRef, floatRef, x, y, strategy, refs } = useAnchor({
    position: 'bottom',
    middlware: [{ name: 'offset', fn: ({ x, y }) => ({ x, y: y + 25 }) }],
  });

  const [show, setShow] = React.useState(false);

  const handleMouseOver = () => {
    console.log('trigger1');
    setShow(true);
  };

  const handleMouseLeave = () => {
    console.log('trigger2');
    setShow(false);
  };

  console.log(show);

  console.log(refs);

  return (
    <Wrapper>
      <Anchor
        ref={anchorRef}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
      <Portal>
        {show && (
          <Floater
            ref={floatRef}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
          />
        )}
      </Portal>
    </Wrapper>
  );
}
