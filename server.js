var express = require('express'),
	app = express(),
hotelService = require('./hotelsService');
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() );

app.get('/', function(req,res){
	var info = "Server root. It works!";
	res.send(info);
});
//1
app.get('/api/countries', function (req, res) {
	res.send(hotelService.getCountries());
});
//2
app.get('/api/countries/:country/', function (req, res) {
	res.send(hotelService.getHotelsInCountry(req.params.country));
});
//3
app.delete('/api/hotels/:name/',function(req,res) {
	var hotel = hotelService.DeleteHotel(req.params.name);
	res.end();
});
//4
app.get('/api/hotels/:name/', function (req, res) {
	res.send(hotelService.GetInfoAboutHotel(req.params.name));
});
//5
app.post('/api/countries/', function (req, res) {
	res.send(hotelService.AddCountry(req.body));
});
//6
app.post('/api/countries/:country/', function (req, res) {
	res.send(hotelService.AddHotelInCountry(req.params.country,req.body));
});
//7
app.put('/api/hotels/:hotel/',function (req, res) {
	res.send(hotelService.UpdateInfoAboutHotel(req.params.hotel,req.body));
});

app.listen(3000);
console.log('Server started on port 3000. Go to localhost:3000 for further instructions');