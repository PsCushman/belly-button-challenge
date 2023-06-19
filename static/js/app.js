const DATA_URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let selectedSampleid; // Variable to store the selected sample ID

// Initialize the dashboard at start up 
function init() {
  d3.json(DATA_URL).then(function(data) {
    const samples = data.samples;
    const metadata = data.metadata;

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
    drawGaugeChart(firstSampleid)
  });
}

function drawMetadata(sample) {
  // Use D3 to retrieve all of the data
  d3.json(DATA_URL).then((data) => {
    d3.select("#sample-metadata").html("");
    const metadata = data.metadata.filter(md => md.id == sample)[0];

    // Use Object.entries to add each key/value pair to the panel
    Object.entries(metadata).forEach(([key, value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}

function drawBarChart(sample) {
  // Use D3 to retrieve all of the data
  d3.json(DATA_URL).then((data) => {
    const samples = data.samples.filter(sd => sd.id == sample)[0];
    const top10Samplevalues = samples.sample_values.slice(0, 10).reverse();
    const top10OtuIDs = samples.otu_ids.slice(0, 10).reverse();
    const top10Otulabels = samples.otu_labels.slice(0, 10).reverse();

    // Create the trace for the bar chart
    const trace1 = {
      x: top10Samplevalues,
      y: top10OtuIDs.map(id => `OTU ${id}`),
      text: top10Otulabels,
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

    // Plot the bar chart
    Plotly.newPlot("bar", barData, layout1);
  });
}

function drawBubbleChart(sample) {
  // Use D3 to retrieve all of the data
  d3.json(DATA_URL).then((data) => {
    const samples = data.samples.filter(sd => sd.id == sample)[0];

    // Create the trace for the bubble chart
    const trace2 = {
      x: samples.otu_ids,
      y: samples.sample_values,
      text: samples.otu_labels,
      mode: 'markers',
      marker: {
        size: samples.sample_values,
        color: samples.otu_ids,
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
function optionChanged(samples) {

  // Call all functions
  drawMetadata(samples);
  drawBarChart(samples);
  drawBubbleChart(samples);
  drawGaugeChart(samples);
}

// Call the initialize function
init();