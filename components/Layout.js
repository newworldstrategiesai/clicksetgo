import React from 'react';
import Link from 'next/link';
import Button from '../components/ui/button';
import {
  UserIcon,
  QuestionMarkCircleIcon,
  ReplyIcon,
  ArrowRightIcon,
  PhoneIcon,
  ChatIcon,
  ClipboardListIcon,
  BriefcaseIcon,
  UsersIcon,
  DocumentTextIcon,
  ChatAlt2Icon,
  LibraryIcon,
  CollectionIcon,
} from '@heroicons/react/outline';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">
      <aside className="w-64 bg-[#161b22] p-4">
        <div className="flex items-center justify-center mb-8">
          <img src="/placeholder.svg" alt="NWS Logo" />
        </div>
        <nav className="space-y-4">
          <Link href="/overview">
            <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
              <CollectionIcon className="h-5 w-5" />
              <span>Overview</span>
            </a>
          </Link>
          <div className="space-y-4 text-[#8b949e]">
            <span>Platform</span>
            <Link href="/assistants">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <UserIcon className="h-5 w-5" />
                <span>Assistants</span>
              </a>
            </Link>
            <Link href="/phone-numbers">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <PhoneIcon className="h-5 w-5" />
                <span>Phone Numbers</span>
              </a>
            </Link>
            <Link href="/files">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <ClipboardListIcon className="h-5 w-5" />
                <span>Files</span>
              </a>
            </Link>
            <Link href="/tools">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Tools</span>
              </a>
            </Link>
            <Link href="/squads">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <UsersIcon className="h-5 w-5" />
                <span>Squads</span>
              </a>
            </Link>
            <Link href="/contacts">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <ChatIcon className="h-5 w-5" />
                <span>Contacts</span>
              </a>
            </Link>
            <Link href="/deals">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <DocumentTextIcon className="h-5 w-5" />
                <span>Deals</span>
              </a>
            </Link>
            <Link href="/voice-library">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <LibraryIcon className="h-5 w-5" />
                <span>Voice Library</span>
              </a>
            </Link>
            <Link href="/call-logs">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <PhoneIcon className="h-5 w-5" />
                <span>Call Logs</span>
              </a>
            </Link>
            <Link href="/sms-text-conversations">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <ChatAlt2Icon className="h-5 w-5" />
                <span>SMS Text Conversations</span>
              </a>
            </Link>
            <Link href="/upload-contacts">
              <a className="flex items-center space-x-2 p-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
                <ArrowRightIcon className="h-5 w-5" />
                <span>Upload Contacts</span>
              </a>
            </Link>
          </div>
        </nav>
        <div className="mt-auto space-y-4">
          <a href="#" className="flex items-center space-x-2 text-[#c9d1d9] hover:bg-[#2a2e37] hover:text-[#9d4edd]">
            <UserIcon className="h-5 w-5 text-[#9d4edd]" />
            <span className="text-[#9d4edd]">Profile</span>
          </a>
          <Button className="w-full">
            Click Set Go
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
