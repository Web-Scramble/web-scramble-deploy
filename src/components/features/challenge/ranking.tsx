import { Challenge } from "@/types/challenge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface RankingsTabProps {
  rankings: Challenge["rankings"];
}

const RankingsTab = ({ rankings }: RankingsTabProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-center">Top Players</h3>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={rankings}
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          layout="vertical"
          barSize={20}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="user" />
          <Tooltip />
          <Bar dataKey="score" fill="#93c5fd" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default RankingsTab;
