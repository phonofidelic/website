import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home | Web development by Christopher Clemons",
  description:
    "Portfolio site exhibiting web development works by Christopher Clemons",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-4xl">Christopher Clemons</h1>
          <h2 className="text-2xl">(frontend web developer)</h2>
        </div>
        <div>
          New website is on the way. In the meantime, you can reach me on{" "}
          <a
            href="https://linkedin.com/in/christopher-clemons-89182aba"
            target="_blank"
            className="underline"
          >
            LinkedIn
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/phonofidelic"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:hidden"
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={24}
            height={24}
          />
          <Image
            className="hidden dark:block"
            aria-hidden
            src="/github-dark.svg"
            alt="GitHub icon"
            width={24}
            height={24}
          />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/christopher-clemons-89182aba"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:hidden"
            aria-hidden
            src="/linkedin.svg"
            alt="LinkedIn icon"
            width={24}
            height={24}
          />
          <Image
            className="hidden dark:block"
            aria-hidden
            src="/linkedin-dark.svg"
            alt="LinkedIn icon"
            width={24}
            height={24}
          />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
