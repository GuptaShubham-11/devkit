import { AudioWaveformIcon } from "lucide-react";

import { Container } from "../core/container";

export const WallOfLove = () => {
  return (
    <Container className="font-inter flex flex-col items-center justify-center overflow-hidden py-6 md:py-12">
      <span className="text-foreground flex items-center gap-2 rounded-full border-y px-4 py-2 text-xs font-medium tracking-wide text-shadow-2xs">
        <AudioWaveformIcon className="size-4 text-rose-500" />
        Wall of love
      </span>

      <div className="mt-4 flex max-w-4xl flex-col items-center justify-center text-center">
        <h2 className="text-foreground text-3xl leading-none font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl">
          why developers love
        </h2>

        <p className="text-foreground mt-4 bg-rose-500 px-4 py-0.5 text-sm font-medium tracking-tight">
          Trusted by developers building scalable SaaS products.
        </p>
      </div>

      <div className="mt-12 w-full columns-1 gap-4 sm:columns-2 lg:columns-3">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className={`mb-5 break-inside-avoid border p-4 sm:p-6 ${
              item.isFeatured
                ? "border-emerald-500/20 bg-emerald-500/5 p-6"
                : "bg-muted"
            }`}
          >
            {item.tag && (
              <span className="mb-2 block text-sm tracking-[0.24em] text-emerald-300 uppercase">
                {item.tag}
              </span>
            )}
            {item.badge && (
              <div className="text-text-muted mt-1 text-center text-sm">
                {item.badge}
              </div>
            )}
            {item.title && (
              <h4 className="text-foreground text-3xl font-semibold tracking-tight">
                {item.title}
              </h4>
            )}

            <p className={item.textClass}>{item.quote}</p>

            <div className="mt-4 flex items-center gap-3">
              <img
                src={item.image}
                alt={item.author}
                className={`size-8 rounded-lg object-cover`}
              />
              <div>
                <h4 className="text-foreground text-sm font-semibold">
                  {item.author}
                </h4>
                <p className="text-muted-foreground text-xs">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export const testimonials = [
  {
    id: 1,
    quote: "Saved me almost 4 days of authentication and onboarding setup. ",
    author: "Aarav Pandey",
    role: "Indie Hacker",
    image: "https://x.com/favicon.ico",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed",
  },
  {
    id: 2,
    quote: "The design actually feels maintainable and awesome after all.",
    author: "Emily Designs",
    role: "Frontend Engineer",
    image: "https://in.linkedin.com/favicon.ico",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed",
  },
  {
    id: 3,
    quote: "Hey devkit! Put me on the homepage please! 🫣",
    author: "Daniel Smith",
    role: "Startup Founder",
    image: "https://x.com/favicon.ico",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed",
  },
  {
    id: 4,
    quote: "Feels like this was built by someone who actually ships products.",
    author: "Sophia Lee",
    role: "Product Builder",
    image: "https://i.pravatar.cc/100?img=44",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed",
  },
  {
    id: 5,
    tag: "Fast shipping",
    quote: "Launched our MVP in two weekends.",
    author: "Ram Gupta",
    role: "Full Stack Developer",
    image: "https://www.producthunt.com/favicon.ico",
    isFeatured: true,
    textClass:
      "text-foreground mt-5 text-2xl leading-tight font-semibold tracking-tight",
  },
  {
    id: 6,
    badge: "☆*: .｡. o(≧▽≦)o .｡.:*☆",
    quote:
      "For once I started building the product immediately instead of configuring tools for hours.",
    author: "Lucas Bennett",
    role: "Startup Engineer",
    image: "https://i.pravatar.cc/100?img=54",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed mt-4",
  },
  {
    id: 7,
    quote: "Didn’t expect the workflow setup to be this clean honestly.",
    author: "Noah Williams",
    role: "SaaS Engineer",
    image: "https://x.com/favicon.ico",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed text-balance",
  },
  {
    id: 8,
    title: "Clean.",
    quote: "The code is clean and easy to understand.",
    author: "Olivia Martinez",
    role: "Technical Founder",
    image: "https://in.linkedin.com/favicon.ico",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed mt-2",
  },
  {
    id: 9,
    quote: "Premium templates are worth.",
    author: "Ethan Brooks",
    role: "AI Developer",
    image: "https://x.com/favicon.ico",
    isFeatured: false,
    textClass: "text-foreground text-lg leading-relaxed",
  },
];
