let t0 = 0, tn = 20, yprime0 = 2, y0 = 0, stepSize = 0.1;

// const secondDeriv = x => 2*x-10;
// let firstDerivs = euler(secondDeriv, t0, tn, yprime0, stepSize);

const deriv = (x, y) => {
    return 2 * x;
}