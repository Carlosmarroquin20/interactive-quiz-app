// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Sample quiz data
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

    // Function to load a question
    function loadQuestion() {
        // Get current question object
        const currentQuestion = quizData[currentQuestionIndex];
        
        // Update the question text
        document.getElementById('question').textContent = currentQuestion.question;
        
        // Get the choices list element
        const choicesList = document.getElementById('choices');
        choicesList.innerHTML = ''; // Clear previous choices
        
        // Loop through choices and create list items
        currentQuestion.choices.forEach(function(choice, index) {
            const li = document.createElement('li');
            li.textContent = choice;
            // Add click event to handle answer selection
            li.addEventListener('click', function() {
                // You can add logic here to mark the answer
                console.log("Selected choice index:", index);
            });
            choicesList.appendChild(li);
        });
    }

    // Load the first question
    loadQuestion();

    // Next button event listener
    document.getElementById('next-btn').addEventListener('click', function() {
        // Logic to go to the next question (if exists)
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            // End of quiz logic here
            document.getElementById('quiz-container').innerHTML = '<h2>Quiz Completed!</h2>';
        }
    });
});
