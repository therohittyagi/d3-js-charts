// StackedBarChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();  // Clear previous drawings

        // Set dimensions and margins
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 40, left: 80 };

        // Colors for each part of the bar
        const colors = ["#003f5c", "#2f4b7c", "#665191", "#ffa600", "#d45087"];

        // Keys for the stacked data
        const keys = Object.keys(data[0]).filter(key => key !== 'category' && key !== 'initialOffset');

        // Add initial offset to each part
        const stackedData = keys.map((key, i) => {
            return data.map(d => ({
                category: d.category,
                part: key,
                start: d.initialOffset + d3.sum(keys.slice(0, i).map(k => d[k])),
                value: d[key]
            }));
        });

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(stackedData.flat(), d => d.start + d.value)])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([margin.top, height - margin.bottom])
            .padding(0.4);

        // Draw bars
        svg.selectAll("g")
            .data(stackedData)
            .join("g")
            .attr("fill", (d, i) => colors[i])
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("y", d => yScale(d.category))
            .attr("x", d => xScale(d.start))
            .attr("width", d => xScale(d.start + d.value) - xScale(d.start))
            .attr("height", yScale.bandwidth())
            .attr("rx", 8)  // Rounded corners
            .attr("ry", 8);

        // Add labels inside the bars
        svg.selectAll("g")
            .data(stackedData)
            .join("g")
            .selectAll("text")
            .data(d => d)
            .attr("x", d => xScale(d.start) + (xScale(d.start + d.value) - xScale(d.start)) / 2)
            .attr("y", d => yScale(d.category) + yScale.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "#ffffff")

        // Add x-axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(5));

        // Add y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));
    }, [data]);

    return (
        <svg ref={svgRef} width="500" height="300"></svg>
    );
};

export default StackedBarChart;
