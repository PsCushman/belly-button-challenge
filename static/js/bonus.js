console.log("Bonus script loaded.");
// get JSON data
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(jsonData) {
    data = jsonData;

    // Set constants and variables
    const firstMetadata = data.metadata[0];
    const washValue = firstMetadata.wfreq;
    let gaugeChart;

    // Set paramaters for the creation of the gauge chart
    const trace3 = {
      domain: { x: [0, 1], y: [0, 1] },
      value: washValue,
      title: { text: "Weekly Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 9] },
        steps: [
          { range: [0, 1], color: "rgb(102, 116, 12)" },
          { range: [1, 2], color: "rgb(110, 129, 25)" },
          { range: [2, 3], color: "rgb(118, 141, 38)" },
          { range: [3, 4], color: "rgb(127, 154, 50)" },
          { range: [4, 5], color: "rgb(135, 166, 63)" },
          { range: [5, 6], color: "rgb(143, 179, 76)" },
          { range: [6, 7], color: "rgb(151, 191, 89)" },
          { range: [7, 8], color: "rgb(159, 203, 102)" },
          { range: [8, 9], color: "rgb(168, 216, 115)" },
          { range: [9, 10], color: "rgb(222, 235, 247)" },
        ]
      }
    };

    // covert the trace to data for the gauage chart
    const gaugeData = [trace3];

    // adjust the layout of the chart
    const gaugeLayout = { width: 400, height: 300, margin: { t: 0, b: 0 } };

    // publish the chart
    Plotly.newPlot("gauge", gaugeData, gaugeLayout).then(function(chart) {
        gaugeChart = chart;
  
        // Function to update the gauge chart
        function updateGaugeChart() {
          const selectedSample = +d3.select("#selDataset").property("value");
          const washValue = data.metadata[selectedSample].wfreq;
          gaugeChart.data[0].value = washValue;
          Plotly.redraw(gaugeChart);
        }
  
        // Attach the event listener to the dropdown menu
        d3.select("#selDataset").on("change", updateGaugeChart);
  
        // Update the gauge chart initially
        updateGaugeChart();
      });
    })
    .catch(function(error) {
      console.log("Error fetching the JSON file:", error);
    });