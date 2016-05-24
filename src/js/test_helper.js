import React from 'react';
import TestUtils from 'react-addons-test-utils';

function renderShallow(component) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(component);
  return shallowRenderer.getRenderOutput();  
}

export { renderShallow };

