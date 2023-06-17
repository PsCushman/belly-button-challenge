console.log("Bonus script loaded.");

// Fetch the JSON data
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(jsonData) {
    data = jsonData;

    // Get the metadata for the first sample
    const firstMetadata = data.metadata[0];

    // Create the trace for the gauge chart
    const trace3 = {
      domain: { x: [0, 1], y: [0, 1] },
      value: firstMetadata.wfreq,
      title: { text: "Weekly Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 9] },
        steps: [
            { range: [0, 1], color: "rgb(102, 116, 12)" },   // Dark Brown (Dirty)
            { range: [1, 2], color: "rgb(110, 129, 25)" },
            { range: [2, 3], color: "rgb(118, 141, 38)" },
            { range: [3, 4], color: "rgb(127, 154, 50)" },
            { range: [4, 5], color: "rgb(135, 166, 63)" },
            { range: [5, 6], color: "rgb(143, 179, 76)" },
            { range: [6, 7], color: "rgb(151, 191, 89)" },
            { range: [7, 8], color: "rgb(159, 203, 102)" },
            { range: [8, 9], color: "rgb(168, 216, 115)" },  // Light Green (Clean)
            { range: [9, 10], color: "rgb(222, 235, 247)" }, // Lighter Shade (Cleaner)
          ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: firstMetadata.wfreq
        }
      }
    };

    // Create the data array for the gauge chart
    const gaugeData = [trace3];

    // Set the layout for the gauge chart
    const gaugeLayout = { width: 400, height: 300, margin: { t: 0, b: 0 } };

    // Plot the gauge chart
    gaugeChart = Plotly.newPlot("gauge", gaugeData, gaugeLayout);

      // Update the dropdown menu options
  updateDropdown();

  // Function to handle dropdown menu change
  function optionChanged() {
    const selectedSample = +d3.select("#selDataset").property("value");

    // Update the metadata
    sampleMetadata.innerHTML = "";
    Object.entries(data.metadata[selectedSample]).forEach(([key, value]) => {
      const p = document.createElement("p");
      p.textContent = `${key}: ${value}`;
      sampleMetadata.appendChild(p);
    });
  }

  // Attach the event listener to the dropdown menu
  d3.select("#selDataset").on("change", optionChanged);

  })
  .catch(function(error) {
    console.log("Error fetching the JSON file:", error);
  });