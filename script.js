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
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    let isEvaluated = false;

    // Load a question and reset variables and button text
    function loadQuestion() {
        selectedAnswer = null;
        isEvaluated = false;
        document.getElementById('next-btn').textContent = "Next";
        const currentQuestion = quizData[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        const choicesList = document.getElementById('choices');
        choicesList.innerHTML = '';

        currentQuestion.choices.forEach(function(choice, index) {
            const li = document.createElement('li');
            li.textContent = choice;
            li.dataset.index = index;
            choicesList.appendChild(li);
        });
    }

    loadQuestion();

    // Handle option selection: apply selected style and fade out others
    document.getElementById('choices').addEventListener('click', function(e) {
        if (e.target && e.target.nodeName === 'LI' && !isEvaluated) {
            selectedAnswer = parseInt(e.target.dataset.index);
            const liElements = this.querySelectorAll('li');
            liElements.forEach(li => {
                li.classList.remove('selected');
                li.classList.add('unselected');
            });
            e.target.classList.add('selected');
            e.target.classList.remove('unselected');
        }
    });

    // On button click: if not evaluated, show correct/incorrect, else load next question
    document.getElementById('next-btn').addEventListener('click', function() {
        if (!isEvaluated) {
            if (selectedAnswer === null) return; // Do nothing if no selection

            const currentQuestion = quizData[currentQuestionIndex];
            const choicesList = document.getElementById('choices');
            const liElements = choicesList.querySelectorAll('li');

            // Remove selection styling
            liElements.forEach(li => {
                li.classList.remove('selected', 'unselected');
            });

            // Evaluate answer and apply appropriate classes
            if (selectedAnswer === currentQuestion.correct) {
                const selectedLi = choicesList.querySelector(`li[data-index="${selectedAnswer}"]`);
                selectedLi.classList.add('correct');
                score++;
            } else {
                const selectedLi = choicesList.querySelector(`li[data-index="${selectedAnswer}"]`);
                selectedLi.classList.add('incorrect');
                const correctLi = choicesList.querySelector(`li[data-index="${currentQuestion.correct}"]`);
                correctLi.classList.add('correct');
            }
            isEvaluated = true;
            this.textContent = "Continue";
        } else {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                document.getElementById('quiz-container').innerHTML = `
                    <h2>Quiz Completed!</h2>
                    <p>Your score: ${score} / ${quizData.length}</p>
                `;
            }
        }
    });
});
