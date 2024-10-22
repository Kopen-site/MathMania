let points = 0; // Initialize points
let currentOperation = ''; // Track the current operation

// Load points from the file on page load
window.onload = function() {
    fetch('points.txt')
        .then(response => response.text())
        .then(data => {
            points = parseInt(data) || 0; // Set points from the file
            document.getElementById('points').innerText = points; // Display points
        });
};

function selectQuiz(type) {
    currentOperation = type; // Store the selected operation
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
    const question = generateRandomQuestion(currentOperation);
    document.getElementById('quiz-question').innerText = question;
}

function generateRandomQuestion(operation) {
    let num1, num2;
    switch (operation) {
        case 'minussing':
            num1 = Math.floor(Math.random() * 75) + 1; // 1 to 75
            num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1
            return `${num1} - ${num2}`;
        case 'adding':
            num1 = Math.floor(Math.random() * 100) + 1; // 1 to 100
            num2 = Math.floor(Math.random() * 100) + 1; // 1 to 100
            return `${num1} + ${num2}`;
        case 'multiplying':
            num1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
            num2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
            return `${num1} * ${num2}`;
        default:
            return '';
    }
}

function checkAnswer() {
    const question = document.getElementById('quiz-question').innerText;
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = evaluateAnswer(question);

    if (userAnswer === correctAnswer) {
        points += 1; // Increment points for correct answer
        savePoints(); // Save points to the file
    }
    
    document.getElementById('points').innerText = points; // Update points display
    document.getElementById('answer').value = ''; // Clear answer input
    loadRandomQuiz(); // Load next question
}

function evaluateAnswer(question) {
    return eval(question); // Evaluate the expression (e.g., "5 + 3" => 8)
}

function savePoints() {
    fetch('savePoints.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: points })
    });
}

function redeemReward(cost) {
    if (points >= cost) {
        points -= cost; // Deduct points for redemption
        savePoints(); // Save updated points
        document.getElementById('points').innerText = points; // Update points display
        alert("Nagroda odebrana!");
    } else {
        alert("Nie masz wystarczających punktów!");
    }
}
