let request = require('request');

module.exports = function(api) {
	// http://www.pomsox.com.pg/wp-content/uploads/wp-responsive-images-thumbnail-slider/BSP_150_150.png
	// fetch("http://www.pomsox.com.pg/data/BSP.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/CCP.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/CGA.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/COY.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/CPL.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/HIG.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/KAM.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/KPL.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/KSL.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/NCM.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/NGP.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/NIU.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/OSH.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/SST.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	// fetch("http://www.pomsox.com.pg/data/BSPHA.csv", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://www.pomsox.com.pg/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"}); ;
	let listedComs = ['BSP','CCP','CGA','COY','CPL','HIG','KAM','KPL','KSL','NCM','NGP','NIU','OSH','SST'];

	api.get('/pomsox', function(req, res) {
		res.json({
			name: 'kitten'
		})
	})

	api.get('/pomsox/data', function(req, res) {
		var quote = req.query.code;
		console.log("Sending request to pomsox.com.pg");
		var i = [];

		for (var j = 0; j < listedComs.length; j++) {
			return new Promise(function(resolve, reject) {
				var url = "http://www.pomsox.com.pg/data/";
				var dev = "http://localhost/christianaugustyn/api/1/";
				request.get(url + listedComs[j] +".csv", function(error, response, body) {
					if (error) reject(error.error)
					if (response && response.statusCode  ==200) {

						// split the data into array by whitespaces
						// var o = body.split(/\r\n|\n/);

						// split the first row of that array only by comma (,) to get headers
						// var a = o[0].split(",");

						// loop through the other rows to obtain data
						for (var o = body.split(/\r\n|\n/), a = o[0].split(","), s = 1; s < o.length; s++) {
							// split each row by comma
							var l = o[s].split(",")
							// compare the splited row with the first/header row 
							if (l.length == a.length) {
								// run through the header row
								// attaches splited row to the header row
								// then store it on variable d
								// create array by pushing the stored data to the variable i
								for(var d = {}, u = 0; u < a.length; u++) d[a[u]] = l[u]; i.push(d)
							}
						}
						// i[i.length -1]
						resolve(res.json(i))
					}
				})
			})
		}
	})

	return api;
};