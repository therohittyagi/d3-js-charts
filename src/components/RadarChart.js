// RadarChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data, levels = 5, width = 500, height = 300 }) => {
  const ref = useRef();

  useEffect(() => {
    // Clear previous chart
    d3.select(ref.current).selectAll('*').remove();

    const radius = Math.min(width, height) / 2;
    const allAxes = data[0].map(d => d.axis);
    const totalAxes = allAxes.length;
    const angleSlice = (2 * Math.PI) / totalAxes;

    // Set up color scheme
    const color = d3.scaleOrdinal().range(["#ffcccb", "#98fb98"]);

    // Set up the scale for each axis
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 10]); // Adjust the domain as per your data max value

    // Create SVG
    const svg = d3.select(ref.current)
      .attr("width", width )
      .attr("height", height )
      .append("g")
      .attr("transform", `translate(${(width / 2) }, ${(height / 2) })`);

    // Draw grid circles and labels
    for (let i = 0; i < levels; i++) {
      const levelFactor = (radius / levels) * (i + 1);
      svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", levelFactor)
        .attr("fill", "none")
        .attr("stroke", "#CDCDCD")
        .attr("stroke-width", "1px");
    }

    // Draw axis lines and labels
    svg.selectAll(".axis")
      .data(allAxes)
      .enter()
      .append("g")
      .attr("class", "axis")
      .each(function(d, i) {
        d3.select(this)
          .append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", rScale(10) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr("y2", rScale(10) * Math.sin(angleSlice * i - Math.PI / 2))
          .attr("stroke", "#CDCDCD")
          .attr("stroke-width", "2px");

        // Axis labels
        d3.select(this)
          .append("text")
          .attr("x", (rScale(10) + 10) * Math.cos(angleSlice * i - Math.PI / 2))
          .attr("y", (rScale(10) + 10) * Math.sin(angleSlice * i - Math.PI / 2))
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .text(d);
      });

    // Function to draw radar area with smooth curves
    const radarArea = d3.areaRadial()
      .angle((d, i) => i * angleSlice)
      .innerRadius(0)
      .outerRadius(d => rScale(d.value))
      .curve(d3.curveCardinalClosed); // This curve makes the chart circular

    // Draw radar areas
    data.forEach((dataSet, i) => {
      svg.append("path")
        .datum(dataSet)
        .attr("d", radarArea)
        .attr("fill", color(i))
        .attr("fill-opacity", 0.6)
        .attr("stroke", color(i))
        .attr("stroke-width", 2);
    });
  }, [data, levels, width, height]);

  return <svg ref={ref} />;
};

export default RadarChart;
