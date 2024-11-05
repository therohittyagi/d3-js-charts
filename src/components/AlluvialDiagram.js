import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  sankey as d3Sankey,
  sankeyLinkHorizontal,
  sankeyRight,
} from "d3-sankey";

const AlluvialDiagram = ({ data, width = 1000, height = 300 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Setup SVG dimensions and positioning
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Configure sankey layout
    const sankeyGenerator = d3Sankey()
      .nodeWidth(30)
      .nodePadding(20)
      .extent([
        [1, 1],
        [width - 1, height - 5],
      ])
      .nodeAlign(sankeyRight);

    // Generate nodes and links
    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map((d) => ({ ...d })),
      links: data.links.map((d) => ({ ...d })),
    });

    // Draw links with color flowing from right to left
    svg
      .append("g")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", (d) => color(d.target.name)) // Color by target to create right-to-left flow
      .attr("stroke-width", (d) => Math.max(1, d.width))
      .attr("opacity", 0.5);

    // Draw nodes with left-side nodes in grey
    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("fill", (d) => (d.x0 < width / 2 ? "#ccc" : color(d.name))) // Grey for left nodes
      .attr("stroke", "#000");

    // Add text labels
    svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d) => d.name); // Add text for node names
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default AlluvialDiagram;
