function isPrime (number) {
	if (number <= 1) { return false; }
	
	for (let i = 2; i <= parseInt(number/2); i++) {
		if (number % i === 0)
			return false;
	}
	return true;
}

module.exports = {
	isPrime
};
