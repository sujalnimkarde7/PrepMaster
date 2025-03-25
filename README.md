# PrepMaster

A comprehensive platform for placement preparation, helping students practice coding problems and prepare for technical interviews.

## Features

- Coding problem practice with test cases
- Interview question bank
- User progress tracking
- Company-specific interview questions
- Difficulty-based problem categorization
- Solution submission and verification
- User authentication and authorization

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd prepmaster
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prepmaster
JWT_SECRET=your-secret-key
```

4. Start MongoDB:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo service mongod start
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `POST /api/problems` - Create new problem (admin only)
- `PUT /api/problems/:id` - Update problem (admin only)
- `DELETE /api/problems/:id` - Delete problem (admin only)
- `POST /api/problems/:id/submit` - Submit solution
- `GET /api/problems/:id/submissions` - Get user's submissions
- `GET /api/problems/:id/stats` - Get problem statistics

### Interview Questions
- `GET /api/interview-questions` - Get all questions
- `GET /api/interview-questions/:id` - Get question by ID
- `POST /api/interview-questions` - Create new question (admin only)
- `PUT /api/interview-questions/:id` - Update question (admin only)
- `DELETE /api/interview-questions/:id` - Delete question (admin only)
- `POST /api/interview-questions/:id/submit` - Submit answer
- `GET /api/interview-questions/:id/responses` - Get user's responses
- `GET /api/interview-questions/:id/stats` - Get question statistics

## Project Structure

```
prepmaster/
├── Project/
│   ├── BackEnd/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Problem.js
│   │   │   └── InterviewQuestion.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── problems.js
│   │   │   └── interviewQuestions.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   └── FrontEnd/
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 