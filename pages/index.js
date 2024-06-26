// pages/index.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";

// Dynamically import ResponsiveLine component from @nivo/line
const ResponsiveLine = dynamic(() => import('@nivo/line').then(mod => mod.ResponsiveLine), { ssr: false });

export default function Home() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error(err));
  }, []);

  const data = [
    {
      id: "Desktop",
      data: [
        { x: "Jan", y: 43 },
        { x: "Feb", y: 137 },
        { x: "Mar", y: 61 },
        { x: "Apr", y: 145 },
        { x: "May", y: 26 },
        { x: "Jun", y: 154 },
      ],
    },
    {
      id: "Mobile",
      data: [
        { x: "Jan", y: 60 },
        { x: "Feb", y: 48 },
        { x: "Mar", y: 177 },
        { x: "Apr", y: 78 },
        { x: "May", y: 96 },
        { x: "Jun", y: 204 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <div className="flex">
        <aside className="w-64 bg-[#161b22] p-4">
          <div className="flex items-center justify-center mb-8">
            <img src="/placeholder.svg" alt="NWS Logo" />
          </div>
          <nav className="space-y-4">
            <div>
              <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                <ViewIcon className="h-5 w-5" />
                <span>Overview</span>
              </a>
            </div>
            <div>
              <h2 className="text-[#8b949e]">Platform</h2>
              <div className="space-y-2 pl-4">
                <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                  <ActivityIcon className="h-5 w-5" />
                  <span>Assistants</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                  <PhoneIcon className="h-5 w-5" />
                  <span>Phone Numbers</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                  <FilesIcon className="h-5 w-5" />
                  <span>Files</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                  <PenToolIcon className="h-5 w-5" />
                  <span>Tools</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                  <SquircleIcon className="h-5 w-5" />
                  <span>Squads</span>
                </a>
                <a href="/contacts" className="flex items-center space-x-2 text-[#c9d1d9]">
                  <ContactIcon className="h-5 w-5" />
                  <span>Contacts</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                  <CodeIcon className="h-5 w-5" />
                  <span>Deals</span>
                </a>
              </div>
            </div>
            <div>
              <a href="#" className="flex items-center space-x-2 text-[#c9d1d9]">
                <LibraryIcon className="h-5 w-5" />
                <span>Voice Library</span>
              </a>
            </div>
            <div>
              <a href="/callLog" className="flex items-center space-x-2 text-[#c9d1d9]">
                <PhoneCallIcon className="h-5 w-5" />
                <span>Call Logs</span>
              </a>
            </div>
          </nav>
          <div className="mt-auto space-y-4">
            <a href="#" className="flex items-center space-x-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
              <UsersIcon className="h-5 w-5 text-[#9d4edd]" />
              <span className="text-[#9d4edd]">Profile</span>
            </a>
            <Button className="w-full">
              Click Set Go
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-[#c9d1d9]">Overview</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center space-x-2">
                <HandHelpingIcon className="h-5 w-5" />
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
                <ResponsiveLine
                  data={data}
                  margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16,
                  }}
                  colors={['#2563eb', '#e11d48']}
                  pointSize={6}
                  useMesh={true}
                  gridYValues={6}
                  theme={{
                    tooltip: {
                      chip: {
                        borderRadius: '9999px',
                      },
                      container: {
                        fontSize: '12px',
                        textTransform: 'capitalize',
                        borderRadius: '6px',
                      },
                    },
                    grid: {
                      line: {
                        stroke: '#f3f4f6',
                      },
                    },
                  }}
                  role="application"
                />
              </CardContent>
            </Card>
            <Card className="bg-[#161b22]">
              <CardHeader>
                <CardTitle className="text-[#c9d1d9]">Call Count</CardTitle>
                <CardDescription className="text-[#8b949e]">How many calls you've made each day.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveLine
                  data={data}
                  margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16,
                  }}
                  colors={['#2563eb', '#e11d48']}
                  pointSize={6}
                  useMesh={true}
                  gridYValues={6}
                  theme={{
                    tooltip: {
                      chip: {
                        borderRadius: '9999px',
                      },
                      container: {
                        fontSize: '12px',
                        textTransform: 'capitalize',
                        borderRadius: '6px',
                      },
                    },
                    grid: {
                      line: {
                        stroke: '#f3f4f6',
                      },
                    },
                  }}
                  role="application"
                />
              </CardContent>
            </Card>
            <Card className="bg-[#161b22]">
              <CardHeader>
                <CardTitle className="text-[#c9d1d9]">Average Call Duration</CardTitle>
                <CardDescription className="text-[#8b949e]">How long your calls are on average.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveLine
                  data={data}
                  margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16,
                  }}
                  colors={['#2563eb', '#e11d48']}
                  pointSize={6}
                  useMesh={true}
                  gridYValues={6}
                  theme={{
                    tooltip: {
                      chip: {
                        borderRadius: '9999px',
                      },
                      container: {
                        fontSize: '12px',
                        textTransform: 'capitalize',
                        borderRadius: '6px',
                      },
                    },
                    grid: {
                      line: {
                        stroke: '#f3f4f6',
                      },
                    },
                  }}
                  role="application"
                />
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
                <ResponsiveLine
                  data={data}
                  margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                  }}
                  axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16,
                  }}
                  colors={['#2563eb', '#e11d48']}
                  pointSize={6}
                  useMesh={true}
                  gridYValues={6}
                  theme={{
                    tooltip: {
                      chip: {
                        borderRadius: '9999px',
                      },
                      container: {
                        fontSize: '12px',
                        textTransform: 'capitalize',
                        borderRadius: '6px',
                      },
                    },
                    grid: {
                      line: {
                        stroke: '#f3f4f6',
                      },
                    },
                  }}
                  role="application"
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ContactIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  );
}

function FilesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
      <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
      <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
    </svg>
  );
}

function HandHelpingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
      <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 13 6 6" />
    </svg>
  );
}

function LibraryIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
}

function PenToolIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
      <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
      <path d="m2.3 2.3 7.286 7.286" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function PhoneCallIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
      <path d="M14.05 6A5 5 0 0 1 18 10" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function SquircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ViewIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
