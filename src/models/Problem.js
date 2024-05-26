// Problem.js
import {areInWordList, areNumbersEqual, areStringsEqual, areWordEqual, arraysEqual} from '../utils/arrayUtils.js';
import { areObjectsEqualUsingStringify } from '../utils/arrayUtils.js';


export class Problem {
    constructor(id, type, name, problem, args, solution, resultType, instructions, hints) {
        this.prob_id = id;
        this.prob_type = type;
        this.prob_name = name;
        this.prob_problem = problem;
        this.prob_args = args;
        this.prob_solution = solution;
        this.prob_resultType = resultType;
        this.prob_instructions = instructions;
        this.prob_hints = hints;
    }

    logProblemDetails() {
        console.log(`Problem ID: ${this.prob_id}, Problem: ${this.prob_problem}`);
    }

    checkSolution(userSolution) {
        if (userSolution === undefined) {
            console.log("checkSolution(userSolution)- Was undefined.. odds are no solution was entered or returned");
            return false
        }
        let result;

        if (this.prob_resultType === "number") {
            result = areNumbersEqual(userSolution, this.prob_solution);
        } else if (this.prob_resultType === "string") {
            result = areStringsEqual(userSolution, this.prob_solution);
        } else if (this.prob_resultType === "array") {
            result = arraysEqual(userSolution, this.prob_solution);
        } else if (this.prob_resultType === "object") {
            result = areObjectsEqualUsingStringify(userSolution, this.prob_solution);
        } else if (this.prob_resultType === "word") {
            result = areWordEqual(userSolution, this.prob_solution);
        } else if (this.prob_resultType === "wordInList") {
            result = areInWordList(userSolution, this.prob_solution);
        } else {
            //if (Array.isArray(this.prob_solution) && Array.isArray(userSolution)) {
            //result = arraysEqual(userSolution, this.prob_solution);
            result = areObjectsEqualUsingStringify(userSolution, this.prob_solution);
            //} else {
            //    result = userSolution === this.prob_solution;
            //}

        }
        return result;
    }
}
// 28