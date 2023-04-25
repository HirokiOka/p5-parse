function setup() {
  createCanvas(100, 100).parent(canvasParentRef);
  background(196);
  for (let i  = 0; i < 9; i++) {
    const x = (i + 1) * 10;
    line(x, 0, x, 100);
  }
}
