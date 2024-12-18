import Grid from "../Models/Grid.ts";
import Cell from "../Models/Cell.ts";
import {Algorithm} from "./Algorithm.ts";

export class LevelsManager {
    private static instance?: LevelsManager = undefined;
    private grid: Grid | undefined;

    constructor() {
    }

    public static make() {
        if (!this.instance) {
            this.instance = new LevelsManager();
        }

        return this.instance
    }

    public firstLevel = () => {

        this.grid = new Grid(4, 1, 2, [
            Cell.purple(0, 0),
            Cell.purple(0, 2),
            Cell.purple(0, 3),
        ]);
        return this;
    }

    public secondLevel = () => {
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
                    this.firstLevel().render().initGame();
                    break;
                case 2:
                    this.secondLevel().render().initGame();
                    break;
                case 3:
                    this.thirdLevel().render().initGame();
                    break;
                case 4:
                    this.fourthLevel().render().initGame();
                    break;
                case 5:
                    this.fifthLevel().render().initGame();
                    break;
                case 6:
                    this.sixthLevel().render().initGame();
                    break;
                case 7:
                    this.seventhLevel().render().initGame();
                    break;
                case 8:
                    this.eighthLevel().render().initGame();
                    break;
                case 9:
                    this.ninthLevel().render().initGame();
                    break;
                case 10:
                    this.tenthLevel().render().initGame();
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

    public initGame = () => {
        let handler = undefined;
        if (this.grid) {
            handler = new Algorithm(this.grid);
        }
        let play = () => {
            this.grid?.enableKeyboard();
        };

        const playButton = document.getElementById('select-play');
        const algButton = document.getElementById('select-algorithm');
        const algList = document.getElementById('alg-list');

        algButton?.classList.toggle("hidden")
        playButton?.classList.toggle("hidden");

        playButton?.addEventListener("click", function (e) {
            e.preventDefault();
            algButton?.classList.toggle("hidden")
            playButton.classList.toggle("hidden");
            play();
        })

        algButton?.addEventListener("click", function (e) {
            e.preventDefault();
            playButton?.classList.toggle("hidden")
            algButton?.classList.toggle("hidden")
            algList?.classList?.toggle('hidden')
        });

        const addStatistics = (visits: number, time: number) => {
            let v = document.createElement('h1');
            v.className = "font-bold text-[16px]";
            v.innerHTML = `Visited Nodes Count Is : ${visits}`;

            let t = document.createElement('h1');
            t.className = "font-bold text-[16px]";
            t.innerHTML = `Required Time Is : ${(time / 1000).toFixed(2)}`;

            let s = document.getElementById('statistics')
            s?.append(v);
            s?.append(t);
        }

        document.querySelectorAll('.alg-button').forEach((btn) => {
            // @ts-ignore
            btn.addEventListener("click", function (e: MouseEvent) {
                e.preventDefault();
                // @ts-ignore
                let algorithm = e.target.getAttribute('data-alg');

                switch (algorithm) {
                    case "dfs":
                        if (!handler) {
                            alert("There is no handler")
                        }
                        let dfs = handler?.dfs();
                        if (dfs) {
                            dfs.render();
                            setTimeout(() => {
                                alert("Solution found");
                                window.location.reload()
                            }, 500);
                        } else {
                            alert("Solution not found");
                            window.location.reload()
                        }
                        break;
                    case "bfs" :
                        if (!handler) {
                            alert("There is no handler")
                        }
                        let bfs = handler?.bfs();
                        if (bfs) {
                            bfs.render();
                            setTimeout(() => {
                                alert("Solution found");
                                window.location.reload()
                            }, 500);
                        } else {
                            alert("Solution not found");
                            window.location.reload()
                        }
                        break;
                    case "ucs" :
                        if (!handler) {
                            alert("There is no handler")
                        }
                        let ucs = handler?.ucs();
                        if (ucs) {
                            ucs.render();
                            setTimeout(() => {
                                alert("Solution found");
                                window.location.reload()
                            }, 500);
                        } else {
                            alert("Solution not found");
                            window.location.reload()
                        }
                        break;
                    case "hill-climbing" :
                        if (!handler) {
                            alert("There is no handler")
                        }
                        let hillClimbing = handler?.hillClimbing();
                        if (hillClimbing) {
                            hillClimbing.render();
                            setTimeout(() => {
                                alert("Solution found");
                                window.location.reload()
                            }, 500);
                        } else {
                            alert("Solution not found");
                            window.location.reload()
                        }
                        break;

                    case "rec-dfs" :
                        if (!handler) {
                            alert("There is no handler")
                        }
                        let recDfs = handler?.startRecursiveDfs();
                        if (recDfs) {
                            recDfs.render();
                            setTimeout(() => {
                                alert("Solution found");
                                window.location.reload()
                            }, 500);
                        } else {
                            alert("Solution not found");
                            window.location.reload()
                        }
                        break;
                    case "hill-climbing-bt":
                        if (!handler) {
                            alert("There is no handler")
                        }
                        let hCBT = handler?.hillClimbingWithBacktracking();
                        if (hCBT) {
                            hCBT.render();
                            setTimeout(() => {
                                alert("Solution found");
                                window.location.reload()
                            }, 500);
                        } else {
                            alert("Solution not found");
                            window.location.reload()
                        }
                        break;
                    case "a-star":
                        if (!handler) {
                            alert("There is no handler")
                        }
                        let aStar = handler?.aStar();
                        if (aStar) {
                            aStar.render();
                            setTimeout(() => {
                                alert("Solution found");
                                window.location.reload()
                            }, 500);
                        } else {
                            alert("Solution not found");
                            window.location.reload()
                        }
                        break;
                    default:
                        break;
                }

                addStatistics(handler?.visitedCount ?? 0, handler?.requiredTime ?? 0);
            })
        })
    }
}