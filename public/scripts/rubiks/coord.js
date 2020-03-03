class Coord {

	constructor(x, y, z=null) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.arr = [x, y, z];
	}

	toString() {
		return this.x + ',' + this.y + ',' + this.z;
	}
  
}