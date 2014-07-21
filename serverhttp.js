var http = require('http');
hotelService = require('./hotelsService');

http.createServer(function (request, response) {
  if(request.method == "GET") {
  	if (request.url == '/api/countries'){
    	response.writeHead(200, {'Content-Type': 'text/html'});
    	response.end(hotelService.getCountries().toString());
	} else if (request.url == '/api/countries/:country/'){
    	response.writeHead(200, {'Content-Type': 'text/html'});
    	response.end(hotelService.getHotelsInCountry(request.url).toString());
	}

  }
}).listen(8080);