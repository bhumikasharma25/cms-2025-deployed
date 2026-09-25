import { Link } from "react-router-dom";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";

export default function Placeholder({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main className="placeholder">
        <h1>{title}</h1>
        <p>This page is part of the next sprint.</p>
        <Link className="btn-subscribe" to="/">
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
