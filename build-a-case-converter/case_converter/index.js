function getUpperCase(str) {
	return str.toUpperCase();
}

function getLowerCase(str) {
	return str.toLowerCase();
}

function getSentenceCase(str) {
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

function getProperCase(str) {
	const words = str.split(' ');
	return words.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

module.exports = {
	getUpperCase,
	getLowerCase,
	getSentenceCase,
	getProperCase
};
