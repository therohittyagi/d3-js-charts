// SunburstChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SunburstChart = ({ data, width = 500, height = 300 }) => {
  const ref = useRef();

  useEffect(() => {
    // Clear any existing SVG elements
    d3.select(ref.current).selectAll('*').remove();

    // Define dimensions and radius
    const radius = Math.min(width, height) / 2;

    // Create color scale
    const color = d3.scaleOrdinal()
      .range(["#87CEEB", "#ADD8E6", "#4682B4", "#6495ED", "#FFD700", "#FFC107", "#FFEB3B", "#E91E63"]);

    // Create root hierarchy and partition layout
    const root = d3.hierarchy(data)
      .sum(d => d.value);

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    partition(root);

    // Create arc generator
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    // Append SVG element
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Draw arcs
    svg.selectAll('path')
      // .data(root.descendants())
      .data(root.descendants().slice(1))
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color((d.children ? d : d.parent).data.name))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

  }, [data, width, height]);

  return <svg ref={ref} />;
};

export default SunburstChart;
