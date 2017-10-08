[![NPM](https://nodei.co/npm/ttml.png?mini=true)](https://nodei.co/npm/ttml/)
[![Build Status](https://travis-ci.org/kuu/ttml-parser.svg?branch=master)](https://travis-ci.org/kuu/ttml-parser)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

# ttml-parser
A simple library to read/write [TTML](https://w3c.github.io/ttml2/spec/ttml2.html)

For example, it converts the following JS object:

```js
{
  title: 'Timed Text TTML Example',
  copyright: 'The Authors (c) 2006',
  languages: {
    en: {
      lines: [
        {
          start: '0.76s',
          end: '3.45s',
          text: 'It seems a paradox, does it not,'
        },
        {
          start: '5.0s',
          end: '10.0s',
          text: 'that the image formed on<br/>the Retina should be inverted?'
        },
        {
          start: '10.0s',
          end: '16.0s',
          text: 'It is puzzling, why is it<br/>we do not see things upside-down?'
        }
      ]
    },
    es: {
      lines: [
        {
          start: '0.76s',
          end: '3.45s',
          text: 'Parece una paradoja, no es así,'
        },
        {
          start: '5.0s',
          end: '10.0s',
          text: 'que la imagen formada en<br/>la Retina se invierta.'
        },
        {
          start: '10.0s',
          end: '16.0s',
          text: 'Es desconcertante, ¿por qué<br/>no vemos las cosas al revés?'
        }
      ]
    }
  }
}
```

into the following XML text:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<tt xml:lang="en" xmlns="http://www.w3.org/ns/ttml">
  <head>
    <metadata xmlns:ttm="http://www.w3.org/ns/ttml#metadata">
      <ttm:title>Timed Text TTML Example</ttm:title>
      <ttm:copyright>The Authors (c) 2006</ttm:copyright>
    </metadata>
  </head>
  <body>
    <div xml:lang="en">
      <p begin="0.76s" end="3.45s">It seems a paradox, does it not,</p>
      <p begin="5.0s" end="10.0s">that the image formed on&lt;br/&gt;the Retina should be inverted?</p>
      <p begin="10.0s" end="16.0s">It is puzzling, why is it&lt;br/&gt;we do not see things upside-down?</p>
    </div>
    <div xml:lang="es">
      <p begin="0.76s" end="3.45s">Parece una paradoja, no es así,</p>
      <p begin="5.0s" end="10.0s">que la imagen formada en&lt;br/&gt;la Retina se invierta.</p>
      <p begin="10.0s" end="16.0s">Es desconcertante, ¿por qué&lt;br/&gt;no vemos las cosas al revés?</p>
    </div>
  </body>
</tt>
```

and vice versa.

## Install
[![NPM](https://nodei.co/npm/ttml.png?mini=true)](https://nodei.co/npm/ttml/)

## Usage
```js
const TTML = require('ttml');
const ttmlStr = 'Above XML text';
const obj = TTML.parse(ttmlStr);
const str = TTML.stringify(obj);
str === ttmlStr; // true
```
