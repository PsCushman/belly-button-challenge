const DATA_URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize the dashboard at start up 
function init() {
  d3.json(DATA_URL).then(function(data) {

    // Set the initial selected sample ID as the first subject ID
    firstSampleid = data.names[0];

    // Build the dropdown options
    const dropdown = d3.select("#selDataset");
    dropdown.selectAll("option").remove();
    data.names.forEach(id => {
      dropdown
        .append("option")
        .attr("value", id)
        .text(`Sample ${id}`);
    });

    // Build the initial plots
    drawMetadata(firstSampleid);
    drawBarChart(firstSampleid);
    drawBubbleChart(firstSampleid);
    drawGaugeChart(firstSampleid);
  });
}

function drawMetadata(sample) {
  // Use D3 to retrieve all of the data
  d3.json(DATA_URL).then((data) => {
    d3.select("#sample-metadata").html("");
    const selectedMetadata = data.metadata.filter(md => md.id == sample)[0];

    // Use Object.entries to add each key/value pair to the panel
    Object.entries(selectedMetadata).forEach(([key, value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}

function drawBarChart(sample) {
  // Use D3 to retrieve all of the data
  d3.json(DATA_URL).then((data) => {
    const selectedSample = data.samples.filter(sd => sd.id == sample)[0];
    const top10Samplevalues = selectedSample.sample_values.slice(0, 10).reverse();
    const top10OtuIDs = selectedSample.otu_ids.slice(0, 10).reverse();
    const top10Otulabels = selectedSample.otu_labels.slice(0, 10).reverse();

    // Create the trace for the bar chart
    const trace1 = {
      x: top10Samplevalues,
      y: top10OtuIDs.map(id => `OTU ${id}`),
      text: top10Otulabels,
      type: "bar",
      orientation: "h",
      marker: {
        color: "#d3ca0e",
      }
    };

    // Create the data array for the bar chart
    const barData = [trace1];

    // Set the layout for the bar chart
    const layout1 = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" },
      width: 450,
      height: 460,
    };

    // Plot the bar chart
    Plotly.newPlot("bar", barData, layout1);
  });
}

function drawBubbleChart(sample) {
  // Use D3 to retrieve all of the data
  d3.json(DATA_URL).then((data) => {
    const selectedSample = data.samples.filter(sd => sd.id == sample)[0];

    // Create the trace for the bubble chart
    const trace2 = {
      x: selectedSample.otu_ids,
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: 'markers',
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids,
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

    // Plot the bubble chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });
}

// Function that updates dashboard when sample is changed
function optionChanged(selectedSample) {
  // Call all functions
  drawMetadata(selectedSample);
  drawBarChart(selectedSample);
  drawBubbleChart(selectedSample);
  drawGaugeChart(selectedSample);
}

// Call the initialize function
init();