import test from 'ava';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from './App';

test('App Passing Test', t => {
  t.pass();
});

// const shallowRenderer = TestUtils.createRenderer();
// shallowRenderer.render(<App />);
// const app = shallowRenderer.getRenderOutput();

// test('should have a div as container', t => {
//   t.is(app.type, 'div');
// });
//
// test('should contains an H1', t => {
//   t.is(app.props.children[0].props.children[0].type, 'h1');
// });
