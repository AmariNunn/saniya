import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Instagram, Send, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "contact");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-testid="section-contact"
      className="relative py-24 md:py-40 px-6 md:px-10"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/hero/hero-main.jpg')`,
          filter: "blur(60px) brightness(0.15) saturate(0.5)",
        }}
      />

      <div className="relative z-10 max-w-[600px] mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase font-mono block mb-4">Get In Touch</span>
          <h2 className="font-serif font-light text-[#f5f0eb] text-3xl md:text-5xl mb-4" data-testid="text-contact-heading">
            Inquiries
          </h2>
          <p className="text-[#a09890] text-sm">
            Available for bookings, collaborations, and creative projects worldwide.
          </p>
        </div>

        {submitted ? (
          <div className="text-center animate-fade-in-up py-12" data-testid="text-success">
            <CheckCircle className="w-12 h-12 text-[#c9a96e] mx-auto mb-4" />
            <p className="text-[#f5f0eb] font-serif text-2xl mb-2">Thank you</p>
            <p className="text-[#a09890] text-sm">Your inquiry has been received. I'll get back to you shortly.</p>
          </div>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={form.handleSubmit(onSubmit)}
            className={`space-y-6 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            data-testid="form-contact"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="relative">
              <input
                {...form.register("name")}
                type="text"
                placeholder=" "
                data-testid="input-name"
                className="w-full bg-transparent border-b border-white/10 py-3 px-1 text-[#f5f0eb] text-sm outline-none focus:border-[#c9a96e]/50 transition-colors duration-300 peer cursor-none"
              />
              <label className="absolute left-1 top-3 text-[#a09890] text-xs tracking-wider uppercase transition-all duration-300 peer-focus:top-[-8px] peer-focus:text-[10px] peer-focus:text-[#c9a96e] peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-[10px] pointer-events-none">
                Name
              </label>
              {form.formState.errors.name && (
                <p className="text-red-400/80 text-[10px] mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...form.register("email")}
                type="email"
                placeholder=" "
                data-testid="input-email"
                className="w-full bg-transparent border-b border-white/10 py-3 px-1 text-[#f5f0eb] text-sm outline-none focus:border-[#c9a96e]/50 transition-colors duration-300 peer cursor-none"
              />
              <label className="absolute left-1 top-3 text-[#a09890] text-xs tracking-wider uppercase transition-all duration-300 peer-focus:top-[-8px] peer-focus:text-[10px] peer-focus:text-[#c9a96e] peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-[10px] pointer-events-none">
                Email
              </label>
              {form.formState.errors.email && (
                <p className="text-red-400/80 text-[10px] mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <select
                {...form.register("subject")}
                data-testid="select-subject"
                className="w-full bg-transparent border-b border-white/10 py-3 px-1 text-[#f5f0eb] text-sm outline-none focus:border-[#c9a96e]/50 transition-colors duration-300 cursor-none appearance-none"
                style={{ background: "#0a0a0a" }}
              >
                <option value="" className="bg-[#0a0a0a] text-[#a09890]">Select Subject</option>
                <option value="booking" className="bg-[#0a0a0a]">Booking</option>
                <option value="collaboration" className="bg-[#0a0a0a]">Collaboration</option>
                <option value="general" className="bg-[#0a0a0a]">General Inquiry</option>
              </select>
              {form.formState.errors.subject && (
                <p className="text-red-400/80 text-[10px] mt-1">{form.formState.errors.subject.message}</p>
              )}
            </div>

            <div className="relative">
              <textarea
                {...form.register("message")}
                placeholder=" "
                rows={4}
                data-testid="input-message"
                className="w-full bg-transparent border-b border-white/10 py-3 px-1 text-[#f5f0eb] text-sm outline-none focus:border-[#c9a96e]/50 transition-colors duration-300 resize-none peer cursor-none"
              />
              <label className="absolute left-1 top-3 text-[#a09890] text-xs tracking-wider uppercase transition-all duration-300 peer-focus:top-[-8px] peer-focus:text-[10px] peer-focus:text-[#c9a96e] peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-[10px] pointer-events-none">
                Message
              </label>
              {form.formState.errors.message && (
                <p className="text-red-400/80 text-[10px] mt-1">{form.formState.errors.message.message}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                data-testid="button-submit"
                disabled={submitting}
                className="group relative w-full flex items-center justify-center gap-3 py-3.5 border border-[#c9a96e]/30 text-[#c9a96e] text-xs tracking-[0.2em] uppercase font-mono rounded-md transition-all duration-500 hover:border-[#c9a96e]/60 hover:bg-[#c9a96e]/5 disabled:opacity-50 cursor-none"
                data-cursor-hover
              >
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {submitError && (
              <p className="text-red-400/80 text-xs text-center" data-testid="text-error">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}

        <div className={`flex items-center justify-center gap-8 mt-12 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#a09890] text-xs tracking-wider hover:text-[#c9a96e] transition-colors duration-300 cursor-none"
            data-cursor-hover
            data-testid="link-instagram-contact"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          <a
            href="mailto:hello@saniyallen.com"
            className="flex items-center gap-2 text-[#a09890] text-xs tracking-wider hover:text-[#c9a96e] transition-colors duration-300 cursor-none"
            data-cursor-hover
            data-testid="link-email-contact"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
