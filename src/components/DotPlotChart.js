import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DotPlotChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Dimensions
    const width = 500;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 30, left: 40 };
    const gridPadding = 3; // Padding between grid boxes

    // Select SVG element and set dimensions
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous content
    svg.selectAll("*").remove();

    // Scales
    let categories = [...new Set(data.map((d) => d.category))];
    categories.push("extra"); // Add extra category for an additional column

    const xScale = d3
      .scalePoint()
      .domain(categories)
      .range([margin.left, width - margin.right])
      .padding(0.5);

    const maxValue = d3.max(data, (d) => d.value);
    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue ]) // Extend domain to include an extra row on top
      .range([height - margin.bottom, margin.top]);

    // Calculate the cell width and height based on scales
    const gridCellWidth = xScale.step() - gridPadding;
    const gridCellHeight = Math.abs(yScale(0) - yScale(1)) - gridPadding;

    // Draw Grid Boxes
    svg.append("g")
      .selectAll("rect")
      .data(
        yScale
          .ticks(5)
          .concat(maxValue ) // Add extra tick at the top
          .flatMap((yTick) =>
            categories.map((category) => ({ yTick, category }))
          )
      )
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.category) - gridCellWidth )
      .attr("y", (d) => yScale(d.yTick) - gridCellHeight )
      .attr("width", gridCellWidth)
      .attr("height", gridCellHeight)
      .attr("fill", "#e0e0e0")
      .attr("rx", 3)
      .attr("ry", 3);

    // Draw Dots
    const dotRadius = 8;
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.category))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", dotRadius)
      .attr("fill", (d) => d.color)
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .attr("opacity", 1);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default DotPlotChart;
