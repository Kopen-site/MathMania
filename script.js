let points = 0; // Placeholder for token/point system
let currentQuizType = ''; // Store the type of quiz selected

function selectQuiz(type) {
    currentQuizType = type; // Save the quiz type
    document.querySelector('.options').classList.add('hidden');
    document.getElementById('pin-entry').classList.remove('hidden');
}

function validatePin() {
    const pin = document.getElementById('pin').value;
    if (pin === "0506") {
        document.getElementById('pin-entry').classList.add('hidden');
        document.getElementById('quiz-section').classList.remove('hidden');
        loadRandomQuiz();
    } else {
        alert("Niepoprawny PIN!");
    }
}

function loadRandomQuiz() {
    const question = generateRandomQuestion(currentQuizType);
    document.getElementById('quiz-question').innerText = question;
    document.getElementById('answer').value = ''; // Clear previous answer
}

function generateRandomQuestion(type) {
    let num1, num2, question;
    
    if (type === 'minussing') {
        num1 = Math.floor(Math.random() * 75) + 1; // Range 1-75
        num2 = Math.floor(Math.random() * 75) + 1;
        question = `${num1} - ${num2}`;
    } else if (type === 'adding') {
        num1 = Math.floor(Math.random() * 100) + 1; // Range 1-100
        num2 = Math.floor(Math.random() * 100) + 1;
        question = `${num1} + ${num2}`;
    } else if (type === 'multiplying') {
        num1 = Math.floor(Math.random() * 10) + 1; // Range 1-10
        num2 = Math.floor(Math.random() * 10) + 1;
        question = `${num1} * ${num2}`;
    }

    return question;
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = eval(document.getElementById('quiz-question').innerText); // Evaluate the correct answer

    if (userAnswer === correctAnswer) {
        points += 1; // Increment points for correct answer
    }
    document.getElementById('points-display').innerText = points; // Update points display
    loadRandomQuiz(); // Load the next question
}
