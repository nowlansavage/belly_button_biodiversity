//r read in the json data

var file_path='../../samples.json'
d3.json(file_path).then(function(data){
	console.log(data);
	dropDown(data);
});

function dropDown(sampleData){
	sampleData['names'].forEach(name=>{
		var newItem = d3.select('#selDataset').append('option');
		newItem.text(name);
		newItem.property('value', name)
	});
};

// set the data of the newly selected item
function newSelection(selected){
	makeBar(selected);
	makeTable(selected);
	makeBubbleMap(selected);
};

function makeBar(sample){
	d3.json(file_path).then(function(data){
		var samples =data['samples']
		var selectedSamples =samples.filter(sample=>sample['id'])

		var traceBar={
			X: selectedSamples['sample_values'].slice(0,10)
			y: selectedSamples['otu_ids'].map(otu_ids=>'OTU ' otu_ids)
			type: 'bar'
			text: selectedSamples['otu_labels'].slice(0,10)
		};
		var layout ={
			
		}
	});

};

function makeTable(sample){

};