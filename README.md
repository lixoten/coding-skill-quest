# Coding Skill Quest

FYI... am new to JavaScript... am new to coding period. I started learning Feb 2024. Haft the time I am lost.
This is a **personal project** after I completed a Frontend track(course) on Hyperskill. A way to practice.
Inspired by Hyperskill way of presenting problems for students to answer.  
This is the 4th pass at rewriting this project. This time around the focus was on OOP, Encapsulation, SRP

## Overview
This project is a coding challenge platform designed to help users practice and improve their coding skills. The game tracks your progress, providing hints and solutions to help you along the way.

[js-practice.webm](https://github.com/lixoten/JS-Practice/assets/52259786/8106030b-5d89-474c-b205-939dc464841c)

## Features
- **Problem Set Management**: Users can load different sets of problems to solve
  --- **<span style="color:red;">Am still working on this</span>**.
- **Code Editor**: An integrated code editor using CodeMirror6 for writing and editing code.
- **Solution Checking**: Users can check their solutions against expected solutions on Submit/Check.
- **Hint System**: Provides one to several several hints to help users solve problems, on user request.
- **Score Reward/Penalty History** Displays a history of applied points, be it + points awarded or - points for penalties.
- **Solution Display**: Shows the correct solution on user request. This incurs a Penalty
- **Scoring System**: Keeps track of the user's score based on correct and incorrect answers and penalties if solution or hints are used. Or if a problem is skipped
- **Copy to Clipboard**: Users can copy the solution to their clipboard for easy access.

### Problem Files
- **JSON Format**: Problems are stored in JSON files, allowing for easy management and expansion of the problem set.
- **Dynamic Loading**: The application dynamically loads problems from JSON files, providing a flexible way to introduce new problems.

### User Interaction
- **Code Editor**: A CodeMirror-based editor allows users to write and run JavaScript code to solve problem.
- **Problem Display**: Problems are displayed with instructions and hints, guiding users through the solution process.
- **Solution Viewing**: Users can view the correct solution on request. 10 points penalty
- **Hint Viewing**: Users can view hints. Each hint view incurs 1 point penalty
- **Scoring System**: A scoring system rewards correct answers and penalizes incorrect attempts or viewing solutions prematurely.

### Gamification
- **Scoring**: Users earn points for correct answers and lose points for incorrect attempts or viewing solutions.
- **Game Stats**: for tracking how many problems have been solved, how many left to go, how many wrong and so on..
- **Penalties**: Viewing solutions, hints incurs a penalty, Skipping problems are incur penalties too. Encouraging users to solve problems independently.
- **Progress Tracking**: The application tracks user progress, displaying scores and penalties to motivate continuous learning.

## Point System
- **+10 Points Awarded for Solving Problems Correctly**
  - When a player successfully solves a problem (i.e., their solution matches the expected output), they earn 10 points. This encourages players to attempt solving problems and rewards them for correct answers.
- **-2 Points Deducted for Failing to Solve Problems**...-2 per fail
  - : If a player fails to solve a problem (i.e., their solution does not match the expected output), they lose 2 points. This discourages guessing and promotes thoughtful problem-solving.
- **-15 Points Deducted for Skipping Problems**
  - Skipping a problem results in a deduction of 15 points. This penalty is likely intended to discourage skipping problems, emphasizing the importance of engagement and persistence in solving challenges.
- **-10 Points Deducted for Peeking at Solutions**
  - Looking at the solution before attempting to solve the problem results in a loss of 10 points. This discourages cheating and encourages players to rely on their own problem-solving skills.
- **-1 Points Deducted for Peeking at Hints**
  - Using a hint before attempting to solve the problem results in a small deduction of 1 point. This suggests that hints are meant to assist but should not replace independent thinking and problem-solving efforts.


### JSON Data Handling
- **Loading Problems**: The loadAndPresentProblems function fetches problems from JSON files, dynamically updating the UI with new problems.
- **Problem Structure**: Each problem includes instructions, a hint, the problem statement, arguments, and the expected solution, structured in a JSON object.


## Getting Started

### Prerequisites
- A modern web browser.
- Basic knowledge of HTML, CSS, and JavaScript.

### Installation

npm install @codemirror/lint

This project is a web-based application and does not require installation. Simply open the `index.html` file in your web browser.
--- **<span style="color:red;">Not really ready for that</span>**.
--- **<span style="color:red;">xxxxxxxxxxxxxx</span>**.

## Usage

1. **Load a Problem Set**: Click the "Change Problem Set" button to load a new set of problems.
2. **Solve Problems**: Use the integrated CodeMirror editor to write your solution and click the "Run Script" button to execute it.
3. **Check Your Solution**: Click the "Check" button to compare your solution with the expected solution.
4. **View Hints and Solutions**: If you're stuck, click the "Show hint" button to get a hint. If you want to see the solution, click the "Show Solution" button.

## Contributing

Contributions are welcome If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or need further assistance, please open an issue or contact the maintainers.
