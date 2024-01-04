import React from 'react';
import Link from 'next/link';
import { Buttons } from '@/components/Buttons';

export default function Home() {
  return (
    <div>
      <p>Olá! Esta é a página inicial.</p>
      <Link href="/galeria">
      <Buttons btnState="defaultMain" text="hello" btnSize="mediumSize" >
      
      </Buttons>
      </Link>
    </div>
  );
}