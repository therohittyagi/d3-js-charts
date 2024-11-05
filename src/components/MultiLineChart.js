// src/MultiLineChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const MultiLineChart = ({ data , width = 500, height = 300}) => {
    const svgRef = useRef();

    

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Set up margins and dimensions
        const margin = { top: 40, right: 60, bottom: 30, left: 50 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Append a group element for the chart
        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Define scales
        const x = d3.scaleLinear()
            .domain(d3.extent(data[0].values, d => d.x)) // assuming all series have same x values
            .range([0, chartWidth]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d3.max(d.values, v => v.y))])
            .nice()
            .range([chartHeight, 0]);

        // Define color scale
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(["#4caf50", "#2196f3", "#9e9e9e", "#ff5722"]); // adjust colors as needed

        // Line generator with curve
        const line = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y))
            .curve(d3.curveMonotoneX);

        // Area generator for shading under one line
        const area = d3.area()
            .x(d => x(d.x))
            .y0(chartHeight)
            .y1(d => y(d.y))
            .curve(d3.curveMonotoneX);

        // Draw each line, shaded area, and markers
        data.forEach((series, index) => {
            // Draw shaded area under the first series
            if (index === 0) {
                g.append("path")
                    .datum(series.values)
                    .attr("fill", color(series.name))
                    .attr("opacity", 0.3)
                    .attr("d", area);
            }

            // Draw line with dashed pattern for specific series
            g.append("path")
                .datum(series.values)
                .attr("fill", "none")
                .attr("stroke", color(series.name))
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", series.dashed ? "4 4" : "0") // apply dashed lines if `series.dashed` is true
                .attr("d", line);

            // Draw markers on each point
            g.selectAll(`.dot-${series.name}`)
                .data(series.values)
                .enter()
                .append("circle")
                .attr("fill", color(series.name))
                .attr("cx", d => x(d.x))
                .attr("cy", d => y(d.y))
                .attr("r", 4);
        });

        // Add X-axis
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x).ticks(6));

        // Add Y-axis
        g.append("g")
            .call(d3.axisLeft(y).ticks(5));

        // Add grid lines
        const grid = g.append("g")
            .attr("class", "grid");

        grid.append("g")
            .selectAll("line")
            .data(y.ticks(5))
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("x2", chartWidth)
            .attr("y1", y)
            .attr("y2", y)
            .attr("stroke", "#e0e0e0");

        grid.append("g")
            .selectAll("line")
            .data(x.ticks(6))
            .enter()
            .append("line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", chartHeight)
            .attr("stroke", "#e0e0e0");

        // Legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - margin.right - 120}, ${margin.top})`);
        
        data.forEach((series, index) => {
            const legendRow = legend.append("g")
                .attr("transform", `translate(0, ${index * 20})`);
            
            legendRow.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", color(series.name))
                .attr("stroke-dasharray", series.dashed ? "4 4" : "0"); // dashed legend if applicable
            
            legendRow.append("text")
                .attr("x", 20)
                .attr("y", 10)
                .text(series.name)
                .attr("font-size", "12px")
                .attr("fill", "#333");
        });

    }, [data, width, height]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default MultiLineChart;
