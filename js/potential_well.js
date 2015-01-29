function Potential_Well() {
	// Set defaults
	this.width = 1.2 * Math.pow(10, -9);
	this.margin = 0.5 * Math.pow(10, -9);
	this.dx = Math.pow(10, -12);
	this.w = 0;
	this.eigen_buffer = {};
	this.add_particle = function(p) {
		this.particle = p;
	};
	this.V = function(x) {
		// Overwrite on page
		return 0;
	};
	this.max_V = function() {
		var m = 0;
		for (var x = 0; x < this.width + 2 * this.margin; x += this.dx) {
			if (this.V(x) > m) {
				m = this.V(x);
			}
		}
		return m;
	}
	this.f = function(E, x) {
		return -2 * this.particle.mass * (E - this.V(x)) / Math.pow(hbar, 2);
	};
	this.calc_psi = function(E) {
		this.psi_stored = new Array(parseInt((this.width + 2*this.margin)/this.dx));
		this.psi_stored[0] = 0;
		this.psi_stored[1] = Math.pow(10, -50);
		for (var i = 1; i < parseInt((this.width + this.margin * 2) / this.dx) - 1; i++) {
			this.psi_stored[i + 1] = 2 * this.psi_stored[i] - this.psi_stored[i - 1] + Math.pow(this.dx, 2) * this.f(E, i * this.dx) * this.psi_stored[i];
		}
	};
	this.psi = function(x, t) {
		if (!t) t = 0;
		var w = this.eigen_states[this.particle.n-1]*eV / hbar;
		this.w = w;
		var exp = new Complex(0, Math.sin(w * t));
		var time_dependent = Complex.add(Math.cos(w * t), exp);
		var psi = Complex.multiply(this.psi_stored[parseInt(x / this.dx)], time_dependent);
		return psi;
	};
	this.max_psi = function() {
		var m = 0;
		for (var i = 0; i < this.psi_stored.length; i++) {
			if (Math.abs(this.psi_stored[i]) > m) { m = Math.abs(this.psi_stored[i]); }
		}
		return m;
	};
	this.P = function(x) {
		return Math.pow(this.psi(x).abs(), 2);
	};
	this.max_P = function() {
		return Math.pow(this.max_psi(), 2);
	};
	this.calc_eigen_states = function() {
		well = this;
		// var key = parseInt(well.width * Math.pow(10, 12));
		// if (well.eigen_buffer[key]) { well.eigen_states = well.eigen_buffer[key]; return; }
		// else if (well.eigen_buffer[parseInt(well.width * Math.pow(10, 12)) + 10]) { key = parseInt(well.width * Math.pow(10, 12)) + 10; well.eigen_states = well.eigen_buffer[key]; return; }
		well.eigen_states = new Array(5);
		var E = 0;
		var n = 0; var i = 1; var direction = 1;
		while (1) {
			if (E * eV > well.max_V()) { break; }
			if (i <= 5 && E*eV < well.max_V()) {
				well.calc_psi(E*eV);
				if ((n % 2 === 0 && well.psi_stored[well.psi_stored.length-1] * direction < 0) ||
				    (n % 2 === 1 && well.psi_stored[well.psi_stored.length-1] * direction > 0)) {
						i++;
						direction *= -1;
				}
				E += 0.5 * Math.pow(10, -1*i) * direction;
				if (E * eV < 0) { well.width += 0.01 * Math.pow(10, -9); well.calc_eigen_states(); break; }
			} else {
				if (E * eV > well.max_V()) { break; }
				well.eigen_states[n] = E;
				well.eigen_states.sort();
				n++; i = 1; direction = 1;
			}
		}
		// key = parseInt(well.width * Math.pow(10, 12));
		// well.eigen_buffer[key] = well.eigen_states;
	};
	this.calc_eigen = function(min, max, dw) {
		// well = this;
// 		well.eigen_buffer = {};
// 		for (var w = min; w <= max; w += dw) {
// 			well.width = w;
// 			well.calc_eigen_states();
// 		}
	}
}