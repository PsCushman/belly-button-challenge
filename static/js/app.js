d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    // Get the sample data
    const samples = data.samples;

    // Get the metadata for the first sample
    const firstMetadata = data.metadata[0];

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

    // Create the trace for the bar chart
    const trace1 = {
      x: samples[0].sample_values.slice(0, 10).reverse(),
      y: samples[0].otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`),
      text: samples[0].otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
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
      x: samples[0].otu_ids,
      y: samples[0].sample_values,
      text: samples[0].otu_labels,
      mode: 'markers',
      marker: {
        size: samples[0].sample_values,
        color: samples[0].otu_ids
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
  })
  .catch(function(error) {
    console.log("Error fetching the JSON file:", error);
  });