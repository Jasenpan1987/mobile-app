// from right to left
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
