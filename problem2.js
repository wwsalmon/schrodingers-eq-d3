problem2 = true;

const me = 9.11e-31
const hbar = 1.055e-34;
const k = 8.99e9;
const e = 1.6e-19;
const a = hbar ** 2 / (me * k * e ** 2);

let u = foo => 0;

let n = 1;

let t0 = 1e-50, tn = 3e-10, yprime0 = 1, y0 = 0, stepSize = 1.4e-13;

const secondDeriv = (r, y) => {
    return (1 / (n ** 2 * a ** 2) - 2 / (a * r)) * y;
}


