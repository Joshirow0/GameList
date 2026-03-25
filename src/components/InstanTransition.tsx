"use client";

import { ReactNode, useEffect, useState } from 'react';

interface InstantTransitionProps {
  serverQuery: string;
  serverPage: number;
  fallback: ReactNode;
  children: ReactNode;
}

export default function InstantTransition({
  serverQuery,
  serverPage,
  fallback,
  children
}: InstantTransitionProps) {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsPending(true);
    window.addEventListener('start-loading', handleStart);
    
    return () => window.removeEventListener('start-loading', handleStart);
  }, []);

  useEffect(() => {
    setIsPending(false);
  }, [serverQuery, serverPage]);

  // Si está cargando, mostramos el esqueleto instantáneamente
  if (isPending) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}