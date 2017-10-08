const test = require('ava');
const TTML = require('../../');
const fixtures = require('../helpers/fixtures');

fixtures.forEach(({name, ttml, object}) => {
  test(name, t => {
    const result = TTML.stringify(object);
    t.is(result, ttml);
  });
});
