// UIManager.js
export class UIManager {
    constructor(gameController, messageHandler) {
        this.gameController = gameController; // Reference to the game controller
        this.messageHandler = messageHandler;

        // Initialize UI elements dynamically
        // Screen buttons
        this.restartGameBtn = document.getElementById('restart-game-btn');
        // Todo this.changeProblemSetBtn = document.getElementById('change-problem-set-btn');
        this.problemSetApplyBtn = document.getElementById('problem-set-apply-btn');
        this.resetProblemBtn = document.getElementById('reset-problem-btn');
        this.skipBtn = document.getElementById('skip-problem-btn');
        this.showHintBtn = document.getElementById('show-hint-btn');
        this.showSolutionBtn = document.getElementById('show-solution-btn');
        this.checkButton = document.getElementById('check-problem-btn');
        this.nextButton = null;
        this.closeMe = document.getElementById('close-overlay');
        this.copyButton = document.getElementById('copy-full-solution-btn');

        // Header Elements
        this.problemSetName = document.getElementById('problem-set-name');
        this.totalProblemsElement = document.getElementById('total-problems');
        this.totalSolvedProblemsElement = document.getElementById('total-solved-problems');
        this.totalSkippedProblemsElement = document.getElementById('total-skipped-problems');
        this.goalScoreElement = document.getElementById('goal-score');
        this.totalScoreElement = document.getElementById('total-score');

        // Misc Elements
        this.hintCnt = document.getElementById('hint-cnt');
        this.hintLine = document.getElementById('hint-code');

        // Screen Elements
        this.nameElement = document.getElementById('name');
        this.idElement = document.getElementById('id');
        this.instructionsElement = document.getElementById('instructions');
        this.userSolutionElement = document.getElementById('user-solution');
        this.expectedSolutionElement = document.getElementById('expected-solution');
        this.messageElement = document.getElementById('message');
        this.fullSolutionCode = document.getElementById('full-solution-code');
        //this.copySolutionContent = document.getElementById('full-solution-code');

        // overlay Elements
        this.overlay = document.getElementById('overlay');
        this.overlayDialog = document.getElementById('overlay-dialog');

        this.currentProblemIndex = 0;
        this.currentProblemType = 0;
        this.totalHints = 0;
        this.hintIndex = -1;

        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
            this.initializeEditor();
        });
    }

    initializeEditor() {
        const initialState = cm6.createEditorState("function foo() {\n    console.log(123);\n}");
        const editorContainer = document.getElementById('editor');
        // on here we create the editor view with the initial state and container
        this.view = cm6.createEditorView(initialState, editorContainer);
    }

    bindEvents() {
        console.log('Setting up event listener for restart game button');
        this.restartGameBtn.addEventListener('click', () => this.restartGameUi());
        this.closeMe.addEventListener('click', () => this.restartGameUi());

        setTimeout(() => {
            this.overlay.addEventListener('click', (event) =>{
                if (!this.overlayDialog.contains(event.target)) { // Check if the click is outside the modal
                    const boxElement = document.getElementById('final-audit-trail');
                    boxElement.innerHTML = '';
                    this.restartGameUi();
                }
            })
        }, 300); // Adjust the delay as needed

        this.resetProblemBtn.addEventListener('click', () => this.handleResetProblemClick());
        this.problemSetApplyBtn.addEventListener('click', () => this.handleProblemSetApplyClick());

        this.skipBtn.addEventListener('click', () => this.handleSkipButtonClick());
        this.checkButton.addEventListener('click', () => this.handleCheckButtonClick(this.currentProblemType));
        this.showHintBtn.addEventListener('click', () => this.handleShowHintButtonClick(this.hintIndex++));
        this.showSolutionBtn.addEventListener('click', () => this.handleShowSolutionButtonClick());
        this.copyButton.addEventListener('click', this.copyTextToClipboard);
        // Example of binding a keypress event to the editor
        //this.editor.addEventListener('keypress', (event) => this.handleKeyPress(event));
        // Add more event listeners as needed for other UI elements
    }

    handleResetProblemClick() {
        const solutionDisplayCode = this.gameController.loader.getSolutionFullCodeById(this.currentProblemIndex);
        this.presentProblemCode(1, solutionDisplayCode);//typewth
    }

    async handleProblemSetApplyClick() {
        const problemSetDropdown = document.getElementById('problem-set-dp');
        const selectedOptionValue = problemSetDropdown.options[problemSetDropdown.selectedIndex].value;
        //selectedOptionValue.selected = true;

//        alert(selectedOptionValue);
        //this.problemSetDropdown.va
        const foo = `../data/js-${selectedOptionValue}.json`;

        //restart
        //.await this.gameController.justLoadProblems(foo);
        //this.restartGameUi();
        //this.gameController.restartSession();
        await this.gameController.startGame(foo);
    }
    // this.gameController.startGame(foo)


    displayHeaderFields() {
        this.totalProblemsElement.textContent = this.gameController.getTotalProblems();
        this.goalScoreElement.textContent = this.gameController.getGoalScore();
        this.problemSetName.textContent = this.gameController.getProblemSetName();
    }
    displayDropdown() {
        const element = document.getElementById('problem-set-dp');
        if (!element) {
            const problemSetDropdown = document.createElement('select');
            problemSetDropdown.id = "problem-set-dp";
            // this.problemSetDropdown = document.getElementById('problem-set-dp');

            const options = [
                { text: "Filter Problems", value: "filters" },
                { text: "for-loops Problems", value: "for-loops" },
                { text: "for...of loops Problems", value: "for-of-loops" },
                { text: "for...in loops Problems", value: "for-in-loops" },
                { text: "Misc Problems", value: "misc" }
            ];

            options.forEach((optItem) => {
                const optElement = document.createElement('option');
                optElement.textContent = optItem.text;
                optElement.value = optItem.value;
                if (optElement.value === "for-loops") optElement.selected = true

                problemSetDropdown.appendChild(optElement)
            })

            // Get the parent element
            const parentElement = document.getElementById('change-problem-set-btn');
            parentElement.insertAdjacentElement('afterend', problemSetDropdown);

        }


    }


    displayProblem(problem, index) {
        this.currentProblemIndex = index;
        this.clearFullSolution();
        this.clearHints(problem.prob_hints.length);
        this.clearComparedSolution()
        this.clearDisplayMessage()
        if (this.nextButton) {
            this.nextButton.remove();
            //this.nextButton.remove();
            //this.nextButton = null;
        }

        this.currentProblemType = problem.prob_type;

        this.presentProblemName(problem.prob_name);


        this.presentInstructions(problem.prob_instructions, 22);
        this.presentHintLabelTip(0, problem.prob_hints.length + 1)
        this.presentProblemCode(problem.prob_type, problem.prob_problem);
    }

    presentComparedSolution(userSolution, expectedSolution) {
        //var userSolutionString = JSON.stringify(userSolution);

        // numerics ok is turned to string
        this.userSolutionElement.textContent = JSON.stringify(userSolution);
        this.expectedSolutionElement.textContent = JSON.stringify(expectedSolution);
        //................this.userSolutionElement.textContent = userSolution;
        //................this.expectedSolutionElement.textContent = expectedSolution;
    }

    clearComparedSolution() {
        this.userSolutionElement.textContent = "";
        this.expectedSolutionElement.textContent = "";
    }

    clearDisplayMessage() {
        this.messageElement.textContent = '';
        this.messageElement.style.color = "none"
    }

    presentProblemCode(typewth, code) {
        const editor = document.getElementById('editor');
        const otherEditor = document.getElementById('editorText');
        if (typewth === 1) {
            editor.style.display = "block"
            otherEditor.style.display = "none"
            this.problemJS(code);
            //this.problemQuestion(code);
        } else {
            editor.style.display = "none"
            otherEditor.style.display = "block"
            this.problemQuestion(typewth);
        }
    }
    problemQuestion(code) {
        const editorContainer = document.getElementById('editorText');
        editorContainer.textContent = code;
    }

    problemJS(code) {
        const functionDeclaration = code.match(/function\s+[^(]*\([^)]*\)/)[0]; // Extract the function declaration
        let emptyFunction = functionDeclaration + ' {\n';
        emptyFunction += `\n}`;

        const options = {
            theme: "default",
            extensions: [
                // Exclude autocomplete-related extensions
                // For example, if you're using a language-specific extension that includes autocomplete:
                // removeLanguageAutocompleteExtension()
            ]
        };

        const newState = cm6.createEditorState(emptyFunction, options);
        this.view.setState(newState);

    }


    presentProblemName(name) {
        this.nameElement.innerHTML = name;
    }


    presentInstructions(text, id) {
        this.idElement.innerHTML = id + ')';
        if (text.length === 0) {
            this.instructionsElement.innerHTML = "empty";
        } else {
            let x = '';
            text.forEach(comment => {
                x += comment + "<br />"
            })
            this.instructionsElement.innerHTML = `${x}`;
        }
    }

    presentHintLabelTip(currentOf, totalHints) {
        this.hintCnt.textContent = `${currentOf} / (${totalHints})`;
    }

    copyTextToClipboard = async () => {
        try {
            const text = this.fullSolutionCode.textContent;

            await navigator.clipboard.writeText(text);

            console.log('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    restartGameUi() {
        console.log('restartGameUI method called');
        const main = document.getElementById('main-content')
        main.style.display = 'block';

        const overlay = document.getElementById('overlay');
        overlay.className = "";
        overlay.style.display = "none";

        this.gameController.restartSession();
    }

    handleSkipButtonClick() {
        const eventType = 'problemSkip'
        this.gameController.addScore(eventType);
        this.gameController.incrementTotalCount(eventType);
        this.gameController.logAuditTrail(eventType, this.currentProblemIndex)

        // Skipped is part of solution Count
        this.gameController.incrementTotalSolutionsCount();

        this.refreshDisplayScore();
        this.refreshDisplaySkippedCnt()
        this.copyButton.classList.remove('show-copy')

        if (this.gameController.isGameOver()) {
            this.updateDom('gameOver');
        } else {
            this.gameController.nextProblem();
        }
    };

    handleShowHintButtonClick(idx) {
        const eventType = 'hintPeek'
        this.gameController.addScore(eventType);
        this.gameController.incrementTotalCount(eventType);
        this.gameController.logAuditTrail(eventType, this.currentProblemIndex)

        this.refreshDisplayScore();

        // This first Hint is not carried in the hint array, it is derived from input and expected value
        // Basically the first hint is always the input arguments and solution result. AKA expected value
        if (idx < 0) {
            const args = this.gameController.loader.getArgsById(this.currentProblemIndex);
            const stringifyArgs = JSON.stringify(args);

            const solution = this.gameController.loader.getSolutionById(this.currentProblemIndex);
            const stringifySolution = JSON.stringify(solution);

            this.hintLine.innerHTML = `<p>${idx + 2}) Input: ` + stringifyArgs + "<br />" +
                "---Expected output: " + stringifySolution + "</p>";
        } else {
            const temp  = this.gameController.loader.getHintsById(this.currentProblemIndex, idx);
            this.hintLine.innerHTML += `<p>${idx + 2}) ${temp}</p>`;
        }

        this.presentHintLabelTip(this.hintIndex + 1, this.totalHints + 1);
        if (idx > this.totalHints - 2) {
            this.showHintBtn.disabled = true;
        }
    }

    handleShowSolutionButtonClick() {
        const eventType = 'solutionPeek'
        this.gameController.addScore(eventType);
        this.gameController.incrementTotalCount(eventType);
        this.gameController.logAuditTrail(eventType, this.currentProblemIndex)

        this.refreshDisplayScore();

        const solutionDisplayCode = this.gameController.loader.getSolutionFullCodeById(this.currentProblemIndex);

        this.messageHandler.addMessage("Bad person, you peeked at solution!!!", "info")
        this.displayMessage();

        this.fullSolutionCode.innerHTML = solutionDisplayCode;
        this.showSolutionBtn.disabled = true;
        this.copyButton.classList.add('show-copy');
    }

    hideEverything() {
        const main = document.getElementById('main-content')
        main.style.display = 'none';
    }

    handleShowOverlay() {
        this.hideEverything();

        const overlay = document.getElementById('overlay');
        overlay.classList.add("overlay", "active");
        overlay.style.cssText = '';

        const trail = this.gameController.getAuditTrail();//scoring.getScoreAuditTrail();
        const finalScore = this.gameController.getCurrentScore();//scoring.getScore();

        const totalProblems  = this.gameController.getTotalProblems();
        const solvedProblems = this.gameController.getTotalSolvedProblemsCount()
        const skippedProblems = this.gameController.getTotalSkippedProblemsCount()
        const totalHintCnt = this.gameController.getTotalHintsPeekCount()
        const totalSolutionCnt = this.gameController.getTotalPeekedSolutionsCount()

        const boxElement = document.getElementById('final-audit-trail');
        const ulElement = document.createElement('ul');
        for (const item of trail) {
            const liElement = document.createElement('li');
            if (item === 'skip') {
                liElement.textContent = this.gameController.getPenaltySkippingPoints() + " Skipping "
            } else {
                 liElement.textContent = item;
            }
            ulElement.appendChild(liElement);
        }
        boxElement.appendChild(ulElement);

        const finalTotalScore = document.getElementById('final-total-score');
        const finalGoalScore = document.getElementById('final-goal-score');
        finalTotalScore.textContent = finalScore;
        finalGoalScore.textContent = this.gameController.getGoalScore();
        this.totalProblemsElement.textContent = this.gameController.getTotalProblems();

        const finalProblemSetName = document.getElementById('final-problem-set-name');
        finalProblemSetName.textContent = this.gameController.getProblemSetName();

        const finalTotal = document.querySelector('.final-total');
        const finalSolved = document.querySelector('.final-solved');
        const finalSkipped = document.querySelector('.final-skipped');
        const finalHintCnt = document.querySelector('.final-hint-cnt');
        const finalSolutionCnt = document.querySelector('.final-solution-cnt');
        finalTotal.textContent = totalProblems;
        finalSolved.textContent = solvedProblems;
        finalSkipped.textContent = skippedProblems;
        finalHintCnt.textContent = totalHintCnt;
        finalSolutionCnt.textContent = totalSolutionCnt;
    }

    updateDom(action) {
        if (action === "gameOver") {
            this.handleShowOverlay()
        }
    }

    clearHints(totalHints) {
        this.totalHints = totalHints
        this.hintIndex = -1;

        this.showHintBtn.disabled = false;
        this.hintLine.innerHTML = '';
    }

    clearFullSolution() {
        this.showSolutionBtn.disabled = false;
        this.fullSolutionCode.innerHTML = '';
    }

    clearAll() {
        this.totalScoreElement.textContent = "0";
        this.totalSkippedProblemsElement.textContent = "0";
        this.totalSolvedProblemsElement.textContent = "0";
        this.gameController.clearAllIncrements()
    }

    handleNextButtonClick() {
        this.copyButton.classList.remove('show-copy')
        this.gameController.nextProblem();
    }

    handleCheckButtonClick(typewth) {
        let isExecutable;
        let userSolution;

        if (typewth === 2) {
            isExecutable = true;
            const editorText = document.getElementById('editorText');
            userSolution = editorText.value;

        } else {
            const problemArguments = this.gameController.loader.getArgsById(this.currentProblemIndex);

            //const problem = this.getUserSolutionFromUi(); // Implement this method to capture the user's solution
            const editorState = this.view.state;
            const problem = editorState.doc.toString();

            [isExecutable, userSolution] = this.submitCode(problem, problemArguments);

            // For typeof objects that are not arrays as in...  equals { } we JSON.stringify()
            // below when it gets checkSolutionCorrectness()... it will be treated as a string
            //if (typeof userSolution === 'object' && !Array.isArray(userSolution)) {
            //    userSolution = JSON.stringify(userSolution);
            //}
        }


        let isCorrect = false;
        if (!isExecutable) {
            this.messageHandler.addMessage(userSolution, `fail`);
        } else {
            isCorrect = this.gameController.checkUserSolution(userSolution);
            //let [isCorrect, checkStatus, checkMessage] = checkSolutionCorrectness(expectedSolutionCode, userSolution);

            const expectedSolution = this.gameController.getCurrentProblemExpectedSolutionFromPlayer();
            this.presentComparedSolution(userSolution, expectedSolution);
            //console.log(userSolution);
            //console.log(expectedSolution);

            if (isCorrect) {
                console.log('Correct solution!');
                const eventType = 'problemSolve'
                this.gameController.addScore(eventType);
                this.gameController.incrementTotalCount(eventType);
                this.gameController.logAuditTrail(eventType, this.currentProblemIndex)

                // Correct is part of solution Count
                this.gameController.incrementTotalSolutionsCount();

                this.refreshDisplaySolvedCnt()

                this.messageHandler.addMessage('You are correct', `pass`);

                if (!this.nextButton) {
                    this.nextButton  = document.createElement('button')
                    this.nextButton.textContent = 'Next';
                    this.nextButton.id = 'next-btn';
                    this.nextButton.addEventListener('click', () => this.handleNextButtonClick());
                    this.checkButton.insertAdjacentElement('afterend', this.nextButton);
                } else {
                    this.checkButton.insertAdjacentElement('afterend', this.nextButton);
                }

                // This needs to be last on isSolved, else some of the other increments might be skipped before they get a chance to get incremented
                this.gameController.setCurrentProblemSolved();
            } else {
                console.log('Incorrect solution. Try again.');
                const eventType = 'problemFail'
                this.gameController.addScore(eventType);
                this.gameController.incrementTotalCount(eventType);
                this.gameController.logAuditTrail(eventType, this.currentProblemIndex)

                this.messageHandler.addMessage('Incorrect solution. Try again.', `fail`);
                if (this.nextButton) {
                    this.nextButton.remove();
                }
            }
        }

        this.displayMessage();
        this.refreshDisplayScore();
    };

    submitCode(codeString, args) {
        try {
            const func = eval('(' + codeString + ')');
            const result = func(args);
            //console.log('Result:', result);
            return [true, result];
        } catch (error) {
            console.error('Error evaluating code:', error);
            return [false, 'Error evaluating code:' + error];
            //throw error;
        }
    }

    displayMessage() {
        const element = this.messageElement;

        if (element) {
            const { message, type } = this.messageHandler.getMessage()
            element.textContent = message;

            switch (type) {
                case 'info':
                    element.style.color = "green"
                    break
                case 'pass':
                    element.style.color = "green"
                    break
                case 'error':
                case 'fail':
                case 'fatal':
                    element.style.color = "red"
                    element.style.fontWeight = "bolder"

                    if (type === 'fatal') {
                        console.error('fail');
                    }
                    break
                default:
                    element.style.color = "none"
            }

            // Clear the message after 5 seconds
            if (type === 'info') {
                setTimeout(() => {
                    element.textContent = '';
                }, 5000);
            }
        } else {
            console.error("Element with ID 'total-score' not found.");
        }
    }

    refreshDisplayScore() {
        const element = this.totalScoreElement;

        if (element) {
            element.textContent = this.gameController.getCurrentScore();
        } else {
            console.error("Element with ID 'total-score' not found.");
        }
    }

    refreshDisplaySkippedCnt() {
        const element = this.totalSkippedProblemsElement;

        if (element) {
            element.textContent = this.gameController.getTotalSkippedProblemsCount();
        } else {
            console.error("Element with ID 'skipped-problems' not found.");
        }
    }

    refreshDisplaySolvedCnt() {
        const element = this.totalSolvedProblemsElement;

        if (element) {
            element.textContent = this.gameController.getTotalSolvedProblemsCount();
        } else {
            console.error("Element with ID 'solved-problems' not found.");
        }
    }
}
//562 - 478 - 585