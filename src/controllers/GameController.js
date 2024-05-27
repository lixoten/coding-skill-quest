// GameController.js
import { UIManager } from '../utils/UIManager.js';
import { Loader } from '../services/Loader.js';
import { Player} from "/src/models/Player.js";

export class GameController {
    /******/
    // static is best for constants. this way they are not ties to a specific instance of the class but to the class itself
    // when referencing static use the class name, as in UIManager.POINTS_PENALTY_FOR_SKIPPING
    // .this represents an instance
    /******/

    static POINTS = {
        problemSolve: {
            literal: "problemSolve",
            value: 10
        },
        problemFail: {
            literal: "problemFail",
            value: -2
        },
        problemSkip: {
            literal: "problemSkip",
            value: -15
        },
        solutionPeek: {
            literal: "solutionPeek",
            value: -10
        },
        hintPeek: {
            literal: "hintPeek",
            value: -1
        },
    };

    constructor( { uiManager, loader, player }) {
        //if (!(uiManager instanceof UIManager)) {
        //    throw new Error('uiManager must be an instance of UIManager');
        //}
        this.uiManager = uiManager;

        /*
         * @ ccccPlayer
         */
        this.player = player;
        this.loader = loader;
        this.currentProblemIndex = 0;

        // This file is used if no file is passed in
        this.DEFAULT_INITIAL_DATA_FILE = 'js-for-loops.json';
    }

    restartSession() {
        this.currentProblemIndex = 0;
        this.uiManager.clearAll();
        this.assignProblemToPlayer(this.loader.getProblems()[this.currentProblemIndex]);

        this.uiManager.displayProblem(this.player.getCurrentProblem_Player(), this.currentProblemIndex);
    }

    isGameOver() {
        const solved = this.getTotalSolvedProblemsCount()
        const skipped = this.getTotalSkippedProblemsCount()
        return this.totalProblems === (solved + skipped);
    }


    justLoadProblems(file = this.DEFAULT_INITIAL_DATA_FILE) {
        return new Promise((resolve, reject) => {
            this.loader.loadProblemsFromFile(file)
                .then(problems => {
                    this.currentProblemIndex = 0;
                    this.totalProblems = problems.length;
                    this.assignProblemToPlayer(problems[this.currentProblemIndex]);
                    resolve(); // Resolve the promise
                })
                .catch(error => {
                    reject(error); // Reject the promise if there's an error
                });
        });
    }


    async startGame(file = this.DEFAULT_INITIAL_DATA_FILE) {
        await this.justLoadProblems(file);


        //this.uiManager.displayProblem(problems[this.currentProblemIndex], this.currentProblemIndex);
        this.uiManager.displayHeaderFields(); // Display the total number of problems after they have been loaded
        this.uiManager.displayDropdown(); // Display the total number of problems after they have been loaded

        this.uiManager.displayProblem(this.player.getCurrentProblem_Player(), this.currentProblemIndex);

        console.log("StartGame");

        // this.loader.loadProblemsFromFile(file)
        //     .then(problems => {
        //         this.currentProblemIndex = 0;
        //         this.totalProblems = problems.length
        //         //console.log(problems[this.currentProblemIndex]);
        //
        //         this.assignProblemToPlayer(problems[this.currentProblemIndex]);
        //         this.uiManager.displayProblem(problems[this.currentProblemIndex], this.currentProblemIndex);
        //         this.uiManager.displayHeaderFields(); // Display the total number of problems after they have been loaded
        //         this.uiManager.displayDropdown(); // Display the total number of problems after they have been loaded
        //         console.log(123);
        //     });
    }

    assignProblemToPlayer(problem) {
        this.player.setCurrentProblem_Player(problem);
        this.player.isCurrentProblemSolved = false;
    }

    getCurrentProblemFromPlayer() {
        return this.player.getCurrentProblem_Player();
    }

    getCurrentProblemExpectedSolutionFromPlayer() {
        return this.player.getCurrentProblemExpectedSolution_Player();
    }

    getAuditTrail() {
        return this.player.getAuditTrail();
    }

    logAuditTrail(scoreType, problemNumber) {
        if (this.player.isCurrentProblemSolved) return;

        // Simplified from Switch
        const logTexts = {
            "solutionPeek": 'Solution Request',
            "hintPeek": 'Hint Request',
            "problemSkip": 'Skipping Problem',
            "problemFail": 'Wrong Answer',
            "problemSolve": 'Correct Answer'
        };
        const logText = logTexts[scoreType];
        const points = GameController.POINTS[scoreType].value;
        this.player.logAuditTrail(`#${problemNumber + 1}) ${points} ${logText}`);
        console.log(`${problemNumber + 1}) ${points} ${logText}`);
    }

    getTotalProblems() {
        return this.loader.getProblems().length;
    }

