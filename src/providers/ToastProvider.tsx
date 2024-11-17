'use client';
import React from 'react';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';
export default function ToastProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NextTopLoader color="#EA6365" showSpinner={false} />
      {children} <Toaster richColors position="top-right" />
    </div>
  );
}
