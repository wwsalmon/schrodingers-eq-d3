problem1 = true;

d3.selectAll(".problem1sliders").style("display","block");

const mproton = 1.673e-27; // kg
const hbar = 1.055e-34; // J * s
const omega = 5.34e-21; // rad / s
const k = omega ** 2 * mproton; // omega = sqrt(k / m) => k = omega^2 * m
const u = x => 0.5 * k * x ** 2; // spring potential energy

let n = 1;

// const E = n => 1e-3 * (n + 0.5) * hbar * omega;
let E = 2.816e-55; // from Maxwell

const a = Math.sqrt(2 * E / k);

let t0 = -1e7, tn=1e7, yprime0 = 1, y0 = 0; stepSize = 5000;

let secondDeriv = (x, y) => {
    return 2 * mproton / (hbar ** 2) * (u(x) - E) * y;
}