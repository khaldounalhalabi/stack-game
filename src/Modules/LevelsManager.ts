import Grid from "../Models/Grid.ts";
import Cell from "../Models/Cell.ts";
import { Algorithm } from "./Algorithm.ts";

export class LevelsManager {
  private static instance?: LevelsManager = undefined;
  private grid: Grid | undefined;

  constructor() {}

  public static make() {
    if (!this.instance) {
      this.instance = new LevelsManager();
    }

    return this.instance;
  }

  private levelsInitializers = [
    () => {
      this.grid = new Grid(3, 3, 4, [
        Cell.yellow(0, 0),
        Cell.yellow(2, 0),
        Cell.purple(0, 2),
        Cell.purple(2, 2),
      ]);

      return this;
    },
    () => {
      this.grid = new Grid(3, 3, 4, [
        Cell.yellow(0, 0),
        Cell.yellow(2, 0),
        Cell.purple(0, 2),
        Cell.purple(2, 2),
      ]);

      return this;
    },
    () => {
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
    },
    () => {
      this.grid = new Grid(3, 4, 7, [
        Cell.green(0, 1),
        Cell.green(0, 2),
        Cell.orange(1, 2),
        Cell.green(2, 0),
        Cell.orange(3, 0),
        Cell.green(3, 1),
      ]);

      return this;
    },
    () => {
      this.grid = new Grid(3, 3, 6, [
        Cell.orange(0, 0),
        Cell.orange(0, 1),
        Cell.orange(1, 0),
        Cell.obstacle(1, 1),
        Cell.green(1, 2),
        Cell.green(2, 1),
        Cell.green(2, 2),
      ]);

      return this;
    },
    () => {
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
    },
    () => {
      this.grid = new Grid(4, 3, 8, [
        Cell.purple(0, 1),
        Cell.orange(0, 2),
        Cell.purple(0, 3),
        Cell.obstacle(1, 0),
        Cell.obstacle(1, 2),
        Cell.orange(1, 3),
        Cell.blue(2, 0),
        Cell.blue(2, 2),
        Cell.orange(2, 3),
      ]);
      return this;
    },
    () => {
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
    },
    () => {
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
    },
    () => {
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
        Cell.orange(3, 3),
      ]);
      return this;
    },
  ];

  public render() {
    this.grid?.render();
    return this;
  }

  public initLevel = () => {
    let level = 0;
    const levelMatcher = (level: number) => {
      this.levelsInitializers?.[level - 1]().render().initGame();
    };
    document.querySelectorAll(".level-button").forEach((button) => {
      button.addEventListener("click", function (e: Event) {
        e.preventDefault();
        // @ts-ignore
        level = Number(e.target.getAttribute("data-level"));
        levelMatcher(level);
      });
    });

    return this;
  };

  private executeAlgorithm = (
    algorithmFn: keyof Algorithm,
    algorithmName: string
  ): void => {
    if (!this.grid) return undefined;
    const handler = new Algorithm(this.grid);

    if (!handler) {
      alert("There is no handler");
      return;
    }

    // @ts-ignore
    const result = handler?.[algorithmFn]?.();
    if (result) {
      result.render();
      setTimeout(() => {
        alert(`${algorithmName} Solution found`);
        window.location.reload();
      }, 500);
    } else {
      alert(`${algorithmName} Solution not found`);
      window.location.reload();
    }

    this.addStatistics(handler.visitedCount ?? 0, handler.requiredTime ?? 0);
  };

  private addStatistics = (visits: number, time: number): void => {
    const createStatElement = (content: string): HTMLHeadingElement => {
      const element = document.createElement("h1");
      element.className = "font-bold text-[16px]";
      element.innerHTML = content;
      return element;
    };

    const statsContainer = document.getElementById("statistics");
    if (statsContainer) {
      statsContainer.append(
        createStatElement(`Visited Nodes Count Is : ${visits}`),
        createStatElement(`Required Time Is : ${(time / 1000).toFixed(2)}`)
      );
    }
  };

  public initGame = (): void => {
    const toggleVisibility = (...elements: (HTMLElement | null)[]): void => {
      elements.forEach((el) => el?.classList.toggle("hidden"));
    };

    const play = (): Grid | undefined => this.grid?.enableKeyboard();

    const algorithmMap: Record<string, keyof Algorithm> = {
      dfs: "dfs",
      bfs: "bfs",
      ucs: "ucs",
      "hill-climbing": "hillClimbing",
      "rec-dfs": "startRecursiveDfs",
      "hill-climbing-bt": "hillClimbingWithBacktracking",
      "a-star": "aStar",
    };

    const playButton = document.getElementById("select-play");
    const algButton = document.getElementById("select-algorithm");
    const algList = document.getElementById("alg-list");

    toggleVisibility(algButton, playButton);

    playButton?.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      toggleVisibility(algButton, playButton);
      play();
    });

    algButton?.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      toggleVisibility(algButton, playButton, algList);
    });

    document.querySelectorAll(".alg-button").forEach((btn) => {
      btn.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const algorithm = target.getAttribute("data-alg");

        if (algorithm && algorithmMap[algorithm]) {
          this.executeAlgorithm(algorithmMap[algorithm], algorithm);
        }
      });
    });
  };
}
