const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true 
    },
    answer: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Technical', 'HR', 'System Design', 'Data Structures', 'Algorithms', 'Problem Solving']
    },
    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard'], 
        required: true 
    },
    company: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    followUpQuestions: [{
        question: String,
        answer: String
    }],
    tips: [{
        type: String
    }],
    commonMistakes: [{
        type: String
    }],
    userResponses: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        answer: String,
        feedback: String,
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for better search performance
interviewQuestionSchema.index({ question: 'text', answer: 'text' });
interviewQuestionSchema.index({ category: 1, difficulty: 1, company: 1 });

const InterviewQuestion = mongoose.model('InterviewQuestion', interviewQuestionSchema);

module.exports = InterviewQuestion; 