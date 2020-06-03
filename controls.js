const width = 800, height = 500;
const margin = { top: 40, left: 80, bottom: 40, right: 80 };
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.selectAll(".startInput").attr("value", t0).each(function () { this.value = +t0 });
d3.selectAll(".endInput").attr("value", tn).each(function () { this.value = +tn });
d3.selectAll(".startYInput").attr("value", y0).each(function () { this.value = +y0 });
d3.selectAll(".stepSizeInput").attr("value", stepSize).each(function () { this.value = +stepSize });
if (problem1) d3.selectAll(".energyInput").attr("value", E).each(function () { this.value = +E }); else d3.selectAll(".energyInput").attr("disabled", "disabled");

function inputChange(e) {
    const inputClass = e.className;
    const val = e.value;

    if (val == 0) return;

    d3.selectAll(`.${inputClass}`)
        .attr("value", val)
        .each(function () {
            this.value = val;
        });

    if (e.className == "stepSizeInput") stepSize = +val;
    else if (e.className == "startInput") t0 = +val;
    else if (e.className == "endInput") tn = +val;
    else if (e.className == "startYInput") y0 = +val;
    else if (problem1 && e.className == "energyInput") E = +val;

    update();
}