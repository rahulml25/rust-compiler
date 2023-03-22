'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [code, setCode] = useState(`fn main() {
  println!("Hello World!");
}`);
  const [output, setOutput] = useState();

  async function compileCode() {
    const res = await fetch('/compile', {
      method: 'POST',
      body: JSON.stringify({code})
    });

    if (!res.ok) return;

    const data = await res.json();
    setOutput(data.output);
  }

  return (
    <main className="px-3 max-w-7xl mx-auto space-y-3">
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-end space-x-1.5">
          <Image src="/rust-crab.png" height={40} width={60} priority alt="rust-crab"/>
          <h1 className="text-2xl font-medium">
            Rust Compiler!
          </h1>
        </div>
        <button className="font-bold bg-orange-600 px-3 py-0.5 rounded-md" onClick={compileCode}>run</button>
      </div>

      <textarea rows={5}
        className="w-full bg-neutral-900 rounded-lg outline-none px-3 py-1.5"
        value={code}
        onChange={e => setCode(e.target.value)}
      />

      {output && <pre className="px-3 py-1.5 bg-neutral-900 rounded-lg">{output}</pre>}
    </main>
  );
}
