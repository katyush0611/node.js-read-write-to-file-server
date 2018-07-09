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
			fs.readFile('template.html', {encoding: "utf-8"}, (err, data) => {
				var sample = data;
				fs.writeFile('object.html', sample, (err) => {
					if (err) {
						res.writeHead(404);
						console.log(err);
						res.end('some error has occurred...');
					} else {
						res.end();
					}
				});
			});

			var index = getRandomInt(objects.length);
			var object = showOne(objects, index);
			var username = object['userName'];
			var notes = object['notes'];
		
			fs.readFile('object.html', {encoding: "utf-8"}, (err, data) => {
				var usersNotes = '';
				for (var i = 0; i < notes.length; i++) {
					usersNotes += '<li>'+notes[i]['text']+'</li>'	 
				}; 
				console.log(usersNotes);
				const template = data.replace('{{username}}', username);
				const result = template.replace('{{notes}}', usersNotes);
				
				// console.log(result);
				fs.writeFile('object.html', result, (err) => {
						if (err) {
							res.writeHead(404);
							console.log(err);
							res.end('some error has occurred...');
						} else {
							res.end(username + ' Now shown');
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

