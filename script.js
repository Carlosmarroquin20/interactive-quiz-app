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

    function loadQuestion() {
        selectedAnswer = null;
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

            // Permitir cambiar de selección con animación
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

        const currentQuestion = quizData[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correct) {
            score++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        document.getElementById('quiz-container').innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>Your score: ${score} / ${quizData.length}</p>
            <button id="play-again-btn">Play Again</button>
        `;

        document.getElementById('play-again-btn').addEventListener('click', function() {
            resetQuiz();
        });
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;

        document.getElementById('quiz-container').innerHTML = `
            <h1>Quiz App</h1>
            <div id="question"></div>
            <ul id="choices"></ul>
            <button id="next-btn">Next</button>
        `;

        document.getElementById('next-btn').addEventListener('click', function() {
            if (selectedAnswer === null) return;

            const currentQuestion = quizData[currentQuestionIndex];

            if (selectedAnswer === currentQuestion.correct) {
                score++;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });

        loadQuestion();
    }

    loadQuestion();
});
