class Cube {

  

  constructor(W) {
    this.cells = [];
    this.w = W;
    let offset = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = 1; k < 3; k++) {
          let p1 = new Coord(i, j, Math.pow(-1, k));
          let n1 = new Coord(0, 0, Math.pow(-1, k));
  
          let p2 = new Coord(Math.pow(-1, k), i, j);
          let n2 = new Coord(Math.pow(-1, k), 0, 0);
  
          let p3 = new Coord(i, Math.pow(-1, k), j);
          let n3 = new Coord(0, Math.pow(-1, k), 0);
  
          let c1 = new Cell(p1, n1);
          let c2 = new Cell(p2, n2);
          let c3 = new Cell(p3, n3);
          
          this.cells.push(c1);
          this.cells.push(c2);
          this.cells.push(c3);
          offset += 1;
        }
      }
    }
  }

  show() {
		for (let c of this.cells) {
      c.show();
    }
    top.texture(img)
    top.box(W)
  }

  Rot(side) {
    let xyz = ['x', 'y', 'z'];
    let normIndex = side % 3;
    let as = xyz[normIndex];

    for (let c of this.cells) {
      if (c.pos.arr[normIndex] == faces[side][normIndex]) {
        c.rot(faces[side], HALF_PI);
      }
    }
  }



}