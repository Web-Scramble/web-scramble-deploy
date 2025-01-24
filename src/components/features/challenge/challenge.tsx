import { ChallengeContent } from './challenge_content';
import { ChallengeHeader } from './challenge_header';
import { Challenge } from '@/types/challenge';
import { ChallengeFooter } from './challenge_footer';
import { Card } from '@/components/ui/card';

interface ChallengeCardProps {
  userId:string;
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  onDelete?: (challengeId: string) => void;
  onEdit?: (challengeId: string) => void;
}

const ChallengeCard = ({
  userId,
  challenge,
  onJoin,
  onDelete,
  onEdit,
}:ChallengeCardProps) => {
  return (
    <Card className="w-full max-w-xl mx-auto bg-white shadow-lg">
      <ChallengeHeader 
        name={challenge.creator_username}
        avatar={challenge.creator_profile_pic}
        id={challenge.creator_id}
        userId={userId}
        challengeId={challenge.id}
        onEdit={() => onEdit?.(challenge.id)}
        onDelete={() => onDelete?.(challenge.id)}
        status={challenge.status}
      />
      <ChallengeContent 
        challenge={challenge}
        onJoin={() => onJoin?.(challenge.id)}
      />
      <ChallengeFooter />
    </Card>
  );
};
export default  ChallengeCard