// src/BoxPlotChart.js
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BoxPlotChart = ({ data, width = 500, height = 300 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear existing elements

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const newwidth = width - margin.left - margin.right;
    const newheight = height - margin.top - margin.bottom;

    const chart = svg
      .attr("width", newwidth + margin.left + margin.right)
      .attr("height", newheight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, newwidth])
      .padding(0.3);

    const x1 = d3.scaleBand().domain(["A", "B"]).range([0, x0.bandwidth()]);
    // .padding(0.2);

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max([d.a_max, d.b_max])) * 1.1]) // adding some padding
      .range([newheight, 0]);

    // X and Y axes
    chart
      .append("g")
      .attr("transform", `translate(0,${newheight})`)
      .call(d3.axisBottom(x0));

    chart.append("g").call(d3.axisLeft(y));

    // Colors for box plot
    const colors = ["#008080", "#9e9e9e"];

    // Draw the boxes and whiskers for each sub-category
    data.forEach((d) => {
      ["A", "B"].forEach((key, i) => {
        const xPosition = x0(d.category) + x1(key);
        const q1 = d[`${key.toLowerCase()}_q1`];
        const q3 = d[`${key.toLowerCase()}_q3`];
        const median = d[`${key.toLowerCase()}_median`];
        const min = d[`${key.toLowerCase()}_min`];
        const max = d[`${key.toLowerCase()}_max`];

        // Box
        chart
          .append("rect")
          .attr("x", xPosition)
          .attr("y", y(q3))
          .attr("width", x1.bandwidth())
          .attr("height", y(q1) - y(q3))
          .attr("fill", colors[i]);

        // Median line
        chart
          .append("line")
          .attr("x1", xPosition)
          .attr("x2", xPosition + x1.bandwidth())
          .attr("y1", y(median))
          .attr("y2", y(median))
          .attr("stroke", "black")
          .attr("stroke-width", 2);

        // Whiskers
        chart
          .append("line")
          .attr("x1", xPosition + x1.bandwidth() / 2)
          .attr("x2", xPosition + x1.bandwidth() / 2)
          .attr("y1", y(min))
          .attr("y2", y(q1))
          .attr("stroke", "black");

        chart
          .append("line")
          .attr("x1", xPosition + x1.bandwidth() / 2)
          .attr("x2", xPosition + x1.bandwidth() / 2)
          .attr("y1", y(q3))
          .attr("y2", y(max))
          .attr("stroke", "black");

        // Min and max ticks
        chart
          .append("line")
          .attr("x1", xPosition + x1.bandwidth() / 2 - 5)
          .attr("x2", xPosition + x1.bandwidth() / 2 + 5)
          .attr("y1", y(min))
          .attr("y2", y(min))
          .attr("stroke", "black");

        chart
          .append("line")
          .attr("x1", xPosition + x1.bandwidth() / 2 - 5)
          .attr("x2", xPosition + x1.bandwidth() / 2 + 5)
          .attr("y1", y(max))
          .attr("y2", y(max))
          .attr("stroke", "black");
      });
    });
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default BoxPlotChart;
