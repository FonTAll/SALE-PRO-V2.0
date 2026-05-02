import React from 'react';
import { KpiCard } from '../../../components/shared/KpiCard';
import { DollarSign, Target, TrendingUp, Award } from 'lucide-react';

const MOCK_STATS = [
  { label: 'TOTAL REVENUE...', value: '$1.24M', sub: '+15.2% vs Last Quarter', icon: DollarSign, color: '#849e51' },
  { label: 'CONVERSION RAT...', value: '24.8%', sub: 'Avg. Lead to Deal', icon: Target, color: '#5686bb' },
  { label: 'ACTIVE PIPELIN...', value: '$850K', sub: 'Across 45 Opportunities', icon: TrendingUp, color: '#4e888a' },
  { label: 'CAMPAIGN ROI', value: '312%', sub: 'Avg. Return on Ad Spend', icon: Award, color: '#f2b33d' },
];

export function SalesKpis() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {MOCK_STATS.map((stat, idx) => (
        <KpiCard 
          key={idx} 
          label={stat.label} 
          value={stat.value} 
          subLabel={stat.sub} 
          icon={stat.icon} 
          color={stat.color} 
          bg="bg-slate-100"
        />
      ))}
    </div>
  );
}
