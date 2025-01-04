import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/ui/shared/layout";

const LeaderboardCard = () => {
  // const [openDialogId, setOpenDialogId] = useState(null);

  const topSubmissions = [
    {
      id: 1,
      rank: "01",
      score: 98,
      remarks: [
        {
          id: 1,
          text: "Exceptional implementation with comprehensive test coverage. The real-time visualization components are particularly impressive.",
          date: "2024-12-27",
        },
        {
          id: 2,
          text: "Outstanding work on the architecture. The code organization and patterns used show excellent understanding of scalable systems.",
          date: "2024-12-26",
        },
        {
          id: 3,
          text: "Impressive attention to performance optimization. The lazy loading implementation is particularly noteworthy.",
          date: "2024-12-26",
        },
      ],
    },
    {
      id: 2,
      rank: "02",
      score: 95,
      remarks: [
        {
          id: 1,
          text: "Innovative approach to state management. Great attention to performance optimization.",
          date: "2024-12-25",
        },
        {
          id: 2,
          text: "Excellent documentation and code comments. Makes the codebase very maintainable.",
          date: "2024-12-24",
        },
      ],
    },
    {
      id: 3,
      rank: "03",
      score: 92,
      remarks: [
        {
          id: 1,
          text: "Clean, maintainable code with excellent documentation. The error handling is robust.",
          date: "2024-12-23",
        },
        {
          id: 2,
          text: "Great implementation of responsive design patterns. Mobile experience is seamless.",
          date: "2024-12-22",
        },
      ],
    },
  ];

  const RemarksDialog = ({ submission }) => (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          <span>Rank {submission.rank}</span>
          <Badge variant="secondary">{submission.score}/100</Badge>
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4 pr-4">
          {submission.remarks.map((remark) => (
            <div
              key={remark.id}
              className="p-4 bg-secondary/20 rounded-lg space-y-2"
            >
              <p className="text-sm text-foreground/80">{remark.text}</p>
              <time className="text-xs text-muted-foreground">
                {remark.date}
              </time>
            </div>
          ))}
        </div>
      </ScrollArea>
    </DialogContent>
  );

  // Desktop Table View
  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Rank</TableHead>
          <TableHead className="w-24">Score</TableHead>
          <TableHead>Remarks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topSubmissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell className="font-medium">#{submission.rank}</TableCell>
            <TableCell>{submission.score}/100</TableCell>
            <TableCell>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {submission.remarks[0].text}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      View All ({submission.remarks.length})
                    </Button>
                  </DialogTrigger>
                  <RemarksDialog submission={submission} />
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  // Mobile Card View
  const CardView = () => (
    <div className="divide-y divide-border">
      {topSubmissions.map((submission) => (
        <Dialog key={submission.id}>
          <DialogTrigger asChild>
            <div className="p-4 hover:bg-secondary/20 active:bg-secondary/40 cursor-pointer space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">
                    #{submission.rank}
                  </span>
                  <Badge variant="secondary">{submission.score}/100</Badge>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {submission.remarks[0].text}
              </p>
            </div>
          </DialogTrigger>
          <RemarksDialog submission={submission} />
        </Dialog>
      ))}
    </div>
  );

  return (
    <Layout>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Top Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Hide CardView on desktop, show TableView */}
          <div className="hidden sm:block">
            <TableView />
          </div>
          {/* Hide TableView on mobile, show CardView */}
          <div className="sm:hidden">
            <CardView />
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default LeaderboardCard;
