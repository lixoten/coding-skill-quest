/**
 * Represents a player in a game.
 *
 * @class Player
 */
export class Player {
    constructor() {
        this.score = 0;
        this.audit = [];
        this.statistics = {
            totalSolvedProblems: 0,
            totalFailedProblems: 0,
            totalSkippedProblems: 0,
            totalSolutions: 0,
            totalHintsPeek: 0,
            totalPeekedSolutions: 0
        };
        this.currentProblem = null;
        this.isCurrentProblemSolved = false;
    }

    setCurrentProblem_Player(problem) {
        this.currentProblem = problem;
    }

    setCurrentProblemSolved() {
        this.isCurrentProblemSolved = true;
    }

    getCurrentProblem_Player() {
        return this.currentProblem;
    }
    getCurrentProblemExpectedSolution_Player() {
        return this.currentProblem.expectedSolution;
    }

    getScore_Players() {
        return this.score;
    }

    addToScore(points) {
        this.score += points;
    }

    incrementTotalSolutionsCount() {
        this.statistics.totalSolutions++;
    }

    clearAllIncrements() {
        this.score = 0;
        this.audit = [];
        this.statistics = {
            totalSolvedProblems: 0,
            totalFailedProblems: 0,
            totalSkippedProblems: 0,
            totalSolutions: 0,
            totalHintsPeek: 0,
            totalPeekedSolutions: 0
        };
        this.currentProblem = null;
        this.isCurrentProblemSolved = false;
    }

    logAuditTrail(type) {
        this.audit.push(type);
        console.log(`Audit: ${type}`)
    }

    getAuditTrail() {
        return this.audit;
    }


    incrementTotalSolvedProblemCount() {
        this.statistics.totalSolvedProblems++;
    }
    getTotalSolvedProblemsCount() {
        return this.statistics.totalSolvedProblems;
    }

    incrementTotalFailedProblemCount() {
        this.statistics.totalFailedProblems++;
    }

    incrementTotalProblemSkipCount() {
        this.statistics.totalSkippedProblems++;
    }
    getTotalSkippedProblemsCount() {
        return this.statistics.totalSkippedProblems;
    }

    incrementTotalHintsPeekCount() {
        this.statistics.totalHintsPeek++;
    }
    getTotalHintsPeekCount() {
        return this.statistics.totalHintsPeek;
    }
    incrementTotalPeekedSolutionsCount() {
        this.statistics.totalPeekedSolutions++;
    }
    getTotalPeekedSolutionsCount() {
        return this.statistics.totalPeekedSolutions;
    }
}
// 116 105