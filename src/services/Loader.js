import { Problem } from '../models/Problem.js';

export class Loader {
    constructor() {
        this.problemSetName = "";
        this.problems = [];

        this.expectedSolutions = {};
    }

    async loadProblemsFromFile(filePath) {
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
                // why? this.expectedSolutions[problem.prob_id] = problem.prob_solution;

                // Return the problem without the solution
                return new Problem(
                    problem.prob_id,
                    problem.prob_type,
                    problem.prob_name,
                    problem.prob_problem,
                    problem.prob_args,
                    problem.prob_solution,
                    problem.prob_resultType,
                    problem.prob_instructions,
                    problem.prob_hints);
            });
            return this.problems;

        } catch (error) {
            console.error("Failed to load problems:", error);
            return [];
        }
    }

    getSolutionById(id) {
        return this.problems[id].prob_solution;
    }

    getSolutionFullCodeById(id) {
        return this.problems[id].prob_problem;
    }

    getProblemArgumentsById(id) {
        return this.problems[id].prob_args;
    }

    getHintsById(id, hintId) {
        return this.problems[id].prob_hints[hintId];
    }
    getArgsById(id) {
        return this.problems[id].prob_args;
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
        return this.problems.find(problem => problem.prob_id === id);
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