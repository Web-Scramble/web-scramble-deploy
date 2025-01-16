import ChallengeCard from "@/components/features/challenge/challenge";
import { mockChallenges } from "@/constants/mockChallenges";
import Layout from "@/components/ui/shared/layout";
import { useChallenges } from "@/hooks/useChallenges";
import { LoadingSpinner } from "@/components/ui/shared/loader";
import { useNavigate } from "react-router";
import { useDeleteChallenges } from "@/hooks/useDeleteChallenge";
import { authStore } from "@/store/authstore";


import { useEffect } from "react";

const ChallengeFeed = () => {
  const { user } = authStore();
  const navigate = useNavigate()
    const {
      mutate: deleteMutation,
      isLoading:isdeleteLoading,
      isError,
      isSuccess,
      data
    } = useDeleteChallenges();
  
  const handleJoin = (challengeId: string) => {
    console.log("attemp to join", challengeId)
  };

  const handleDelete = (challengeId: string) => {
    console.log(`Deleting challenge: ${challengeId}`);
    deleteMutation(challengeId)
    refetch()
  };

  const handleEdit = (challengeId: string) => {
    console.log(`Editing challenge: ${challengeId}`);
  };
  const { challenges, isLoading,isFetching, error, refetch } = useChallenges();
useEffect(()=>{
  console.log(challenges)
},[])

  if(isLoading||isdeleteLoading){
    return <LoadingSpinner/>
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* <h1 className="text-2xl font-bold mb-6">Active Challenges</h1> */}
        {isLoading && <h1>Loading...</h1>}
        <div className="flex flex-col gap-6">
          {challenges &&challenges.tasks.map((challenge) => (
            <ChallengeCard
              userId={user.id}
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
