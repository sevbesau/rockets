class Cell {

	constructor(pos, norm) {
		this.color = color;
		this.pos = pos;
		this.norm = norm;
		if (norm.x != 0) {
			switch (norm.x) {
				case -1:
					this.color = 'white';
					break;
				case 1:
					this.color = 'yellow';
					break;
			}
		} else if (norm.y != 0) {
			switch (norm.y) {
				case -1:
					this.color = 'red';
					break;
				case 1:
					this.color = 'orange';
					break;
			}
		} else if (norm.z != 0) {
			switch (norm.z) {
				case -1:
					this.color = 'blue';
					break;
				case 1:
					this.color = 'green';
					break;
			}
		}
	}

	show() {
		top.push();
		top.fill(this.color);
		let x = this.pos.x*W/3 + this.norm.x*(W/6+1);
		let y = this.pos.y*W/3 + this.norm.y*(W/6+1);
		let z = this.pos.z*W/3 + this.norm.z*(W/6+1);
		top.translate(x, y, z);
		top.rotateX(this.norm.y*PI/2);
		top.rotateY(this.norm.x*PI/2);
		top.rotateZ(this.norm.z*PI/2);
		top.rectMode(CENTER);
		top.rect(0, 0, W/3*0.80, W/3*0.80, 100);
		top.pop();
	}

	rotX(angle) {
		this.pos = rX(this.pos, angle);
		this.norm = rX(this.norm, angle);
	}

	rotY(angle) {
		this.pos = rY(this.pos, angle);
		this.norm = rY(this.norm, angle);
	}

	rotZ(angle) {
		this.pos = rZ(this.pos, angle);
		this.norm = rZ(this.norm, angle);
	}

	rot(norm, angle) {
		if (norm[0] != 0) {
			this.rotX(angle*norm[0])
		} else if (norm[1] != 0) {
			this.rotY(angle*norm[1]);
		} else if (norm[2] != 0) {
			this.rotZ(angle*norm[2]);
		}
	}
}
