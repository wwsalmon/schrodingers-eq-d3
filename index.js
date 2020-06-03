let data;
if (problem1 || problem2){
    data = modifiedEuler(secondDeriv, t0, tn, y0, yprime0, stepSize, u);
    if (problem2) data = data.map(d => [d[0], 4 * Math.PI * d[1] ** 2, d[2], d[3]]);
}
else{
    data = euler(deriv, t0, tn, y0, stepSize);
}

let maxval = data[0][1];
let maxind = 0;

for (let i = 1; i < data.length; i++){
    if (data[i][1] > maxval){
        maxval = data[i][1];
        maxind = i;
    }
}

console.log(data[maxind][0]);



// D3 rendering code

let xScale = d3.scaleLinear()
    .domain([t0, tn])
    .range([margin.left, width - margin.right]);

let yScale = d3.scaleLinear()
    .domain(d3.extent(data.filter(d => d[1] !== Infinity && d[1] !== -Infinity), d => d[1]))
    .range([height - margin.bottom, margin.top]);

let xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.format(".1e"));

let yAxis = d3.axisLeft()
    .scale(yScale)
    .tickFormat(d3.format(".1e"));

svg.append("g")
    .attr("transform", `translate(0 ${height - margin.bottom})`)
    .attr("class", "xAxis")
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("class", "yAxis")
    .call(yAxis);

svg.selectAll(".main-line")
    .data([data])
    .join("polyline")
    .attr("class","main-line")
    .attr("points", () => {
        let retval = "";
        for (point of data){
            const xval = xScale(point[0]);
            let yval;
            if (point[1] == Infinity || point[1] == -Infinity){
                console.log("inf'd");
                yval = 0;
            }
            else{
                yval = yScale(point[1]);
            }
            retval += `${xval},${yval} `;
        }
        return(retval);
    })
    .attr("fill", "none")
    .attr("stroke", "black");

if (problem1) {
    let energyScale = d3.scaleLinear()
        .domain(d3.extent([u(0), u(t0), E]))
        .range([height - margin.bottom, margin.top]);

    let energyAxis = d3.axisRight()
        .scale(energyScale)
        .tickFormat(d3.format(".1e"));

    svg.append("g")
        .attr("transform", `translate(${width - margin.right}, 0)`)
        .attr("class", "energyAxis")
        .call(energyAxis);

    svg.selectAll(".potential-line")
        .data([data])
        .join("polyline")
        .attr("class", "potential-line")
        .attr("points", () => {
            let retval = "";
            for (point of data) {
                const xval = xScale(point[0]);
                const yval = energyScale(point[3]);
                retval += `${xval},${yval} `;
            }
            return (retval);
        })
        .attr("fill", "none")
        .attr("stroke", "red");

    svg.append("path")
        .attr("class", "energy-line")
        .attr("d", `M${xScale(t0)} ${energyScale(E)} L${xScale(tn)} ${energyScale(E)}`)
        .attr("stroke", "red")
        .attr("stroke-dasharray", "3 6");
}


function inputChange(e){
    const inputClass = e.className;
    const val = e.value;

    if (val == 0) return;

    d3.selectAll(`.${inputClass}`)
        .attr("value", val)
        .each(function(){
            this.value = val;
        });

    if (e.className == "stepSizeInput") stepSize = +val;
    else if (e.className == "startInput") t0 = +val;
    else if (e.className == "endInput") tn = +val;
    else if (e.className == "startYInput") y0 = +val;
    else if (problem1 && e.className == "energyInput") E = +val;
    // else if (e.className == "radiusInput") a = +val;

    // if (problem1){
    //     let E = Math.PI ** 2 * hbar ** 2 / (2 * mproton * a ** 2);
    //     let firstDerivs = euler(secondDeriv, t0, tn, yprime0, stepSize);
    // }

    if (problem1 || problem2) {
        data = modifiedEuler(secondDeriv, t0, tn, y0, yprime0, stepSize, u);
        if (problem2) data = data.map(d => [d[0], 4 * Math.PI * d[1] ** 2, d[2], d[3]]);
    }
    else {
        data = euler(deriv, t0, tn, y0, stepSize);
    }

    xScale = d3.scaleLinear()
        .domain([t0, tn])
        .range([margin.left, width - margin.right]);

    yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d[1]))
        .range([height - margin.bottom, margin.top]);

    xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.format(".1e"));

    yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(d3.format(".1e"));

    d3.selectAll("g.xAxis")
        .call(xAxis);

    d3.selectAll("g.yAxis")
        .call(yAxis);

    if (problem1) {
        energyScale = d3.scaleLinear()
            .domain(d3.extent([u(0), u(t0), E]))
            .range([height - margin.bottom, margin.top]);

        energyAxis = d3.axisRight()
            .scale(energyScale)
            .tickFormat(d3.format(".1e"));

        d3.selectAll("g.energyAxis")
            .call(energyAxis);

        svg.select(".energy-line")
            .attr("d", `M${xScale(t0)} ${energyScale(E)} L${xScale(tn)} ${energyScale(E)}`);
    }

    svg.selectAll(".main-line")
        .data([data])
        .join("polyline")
        .attr("points", () => {
            let retval = "";
            for (point of data) {
                const xval = xScale(point[0]);
                const yval = yScale(point[1]) || yScale(data[0][1]);
                retval += `${xval},${yval} `;
            }
            return (retval);
        })

    if (problem1) {
        svg.selectAll(".potential-line")
            .data([data])
            .join("polyline")
            .attr("points", () => {
                let retval = "";
                for (point of data) {
                    const xval = xScale(point[0]);
                    const yval = energyScale(point[3]);
                    retval += `${xval},${yval} `;
                }
                return (retval);
            })
    }
}