import React, { useState } from 'react';
import { Upload, MessageSquare, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface ReviewSection {
  title: string;
  feedback: string;
  score: number;
}

const ResumeReview: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState<ReviewSection[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample review data
      setReview([
        {
          title: 'Formatting & Structure',
          feedback: 'Your resume has a clean and professional layout. Consider adding more white space between sections.',
          score: 4
        },
        {
          title: 'Content & Achievements',
          feedback: 'Good use of action verbs and quantifiable achievements. Add more specific metrics where possible.',
          score: 3
        },
        {
          title: 'Skills & Keywords',
          feedback: 'Well-organized skills section. Consider adding more industry-specific keywords.',
          score: 4
        },
        {
          title: 'Overall Impact',
          feedback: 'Strong resume overall. Focus on tailoring it more specifically to target job descriptions.',
          score: 4
        }
      ]);
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Review
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload your resume for a detailed review and personalized feedback
          </p>
        </div>

        {!review ? (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Upload your resume
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PDF, DOC, or DOCX files only
                  </p>
                </div>
                <label className="mt-4 cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                  Choose File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload resume file"
                  />
                </label>
                {file && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!file || isUploading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Analyzing...' : 'Get Review'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Review Results
              </h2>
              <div className="space-y-6">
                {review.map((section, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                          Score:
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {section.score}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {section.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setReview(null);
              }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
            >
              Upload Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeReview; 