import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    currentQuestionIndex = 0;
    score = 0;
    quizFinished = false;
    feedbackMessage = '';

    questions = [
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["Paris", "Madrid", "Berlin", "Rome"],
            correctAnswer: "Paris"
        },
        {
            id: 2,
            question: "Which planet is closest to the Sun?",
            options: ["Earth", "Venus", "Mercury", "Mars"],
            correctAnswer: "Mercury"
        },
        {
            id: 3,
            question: 'Who wrote "Hamlet"?',
            options: ['Tolstoy', 'Shakespeare', 'Hemingway', 'Austen'],
            correctAnswer: 'Shakespeare'
        },
        {
            id: 4,
            question: 'What is the boiling point of water at sea level?',
            options: ['90°C', '100°C', '110°C', '120°C'],
            correctAnswer: '100°C'
        },
        {
            id: 5,
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
            correctAnswer: 'Mars'
        },
        {
            id: 6,
            question: 'What does HTML stand for?',
            options: [
                'HyperText Markup Language',
                'HighText Machine Language',
                'Hyperloop Machine Language',
                'Hyperlink and Text Markup Language'
            ],
            correctAnswer: 'HyperText Markup Language'
        },
        {
            id: 7,
            question: 'Which company developed the Windows OS?',
            options: ['Apple', 'IBM', 'Microsoft', 'Intel'],
            correctAnswer: 'Microsoft'
        },
        {
            id: 8,
            question: 'What is 9 + 10?',
            options: ['19', '21', '18', '20'],
            correctAnswer: '19'
        },
        {
            id: 9,
            question: 'Which gas do plants absorb from the atmosphere?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
            correctAnswer: 'Carbon Dioxide'
        },
        {
            id: 10,
            question: 'Who painted the Mona Lisa?',
            options: ['Vincent Van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
            correctAnswer: 'Leonardo da Vinci'
        }
    ];

    get currentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    handleAnswerSelected(event) {
        const selected = event.detail;
        const correct = this.currentQuestion.correctAnswer;

        if (selected === correct) {
            this.score += 1;
            this.feedbackMessage = '✅ Correct answer!';
        } else {
            this.feedbackMessage = '❌ Wrong answer.';
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        } else {
            this.quizFinished = true;
            this.feedbackMessage = `🎉 Quiz finished! Final Score: ${this.score}/10`;
            
    }
}

    handleRestart() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizFinished = false;
        this.feedbackMessage = '';
    }
}