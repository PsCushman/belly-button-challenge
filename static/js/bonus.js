console.log("Bonus script loaded.");

d3.json(DATA_URL).then(function(data) {
  console.log(data);
});

// Initialize the dashboard at start up 
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get sample names and populate the drop-down selector
  d3.json(DATA_URL).then((data) => {

    // Set a variable for the sample names
    let names = data.names;

    // Add samples to dropdown menu
    names.forEach((id) => {

      // Log the value of id for each iteration of the loop
      console.log(id);

      dropdownMenu.append("option")
        .text(id)
        .property("value", id);
    });

    // Set the first sample from the list
    let firstSampleid = names[0];

    // Build the initial plots
    drawGaugeChart(firstSampleid);
  });
}

function drawGaugeChart(sample) {
  // Use D3 to retrieve all of the data
  d3.json(DATA_URL).then((data) => {
    const metadata = data.metadata;
    const subjectMetadata = metadata.filter(md => md.id == sample)[0];
    let washValue = subjectMetadata.wfreq;

    // Create the trace for the gauge chart
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
        ],
      },
    };

    // Create the data array for the gauge chart
    const gaugeData = [trace3];

    // Set the layout for the gauge chart
    const gaugeLayout = { width: 400, height: 300, margin: { t: 0, b: 0 } };

    // Plot the gauge chart
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}

init();