import { MoreVertical, Edit2, UserPlus, Trophy, Square, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CardHeader } from '@/components/ui/card';
import { Link } from 'react-router';

interface ChallengeHeaderProps {
  creator: {
    name: string;
    avatar: string;
    initials: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ChallengeHeader = ({
  creator,
  onEdit,
  onDelete,
}: ChallengeHeaderProps) => {
  return (
    <CardHeader className="space-y-1 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{creator.name}</h3>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onEdit} className="text-gray-500">
              <Edit2 className="w-4 h-4 mr-2" /> Edit Challenge
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlus className="w-4 h-4 mr-2" /> Invite Participants
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trophy className="w-4 h-4 mr-2" /> Add Judges
            </DropdownMenuItem>
            <Link to="/review-panel">
              <DropdownMenuItem className="text-gray-500">
                <Square className="w-4 h-4 mr-2" /> Vote
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" /> Delete Challenge
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
  );
};