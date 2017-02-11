const { describe, it, expect, PicoBase: PL } = init();

function init() {
  if (typeof window === 'undefined') {
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    global.jasmine.getEnv().clearReporters();               // remove default reporter logs
    global.jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
      spec: {
        displayPending: true
      }
    }));
  }

  if (typeof window !== 'undefined') {
    const { PicoBase, describe, expect, it } = window;
    return { PicoBase, describe, expect, it };
  } else {
    const PicoBase = require('../src/index.js');
    const { describe, expect, it } = global;
    return { PicoBase, describe, expect, it };
  }
}

describe('api: compose', () => {
  const is = a => b => {
    expect(a).toEqual(b);
    return a;
  };
  it('should compose multiple functions and run them from right to left', () => {
    PL.compose(
      PL.map(x => x + 1),
      is([3]),
      PL.map(x => x + 1),
      is([2]),
      PL.map(x => x + 1),
      is([1]),
      PL.map(x => x + 1)
    )([0]);
  });
  it('compose ( reduce <- map <- filter <- concat <- cons )', () => {
    PL.compose(
      is(42),
      PL.reduce((acc, val) => val + acc),
      is([12, 14, 16]),
      PL.map(x => x * 2),
      is([6, 7, 8]),
      PL.filter(x => x > 5),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      PL.concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5]),
      PL.unshift(0),
      is([1, 2, 3, 4, 5])
    )([1, 2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [0];
    PL.compose(
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1)
    )(arr);
    expect(arr).toEqual([0]);
  });
});

describe('api: pipe', () => {
  const is = a => b => {
    expect(a).toEqual(b);
    return a;
  };
  it('should pipe multiple functions and run them from left to right', () => {
    PL.pipe(
      PL.map(x => x + 1),
      is([1]),
      PL.map(x => x + 1),
      is([2]),
      PL.map(x => x + 1),
      is([3]),
      PL.map(x => x + 1)
    )([0]);
  });
  it('pipe ( cons -> concat -> filter -> map -> reduce )', () => {
    PL.pipe(
      is([1, 2, 3, 4, 5]),
      PL.unshift(0),
      is([0, 1, 2, 3, 4, 5]),
      PL.concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      PL.filter(x => x > 5),
      is([6, 7, 8]),
      PL.map(x => x * 2),
      is([12, 14, 16]),
      PL.reduce((acc, val) => val + acc),
      is(42)
    )([1, 2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [0];
    PL.pipe(
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1)
    )(arr);
    expect(arr).toEqual([0]);
  });
});
