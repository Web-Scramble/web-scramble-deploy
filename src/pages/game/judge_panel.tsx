import React, { useState } from "react";
import Layout from "@/components/ui/shared/layout";
import { SubmissionCard } from "@/components/features/submission/submission_card";
import { mockSubmissions } from "@/constants/mockSubmissions";

const ChallengeSubmissions = () => {
  const [isJudge] = useState(true);

  const handleVote = () => {
    console.log("Evaluation submitted:");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Challenge Submissions
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {isJudge ? "Judge Review Panel" : "Community Review Panel"}
          </p>
        </header>

        <div className="space-y-4">
          {mockSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              isJudge={isJudge}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeSubmissions;
