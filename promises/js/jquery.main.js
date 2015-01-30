var src = [ 'DSC39902cz.jpg',
	'IMG7495.jpg',
	'article-2117544-123F9BF9000005DC-19_966x689.jpg',
	'koAhLlfCV4U.jpg',
	'rhs-winner_2381888k.jpg',
	'rhsphoto-1st-Plant_2381899k.jpg',
	'si3_road_clouds_mountain.jpg',
	'si3_to_the_west_coast1.jpg',
	'yr-3.jpg' ]
var im=['1','2','3','4','5'];


$(document).ready(function(){

	var j = 0;

	function callback(){
		j++;
		if (j < src.length){
			loadImage(j);
		}
	}
	function loadImage(j) {
		var pr = new Promise(function(resolve, reject){
		
			var _img = $('<img src="images/'+src[j]+'" />');
			_img.appendTo($('#list'));

			_img.on('load', function(){console.log('success');resolve(this.src)});
			_img.on('error', function(err){console.log('error');reject(err)});
		});

		pr.then(function(a){
			console.log('loaded', a);
			setTimeout(callback, 1000);
		}, function(a){
			console.log('rejected', a);
		});
	}
	loadImage(0);

/*-----------------------------------------------------------------------*/
	function get(url, folder) {
		// Return a new promise.
		return new Promise(function(resolve, reject) {
			// Do the usual XHR stuff
			var img = new Image();
			img.src = folder+'/'+url+'.png';

			img.onload = function() {
				resolve(this);
			};

			// Handle network errors
			img.onerror = function() {
				reject(Error("Network Error"));
			};
		});
	}

/*----------our images would appear in whatever order they download----------------*/
	function getImg(src){
		return get(src, 'images').then(function(response) {
			//console.log("Success!", response);
			addToPage(response, 'list1');
			return response;
		}, function(error) {
			console.error("Failed!", error);
		});
	}

	for(var i in im){
		var _im = getImg(im[i]);
	}

/*----------we're losing performance by downloading images one after the other--*/

	// Start off with a promise that always resolves
	var sequence = Promise.resolve();
	
	// Loop through our chapter urls
	$(im).each(function(i, _src) {
		// Add these actions to the end of the sequence
		sequence = sequence.then(function() {
			return get(_src, 'images2');
		}).then(function(img) {
			addToPage(img, 'list2');
		});
	});


/*----------images can download in whatever order, but they appear in the right order----*/
	
	var allPr = [];
	for(var i in im){
		allPr.push(get(im[i], 'images3'));
	}

	Promise.all(allPr).then(function(res){
 		console.log('res=== ', res);
 		$(res).each(function(chapter, i) {
			addToPage(i, 'list3');
		});
	});

});


function addToPage(node, box){
	console.log($('#'+box), node);
	$('#'+box).append($(node));
}