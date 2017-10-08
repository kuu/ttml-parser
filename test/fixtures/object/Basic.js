const ttmlObj = {
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
};

module.exports = ttmlObj;