    getGoalScore() {
        //return this.loader.getProblems().length * GameController.POINTS.CORRECT_ANSWER;
        return this.loader.getProblems().length * GameController.POINTS.problemSolve.value;
    }

    getProblemSetName() {
        return this.loader.getProblemSetName();
    }

    clearAllIncrements() {
        this.player.clearAllIncrements();
    }

    isValidScoreType(scoreType) {
        if (!(scoreType in GameController.POINTS)) {
            console.error(`Unknown score type: ${scoreType}`);
            return false;
        }
        return true;
    }

    // Todo revisit Simplified
    addScore(scoreType) {
        if (this.player.isCurrentProblemSolved) return;
        if (!this.isValidScoreType(scoreType)) return;

        this.player.addToScore(GameController.POINTS[scoreType].value);

        // let points = 0;
        // switch (scoreType) {
        //     case "solutionPeek":
        //         points = GameController.POINTS_SHOW_SOLUTION;
        //         break;
        //     case "hintPeek":
        //         points = GameController.POINTS_PENALTY_FOR_HINT;
        //         break;
        //     case "problemSkip":
        //         points = GameController.POINTS_PENALTY_FOR_SKIPPING;
        //         break;
        //     case "problemFail":
        //         points = GameController.POINTS_WRONG_ANSWER;
        //         break;
        //     case "problemSolve":
        //         points = GameController.POINTS_CORRECT_ANSWER;
        //         break;
        //     default:
        //         console.error("Score Type is unknown");
        // }
        // this.player.addToScore(points);
    }


    // Todo revisit Simplified
    incrementTotalCount(scoreType) {
        if (this.player.isCurrentProblemSolved) return;
        if (!this.isValidScoreType(scoreType)) return;

        // This one is a bit Advanced for me
        //let xxxx = `incrementTotal${scoreType.charAt(0).toUpperCase() + scoreType.slice(1)}Count`;
        //this.player[`incrementTotal${scoreType.charAt(0).toUpperCase() + scoreType.slice(1)}Count`]();
        switch (scoreType) {
            case "solutionPeek":
                this.player.incrementTotalPeekedSolutionsCount();
                break;
            case "hintPeek":
                this.player.incrementTotalHintsPeekCount();
                break;
            case "problemSkip":
                this.player.incrementTotalProblemSkipCount();
                break;
            case "problemFail":
                this.player.incrementTotalFailedProblemCount();
                break;
            case "problemSolve":
                this.player.incrementTotalSolvedProblemCount();
                break;
            default:
                console.error("Increment Type is unknown");
        }
    }

    getCurrentScore() {
        return this.player.getScore_Players();
    }

    setCurrentProblemSolved() {
        this.player.setCurrentProblemSolved();
    }

    getTotalSolvedProblemsCount() {
        return this.player.getTotalSolvedProblemsCount()
    }

    incrementTotalSolutionsCount() {
        if (this.player.isCurrentProblemSolved) {
            return;
        }
        this.player.incrementTotalSolutionsCount();
    }

    getTotalSkippedProblemsCount() {
        return this.player.getTotalSkippedProblemsCount()
    }

    getTotalHintsPeekCount() {
        return this.player.getTotalHintsPeekCount()
    }
    getTotalPeekedSolutionsCount() {
        return this.player.getTotalPeekedSolutionsCount()
    }

    getPenaltySkippingPoints() {
        //return GameController.POINTS.PENALTY_FOR_SKIPPING
        return GameController.POINTS.problemSkip.value
    }

    checkUserSolution(userSolution) {
        // in the future I might not append Obj to variable name, but for now it help me think oop
        // const currentProblemObj = this.getCurrentProblemFromPlayer();
        // const isCorrect = currentProblemObj.checkSolution(userSolution);

        //const isCorrect = this.getCurrentProblemFromPlayer().checkSolution(userSolution);

        // Step 1: Retrieve the current problem from the player
        const currentPlayerProblemObject = this.getCurrentProblemFromPlayer();

        // Step 2: Check the solution against the current problem
        //return isCorrect;
        return currentPlayerProblemObject.checkSolution(userSolution);
    }

    nextProblem() {
        this.currentProblemIndex++;
        if (this.currentProblemIndex < this.loader.getProblems().length) {
            this.assignProblemToPlayer(this.loader.getProblems()[this.currentProblemIndex]);
            this.uiManager.displayProblem(this.player.getCurrentProblem_Player(), this.currentProblemIndex);
        } else {
            this.endGame();
        }
    }

    endGame() {
        //if (this.isGameOver()) {
            this.uiManager.updateDom('gameOver');
        //} else {
        //    this.nextProblem();
        //}

        //this.uiManager.reshowScore(this.player.getScore_Players());
        // Additional cleanup or end-game logic here
    }
}
// 272 - 252