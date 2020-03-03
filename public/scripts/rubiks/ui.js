class Ui {
    
    constructor() {
        this.buttons = [];
        for (let i = 0; i < 6; i++) {
            let b = new Coord((windowWidth/6)*i + windowWidth/12, 75)
            this.buttons.push(b);
        }
    }

    show() {
        push();
        translate(-windowWidth/2, (windowHeight/2)-150);
        fill(50);
        rect(0, 0, windowWidth, 150);
        for (let i = 0; i < 6; i++) {
            fill(colors[i]);
            ellipse(this.buttons[i].x, this.buttons[i].y, 100);
        }
        pop();
    }

    clicked(mx, my) {
        let laagste = 10000;
        let li;
        for (let i = 0; i < 6; i++) {
            let b = this.buttons[i];
            if (dist(b.x, b.y, mx, my+150-windowHeight) < 50) {
                C.Rot(i);
            }
        }
    }
}