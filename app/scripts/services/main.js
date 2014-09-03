'use strict';

/**
 * @ngdoc service
 * @name adminApp.Main
 * @description
 * # Main
 * Service in the adminApp.
 */

angular.module('adminApp')
	.service('CommonMain', function CommonMain($http, $q) {
     
		////// ********************* //////
		//////	FB INTEGRATION CALLS //////
		////// ********************* //////

		this.general_info = function() {

		var d = $q.defer();

			$http({method: 'GET', url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/get_general_info.php'}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
   		};

	   	this.update_general_info = function(params){
	   		//console.log(params)

	   		var d = $q.defer();

	   	  	$http({
	   	  		method: 'GET', 
	   	  		url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/update_general_info.php',
	   	  		params: params
	   	  	}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data;
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
	   	}

	   	this.tattoo_info = function() {

	   	  var d = $q.defer();

	   	  $http({method: 'GET', url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/get_tattoo_info.php'}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
	   	};

	   	this.update_tattoo_info = function(params){
	   		//console.log(params)

	   		var d = $q.defer();

	   	  	$http({
	   	  		method: 'GET', 
	   	  		url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/update_tattoo_info.php',
	   	  		params: params
	   	  	}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data;
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
	   	}

	   	this.insert_tattoo_info = function(params){
	   		//console.log(params)

	   		var d = $q.defer();

	   	  	$http({
	   	  		method: 'GET', 
	   	  		url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/insert_tattoo_info.php',
	   	  		params: params
	   	  	}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data;
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
	   	}

	   	this.remove_tattoo_info = function(id){
	   		//console.log(params)

	   		var d = $q.defer();

	   	  	$http({
	   	  		method: 'GET', 
	   	  		url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/delete_tattoo_info.php',
	   	  		params: {'tattoo_id' : id}
	   	  	}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data;
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
	   	}

	   	
	   	////// ********************* //////
	   	//////	NEWS CALLS 			 //////
	   	////// ********************* //////

	   	this.get_news = function() {

			var d = $q.defer();

			$http({method: 'GET', url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/get_news.php'}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
   		};

   		this.insert_news = function(params) {

			var d = $q.defer();

			$http({
				method: 'GET', 
				url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/insert_news.php', 
				params: params
			}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
   		};

   		this.update_news = function(params) {

			var d = $q.defer();

			$http({
				method: 'GET', 
				url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/update_news.php', 
				params: params
			}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
   		};

   		this.get_gallery = function() {

			var d = $q.defer();

			$http({method: 'GET', url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/get_gallery.php'}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
   		};

   		this.delete_picture = function(params){
	   		//console.log(params)

	   		var d = $q.defer();

	   	  	$http({
	   	  		method: 'GET', 
	   	  		url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/delete_picture.php',
	   	  		params: {picture_id : params}
	   	  	}).
	 	    success(function(data, status, headers, config) {
	 	    	//console.log (data)
	 	    	var superData = data;
	 	    	return d.resolve(superData)
	 	    }).
	 	    error(function(data, status, headers, config) {
	 	      return d.reject('you got a problem');
	 	    });
	 		
	 		return d.promise;
	   	}


	});
