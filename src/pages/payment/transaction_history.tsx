import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

// Mock data - Replace with your API call
const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    type: "withdrawal",
    amount: -500.00,
    status: "completed",
    description: "ATM Withdrawal",
    reference: "WD123456",
  },
  {
    id: 2,
    date: "2024-01-14",
    type: "topup",
    amount: 1000.00,
    status: "completed",
    description: "Bank Transfer Top-up",
    reference: "TP789012",
  },
  {
    id: 3,
    date: "2024-01-13",
    type: "contribution",
    amount: 250.00,
    status: "completed",
    description: "Monthly Contribution",
    reference: "CT345678",
  },
];

const TransactionHistory = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getTransactionIcon = (type) => {
    switch (type) {
      case "withdrawal":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case "topup":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case "contribution":
        return <Wallet className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTransactionBadge = (type) => {
    switch (type) {
      case "withdrawal":
        return <Badge variant="destructive">Withdrawal</Badge>;
      case "topup":
        return <Badge variant="success" className="bg-green-500">Top-up</Badge>;
      case "contribution":
        return <Badge variant="secondary" className="bg-blue-500 text-white">Contribution</Badge>;
      default:
        return null;
    }
  };

  const filteredTransactions = mockTransactions
    .filter((transaction) => {
      if (filter === "all") return true;
      return transaction.type === filter;
    })
    .filter((transaction) =>
      Object.values(transaction).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View and filter your past transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="topup">Top-ups</SelectItem>
              <SelectItem value="contribution">Contributions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      {getTransactionBadge(transaction.type)}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <code className="text-sm text-muted-foreground">
                      {transaction.reference}
                    </code>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {transaction.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </TableCell>
                </TableRow>
              ))}
              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;