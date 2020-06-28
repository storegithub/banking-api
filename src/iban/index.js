// If you can get ahold of this, it is free to use.

//JSONs

var letter_map = {A:10, B:11, C:12, D:13, E:14, F:15, G:16, H:17, I:18, J:19, K:20, L:21, M:22, N:23, O:24, P:25, Q:26, R:27, S:28, T:29, U:30, V:31, W:32, X:33, Y:34, Z:35};
 
 
var Romania_sort = ["PORL", "RZBR"] 



function num_gen3(span) {
	var num2 = chance.string({length: span, pool: '123456789'});
	return num2;
} 
String.prototype.bankAccountKey=function() {
	var str = this.toString(),deb,rst;
	while (deb=str.substr(0,12),str=str.substr(12)) {str=(deb%97).toString()+str;}
	rst=98-deb%97;
	return rst<10?'0'+rst:''+rst;
}
 
 

var d=[
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], 
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], 
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], 
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], 
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], 
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], 
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], 
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], 
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];

// permutation table p
var p=[
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], 
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], 
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], 
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], 
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], 
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], 
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

// inverse table inv
var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

// converts string or number to an array and inverts it
function invArray(array){

    if (Object.prototype.toString.call(array) == "[object Number]"){
        array = String(array);
    }

    if (Object.prototype.toString.call(array) == "[object String]"){
        array = array.split("").map(Number);
    }
	return array.reverse();

}
 
 

// validates checksum
function validateV(array) {

    var c = 0;
    var invertedArray = invArray(array);

    for (var i = 0; i < invertedArray.length; i++){
    	c=d[c][p[(i % 8)][invertedArray[i]]];
    }

    return (c === 0);
}

function replaceChars(conv_string) {
	for(i = 0; i < conv_string.length; i++) {
		var conv_char = conv_string[i];
		if(conv_char in letter_map) {
			var IBAN_conv = letter_map[conv_char];
			conv_string = conv_string.replace(conv_char, IBAN_conv.toString());
		}
	}
	return conv_string;
} 
function calcChecksum(countryCode, randomPart) {
	var checkString = randomPart + countryCode + "00";
	checkString = replaceChars(checkString);
	var checksum = checkString.bankAccountKey();
	var checkCheck = randomPart + countryCode + checksum;
	checkCheck = replaceChars(checkCheck);
	return countryCode + checksum.toString() + randomPart;
}
 
var table = [
  [0, 3, 1, 7, 5, 9, 8, 6, 4, 2],
  [7, 0, 9, 2, 1, 5, 4, 8, 6, 3],
  [4, 2, 0, 6, 8, 7, 1, 3, 5, 9],
  [1, 7, 5, 0, 9, 8, 3, 4, 2, 6],
  [6, 1, 2, 3, 0, 4, 5, 9, 7, 8],
  [3, 6, 7, 4, 2, 0, 9, 5, 8, 1],
  [5, 8, 6, 9, 7, 2, 0, 1, 3, 4],
  [8, 9, 4, 5, 3, 6, 2, 0, 1, 7],
  [9, 4, 3, 8, 6, 1, 7, 2, 0, 5],
  [2, 5, 8, 1, 4, 3, 6, 7, 9, 0]
];

 

 
 
function mod11_2(input) {
	var modu = 11;
	var rad = 2;
	var output_val = '0123456789X';
	var p = 0;

	for(var i = 0; i < input.length; i++) {
		var valu = output_val.indexOf(input.substr(i, 1));
		p = ((p + valu) * rad) % modu;
	}
	var checksum = (modu - p + 1) % modu;
	return output_val.substr(checksum, 1);
}
 
 
 
export function buildIbans() { 
	var RM_numeric_part = num_gen3(IBAN_length - 8);
	var RM_randomPart = _.sample(Romania_sort) + RM_numeric_part; 
	var RM_IBAN = calcChecksum(ISO, RM_randomPart);
	return RM_IBAN; 
} 