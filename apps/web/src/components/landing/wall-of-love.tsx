import { AudioWaveformIcon } from "lucide-react";

export const WallOfLove = () => {
  return (
    <section className="font-inter flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* badge */}
      <span className="border-surface-secondary text-text-secondary flex items-center gap-2 rounded-full border-y px-4 py-2 text-xs font-medium tracking-wide">
        <AudioWaveformIcon className="size-4 text-rose-500" />
        Wall of love
      </span>

      {/* heading */}
      <div className="mt-4 flex max-w-4xl flex-col items-center justify-center text-center">
        <h2 className="text-text-secondary text-3xl leading-none font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl xl:text-6xl">
          why developers love ...
        </h2>

        <p className="text-text-primary mt-5 bg-rose-500 px-4 py-1 text-sm font-medium tracking-tight">
          Trusted by developers building scalable SaaS products.
        </p>
      </div>

      <div className="mt-12 w-full columns-1 gap-5 sm:columns-2 lg:columns-3">
        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-5 sm:p-6">
          <p className="text-text-secondary text-base leading-8">
            “Saved me almost 2 days of authentication setup. Finally spent time
            building features instead.”
          </p>

          <div className="mt-5 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=11"
              alt="Aarav Sharma"
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />

            <div>
              <h4 className="text-text-primary text-sm font-semibold">
                Aarav Sharma
              </h4>

              <p className="text-text-muted text-xs">Indie Hacker</p>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-5 sm:p-6">
          <p className="text-text-primary text-lg leading-relaxed font-medium text-balance">
            “The structure actually feels maintainable after scaling.”
          </p>

          <div className="mt-6 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=32"
              alt="Emily Carter"
              className="h-11 w-11 rounded-full border border-white/10 object-cover"
            />

            <div>
              <h4 className="text-text-primary text-sm font-medium">
                Emily Carter
              </h4>

              <p className="text-text-muted text-xs">Frontend Engineer</p>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-5 sm:p-6">
          <p className="text-text-secondary text-lg leading-relaxed">
            “My folder structure finally stopped looking like a crime scene. 😭”
          </p>

          <div className="mt-6 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt="Daniel Kim"
              className="h-10 w-10 rounded-full border border-white/10 object-cover"
            />

            <div>
              <h4 className="text-text-primary text-sm font-medium">
                Daniel Kim
              </h4>

              <p className="text-text-muted text-xs">Startup Founder</p>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-6">
          <p className="text-text-secondary text-base leading-8">
            “Feels like this was built by someone who actually ships products.”
          </p>

          <div className="mt-5 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=44"
              alt="Sophia Lee"
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />

            <div>
              <h4 className="text-text-primary text-sm font-medium">
                Sophia Lee
              </h4>

              <p className="text-text-muted text-xs">Product Builder</p>
            </div>
          </div>
        </div>

        {/* featured */}
        <div className="mb-5 break-inside-avoid border border-emerald-500/20 bg-emerald-500/5 p-6">
          <span className="text-sm tracking-[0.24em] text-emerald-300 uppercase">
            Fast shipping
          </span>

          <h4 className="text-text-primary mt-5 text-2xl leading-tight font-semibold tracking-tight">
            “Launched our MVP in two weekends.”
          </h4>

          <div className="mt-7 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=18"
              alt="Rohan Gupta"
              className="h-11 w-11 rounded-full border border-white/10 object-cover"
            />

            <div>
              <p className="text-text-primary text-sm font-medium">
                Rohan Gupta
              </p>

              <p className="text-text-muted text-xs">Full Stack Developer</p>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-5 sm:p-6">
          <div className="text-text-muted mt-1 text-center text-sm">
            ☆*: .｡. o(≧▽≦)o .｡.:*☆
          </div>

          <p className="text-text-secondary mt-4 text-base leading-8 text-balance">
            “For once I started building the product immediately instead of
            configuring tools for hours.”
          </p>

          <div className="mt-5 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=54"
              alt="Lucas Bennett"
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />

            <div className="flex flex-col items-start">
              <span className="text-text-primary text-sm font-medium">
                Lucas Bennett
              </span>

              <span className="text-text-muted text-xs">Startup Engineer</span>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-5 sm:p-6">
          <p className="text-text-primary text-lg leading-relaxed font-medium text-balance">
            “Didn’t expect the workflow setup to be this clean honestly.”
          </p>

          <div className="mt-6 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=53"
              alt="Noah Williams"
              className="h-11 w-11 rounded-full border border-white/10 object-cover"
            />

            <div>
              <h4 className="text-text-primary text-sm font-medium">
                Noah Williams
              </h4>

              <p className="text-text-muted text-xs">SaaS Engineer</p>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-5 sm:p-6">
          <h4 className="text-text-primary text-3xl font-semibold tracking-tight">
            “Clean.”
          </h4>

          <p className="text-text-muted mt-4 text-sm leading-7">
            That’s literally the first thing I said after opening the repo.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=24"
              alt="Olivia Martinez"
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />

            <div>
              <p className="text-text-primary text-sm font-medium">
                Olivia Martinez
              </p>

              <p className="text-text-muted text-xs">Technical Founder</p>
            </div>
          </div>
        </div>

        {/* card */}
        <div className="border-surface-secondary bg-surface-primary mb-5 break-inside-avoid border p-5 sm:p-6">
          <p className="text-text-secondary text-sm leading-7 text-balance">
            “I removed 4 different setup repos from my bookmarks after using
            Devkit.”
          </p>

          <div className="mt-6 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=60"
              alt="Ethan Brooks"
              className="h-10 w-10 rounded-full border border-white/10 object-cover"
            />

            <div>
              <h4 className="text-text-primary text-sm font-medium">
                Ethan Brooks
              </h4>

              <p className="text-text-muted text-xs">AI Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
