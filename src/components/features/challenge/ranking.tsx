import { Challenge } from "@/types/challenge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
interface RankingsTabProps {
  rankings: Challenge["rankings"];
}

const RankingsTab = ({ rankings }: RankingsTabProps) => (
  <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Top 5 Players</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={rankings} 
            margin={{ top: 10, right: 30, left: 40, bottom: 20 }}
            layout="vertical"
            barSize={20}
          >
            <XAxis 
              type="number"
              axisLine={{ stroke: '#e5e7eb' }}
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Score', 
                position: 'bottom',
                offset: 0
              }}
            />
            <YAxis 
              type="category"
              dataKey="user"
              axisLine={true}
              tick={{ fontSize: 12 }}
              width={80}
              label={{ 
                value: 'Players', 
                angle: -90,
                position: 'left',
                offset: 20
              }}
              onClick={(data) => {
                if (data && data.index !== undefined) {
                  const person = rankings[data.index];
                  document.getElementById(`remarks-trigger-${person.rank}`).click();
                }
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border rounded-lg shadow-lg p-2 text-xs">
                      <p className="font-medium">{payload[0].payload.user}</p>
                      <p className="text-gray-600">{payload[0].value} points</p>
                      <p className="text-blue-500 text-xs mt-1">Click name to view remarks</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="score" 
              fill="#93c5fd"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {rankings.map((person) => (
        <Dialog key={person.rank}>
          <DialogTrigger id={`remarks-trigger-${person.rank}`} className="hidden" />
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between mt-4">
                <span>{person.user}</span>
                <Badge variant="secondary">{person.score}</Badge>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 pr-4">
                {person.remarks.map((remark) => (
                  <div key={remark.id} className="p-4 bg-secondary/20 rounded-lg space-y-2">
                    <p className="text-sm text-foreground/80">{remark.text}</p>
                    <time className="text-xs text-muted-foreground">{remark.date}</time>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ))}
  </div>
);
export default RankingsTab;
