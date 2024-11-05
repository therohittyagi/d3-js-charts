import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, sankeyLeft } from 'd3-sankey';

const MultiColumnSankey =  ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous contents
    svg.selectAll("*").remove();

    // Set up the sankey generator
    const sankeyGenerator = sankey()
      .nodeWidth(40)  // Adjust node width for better visibility
      .nodePadding(30)  // Add space between nodes
      .extent([[10, 10], [width - 10, height - 10]]) // Margin around the diagram
      .nodeAlign(sankeyLeft);

    // Generate the sankey data from the input
    const sankeyData = sankeyGenerator(data);

    // Draw links
    svg.append("g")
      .selectAll("path")
      .data(sankeyData.links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", d => d.color || "#999")  // Set link color based on data
      .attr("stroke-opacity", 0.5)  // Semi-transparent links for better layering
      .attr("stroke-width", d => Math.max(1, d.width))  // Dynamic link width

    // Draw nodes
    svg.append("g")
      .selectAll("rect")
      .data(sankeyData.nodes)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => d.color || "#666")  // Node color based on data
      .attr("stroke", "#000")
      .attr("stroke-width", 0.5);

    // Add labels
    svg.append("g")
      .selectAll("text")
      .data(sankeyData.nodes)
      .join("text")
      .attr("x", d => d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(d => d.name)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .filter(d => d.x0 < width / 2)
      .attr("x", d => d.x1 + 6)
      .attr("text-anchor", "start");

  }, [data, width, height]);

  return <svg ref={svgRef} />;
};

export default MultiColumnSankey;
