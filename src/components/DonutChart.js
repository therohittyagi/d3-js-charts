import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// DonutChart.js
const DonutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 300;
    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Center the chart

    // Arc generator function
    const createArc = (innerRadius, outerRadius, startAngle, endAngle) =>
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .padAngle(0.02)
        .cornerRadius(5);

    // Arc data
    const arcs = [
      {
        innerRadius: 60,
        outerRadius: 80,
        startAngle: Math.PI * 1,
        endAngle: Math.PI * 1.5,
        color: "#d3d3d3",
      }, // Grey

      {
        innerRadius: 90,
        outerRadius: 110,
        startAngle: Math.PI * 0.75,
        endAngle: Math.PI * 1.5,
        color: "#d3d3d3",
      }, // grey
      {
        innerRadius: 60,
        outerRadius: 80,
        startAngle: 0,
        endAngle: Math.PI * 1,
        color: "#FF0000",
        // Red segment
      },
      {
        innerRadius: 90,
        outerRadius: 110,
        startAngle: 0,
        endAngle: Math.PI * 0.75,
        color: "#0000FF",
      }, //blue
    ];

    // Draw arcs
    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", (d) =>
        createArc(d.innerRadius, d.outerRadius, d.startAngle, d.endAngle)()
      )
      .attr("fill", (d) => d.color);

    // Draw the small horizontal lines
    svg
      .append("line")
      .attr("x1", -30)
      .attr("y1", -100)
      .attr("x2", -10)
      .attr("y2", -100)
      .attr("stroke", "#000")
      .attr("stroke-width", 6)
      .attr("stroke-linecap", "round");

    svg
      .append("line")
      .attr("x1", -30)
      .attr("y1", -70)
      .attr("x2", -10)
      .attr("y2", -70)
      .attr("stroke", "#000")
      .attr("stroke-width", 6)
      .attr("stroke-linecap", "round");
  }, []);

  return <svg ref={chartRef}></svg>;
};
export default DonutChart;
