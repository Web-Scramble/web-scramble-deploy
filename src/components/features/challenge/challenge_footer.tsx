import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Link } from 'react-router';

export const ChallengeFooter = () => {
  return (
    <CardFooter className="p-4">
      <Link to="/create">
        <Button
          className="fixed bottom-20 md:bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </CardFooter>
  );
};