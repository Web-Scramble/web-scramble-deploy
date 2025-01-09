import ChallengeCard from "@/components/features/challenge/challenge";
import { mockChallenges } from "@/constants/mockChallenges";
import Layout from "@/components/ui/shared/layout";
import { useChallenges } from "@/hooks/useChallenges";
import { LoadingSpinner } from "@/components/ui/shared/loader";

const ChallengeFeed = () => {
  const handleJoin = (challengeId: string) => {
    console.log(`Joining challenge: ${challengeId}`);
  };

  const handleDelete = (challengeId: string) => {
    console.log(`Deleting challenge: ${challengeId}`);
  };

  const handleEdit = (challengeId: string) => {
    console.log(`Editing challenge: ${challengeId}`);
  };

  const { challenges, isLoading, error, refetch } = useChallenges();

  if(!isLoading){
    return <LoadingSpinner/>
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* <h1 className="text-2xl font-bold mb-6">Active Challenges</h1> */}
        <div className="flex flex-col gap-6">
          {mockChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onJoin={() => handleJoin(challenge.id)}
              onDelete={() => handleDelete(challenge.id)}
              onEdit={() => handleEdit(challenge.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default ChallengeFeed;
