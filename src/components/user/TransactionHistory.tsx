import React from 'react';
import { Transaction } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div>
      <h3 className="text-base font-semibold text-brand-white mb-3">Recent Activity</h3>
      <div className="space-y-2">
        {recentTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center p-3 bg-brand-charcoal rounded-lg shadow-neumorphic-out">
            <div className="w-9 h-9 bg-brand-charcoal rounded-lg flex items-center justify-center shadow-neumorphic-in mr-3">
              {tx.amount > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              ) : (
                <ArrowDownLeft className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className="flex-grow">
              <p className="font-medium text-sm text-brand-white">{tx.description}</p>
              <p className="text-xs text-brand-silver">{tx.date}</p>
            </div>
            <p className={`font-semibold text-sm ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {transactions.length > 5 && (
        <Button variant="link" className="w-full mt-2 text-brand-silver hover:text-brand-white">
          See more
        </Button>
      )}
    </div>
  );
};

export default TransactionHistory;