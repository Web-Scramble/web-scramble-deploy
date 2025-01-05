import { ChallengeContent } from './challenge_content';
import { ChallengeHeader } from './challenge_header';
import { Challenge } from '@/types/challenge';
import { ChallengeFooter } from './challenge_footer';
import { Card } from '@/components/ui/card';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  onDelete?: (challengeId: string) => void;
  onEdit?: (challengeId: string) => void;
}

const ChallengeCard = ({
  challenge,
  onJoin,
  onDelete,
  onEdit,
}:ChallengeCardProps) => {
  return (
    <Card className="w-full max-w-xl mx-auto bg-white shadow-lg">
      <ChallengeHeader 
        creator={challenge.creator}
        onEdit={() => onEdit?.(challenge.id)}
        onDelete={() => onDelete?.(challenge.id)}
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