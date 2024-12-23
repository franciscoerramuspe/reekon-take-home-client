'use client';

import { useEffect, useState } from 'react';
import { ErrorAnalyticsView } from '@/components/errors/ErrorAnalytics';
import { errorService } from '@/services/errorService';
import { ErrorAnalytics } from '@/types/robotErrors';
import { useCustomToast } from '@/hooks/useCustomToast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ErrorAnalyticsPage() {
  const [analytics, setAnalytics] = useState<ErrorAnalytics | null>(null);
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(true);
  const toast = useCustomToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await errorService.getErrorAnalytics(timeframe);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast.error('Failed to load error analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [timeframe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No error data available</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Error Analytics</h1>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-700">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ErrorAnalyticsView data={analytics} />
    </div>
  );
} 