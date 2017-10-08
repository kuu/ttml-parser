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

function getDocumentTemplate() {
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
          // Insert metadata template here
        }
      },
      body: {
        div: [
          // Insert language template here
        ]
      }
    }
  };
}

function getMetadataTemplate() {
  return {
    _attributes: {
      'xmlns:ttm': 'http://www.w3.org/ns/ttml#metadata'
    }
  };
}

function getLauguageTemplate(language) {
  return {
    _attributes: {
      'xml:lang': language
    },
    p: [
      // Insert transcripts here
    ]
  };
}

function createLine(line) {
  return {
    _attributes: {
      begin: line.start,
      end: line.end
    },
    _text: line.text
  };
}

// ttml format => xml-js format
function preProcess(srcObj) {
  const destDocumentObj = getDocumentTemplate();
  let destMetadataObj;
  for (const key of Object.keys(srcObj)) {
    if (key === 'languages') {
      const srcLangObj = srcObj[key];
      const destLangList = destDocumentObj.tt.body.div;
      for (const lang of Object.keys(srcLangObj)) {
        const destLangObj = getLauguageTemplate(lang);
        const destLines = destLangObj.p;
        const srcLines = srcLangObj[lang].lines;
        if (!srcLines || !srcLines.length) {
          INVALID_OBJECT('No lines');
        }
        for (const line of srcLines) {
          if (!line.start || !line.end) {
            INVALID_OBJECT('Each line must have start and end time');
          }
          destLines.push(createLine(line));
        }
        destLangList.push(destLangObj);
      }
    } else {
      const value = srcObj[key];
      if (typeof value !== 'string') {
        INVALID_OBJECT('Metadata value should be a string');
      }
      if (!destMetadataObj) {
        destMetadataObj = getMetadataTemplate();
      }
      destMetadataObj[`ttm:${key}`] = {_text: value};
    }
  }
  if (destMetadataObj) {
    destDocumentObj.tt.head.metadata = destMetadataObj;
  }
  return destDocumentObj;
}

// xml-js format => ttml format
function postProcess(srcObj) {
  const destObj = {};
  // Copy metadata
  const srcMetadataObj = srcObj.tt.head.metadata;
  for (const key of Object.keys(srcMetadataObj)) {
    if (key.startsWith('ttm:')) {
      destObj[key.slice(4)] = srcMetadataObj[key]._text;
    }
  }
  // Copy language
  const destLangObj = {};
  for (const srcLangObj of srcObj.tt.body.div) {
    const destLines = [];
    for (const line of srcLangObj.p) {
      destLines.push({
        start: line._attributes.begin,
        end: line._attributes.end,
        text: line._text
      });
    }
    destLangObj[srcLangObj._attributes['xml:lang']] = {lines: destLines};
  }
  destObj.languages = destLangObj;
  return destObj;
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
