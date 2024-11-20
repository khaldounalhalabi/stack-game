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