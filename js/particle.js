function Particle() {
	// Defaults to lone electron
	this.mass = 9.10938188 * Math.pow(10, -31);
	this.n = 1;
	this.energy = 0;
	this.set_energy = function(E) {
		if (E) this.energy = E;
	};
}