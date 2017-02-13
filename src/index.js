const lambda = {
  compose: (...fns) => initialValue => fns.reduceRight((value, fn) => fn(value), initialValue),
  pipe: (...fns) => initialValue => fns.reduce((value, fn) => fn(value), initialValue)
};

module.exports = lambda;
