# ttml-parser
A simple library to read/write [TTML](https://w3c.github.io/ttml2/spec/ttml2.html)

For example, it converts the following JS object:

```js
{
  title: 'Timed Text TTML Example',
  copyright: 'The Authors (c) 2006',
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
    <div>
      <p begin="0.76s" end="3.45s">It seems a paradox, does it not,</p>
      <p begin="5.0s" end="10.0s">that the image formed on&lt;br/&gt;the Retina should be inverted?</p>
      <p begin="10.0s" end="16.0s">It is puzzling, why is it&lt;br/&gt;we do not see things upside-down?</p>
    </div>
  </body>
</tt>
```

and vice versa.

## Usage
```js
const TTML = require('ttml');
const ttmlStr = 'Above XML text';
const obj = TTML.parse(ttmlStr);
const str = TTML.stringify(obj);
str === ttmlStr; // true
```
