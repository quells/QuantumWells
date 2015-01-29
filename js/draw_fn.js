function draw_fn(canvas, fn, x0, y0, w, h, d, r, lw, ss) {
	var ctx = canvas.getContext('2d');
	var x_factor = w / d;
	var y_factor = h / r;
	var res = 800;
	var dx = d / res;
	
	ctx.beginPath();
	ctx.moveTo(x0, y0 + h - fn(0) * y_factor);
	for (var x = dx; x < d; x += dx) {
		ctx.lineTo(x0 + x * x_factor, y0 + h - fn(x) * y_factor);
	}
	ctx.lineWidth = lw;
	ctx.strokeStyle = ss;
	ctx.stroke();
	ctx.closePath();
}