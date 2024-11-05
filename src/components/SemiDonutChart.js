import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const SemiDonutChart = ({ width, height, innerRadius, outerRadius, color }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous content

        svg.attr("width", width).attr("height", height);

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        const pie = d3.pie()
            .value(1) // Single segment for a full donut
            .sort(null);

        svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`)
            .selectAll("path")
            .data(pie([1])) // One segment to create a full circle
            .join("path")
            .attr("d", arc)
            .attr("fill", color);
    }, [width, height, innerRadius, outerRadius, color]);

    return <svg ref={svgRef}></svg>;
};

export default SemiDonutChart;
