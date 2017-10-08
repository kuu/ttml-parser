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
  const expectedLanguages = expected.languages;
  const actualLanguages = actual.languages;
  if (!actualLanguages || Object.keys(actualLanguages).length !== Object.keys(expectedLanguages).length) {
    t.fail();
  }
  for (const key of Object.keys(expectedLanguages)) {
    const expectedLang = expectedLanguages[key];
    const actualLang = actualLanguages[key];
    if (!actualLang || !actualLang.lines || actualLang.lines.length !== expectedLang.lines.length) {
      t.fail();
    }
    const expectedLines = expectedLang.lines;
    const actualLines = actualLang.lines;
    for (let i = 0; i < expectedLines.length; i++) {
      t.deepEqual(expectedLines[i], actualLines[i]);
    }
  }
}
