/**
 * SemiColonSON
 * 
 * @param  {string} text input text
 * @return {obj}         ready object
 */
var semiColonSON = function(text) {
	var obj = new Object();
	var properties = text.split(';');
	
	for (var i = 1; i < properties.length - 1; i++) {
		var array = properties[i].split(':');
		if(array.length == 1){
			var prop = properties[i].split(',');
			obj[prop[0]] = prop[1];
		}else{
			var arrayObj = new Array();
			arrayObj = createObj(arrayObj, array[1]);
			i++;
			while(i < properties.length - 1){
				var prop = properties[i].split(',');
				arrayObj = createObj(arrayObj, properties[i]);
				i++;
			}
			obj[array[0]] = arrayObj;
		}
	}
	return obj;
};

var createObj = function(array, str){
	var obj = new Object();
	var property = str.split(',');
	obj[property[0]] = property[1];
	array.push(obj);
	return array;
}

//var data = ";key,value;key1,value;key3,value3;";
var data = ";key,value;key1,value;arrayHere:k1,v1;k2,v2;k3,v3;";
console.log(semiColonSON(data));