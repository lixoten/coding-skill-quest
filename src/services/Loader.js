import { Problem } from '../models/Problem.js';

export class Loader {
    constructor() {
        this.problemSetName = "";
        this.problems = [];

        this.expectedSolutions = {};

        this.INITIAL_DATA_FILE = 'js-for-loops.json';
    }

    async loadProblemsFromFile(filePath = this.INITIAL_DATA_FILE) {
        try {
            const response = await fetch(filePath);
            const data = await response.json();
            if (!Array.isArray(data.data)) {
                console.error("Data is not an array:", data);
                return [];
            }
            const problemsJson = data.data;
            this.problemSetName = data.name;

            //this.problems = problemsJson.map(problem => new Problem(problem.id, problem.problem, problem.arguments, problem.solution, problem.instructions, problem.hints));
            //return this.problems; // Ensure to return the problems
            this.problems = problemsJson.map(problem => {
                // Store the solution separately
                this.expectedSolutions[problem.id] = problem.expectedSolutions;

                if (typeof problem.expectedSolutions === 'object' && !Array.isArray(problem.expectedSolutions)) {
                    //console.log(1111);
                    console.log(problem.expectedSolutions);
                    problem.expectedSolutions = JSON.stringify(problem.expectedSolutions);
                    console.log(problem.expectedSolutions);
                }

                // Return the problem without the solution
                return new Problem(problem.id, problem.problem, problem.arguments, problem.solution, problem.instructions, problem.hints);
            });
            return this.problems;

        } catch (error) {
            console.error("Failed to load problems:", error);
            return [];
        }
    }

    getSolutionById(id) {
        return this.problems[id].problem;
    }

    getSolutionFullCodeById(id) {
        return this.problems[id].problem;
    }

    getProblemArgumentsById(id) {
        return this.problems[id].args;
    }

    getHintsById(id, hintId) {
        return this.problems[id].hints[hintId];
    }
    getArgsById(id) {
        return this.problems[id].args;
    }

    getProblems() {
        return this.problems;
    }

    getProblemByIndex(index) {
        return this.problems[index];
    }

    getProblemSetName() {
        return this.problemSetName;
    }

    getProblemById(id) {
        return this.problems.find(problem => problem.id === id);
    }

    // getRandomProblem() {
    //     const randomIndex = Math.floor(Math.random() * this.problems.length);
    //     return this.problems[randomIndex];
    // }

    getNumberOfProblems() {
        return this.problems.length;
    }
}
// 99 92