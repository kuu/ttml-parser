const {xml2js, js2xml} = require('xml-js');

function THROW(msg) {
  throw new Error(msg);
}

function INVALID_OBJECT(msg) {
  THROW(`Invalid JS object: ${msg}`);
}

/*
function INVALID_TTML(msg) {
  THROW(`Invalid TTML: ${msg}`);
}
*/

function getTemplate() {
  return {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'UTF-8'
      }
    },
    tt: {
      _attributes: {
        'xml:lang': 'en',
        xmlns: 'http://www.w3.org/ns/ttml'
      },
      head: {
        metadata: {
          _attributes: {
            'xmlns:ttm': 'http://www.w3.org/ns/ttml#metadata'
          }
          // Insert here
        }
      },
      body: {
        div: {
          p: [
            // and here
          ]
        }
      }
    }
  };
}

function formalizeTime(time) {
  if (typeof time === 'string') {
    return time;
  }
  if (typeof time === 'number') {
    return time + 's';
  }
  INVALID_OBJECT('start and end should be string or number');
}

function createLine(line) {
  const start = formalizeTime(line.start);
  const end = formalizeTime(line.end);
  return {
    _attributes: {
      begin: start,
      end
    },
    _text: line.text
  };
}

function preProcess(originalObj) {
  const obj = getTemplate();
  const metadataObj = obj.tt.head.metadata;
  const lineList = obj.tt.body.div.p;
  for (const key of Object.keys(originalObj)) {
    if (key === 'lines') {
      const lines = originalObj[key];
      if (!lines.length) {
        INVALID_OBJECT('No lines');
      }
      for (const line of lines) {
        if (!line.start || !line.end) {
          INVALID_OBJECT('Each line must have start and end time');
        }
        lineList.push(createLine(line));
      }
    } else {
      const value = originalObj[key];
      if (typeof value !== 'string') {
        INVALID_OBJECT('Metadata value should be a string');
      }
      metadataObj[`ttm:${key}`] = {_text: value};
    }
  }
  return obj;
}

function postProcess(originalObj) {
  const lines = [];
  const obj = {lines};
  const metadataObj = originalObj.tt.head.metadata;
  for (const key of Object.keys(metadataObj)) {
    if (key.startsWith('ttm:')) {
      obj[key.slice(4)] = metadataObj[key]._text;
    }
  }
  const lineList = originalObj.tt.body.div.p;
  for (const line of lineList) {
    lines.push({
      start: line._attributes.begin,
      end: line._attributes.end,
      text: line._text
    });
  }
  return obj;
}

function parse(ttmlStr) {
  return postProcess(xml2js(ttmlStr, {compact: true}));
}

function stringify(ttmlObj) {
  return js2xml(preProcess(ttmlObj), {compact: true, spaces: 2});
}

module.exports = {
  parse,
  stringify
};
