class Cube {
  constructor(W) {
    this.cells = [];
    this.w = W;
    let offset = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = 1; k < 3; k++) {
          const p1 = new Coord(i, j, Math.pow(-1, k));
          const n1 = new Coord(0, 0, Math.pow(-1, k));

          const p2 = new Coord(Math.pow(-1, k), i, j);
          const n2 = new Coord(Math.pow(-1, k), 0, 0);

          const p3 = new Coord(i, Math.pow(-1, k), j);
          const n3 = new Coord(0, Math.pow(-1, k), 0);

          const c1 = new Cell(p1, n1);
          const c2 = new Cell(p2, n2);
          const c3 = new Cell(p3, n3);

          this.cells.push(c1);
          this.cells.push(c2);
          this.cells.push(c3);
          offset += 1;
        }
      }
    }
  }

  show() {
    for (const c of this.cells) {
      c.show();
    }
    top.texture(img);
    top.box(W);
  }

  Rot(side) {
    const xyz = ['x', 'y', 'z'];
    const normIndex = side % 3;
    const as = xyz[normIndex];

    for (const c of this.cells) {
      if (c.pos.arr[normIndex] == faces[side][normIndex]) {
        c.rot(faces[side], HALF_PI);
      }
    }
  }
}
