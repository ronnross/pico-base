
const lambda = {
  compose: (...fns) => initialValue => fns.reduceRight((value, fn) => fn(value), initialValue),
  pipe: (...fns) => initialValue => fns.reduce((value, fn) => fn(value), initialValue)
};

if (typeof window !== 'undefined') window.PicoBase = lambda;
else module.exports = lambda;
