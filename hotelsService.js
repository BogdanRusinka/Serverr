var _ = require("underscore");

var hotelService = function(){

	this.getCountries = function(){
		return _.pluck(this.CountriesLst,'name');
	};

	this.getHotelsInCountry = function(country){
		return _.pluck(_.where(this.hotelsList, {country : country}),'name');
	};
	
	this.AddCountry = function(country){
			this.CountriesLst.push(country);
	};

	this.AddHotelInCountry = function(country,item){
		this.hotelsList.push({
			country : country,
			name    : item.name,
			description : item.description
		});
	};

	this.DeleteHotel = function(hotel){
		this.hotelsList = _.reject(this.hotelsList,function(item){
			return item.name === hotel;
		});
	};

	this.GetInfoAboutHotel = function(hotel){
		var response = _.findWhere(this.hotelsList, {name : hotel});
		if (!response) return "<h3>No such hotel in list. Try another</h3>";
		else return response;
	};

	this.UpdateInfoAboutHotel = function(hotel, params){
		var hotel = _.findWhere(this.hotelsList, {name : hotel});
		if (!hotel) return "<h3>No such hotel in list. Try another</h3>"; 
		hotel.name = params.name || hotel.name;
		hotel.country = params.coutry || hotel.country;
		hotel.description.rooms = params.description.rooms || hotel.description.rooms; 
		hotel.description.price = params.description.price || hotel.description.price; 
		hotel.description.header = params.description.header || hotel.description.header; 
	};

	this.CountriesLst = [
	{ 
		name : "UK"
	},
	{ 
		name : "UA"
	}
	];


	this.hotelsList = [
	{
		country: "UK",
		name : "Donbass", 
		description: {  
					rooms : 10,
					price : "50$",
					header : "Vasya Andreevich"
				 }
	},
	{
		country: "UK",
		name : "Lviv",
		description: {
					rooms : 24,
					price : "44$",
					header : "Ivan"
				}
	},
	{
		country: "UA",
		name : "Samson", 
		description: {  
					rooms : 100,
					price : "500$",
					header : "Jack Monte"
				 }
	},
	{
		country: "UA",
		name : "Kimberly",
		description: {
					rooms : 234,
					price : "440$",
					header : "Jack Hall"
				}
	}
	];
}

module.exports = new hotelService();