'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Image
        src="https://cagatayucer.com/cgty_logo.png"
        alt="Logo"
        className="w-[50px] h-[50px]"
        width="50"
        height="50"
      />
    </header>
  );
}
