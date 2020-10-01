//r read in the json data

var file_path='../../samples.json'
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
		console.log(currentSample);
		
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

function makeTable(sample){

};

function makeBubbleMap(sample){

};