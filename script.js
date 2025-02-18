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
                if (selectedAnswer === null) {
                    selectedAnswer = index;
                    highlightSelection(index);
                }
            });
            choicesList.appendChild(li);
        });
    }

    function highlightSelection(selectedIndex) {
        document.querySelectorAll('.choice-item').forEach((li, index) => {
            if (index === selectedIndex) {
                li.classList.add('selected');
            } else {
                li.classList.add('unselected');
            }
        });
    }

    document.getElementById('next-btn').addEventListener('click', function() {
        if (selectedAnswer === null) return; // No avanzar sin seleccionar una respuesta

        const currentQuestion = quizData[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correct) {
            score++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            document.getElementById('quiz-container').innerHTML = `
                <h2>Quiz Completed!</h2>
                <p>Your score: ${score} / ${quizData.length}</p>
            `;
        }
    });

    loadQuestion();
});
