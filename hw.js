var http = require('http');
var fs = require('fs');
var objects = [
		{
			userName: 'katyush0611',
			notes: [
				{
					text: 'buy milk',
				}, 
				{
					text: 'pay the bills',
				},
				{
					text: 'Doctor appointment tommorow 08:15am',
				},
			],
		},
		{
			userName: '1Oscar',
			notes: [
				{
					text: 'Math homework',
				},
				{
					text: '10/07 Biology exam',
				},
				{
					text: 'Go to the bank',
				},
			],
		},
		{
			userName: 'Syoma',
			notes: [
				{		
					text: 'go to the gym',
				}, 
				{
					text: 'Shellys birthday at friday',
				},
				{
					text: 'Buy dog food',
				},
				{
					text: 'Order groceries before weekend',
				}
			],
		},
		{
			userName: 'lilo1209',
			notes: [
				{
					text: 'Guitar lesson 17:30',
				},
				{
					text: 'call the vet 054-456-7781',
				},
				{
					text: 'movie date, 21:00 saturday, tlv mall',
				},
				{
					text: 'do something',
				},
				{
					text: 'do some more somethings',
				},
			]
		}
	];

var server = http.createServer((req, res) => {

	switch (req.url) {
		case '/objects': 
			var index = getRandomInt(objects.length);
			var object = showOne(objects, index);
			var template = '<!DOCTYPE html><html><head><title>One Object</title></head><body><h1>'
			var username = object['userName'];
			var notes = object['notes'];
		
			fs.readFile('object.html', {encoding: "utf-8"}, (err, data) => {	
				var wholeData = template+username+'</h1><ul>';
				// var ul = '<ul>';
				for (var i = 0; i < notes.length; i++) {
					// ul = ul+'<li>'+notes[i]['text']+'</li>'
					wholeData += '<li>'+notes[i]['text']+'</li>'	 
				}; 
				console.log(wholeData);
				fs.writeFile('object.html', wholeData, (err) => {
						if (err) {
							res.writeHead(404);
							console.log(err);
							res.end('some error has occurred...');
						} else {
							// res.setHeader('content-Type', 'text/html');
							// res.write(username+' Now showen');
							res.end(username + 'Now showen');
						}
				});
			});
		break;

		default: 
			fs.readFile('urls.json', {encoding: "utf-8"}, (err, data) => {
				fs.writeFile('urls.json', data+'{"path":'+'"'+req.url+'"},', (err) => {
					if (err) {
						res.writeHead(404);
						console.log(err.Error);
						res.end('some error has occurred...');
					} else {
						// res.setHeader('content-Type', 'text/html');
						// res.write('"'+req.url+'"  Added successfully to "urls.json"');
						res.end('"'+req.url+'"  Added successfully to "urls.json"');
					}
				});
			});
	};

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	};
	function showOne(objects, index) {
		return objects[index];
	};

}).listen(8080, 'localhost');

