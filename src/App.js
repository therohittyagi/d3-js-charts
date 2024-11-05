import AlluvialDiagram from "./components/AlluvialDiagram";
import BoxPlotChart from "./components/BoxPlotChart";
import DonutChart from "./components/DonutChart";
import DotPlotChart from "./components/DotPlotChart";
import GaugeChart from "./components/GaugeChart";
import MultiLineChart from "./components/MultiLineChart";
import RadarChart from "./components/RadarChart";
import MultiColumnSankey from "./components/MultiColumnSankey";
import StackedBarChart from "./components/StackedBarChart";
import SunburstChart from "./components/SunburstChart";

function App() {
  const data = [
    {
      category: "Group 1",
      initialOffset: 10,
      part1: 30,
      part2: 20,
      part3: 15,
      part4: 10,
      part5: 25,
    },
    {
      category: "Group 2",
      initialOffset: 5,
      part1: 25,
      part2: 15,
      part3: 20,
      part4: 30,
      part5: 10,
    },
    {
      category: "Group 3",
      initialOffset: 20,
      part1: 20,
      part2: 30,
      part3: 25,
      part4: 15,
      part5: 10,
    },
    {
      category: "Group 4",
      initialOffset: 15,
      part1: 15,
      part2: 10,
      part3: 30,
      part4: 25,
      part5: 20,
    },
    {
      category: "Group 5",
      initialOffset: 0,
      part1: 10,
      part2: 25,
      part3: 20,
      part4: 15,
      part5: 30,
    },
  ];

  const sampleData = {
    nodes: [
      { name: "Source A" },
      { name: "Source B" },
      { name: "Source C" },
      { name: "Source D" },
      { name: "Source E" },

      { name: "Target A" },
      { name: "Target B" },
      { name: "Target C" },
      { name: "Target D" },
      { name: "Target E" },
    ],
    links: [
      { source: 0, target: 5, value: 5 },
      { source: 0, target: 6, value: 10 },
      { source: 0, target: 7, value: 5 },
      { source: 0, target: 8, value: 10 },
      { source: 0, target: 9, value: 10 },
      { source: 1, target: 5, value: 5 },
      { source: 1, target: 6, value: 10 },
      { source: 1, target: 7, value: 5 },
      { source: 1, target: 8, value: 10 },
      { source: 1, target: 9, value: 10 },
      { source: 2, target: 5, value: 5 },
      { source: 2, target: 6, value: 10 },
      { source: 2, target: 7, value: 5 },
      { source: 2, target: 8, value: 10 },
      { source: 2, target: 9, value: 10 },
      { source: 3, target: 5, value: 5 },
      { source: 3, target: 6, value: 10 },
      { source: 3, target: 7, value: 5 },
      { source: 3, target: 8, value: 10 },
      { source: 3, target: 9, value: 10 },
      { source: 4, target: 5, value: 5 },
      { source: 4, target: 6, value: 10 },
      { source: 4, target: 7, value: 5 },
      { source: 4, target: 8, value: 10 },
      { source: 4, target: 9, value: 10 },
    ],
  };

  const donutData = [
    { label: "Gray Segment", value: 60 }, // Background gray segment
    { label: "Pink Segment", value: 25 }, // Progress pink segment
    { label: "Blue Segment", value: 15 }, // Additional progress blue segment
  ];

  const sunburstData = {
    name: "root",
    children: [
      {
        name: "Group 1",
        children: [
          { name: "Subgroup 1.1", value: 1 },
          { name: "Subgroup 1.2", value: 1 },
          { name: "Subgroup 1.3", value: 1 },
        ],
      },
      {
        name: "Group 2",
        children: [
          { name: "Subgroup 2.1", value: 1 },
          { name: "Subgroup 2.2", value: 1 },
          { name: "Subgroup 2.3", value: 1 },
        ],
      },
      {
        name: "Group 3",
        children: [
          { name: "Subgroup 3.1", value: 1 },
          { name: "Subgroup 3.2", value: 1 },
          { name: "Subgroup 3.3", value: 1 },
        ],
      },
      {
        name: "Group 4",
        children: [
          { name: "Subgroup 4.1", value: 1 },
          { name: "Subgroup 4.2", value: 1 },
          { name: "Subgroup 4.3", value: 1 },
        ],
      },
    ],
  };

  const radarData = [
    [
      { axis: "Metric 1", value: 7 },
      { axis: "Metric 2", value: 6 },
      { axis: "Metric 3", value: 5 },
      { axis: "Metric 4", value: 8 },
      { axis: "Metric 5", value: 6 },
    ],
    [
      { axis: "Metric 1", value: 3 },
      { axis: "Metric 2", value: 4 },
      { axis: "Metric 3", value: 2 },
      { axis: "Metric 4", value: 5 },
      { axis: "Metric 5", value: 4 },
    ],
  ];

  const boxPlotData = [
    {
      category: "2020",
      a_q1: 3000,
      a_median: 5000,
      a_q3: 7000,
      a_min: 2000,
      a_max: 8000,
      b_q1: 4000,
      b_median: 6000,
      b_q3: 8000,
      b_min: 3000,
      b_max: 9000,
    },
    {
      category: "2021",
      a_q1: 3500,
      a_median: 5500,
      a_q3: 7500,
      a_min: 2500,
      a_max: 8500,
      b_q1: 3700,
      b_median: 5700,
      b_q3: 7700,
      b_min: 2700,
      b_max: 8700,
    },
    {
      category: "2022",
      a_q1: 3200,
      a_median: 5400,
      a_q3: 7300,
      a_min: 2100,
      a_max: 8300,
      b_q1: 3600,
      b_median: 5800,
      b_q3: 7800,
      b_min: 2600,
      b_max: 8800,
    },
    {
      category: "2023",
      a_q1: 3400,
      a_median: 5600,
      a_q3: 7600,
      a_min: 2200,
      a_max: 8400,
      b_q1: 3800,
      b_median: 5900,
      b_q3: 7900,
      b_min: 2900,
      b_max: 8900,
    },
  ];

  const dotPlotData = [
    { category: "Category 1", value: 5, color: "blue" },
    { category: "Category 1", value: 4, color: "blue" },
    { category: "Category 1", value: 3, color: "blue" },
    { category: "Category 1", value: 2, color: "blue" },
    { category: "Category 1", value: 1, color: "blue" },
    { category: "Category 1", value: 6, color: "blue" },
    { category: "Category 2", value: 1, color: "blue" },
    { category: "Category 2", value: 2, color: "blue" },
    { category: "Category 3", value: 2, color: "blue" },
    { category: "Category 3", value: 3, color: "blue" },
    { category: "Category 3", value: 1, color: "blue" },
    { category: "Category 4", value: 1, color: "blue" },
    { category: "Category 4", value: 2, color: "blue" },
    { category: "Category 4", value: 3, color: "blue" },
    { category: "Category 4", value: 4, color: "blue" },
    { category: "Category 5", value: 1, color: "yellow" },
    { category: "Category 5", value: 2, color: "yellow" },
    { category: "Category 6", value: 5, color: "yellow" },
    { category: "Category 6", value: 4, color: "yellow" },
    { category: "Category 6", value: 3, color: "yellow" },
    { category: "Category 6", value: 2, color: "yellow" },
    { category: "Category 6", value: 1, color: "yellow" },
  ];

  const multiLinedata = [
    {
      name: "Series A",
      dashed: false,
      values: [
        { x: 1, y: 30 },
        { x: 2, y: 50 },
        { x: 3, y: 80 },
        { x: 4, y: 60 },
        { x: 5, y: 40 },
      ],
    },
    {
      name: "Series B",
      dashed: true,
      values: [
        { x: 1, y: 40 },
        { x: 2, y: 60 },
        { x: 3, y: 70 },
        { x: 4, y: 90 },
        { x: 5, y: 60 },
      ],
    },
    {
      name: "Series C",
      dashed: false,
      values: [
        { x: 1, y: 20 },
        { x: 2, y: 40 },
        { x: 3, y: 50 },
        { x: 4, y: 30 },
        { x: 5, y: 20 },
      ],
    },
    {
      name: "Series D",
      dashed: true,
      values: [
        { x: 1, y: 50 },
        { x: 2, y: 70 },
        { x: 3, y: 60 },
        { x: 4, y: 80 },
        { x: 5, y: 50 },
      ],
    },
  ];

  const sankeyData =  {
    nodes: [
      // Column 1
      { name: "Node 1", color: "green" },
      { name: "Node 2", color: "blue" },
      { name: "Node 3", color: "red" },
      { name: "Node 4", color: "orange" },
      { name: "Node 5", color: "yellow" },
      
      // Column 2
      { name: "Node 6", color: "lightgreen" },
      { name: "Node 7", color: "lightblue" },
      { name: "Node 8", color: "pink" },
      { name: "Node 9", color: "lightcoral" },
      { name: "Node 10", color: "lightyellow" },
  
      // Column 3
      { name: "Node 11", color: "darkgreen" },
      { name: "Node 12", color: "darkblue" },
      { name: "Node 13", color: "darkred" },
      { name: "Node 14", color: "darkorange" },
      { name: "Node 15", color: "goldenrod" },
    ],
    links: [
      // Connections from Column 1 to Column 2
      { source: 0, target: 5, value: 8, color: "green" },
      { source: 1, target: 6, value: 5, color: "blue" },
      { source: 2, target: 7, value: 7, color: "red" },
      { source: 3, target: 8, value: 6, color: "orange" },
      { source: 4, target: 9, value: 4, color: "yellow" },
  
      { source: 0, target: 6, value: 3, color: "green" },
      { source: 1, target: 7, value: 4, color: "blue" },
      { source: 2, target: 8, value: 3, color: "red" },
      { source: 3, target: 9, value: 2, color: "orange" },
  
      // Connections from Column 2 to Column 3
      { source: 5, target: 10, value: 7, color: "lightgreen" },
      { source: 6, target: 11, value: 6, color: "lightblue" },
      { source: 7, target: 12, value: 5, color: "pink" },
      { source: 8, target: 13, value: 4, color: "lightcoral" },
      { source: 9, target: 14, value: 3, color: "lightyellow" },
  
      { source: 6, target: 10, value: 2, color: "lightblue" },
      { source: 7, target: 11, value: 3, color: "pink" },
      { source: 8, target: 12, value: 2, color: "lightcoral" },
      { source: 9, target: 13, value: 1, color: "lightyellow" },
    ]
  };
  

  return (
    <div className="App">
      <div className="grid-item">
        <MultiColumnSankey data={sankeyData} width={500} height={300} />
      </div>
      <div className="grid-item">
        <MultiLineChart data={multiLinedata} />
      </div>
      <div className="grid-item">
        <StackedBarChart data={data} />
      </div>
      <div className="grid-item">
        <DonutChart data={donutData} />
      </div>
      <div className="grid-item">
        <GaugeChart value={30} min={0} max={100} width={500} height={300} />
      </div>
      <div className="grid-item">
        <SunburstChart data={sunburstData} />
      </div>
      <div className="grid-item">
        <AlluvialDiagram data={sampleData} />
      </div>
      <div className="grid-item">
        <BoxPlotChart data={boxPlotData} />
      </div>
      <div className="grid-item">
        <RadarChart data={radarData} />
      </div>
      <div className="grid-item">
        <DotPlotChart data={dotPlotData} />
      </div>
    </div>
  );
}

export default App;
