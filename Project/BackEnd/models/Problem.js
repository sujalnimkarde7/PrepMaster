const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    }
});

const problemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true 
    },
    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard'], 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Other']
    },
    testCases: [testCaseSchema],
    solution: {
        type: String,
        required: true
    },
    timeComplexity: {
        type: String,
        required: true
    },
    spaceComplexity: {
        type: String,
        required: true
    },
    hints: [{
        type: String
    }],
    relatedTopics: [{
        type: String
    }],
    submissions: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        code: String,
        language: String,
        status: {
            type: String,
            enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error'],
            required: true
        },
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
problemSchema.index({ title: 'text', description: 'text' });
problemSchema.index({ category: 1, difficulty: 1 });

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem; 