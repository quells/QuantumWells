// Complex number implementation
function Complex(r, i) {
	this.x = r;
	this.y = i;
	this.abs = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
	this.toString = function() {
		return '{' + this.x + ' + ' + this.y + 'i}';
	};
}
Complex.add = function(a, b) {
	if (a.constructor === Complex && b.constructor === Complex) {
		return new Complex(a.x + b.x, a.y + b.y);
	} else if (a.constructor === Complex && b.constructor === Number) {
		return new Complex(a.x + b, a.y);
	} else if (a.constructor === Number && b.constructor === Complex) {
		return Complex.add(b, a);
	} else if (a.constructor === Number && b.constructor === Number) {
		return new Complex(a + b, 0);
	}
	return NaN;
}
Complex.multiply = function(a, b) {
	if (a.constructor === Complex && b.constructor === Complex) {
		return new Complex(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
	} else if (a.constructor === Complex && b.constructor === Number) {
		return new Complex(a.x * b, a.y * b);
	} else if (a.constructor === Number && b.constructor === Complex) {
		return Complex.multiply(b, a);
	} else if (a.constructor === Number && b.constructor === Number) {
		return new Complex(a * b, 0);
	}
	return NaN;
}