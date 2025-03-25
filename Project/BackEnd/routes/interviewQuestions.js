const express = require('express');
const router = express.Router();
const InterviewQuestion = require('../models/InterviewQuestion');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all interview questions with filtering
router.get('/', async (req, res) => {
    try {
        const { category, difficulty, company, search, page = 1, limit = 10 } = req.query;
        let query = {};

        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (company) query.company = company;
        if (search) query.$text = { $search: search };

        const questions = await InterviewQuestion.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await InterviewQuestion.countDocuments(query);

        res.json({
            questions,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get interview question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await InterviewQuestion.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new interview question (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const question = new InterviewQuestion(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update interview question (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const question = await InterviewQuestion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete interview question (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const question = await InterviewQuestion.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit answer for interview question
router.post('/:id/submit', verifyToken, async (req, res) => {
    try {
        const { answer } = req.body;
        const question = await InterviewQuestion.findById(req.params.id);
        
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.userResponses.push({
            userId: req.user.userId,
            answer,
            submittedAt: new Date()
        });

        await question.save();
        res.json({ message: 'Answer submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's responses for a question
router.get('/:id/responses', verifyToken, async (req, res) => {
    try {
        const question = await InterviewQuestion.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const userResponses = question.userResponses.filter(
            response => response.userId.toString() === req.user.userId
        );

        res.json(userResponses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get question statistics
router.get('/:id/stats', async (req, res) => {
    try {
        const question = await InterviewQuestion.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const stats = {
            totalResponses: question.userResponses.length,
            difficulty: question.difficulty,
            category: question.category,
            company: question.company
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get questions by company
router.get('/company/:company', async (req, res) => {
    try {
        const questions = await InterviewQuestion.find({ 
            company: req.params.company 
        });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get questions by category
router.get('/category/:category', async (req, res) => {
    try {
        const questions = await InterviewQuestion.find({ 
            category: req.params.category 
        });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 