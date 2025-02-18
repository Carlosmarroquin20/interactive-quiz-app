const correctSound = new Audio('sounds/correct.mp3');
const incorrectSound = new Audio('sounds/incorrect.mp3');

document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
        {
            question: "What is the capital of France?",
            choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
            correct: 2
        },
        {
            question: "Which language is used for web development?",
            choices: ["Python", "HTML", "C++", "Java"],
            correct: 1
        },
        {
            question: "What is 2 + 2?",
            choices: ["3", "4", "5", "6"],
            correct: 1
        }
    ];
    

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    let timer;
    let timeLeft = 10;
    let userAnswers = [];

    function startTimer() {
        timeLeft = 10;
        document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;

            if (timeLeft === 0) {
                clearInterval(timer);
                selectedAnswer = null; // No respondió, se considera incorrecto
                nextQuestion();
            }
        }, 1000);
    }

    function loadQuestion() {
        selectedAnswer = null;
        clearInterval(timer);
        startTimer();
        document.getElementById('next-btn').textContent = "Next";
    
        const currentQuestion = quizData[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        const choicesList = document.getElementById('choices');
        choicesList.innerHTML = '';
    
        currentQuestion.choices.forEach((choice, index) => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.dataset.index = index;
            li.classList.add('choice-item');
    
            li.addEventListener('click', function() {
                selectedAnswer = index;
                highlightSelection();
            });
    
            choicesList.appendChild(li);
        });
    }
    
    function highlightSelection() {
        document.querySelectorAll('.choice-item').forEach((li, index) => {
            if (index === selectedAnswer) {
                li.classList.add('selected');
                li.classList.remove('unselected');
            } else {
                li.classList.remove('selected');
                li.classList.add('unselected');
            }
        });
    }

    document.getElementById('next-btn').addEventListener('click', function() {
        if (selectedAnswer === null) return;
        clearInterval(timer); // Detener temporizador al avanzar

        const currentQuestion = quizData[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correct) {
            score++;
        }

        nextQuestion();
    });

    function nextQuestion() {
        clearInterval(timer);
    
        const currentQuestion = quizData[currentQuestionIndex];
    
        if (selectedAnswer !== null) {
            if (selectedAnswer === currentQuestion.correct) {
                correctSound.play(); //  Sonido correcto
                score++;
            } else {
                incorrectSound.play(); // Sonido incorrecto
            }
        }
    
        userAnswers.push({
            question: currentQuestion.question,
            choices: currentQuestion.choices,
            correctAnswer: currentQuestion.correct,
            userAnswer: selectedAnswer
        });
    
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            setTimeout(loadQuestion, 500); // Pequeño retraso para que el sonido se escuche bien
        } else {
            setTimeout(showResults, 500);
        }
    }
    
    

    function showResults() {
        let resultHTML = `
            <h2>Quiz Completed!</h2>
            <p>Your score: ${score} / ${quizData.length}</p>
            <h3>Review Your Answers:</h3>
            <ul class="results-list">
        `;
    
        userAnswers.forEach((entry, index) => {
            let isCorrect = entry.userAnswer === entry.correctAnswer;
            resultHTML += `
                <li class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                    <strong>Q${index + 1}:</strong> ${entry.question} <br>
                    <span>Your answer: ${entry.choices[entry.userAnswer] || "No answer"}</span> <br>
                    <span>Correct answer: ${entry.choices[entry.correctAnswer]}</span>
                </li>
            `;
        });
    
        resultHTML += `</ul><button id="play-again-btn">Play Again</button>`;
    
        document.getElementById('quiz-container').innerHTML = resultHTML;
    
        document.getElementById('play-again-btn').addEventListener('click', function() {
            resetQuiz();
        });
    }
    

    function resetQuiz() {
        correctSound.pause();
        incorrectSound.pause();
        correctSound.currentTime = 0;
        incorrectSound.currentTime = 0;
    
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
    
        document.getElementById('quiz-container').innerHTML = `
            <h1>Quiz App</h1>
            <p id="timer">Time left: ${timeLeft}s</p>
            <div id="question"></div>
            <ul id="choices"></ul>
            <button id="next-btn">Next</button>
        `;
    
        document.getElementById('next-btn').addEventListener('click', function() {
            if (selectedAnswer === null) return;
            clearInterval(timer);
    
            const currentQuestion = quizData[currentQuestionIndex];
    
            if (selectedAnswer === currentQuestion.correct) {
                correctSound.play();
                score++;
            } else {
                incorrectSound.play();
            }
    
            nextQuestion();
        });
    
        loadQuestion();
    }
    
    document.getElementById('quiz-container').innerHTML = `
        <h1>Quiz App</h1>
        <p id="timer">Time left: ${timeLeft}s</p>
        <div id="question"></div>
        <ul id="choices"></ul>
        <button id="next-btn">Next</button>
    `;

    document.getElementById('next-btn').addEventListener('click', function() {
        if (selectedAnswer === null) return;
        clearInterval(timer);

        const currentQuestion = quizData[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correct) {
            score++;
        }

        nextQuestion();
    });

    loadQuestion();
});
