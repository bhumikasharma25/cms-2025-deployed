import { useState } from "react";
import type { FormEvent } from "react";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ text: string; error: boolean } | null>(
    null
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMsg({ text: "Please enter a valid email address.", error: true });
      return;
    }
    setMsg({
      text: "Thanks for subscribing! Check your inbox.",
      error: false,
    });
    setEmail("");
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="container">
        <div className="newsletter-card">
          <h2>Stay Updated with Blogify</h2>
          <p>
            Join 12,000+ engineers subscribing to our high-scale performance
            engineering digest.
          </p>
          <form className="newsletter-form" onSubmit={submit} noValidate>
            <input
              type="email"
              placeholder="Enter your corporate email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button className="btn-dark" type="submit">
              Subscribe
            </button>
          </form>
          {msg && (
            <p
              className={`form-msg${msg.error ? " error" : ""}`}
              role="status"
            >
              {msg.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
