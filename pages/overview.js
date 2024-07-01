import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { QuestionMarkCircleIcon, ReplyIcon, UserIcon } from '@heroicons/react/outline';

const TotalMinutesChart = dynamic(() => import('../components/TotalMinutesChart'), { ssr: false });
const CallCountChart = dynamic(() => import('../components/CallCountChart'), { ssr: false });
const AverageCallDurationChart = dynamic(() => import('../components/AverageCallDurationChart'), { ssr: false });
const DailySpendChart = dynamic(() => import('../components/DailySpendChart'), { ssr: false });

export default function Overview() {
  return (
    <Layout>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#c9d1d9]">Overview</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="flex items-center space-x-2">
            <QuestionMarkCircleIcon className="h-5 w-5" />
            <span className="text-[#c9d1d9]">Ask AI for help</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2">
            <ReplyIcon className="h-5 w-5" />
            <span className="text-[#c9d1d9]">Feedback</span>
          </Button>
          <UserIcon className="h-8 w-8" />
        </div>
      </header>
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#161b22]">
          <CardHeader>
            <CardTitle className="text-[#c9d1d9]">Total Minutes</CardTitle>
            <CardDescription className="text-[#8b949e]">
              The total number of minutes you've used each day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TotalMinutesChart />
          </CardContent>
        </Card>
        <Card className="bg-[#161b22]">
          <CardHeader>
            <CardTitle className="text-[#c9d1d9]">Call Count</CardTitle>
            <CardDescription className="text-[#8b949e]">How many calls you've made each day.</CardDescription>
          </CardHeader>
          <CardContent>
            <CallCountChart />
          </CardContent>
        </Card>
        <Card className="bg-[#161b22]">
          <CardHeader>
            <CardTitle className="text-[#c9d1d9]">Average Call Duration</CardTitle>
            <CardDescription className="text-[#8b949e]">How long your calls are on average.</CardDescription>
          </CardHeader>
          <CardContent>
            <AverageCallDurationChart />
          </CardContent>
        </Card>
        <Card className="bg-[#161b22]">
          <CardHeader>
            <CardTitle className="text-[#c9d1d9]">Daily Spend</CardTitle>
            <CardDescription className="text-[#8b949e]">
              How much you've spent across all your calls.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DailySpendChart />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
