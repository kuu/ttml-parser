const test = require('ava');
const TTML = require('../../');
const fixtures = require('../helpers/fixtures');

fixtures.forEach(({name, ttml, object}) => {
  test(name, t => {
    const result = TTML.parse(ttml);
    deepEqual(t, object, result);
  });
});

function deepEqual(t, expected, actual) {
  t.deepEqual(expected, actual);
  const expectedLines = expected.lines;
  const actualLines = actual.lines;
  if (!actualLines || actualLines.length !== expectedLines.length) {
    t.fail();
  }
  for (let i = 0; i < actualLines.length; i++) {
    t.deepEqual(expectedLines[i], actualLines[i]);
  }
}
