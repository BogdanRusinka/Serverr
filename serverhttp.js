var http = require('http');
hotelService = require('./hotelsService');

http.createServer(function (request, response) {
	var urlArray = request.url.split("\/");
	for (var i=urlArray.length;i>=0;i--) {
        if (urlArray[i] == "")  {
            urlArray.splice(i, 1);
        }   	
    }

   	this.transform = function(object){
		var returnValue = "";
		for (var key in object){
			if (typeof object[key] == "object"){
				for (var subitem in object[key]){
					returnValue = returnValue + subitem + ":" + object[key][subitem] + "<br>";
				}
			} else returnValue = returnValue + key + ":" + object[key] + "<br>";
		}
		return returnValue;
	}

  if(request.method == "GET") {
  	response.writeHead(200, {'Content-Type': 'text/html'});
  	if (urlArray[0] == 'api' && urlArray[1] == 'countries' && urlArray.length == 2){
    	response.end(hotelService.getCountries().toString());
	} else if (urlArray[0] == 'api' && urlArray[1] == 'countries' && urlArray.length == 3){
    	response.end(hotelService.getHotelsInCountry(urlArray[2]).toString());
	} else if (urlArray[0] == 'api' && urlArray[1] == 'hotels' && urlArray.length == 3){
    	response.end(this.transform(hotelService.GetInfoAboutHotel(urlArray[2])));
	}
	} else 
	if (request.method == "DELETE"){
		if (urlArray[0] == 'api' && urlArray[1] == 'hotels' && urlArray.length == 3){
			response.writeHead(200, {'Content-Type': 'text/html'});
    		hotelService.DeleteHotel(urlArray[2]);
    		response.end("Deleted");
		}
	} else 
	if (request.method == "POST"){
		if (urlArray[0] == 'api' && urlArray[1] == 'countries' && urlArray.length == 2){
			var body = "";
  			request.on('data', function (chunk) {
    			body += chunk;
  			});
  			request.on('end', function () {
    			hotelService.AddCountry(JSON.parse(body));
    			response.writeHead(200);
    			response.end("<h3>POSTED!</h3>");
  			});
		}  else {
			if (urlArray[0] == 'api' && urlArray[1] == 'countries' && urlArray.length == 3){
			var body = "";
  			request.on('data', function (chunk) {
    			body += chunk;
  			});
  			request.on('end', function () {
    			hotelService.AddHotelInCountry(urlArray[2], JSON.parse(body));
    			response.writeHead(200);
    			response.end("<h3>POSTED</h3>");
  			});
			}
		}
	} else if (request.method == "PUT"){
		if (urlArray[0] == 'api' && urlArray[1] == 'hotels' && urlArray.length == 3){
			var body="";
			request.on('data', function (chunk) {
    			body += chunk;
  			});

  			request.on('end', function () {
    			hotelService.UpdateInfoAboutHotel(urlArray[2], JSON.parse(body));
    			response.writeHead(200);
    			response.end("<h3>UPDATED!</h3>");
  			});
			
		}
	}
}).listen(8080);
console.log('Server started on port 8080. Go to localhost:8080 for further instructions');