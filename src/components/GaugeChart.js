// GaugeChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GaugeChart = ({ value = 50, min = 0, max = 100, width = 500, height = 300 }) => {
  const ref = useRef();

  useEffect(() => {
    // Clear previous chart
    d3.select(ref.current).selectAll('*').remove();

    const radius = Math.min(width, height * 2) / 2;
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height})`)

    // Scale for value
    const scale = d3.scaleLinear().domain([min, max]).range([-Math.PI / 2, Math.PI / 2]);

    // Background arc
    const backgroundArc = d3.arc()
      .innerRadius(radius * 0.75)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    svg.append("path")
      .attr("d", backgroundArc)
      .attr("fill", "#e6e6e6");

    // Foreground arc (value arc)
    const foregroundArc = d3.arc()
      .innerRadius(radius * 0.75)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(scale(value));

    svg.append("path")
      .attr("d", foregroundArc)
      .attr("fill", "#4A90E2");

    // Needle
    const needleLength = radius * 0.7;
    const needleAngle = scale(value);
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", needleLength * Math.cos(needleAngle - Math.PI / 2))
      .attr("y2", needleLength * Math.sin(needleAngle - Math.PI / 2))
      .attr("stroke", "#4A90E2")
      .attr("stroke-width", 6)
      .attr("stroke-linecap", "round");

    // Needle base circle
    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 10)
      .attr("fill", "#4A90E2");

    // Text labels (optional)
    const labelRadius = radius * 1.1;
    svg.append("text")
      .attr("x", -labelRadius)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#6e6e6e")
      .text(min);

    svg.append("text")
      .attr("x", labelRadius)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#6e6e6e")
      .text(max);

    svg.append("text")
      .attr("y", radius / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#4A90E2")
      .text(`${value}`);
  }, [value, min, max, width, height]);

  return <svg ref={ref}></svg>;
};

export default GaugeChart;
