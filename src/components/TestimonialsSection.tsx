import { Quote } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import type { Testimonial } from "../types/portfolio";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="mx-3 flex w-[340px] flex-shrink-0 flex-col justify-between rounded-2xl border border-line bg-card p-6 sm:w-[380px]">
      <Quote
        size={22}
        className="mb-4 text-black"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p className="prose-copy italic text-sm text-black sm:text-base">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-black"
          style={{ backgroundColor: testimonial.avatarColor }}
          aria-hidden="true"
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-black">
            {testimonial.name}
          </p>
          <p className="text-xs text-black">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { testimonials } = usePortfolio();

  if (testimonials.length === 0) return null;

  // Duplicate the list so the CSS marquee loops seamlessly at -50% translate.
  const looped = [...testimonials, ...testimonials];

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-4 text-sm uppercase tracking-[0.2em] text-black">
          Testimonials
        </h2>
        <p className="prose-copy max-w-md text-xl text-black sm:text-2xl">
          What people say about working together.
        </p>
      </div>

      <div className="marquee-row mt-14">
        <div className="marquee-track">
          {looped.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
