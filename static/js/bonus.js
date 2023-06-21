console.log("Bonus script loaded.");

function drawGaugeChart(data, sample) {
  // Use D3 to retrieve all of the data
  const selectedMetadata = data.metadata.filter(md => md.id == sample)[0];
  let washValue = selectedMetadata.wfreq;

  // Create the trace for the gauge chart
  const trace3 = {
    type: "indicator",
    mode: "gauge+number",
    value: washValue,
    title: { text: "Weekly Washing Frequency" },
    gauge: {
      axis: {
        range: [0, 10],
        tickvals: [0, 2, 4, 6, 8, 10],
        ticktext: ["0", "2", "4", "6", "8", "10"],
      },
      steps: [
        { range: [0, 1], color: "rgb(97, 76, 57)" },
        { range: [1, 2], color: "rgb(115, 92, 69)" },
        { range: [2, 3], color: "rgb(133, 108, 82)" },
        { range: [3, 4], color: "rgb(161, 134, 63)" },
        { range: [4, 5], color: "rgb(189, 160, 43)" },
        { range: [5, 6], color: "rgb(217, 187, 24)" },
        { range: [6, 7], color: "rgb(162, 193, 10)" },
        { range: [7, 8], color: "rgb(107, 199, 0)" },
        { range: [8, 9], color: "rgb(42, 205, 0)" },
        { range: [9, 10], color: "rgb(0, 211, 0)" }
      ],
      bar: { color: "#066d92" },
      borderwidth: 2,
      bordercolor: "black",
    },
  };

  // Create the data array for the gauge chart
  const gaugeData = [trace3];

  // Set the layout for the gauge chart
  const gaugeLayout = {
    width: 450,
    height: 460,
    margin: { t: 0, b: 0 },
  };

  // Plot the gauge chart
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}