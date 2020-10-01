//r read in the json data

var file_path='samples.json'
d3.json(file_path).then(function(data){
	console.log(data);
	dropDown(data);
});
//populate the dropdown menu
function dropDown(sampleData){
	sampleData['names'].forEach(name=>{
		var newItem = d3.select('#selDataset').append('option');
		newItem.text(name);
		newItem.property('value', name)
	});
};

// set the data of the newly selected item
function optionChanged(selected){
	makeBar(selected);
	makeTable(selected);
	makeBubbleMap(selected);
};

// create bar chart from selected data
function makeBar(sample){
	//console.log(sample);
	d3.json(file_path).then(function(data){
		var samples =data['samples'];
		var selectedSamples =samples.filter(bug=>bug['id'] ==sample);
		var currentSample =selectedSamples[0]
		//console.log(currentSample);

		var traceBar={
			x: currentSample['sample_values'].slice(0,10),
			y: currentSample['otu_ids'].map(otu_id=>'OTU ' +otu_id).slice(0,10),
			type: 'bar',
			text: currentSample['otu_labels'].slice(0,10),
			orientation: 'h'
		};
		var data =[traceBar];
		var layout ={
			title: "Abundance of Navel Microbes",
			xaxis: { title: "Abundance" },
			yaxis: { title: "OTU ID"}
		};
		Plotly.newPlot('bar', data, layout);
	});
};
//updates the table with metadata
function makeTable(sample){
	d3.json(file_path).then(function(data){
		var samples =data['metadata'];
		var selectedSamples =samples.filter(bug=>bug['id'] ==sample);
		var currentSample =selectedSamples[0];
		console.log(Object.entries(currentSample));
		
		//appends existing elements
		d3.select('#sample-metadata').selectAll('.panel-body')
			.data(Object.entries(currentSample))
			.text(function(d) {
				console.log(d);
				return `${d[0]}: ${d[1]}`
			});
		//creates new elements
		d3.select('#sample-metadata').selectAll('div')
			.data(Object.entries(currentSample))
			.enter()
			.append('div')
			.classed('panel-body', true)
			.text(function(d) {
				console.log(d);
				return `${d[0]}: ${d[1]}`
			});
			
		
		
	});
};
//makes bubble map
function makeBubbleMap(sample){
	d3.json(file_path).then(function(data){
		var samples =data['samples'];
		var selectedSamples =samples.filter(bug=>bug['id'] ==sample);
		//bubble map data by id
		var currentSample =selectedSamples[0];
		//bubble map data
		var traceBubble={
			x: currentSample['otu_ids'],
			y: currentSample['sample_values'],
			mode: 'markers',
			text: currentSample['otu_labels'],
			marker: {
				size: currentSample['sample_values'].map(marker=>marker*15),
				color: currentSample['otu_ids'],
				sizemode: 'area'
			}
		};
		var data =[traceBubble];
		var layout ={
			xaxis: { title: "OTU ID" }
			
		};
		Plotly.newPlot('bubble', data, layout);
	});
};