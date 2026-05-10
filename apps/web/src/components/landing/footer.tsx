import { useRouter } from "next/navigation";

import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

import { Button } from "@repo/ui";

const footerLinks = [
  {
    title: "Product",
    links: [
      {
        label: "Templates",
        href: "/templates",
      },
      {
        label: "Modules",
        href: "/templates",
      },
      {
        label: "Authentication",
        href: "/templates",
      },
      {
        label: "Blocks",
        href: "/templates",
      },
      {
        label: "Pricing",
        href: "/pricing",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Guides",
        href: "/guides",
      },
      {
        label: "Changelog",
        href: "/changelog",
      },
      {
        label: "Help",
        href: "/help",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "Payment",
        href: "/payment-policy",
      },
      {
        label: "Terms",
        href: "/terms",
      },
      {
        label: "Privacy",
        href: "/privacy-policy",
      },
      {
        label: "About",
        href: "/about",
      },
    ],
  },
  {
    title: "Developers",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/GuptaShubham-11/devkit",
      },
      {
        label: "Status",
        href: "/status",
      },
      {
        label: "Community",
        href: "/community",
      },
      {
        label: "Roadmap",
        href: "/roadmap",
      },
    ],
  },
];

export const Footer = () => {
  const router = useRouter();
  return (
    <footer className="font-inter border-surface-secondary relative overflow-hidden border-t">
      <div className="relative mx-auto flex flex-col px-5 pt-10 pb-10">
        {/* top */}
        <div className="border-surface-secondary flex flex-col justify-between gap-14 border-b pb-16 lg:flex-row">
          {/* brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-1">
              <img src="/logo.svg" alt="devkit" className="h-16 w-16" />

              <div>
                <span className="text-text-primary text-2xl tracking-tight">
                  devkit
                </span>

                <p className="text-text-muted max-w-sm text-sm leading-relaxed">
                  Build products
                </p>
              </div>
            </div>

            {/* socials */}
            <div className="mt-2 flex items-center justify-center gap-2 border-t border-b">
              {[GithubIcon, TwitterIcon, LinkedinIcon].map((Icon, index) => (
                <Button key={index} variant="ghost" size="icon-lg">
                  <Icon className="text-text-muted fill-text-muted size-4 transition-all duration-300" />
                </Button>
              ))}
            </div>

            <div className="text-text-primary mt-4 mb-4 max-w-sm text-center text-sm leading-relaxed text-balance">
              Our mission by the end of this year is to connect thousands of
              developers build faster.
            </div>
          </div>

          {/* links */}
          <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-4">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-text-primary text-base font-semibold">
                  {section.title}
                </h3>

                <ul className="mt-2 space-y-1.5">
                  {section.links.map((item) => (
                    <li key={item.label}>
                      <span
                        onClick={() => router.push(item.href)}
                        className="text-text-muted hover:text-text-secondary cursor-pointer text-sm transition-colors duration-300"
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom */}
        <div className="text-text-muted flex flex-col items-center justify-end gap-5 pt-8 text-sm sm:flex-row">
          <p>© 2026 Devkit. Crafted for developers.</p>
        </div>
      </div>
    </footer>
  );
};
