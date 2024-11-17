import Cell from "./Models/Cell.ts";
import Grid from "./Models/Grid.ts";

const cells = [
    Cell.purple(0, 0),
    Cell.blank(0, 1),
    Cell.purple(0, 2),
];

const grid = new Grid(3, 1, cells);
grid.render();