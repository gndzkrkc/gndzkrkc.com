import * as React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const HighlightedText = ({
  color,
  className,
  children,
}: {
  color: 'green' | 'orange' | 'yellow';
  className?: string;
  children: React.ReactNode;
}) => {
  const variants: Record<typeof color, string> = {
    // For translation strings
    green:
      'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 m-0.5',
    // For ID strings
    orange:
      'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 m-0.5',
    // For emphasized tags/placeholders
    yellow:
      'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
  };

  return (
    <span
      className={cn(
        'inline-flex p-1 rounded font-mono text-sm',
        variants[color],
        className,
      )}
    >
      {children}
    </span>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Localization Guidelines | Stay Hydrated`,
    description: 'Tips and rules for translating Stay Hydrated.',
  };
}

export default function LocalizationTipsPage() {
  return (
    <main className="container max-w-2xl mx-auto">
      <article className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed">
        {/* Header Section */}
        <div className="not-prose mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Localization Guidelines
          </h1>
          <p className="text-xl text-muted-foreground">Tips for Translators</p>
        </div>

        <Separator className="my-8" />

        {/* 1. Be friendly */}
        <h3 id="be-friendly">Be friendly.</h3>
        <ul className="list-disc space-y-2">
          <li>
            Stay Hydrated aims to feel like a friendly companion. Please address
            users using informal language, often the second-person singular
            forms, to maintain a personal connection.
          </li>
          <li>
            Please maintain an informal and engaging tone. Avoid overly formal
            or stiff language. This is especially important when crafting
            translations for notification reminders.
          </li>
        </ul>

        {/* 2. Be creative */}
        <h3 id="be-creative" className="mt-8">
          Be creative.
        </h3>
        <ul className="list-disc space-y-2">
          <li>
            You will encounter similar or duplicate source strings, such as:
            <br />
            {/* Example strings with styling */}
            <HighlightedText color="green">
              Good morning!
            </HighlightedText> -{' '}
            <HighlightedText color="green">Morning!</HighlightedText>
            <br />
            <HighlightedText color="green">
              Time to drink water!
            </HighlightedText>{' '}
            -{' '}
            <HighlightedText color="green">
              It&apos;s time to drink water.
            </HighlightedText>
            <br />
            <br />
            If your language allows for different ways to express the same idea,
            please use varied translations. This richness prevents the app from
            sounding monotonous and improves the overall user experience.
          </li>
        </ul>

        {/* 3. Be careful */}
        <h3 id="be-careful" className="mt-8">
          Be careful.
        </h3>
        <ul className="list-disc space-y-2">
          <li>
            Notification strings are often paired. For instance, strings with
            IDs like{' '}
            <HighlightedText color="orange">
              after_wakeup_1_title
            </HighlightedText>{' '}
            and{' '}
            <HighlightedText color="orange">
              after_wakeup_1_text
            </HighlightedText>{' '}
            always appear together. Ensure that your translation for both parts
            is coherent and flows seamlessly.
          </li>

          <li>
            Pay close attention to correct punctuation and the placement of
            special characters.
          </li>

          <li>
            You are the expert in your native language. While consistency is
            key, please don&apos;t hesitate to adapt or break the formal rules
            when it results in a more natural user experience.
          </li>

          {/* HTML Entities Tip */}
          <li>
            HTML entities can sometimes make source strings difficult to read
            and may lead to translation errors, such as missing tags. You can
            simplify the process by hiding these entities, as shown below:
            <br />
            {/* Placeholder for the image */}
            <div className="my-4">
              <Image
                src="/crowdin_html_tip.png"
                alt="Crowdin HTML Tag Tip"
                width={500}
                height={150}
                className="w-full h-auto rounded-lg shadow-md border"
              />
            </div>
            With this setting applied, for example:
            <br />
            <div className="flex flex-col items-start gap-2 my-2">
              <HighlightedText
                color="green"
                className="flex flex-row flex-wrap items-center gap-1"
              >
                <HighlightedText color="yellow">
                  &amp;lt;b&amp;gt;
                </HighlightedText>
                <span>bold text</span>
                <HighlightedText color="yellow">
                  &amp;lt;/b&amp;gt;
                </HighlightedText>
              </HighlightedText>
              <span>will be converted to:</span>
              <HighlightedText
                color="green"
                className="flex flex-row flex-wrap items-center gap-1"
              >
                <HighlightedText color="yellow">&lt;0&gt;</HighlightedText>
                <span>bold text</span>
                <HighlightedText color="yellow">&lt;/0&gt;</HighlightedText>
              </HighlightedText>
            </div>
          </li>
        </ul>
      </article>
    </main>
  );
}
