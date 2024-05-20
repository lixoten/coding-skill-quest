// Problem.js
import { arraysEqual } from '../utils/arrayUtils.js';


export class Problem {
    constructor(id, problem, args, expectedSolution, instructions, hints) {
        this.id = id;
        this.problem = problem;
        this.args = args;
        this.expectedSolution = expectedSolution;
        this.instructions = instructions;
        this.hints = hints;
    }

    logProblemDetails() {
        console.log(`Problem ID: ${this.id}, Problem: ${this.problem}`);
    }

    checkSolution(userSolution) {
        let result;
        if (Array.isArray(this.expectedSolution) && Array.isArray(userSolution)) {
            result = arraysEqual(userSolution, this.expectedSolution);
        } else {
            result = userSolution === this.expectedSolution;
        }
        return result;
    }
}
// 28