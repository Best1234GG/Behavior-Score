import React, { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(null); // Initialize the ref

  return <div ref={myRef}>Hello</div>;
}

export default MyComponent;
