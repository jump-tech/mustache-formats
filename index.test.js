const renderer = require('./index');

describe('templateUtils.date tests', () => {

  it('correctly formats a date', () => {
    expect(
      renderer.render('Date: {{signature_date | date : "DD MMMM YYYY"}}', {
        signature_date: '2019-06-24T16:58:34'
      })
    ).toBe('Date: 24 June 2019');
  });

  it('leaves a null date empty', () => {
    expect(
      renderer.render('Date: {{signature_date | date : "DD MMMM YYYY"}}', {})
    ).toBe('Date: ');
  });

  it('deals with an unparseable date', () => {
    expect(
      renderer.render('Date: {{signature_date | date : "DD MMMM YYYY"}}', {
        signature_date: 'Happy birthday'
      })
    ).toBe('Date: Invalid date');
  })
});

describe('templateUtils.sum tests', () => {
  const template = `Total is {{ initialValue | sum : x1 : x2 : x3}}`;

  it('correctly adds some numbers', () => {
    const data = {
      initialValue: 0,
      x1: 10,
      x2: 3,
      x3: 4.5
    };

    expect(renderer.render(template, data)).toBe('Total is 17.5');
  });

  it('correctly adds up strings which are numbers', () => {
    const data = {
      initialValue: '0.00',
      x1: '10.00',
      x2: 3,
      x3: '4.5'
    };

    expect(renderer.render(template, data)).toBe('Total is 17.5');
  });

  it('deals with non-number strings', () => {
    const data = {
      initialValue: '0.00',
      x1: 'xxx44', // Deliberately use a comma instead of .
      x2: 3,
      x3: '4.5'
    };

    expect(renderer.render(template, data)).toBe(
      'Total is Unable to compute 0.00 + xxx44'
    );
  });

  it('deals with properties which are undefined', () => {
    const data = {
      initialValue: '0.00',
      // NB x1 is missing
      x2: '15',
      x1: '30'
    };

    expect(renderer.render(template, data)).toBe('Total is 45');
  })
});

describe('templateUtils.money tests', () => {

  it('correctly outputs an empty string', () => {
    expect(
      renderer.render('Total: {{total | money}}', {})
    ).toBe('Total: ');
  });

  it('correctly rounds down a number', () => {
    expect(
      renderer.render('Total: {{total | money}}', {
        total: 3.1415
      })
    ).toBe('Total: 3.14');
  });

  it('correctly rounds up a number', () => {
    expect(
      renderer.render('Total: {{total | money}}', {
        total: 0.8656
      })
    ).toBe('Total: 0.87');
  });

  it('correctly formats a string number', () => {
    expect(
      renderer.render('Total: {{total | money}}', {
        total: "0.8656"
      })
    ).toBe('Total: 0.87');
  });

  it('deals with a string which is not a number', () => {
    expect(
      renderer.render('Total: {{total | money}}', {
        total: "ho ho"
      })
    ).toBe('Total: Unable to parse ho ho');
  });
});