 const l = { compose: (...s) => i => s.reduceRight((v, f) => f(v), i), pipe: (...s) => i => s.reduce((v, f) => f(v), i) }; if (typeof window !== 'undefined') window.PicoBase = l; else module.exports = l; 