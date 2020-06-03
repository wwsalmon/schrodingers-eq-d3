let problem1 = problem2 = false;

function euler(f, t0, tn, y0, h) {
    const n = (tn - t0) / h;
    if (n > 10000) console.error("too many steps");
    let retval = [[t0, y0]];
    let t = t0, y = y0;
    let t1, y1;
    for (let i = 0; i < n; i++) {
        m = f(t, y);
        t1 = t + h;
        if (t1 > tn) break;
        y1 = y + h * m;
        retval.push([t1, y1]);
        t = t1;
        y = y1;
    }
    return retval;
}

let counter = 0;

function modifiedEuler(secondDeriv, t0, tn, y0, yprime0, h, u = foo => 0) {
    const n = (tn - t0) / h;
    if (n > 10000) throw "too many steps";

    const retval = [[t0, y0, yprime0, u(t0)]];

    let t = t0, yprime = yprime0, y = y0;
    let t1, yprime1, y1;

    for (let i = 0; i < n; i++) {

        t1 = t + h;
        if (t1 > tn) break;

        ydprime = secondDeriv(t, y);
        yprime1 = yprime + h * ydprime;
        y1 = y + h * yprime1;

        console.log(`rR": ${ydprime}, rR': ${yprime1}, rR: ${y1}`);

        retval.push([t1, y1, yprime1, u(t1)]);

        t = t1;
        yprime = yprime1;
        y = y1;
    }

    console.log(retval);
    return retval;
}