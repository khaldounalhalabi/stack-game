import Grid from "../Models/Grid.ts";
import Cell from "../Models/Cell.ts";

export class LevelsManager {
    private grid: Grid | undefined;
    private static instance?: LevelsManager = undefined;

    constructor() {
    }

    public static make() {
        if (!this.instance) {
            this.instance = new LevelsManager();
        }

        return this.instance
    }

    public firstLevel = () => {

        this.grid = new Grid(4, 1, 1, [
            Cell.purple(0, 0),
            Cell.purple(0, 2),
            Cell.purple(0, 3),
        ]);
        return this;
    }

    public secondLevel = () => {
        console.log("here")
        this.grid = new Grid(3, 3, 4, [
            Cell.yellow(0, 0),
            Cell.yellow(2, 0),
            Cell.purple(0, 2),
            Cell.purple(2, 2)
        ]);

        return this;
    }

    public thirdLevel = () => {
        this.grid = new Grid(3, 4, 7, [
            Cell.orange(0, 1),
            Cell.green(0, 2),
            Cell.orange(1, 0),
            Cell.green(1, 1),
            Cell.orange(2, 1),
            Cell.green(2, 2),
            Cell.orange(3, 0),
            Cell.green(3, 1),
        ]);

        return this;
    }

    public fourthLevel = () => {
        this.grid = new Grid(3, 4, 7, [
            Cell.green(0, 1),
            Cell.green(0, 2),
            Cell.orange(1, 2),
            Cell.green(2, 0),
            Cell.orange(3, 0),
            Cell.green(3, 1),
        ]);

        return this;
    }

    public fifthLevel = () => {
        this.grid = new Grid(3, 3, 6, [
            Cell.orange(0, 0),
            Cell.orange(0, 1),
            Cell.orange(1, 0),
            Cell.obstacle(1, 1),
            Cell.green(1, 2),
            Cell.green(2, 1),
            Cell.green(2, 2)
        ]);

        return this;
    }

    public sixthLevel = () => {
        this.grid = new Grid(4, 4, 8, [
            Cell.green(0, 1),
            Cell.orange(1, 2),
            Cell.blue(1, 3),
            Cell.orange(2, 0),
            Cell.blue(2, 1),
            Cell.green(2, 3),
            Cell.obstacle(0, 0),
            Cell.obstacle(0, 3),
            Cell.obstacle(3, 0),
            Cell.obstacle(3, 3),
        ]);
        return this;
    }

    public seventhLevel = () => {
        this.grid = new Grid(4, 3, 8, [
            Cell.purple(0, 1),
            Cell.orange(0, 2),
            Cell.purple(0, 3),
            Cell.obstacle(1, 0),
            Cell.obstacle(1, 2),
            Cell.orange(1, 3),
            Cell.blue(2, 0),
            Cell.blue(2, 2),
            Cell.orange(2, 3)
        ])
        return this;
    }

    public eighthLevel = () => {
        this.grid = new Grid(6, 6, 7, [
            Cell.blue(0, 0),
            Cell.blue(0, 1),
            Cell.blue(0, 2),
            Cell.blue(0, 3),
            Cell.blue(0, 4),
            Cell.blue(0, 5),
            Cell.purple(1, 0),
            Cell.purple(2, 0),
            Cell.purple(3, 0),
            Cell.purple(4, 0),
            Cell.purple(5, 0),
            Cell.blue(1, 5),
            Cell.blue(2, 5),
            Cell.blue(3, 5),
            Cell.blue(4, 5),
            Cell.blue(5, 5),
            Cell.purple(1, 3),
            Cell.purple(1, 4),
            Cell.purple(2, 3),
            Cell.purple(2, 4),
            Cell.purple(3, 1),
            Cell.purple(3, 2),
            Cell.purple(4, 1),
            Cell.purple(4, 2),

            Cell.obstacle(1, 1),
            Cell.obstacle(1, 2),
            Cell.obstacle(2, 1),
            Cell.obstacle(2, 2),

            Cell.obstacle(3, 3),
            Cell.obstacle(3, 4),
            Cell.obstacle(4, 3),
            Cell.obstacle(4, 4),

            Cell.purple(5, 1),
            Cell.purple(5, 2),
            Cell.purple(5, 3),
            Cell.purple(5, 4),
        ]);
        return this;
    }

    public ninthLevel = () => {
        this.grid = new Grid(4, 4, 7, [
            Cell.obstacle(0, 0),
            Cell.orange(0, 1),
            Cell.green(0, 2),
            Cell.green(0, 3),
            Cell.orange(1, 0),
            Cell.purple(1, 1),
            Cell.orange(1, 3),
            Cell.orange(2, 0),
            Cell.orange(2, 1),
            Cell.purple(2, 2),
            Cell.green(2, 3),
            Cell.purple(3, 1),
            Cell.purple(3, 3),
        ]);
        return this;
    }

    public tenthLevel = () => {
        this.grid = new Grid(4, 4, 7, [
            Cell.purple(0, 0),
            Cell.purple(0, 1),
            Cell.purple(0, 3),
            Cell.purple(1, 0),
            Cell.obstacle(1, 1),
            Cell.green(1, 2),
            Cell.green(2, 1),
            Cell.obstacle(2, 3),
            Cell.green(3, 1),
            Cell.green(3, 2),
            Cell.orange(3, 3)
        ])
        return this;
    }

    public render() {
        this.grid?.render();
        return this;
    }

    public initLevel = () => {
        let level = 0;
        const levelMatcher = (level: number) => {
            switch (level) {
                case 1:
                    this.firstLevel().render().grid?.enableKeyboard();
                    break;
                case 2:
                    this.secondLevel().render().grid?.enableKeyboard();
                    break;
                case 3:
                    this.thirdLevel().render().grid?.enableKeyboard();
                    break;
                case 4:
                    this.fourthLevel().render().grid?.enableKeyboard();
                    break;
                case 5:
                    this.fifthLevel().render().grid?.enableKeyboard();
                    break;
                case 6:
                    this.sixthLevel().render().grid?.enableKeyboard();
                    break;
                case 7:
                    this.seventhLevel().render().grid?.enableKeyboard();
                    break;
                case 8:
                    this.eighthLevel().render().grid?.enableKeyboard();
                    break;
                case 9:
                    this.ninthLevel().render().grid?.enableKeyboard();
                    break;
                case 10:
                    this.tenthLevel().render().grid?.enableKeyboard();
                    break;
                default :
                    break;
            }
            return this;
        }
        document.querySelectorAll('.level-button').forEach(button => {
            button.addEventListener('click', function (e: Event) {
                e.preventDefault();
                // @ts-ignore
                level = Number(e.target.getAttribute('data-level'));
                levelMatcher(level);
            });
        });

        return this;
    }

    public getGrid() {
        return this.grid;
    }
}