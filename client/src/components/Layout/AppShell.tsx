import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      {/* Responsive container with 16:9 aspect ratio constraint */}
      <div className="absolute inset-0 flex items-center justify-center p-0 sm:p-4">
        <div 
          className="relative w-full h-full max-w-screen-2xl mx-auto"
          style={{
            maxHeight: 'calc(100vh - 2rem)',
            aspectRatio: '16 / 9'
          }}
        >
          {/* Game content */}
          <div className="absolute inset-0 overflow-hidden rounded-none sm:rounded-xl shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
