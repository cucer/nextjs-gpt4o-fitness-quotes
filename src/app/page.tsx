'use client';

import { generateQuote } from '@/actions/actions';
import mainImage from '@/assets/main2.jpg';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim() || '';

    if (prompt) {
      try {
        setQuote('');
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await generateQuote(encodeURIComponent(prompt));

        // const body = await response.json();
        setQuote(response || '');
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <main className="text-center pt-20 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Fitness Quotes AI</h1>
      <h2 className="text-2xl md:text-3xl mb-5">powered by GPT-40</h2>

      <p className="italic text-lg">
        Enter a topic and the AI will generate a fitness motivational quote
      </p>

      <div className="relative mx-auto mt-8 w-1/2 aspect-[12/7]">
        <Image
          src={mainImage}
          fill
          alt="A picture of a random fitness quote"
          priority
          className="object-fit rounded-[40px] shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
        />
      </div>

      <h3 className="text-lg mt-8">
        Create a fitness motivational quote about...
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[400px] mx-auto gap-2 my-5"
      >
        <input
          type="text"
          name="prompt"
          placeholder="enter keyword"
          className="border rounded px-3 h-10"
          required
        />
        <button
          type="submit"
          className="h-8 mx-auto mt-3 bg-red-900 px-10 rounded text-white"
        >
          Create
        </button>
      </form>
      {quoteLoading && 'Loading...'}
      {quoteLoadingError && 'Something went wrong. Please try again.'}
      {quote && <h5>{quote}</h5>}
    </main>
  );
}
