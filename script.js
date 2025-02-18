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
    let answered = false;

    function loadQuestion() {
        answered = false;
        const currentQuestion = quizData[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        const choicesList = document.getElementById('choices');
        choicesList.innerHTML = '';

        currentQuestion.choices.forEach(function(choice, index) {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', function() {
                if (answered) return;
                answered = true;
                if (index === currentQuestion.correct) {
                    li.classList.add('correct');
                    score++;
                } else {
                    li.classList.add('incorrect');
                    // Highlight the correct answer
                    choicesList.children[currentQuestion.correct].classList.add('correct');
                }
            });
            choicesList.appendChild(li);
        });
    }

    loadQuestion();

    document.getElementById('next-btn').addEventListener('click', function() {
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
});
