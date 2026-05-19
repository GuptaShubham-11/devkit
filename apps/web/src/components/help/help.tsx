import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { cn } from "@repo/ui";

import { BackNavigation } from "../core/back-navigation";
import { Container } from "../core/container";
import { CollapsibleHelp } from "./collapsible-help";

export function Help() {
  const router = useRouter();

  const { status } = useSession();

  return (
    <Container
      className={cn(
        `mb-20 grid items-start gap-8 px-4 sm:px-0`,
        status === "authenticated" ? "mt-20" : "mt-10"
      )}
    >
      <div className="flex w-fit flex-col gap-4">
        {status === "unauthenticated" && (
          <BackNavigation handleBack={() => router.push("/")} />
        )}
      </div>

      <div className="mx-auto grid w-full max-w-3xl gap-2">
        <CollapsibleHelp label="How to use template for the first time?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              You can use the template for the first time by following these
              steps:
            </p>
            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. Install the devkit-tool-cli by running the following command:{" "}
                <code className="text-text-secondary">
                  npm i -g devkit-tool-cli
                </code>
              </li>
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. Copy install command from template and run it in your
                terminal.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Understand the template card keywords?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              The template card keywords are:
            </p>
            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. <span className="text-accent-warning">c3</span> - Template
                Cost
              </li>
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. <span className="text-text-secondary">v0.1.0</span> -
                Template Version
              </li>
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                3. <span className="text-accent-primary">Repo</span> - Template
                Is A Repository Not A Block.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>
        <CollapsibleHelp label="How do credits work in Devkit?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Credits are used to access premium repositories, modules, and
              advanced systems.
            </p>

            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. Each premium template or repository consumes a specific
                number of credits.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. Credits are added instantly after successful payment
                verification.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                3. You can track available credits from your billing dashboard.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Are templates production-ready?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Yes. Devkit repositories are designed with scalable architecture
              and production workflows.
            </p>

            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. Includes authentication, database structure, reusable
                modules, and clean folder organization.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. Templates follow modern development practices using scalable
                technologies.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                3. Built to reduce repetitive engineering and setup time.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Can I use templates for commercial projects?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Yes. Purchased repositories and modules can be used in commercial
              applications.
            </p>

            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. You can customize the codebase based on your project
                requirements.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. Templates are intended to accelerate real-world SaaS and
                application development.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                3. Redistribution or reselling of original template source code
                is not allowed.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="What is included inside a repository template?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Repository templates include complete project foundations and
              reusable infrastructure.
            </p>

            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. Scalable folder architecture and reusable components.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. Authentication systems, APIs, database configuration, and
                deployment-ready setup.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                3. Preconfigured tooling for faster development workflows.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="How long does setup usually take?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Most repositories can be installed and running within a few
              minutes.
            </p>

            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. Install the repository using the generated CLI command.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. Configure required environment variables.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                3. Start development immediately using the preconfigured
                structure.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="What happens after credits run out?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              You can continue using existing repositories, but premium access
              requires additional credits.
            </p>

            <ul className="text-muted-foreground flex flex-col gap-0 py-2 text-sm">
              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                1. Existing downloaded repositories remain accessible.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                2. Additional premium templates require available credits.
              </li>

              <li className="rounded-sm px-2 py-1 font-medium tracking-wide">
                3. Credits can be purchased anytime from the billing section.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        {/* ---------------- Installation & Setup ---------------- */}

        <CollapsibleHelp label="Do templates include environment configuration?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Yes. Templates include environment structure and configuration
              guidance.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Example environment variables are included.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Authentication and database setup instructions are provided.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Most templates are ready for local and production
                environments.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Can I use Devkit without the CLI?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              No, the CLI is required for repository installation and setup.
            </p>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="How long does setup usually take?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Most repositories can be running within minutes.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Install the repository using the generated command.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Configure environment variables.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Start development immediately with the preconfigured
                structure.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        {/* ---------------- Credits & Billing ---------------- */}

        <CollapsibleHelp label="How do credits work in Devkit?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Credits are used to unlock premium repositories and advanced
              systems.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Each premium repository consumes credits.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Credits are added instantly after successful payment
                verification.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Credit usage can be tracked from the billing dashboard.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Do credits expire over time?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Credits currently do not expire after purchase.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Purchased credits remain available in your account.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Credits can be used anytime for eligible repositories.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Future changes to credit policies will be announced
                beforehand.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="What happens after I run out of credits?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Existing repositories remain accessible even after credits are
              exhausted.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Additional premium repositories require new credits.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Credits can be purchased anytime from billing settings.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Downloaded repositories remain usable permanently.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Can I upgrade my plan later?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Yes. Plans and credit packs can be upgraded anytime.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Upgrades are processed instantly after successful payment.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Additional credits are added automatically.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Billing history is available inside your dashboard.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="How can I view my billing history and invoices?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Billing activity is available inside your account dashboard.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. View invoice history and payment records.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Track credits and plan upgrades.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Download invoices for completed payments.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        {/* ---------------- Templates & Repositories ---------------- */}

        <CollapsibleHelp label="What is included inside a repository template?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Templates include scalable foundations and reusable
              infrastructure.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Authentication systems and APIs.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Clean folder architecture and reusable modules.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Production-ready developer tooling and setup.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Can I customize the template structure?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Absolutely. Templates are fully customizable.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Modify architecture based on your requirements.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Extend modules and APIs freely.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Integrate external services and tooling easily.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="Do templates include authentication systems?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Many repositories include prebuilt authentication systems.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. OAuth providers and credential login flows.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. Protected routes and session management.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Production-ready auth architecture.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>

        <CollapsibleHelp label="How often are templates updated?">
          <div className="text-text-muted text-sm">
            <p className="text-base font-semibold">
              Templates receive improvements and maintenance updates regularly.
            </p>

            <ul className="text-muted-foreground flex flex-col py-2 text-sm">
              <li className="px-2 py-1 font-medium tracking-wide">
                1. Security and dependency updates are prioritized.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                2. New modules and features may be added over time.
              </li>

              <li className="px-2 py-1 font-medium tracking-wide">
                3. Major improvements are announced in updates and changelogs.
              </li>
            </ul>
          </div>
        </CollapsibleHelp>
      </div>
    </Container>
  );
}
