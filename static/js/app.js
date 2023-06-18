d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    // Get the sample data
    const samples = data.samples;
    const firstSample = data.samples[0];
    
    // Get the metadata for the first sample
    const firstMetadata = data.metadata[0];
    
    // Set constants for charts
    const top10SampleValues = firstSample.sample_values.slice(0, 10).reverse();
    const top10OtuIDs = firstSample.otu_ids.slice(0, 10).reverse();
    const top10OtuLabels = firstSample.otu_labels.slice(0, 10).reverse();
    const otuIDs = samples[0].otu_ids;
    const sampleValues = samples[0].sample_values;
    const otuLables = samples[0].otu_labels;

    // Create the trace for the bar chart
    const trace1 = {
      x: top10SampleValues,
      y: top10OtuIDs.map(id => `OTU ${id}`),
      text: top10OtuLabels,
      type: "bar",
      orientation: "h",
      marker: {
        color: 'darkgreen'
      }
    };

    // Create the data array for the bar chart
    const barData = [trace1];

    // Set the layout for the bar chart
    const layout1 = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };

    // Create the trace for the bubble chart
    const trace2 = {
      x: otuIDs,
      y: sampleValues,
      text: otuLables,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: 'Earth' 
      }
    };

    // Create the data array for the bubble chart
    const bubbleData = [trace2];

    // Set the layout for the bubble chart
    const bubbleLayout = {
      title: 'Sample Values vs. OTU IDs',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' },
      showlegend: false
    };

    // Plot the bar chart
    Plotly.newPlot("bar", barData, layout1);

    // Plot the bubble chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // Select the sample metadata element
    const sampleMetadata = document.querySelector("#sample-metadata");

    // Clear any existing metadata
    sampleMetadata.innerHTML = "";

    // Display each key-value pair from the metadata
    Object.entries(firstMetadata).forEach(([key, value]) => {
      const p = document.createElement("p");
      p.textContent = `${key}: ${value}`;
      sampleMetadata.appendChild(p);
    });
    
  // Function to update the dropdown menu options
  function updateDropdown() {
    const dropdown = d3.select("#selDataset");
    dropdown.selectAll("option").remove();
    dropdown.selectAll("option")
      .data(samples.map((sample, index) => index))
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => `Sample ${d}`);
  }

  // Update the dropdown menu options
  updateDropdown();

  // Function to handle dropdown menu change
  function optionChanged() {
    const selectedSample = +d3.select("#selDataset").property("value");

    // Update the data in the panel
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