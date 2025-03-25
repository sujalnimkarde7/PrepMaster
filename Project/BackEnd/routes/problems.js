const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all problems with filtering
router.get('/', async (req, res) => {
    try {
        const { category, difficulty, search, page = 1, limit = 10 } = req.query;
        let query = {};

        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (search) query.$text = { $search: search };

        const problems = await Problem.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Problem.countDocuments(query);

        res.json({
            problems,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get problem by ID
router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new problem (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const problem = new Problem(req.body);
        await problem.save();
        res.status(201).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update problem (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete problem (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json({ message: 'Problem deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit solution
router.post('/:id/submit', verifyToken, async (req, res) => {
    try {
        const { code, language } = req.body;
        const problem = await Problem.findById(req.params.id);
        
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Add submission to problem
        problem.submissions.push({
            userId: req.user.userId,
            code,
            language,
            status: 'Accepted' // This should be determined by actual code execution
        });

        await problem.save();

        // Update user's progress
        await User.findByIdAndUpdate(req.user.userId, {
            $addToSet: {
                'progress.solvedProblems': {
                    problemId: problem._id,
                    solvedAt: new Date()
                }
            }
        });

        res.json({ message: 'Solution submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's submissions for a problem
router.get('/:id/submissions', verifyToken, async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const userSubmissions = problem.submissions.filter(
            submission => submission.userId.toString() === req.user.userId
        );

        res.json(userSubmissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get problem statistics
router.get('/:id/stats', async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const stats = {
            totalSubmissions: problem.submissions.length,
            acceptedSubmissions: problem.submissions.filter(s => s.status === 'Accepted').length,
            difficulty: problem.difficulty,
            category: problem.category
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 