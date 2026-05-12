import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";
import FloatingField from "./FloatingField";
import "./FormFields.css";
import "./PersonalizedPick.css";

export default function PersonalizedPick({ closeForm }) {
  const { category } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: category || "",
    budget: "",
    useCase: "",
    urgency: "Immediate",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    if (closeForm) {
      closeForm();
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }, [closeForm, navigate]);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      category: category || current.category,
    }));
  }, [category]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () =>
    form.name.trim() &&
    form.email.trim() &&
    form.category &&
    form.budget &&
    form.useCase.trim() &&
    form.urgency;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/personalized-pick",
        {
          ...form,
          budget: Number(form.budget),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitted(true);
      window.setTimeout(() => {
        handleClose();
      }, 1600);
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="pp-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
      role="presentation"
    >
      <div
        className="pp-modal surface-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="personalized-pick-title"
      >
        <button
          className="pp-close-btn"
          onClick={handleClose}
          type="button"
          aria-label="Close form"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="pp-success">
            <CheckCircle2 size={48} aria-hidden="true" />
            <h3>Request received</h3>
            <p>Your personalized pick is on the way.</p>
          </div>
        ) : (
          <form className="form-stack" onSubmit={handleSubmit}>
            <h3 className="form-title" id="personalized-pick-title">
              Get your personalized pick
            </h3>
            <p className="form-subtitle">
              Share your budget and use case. We will respond with one focused recommendation.
            </p>

            <FloatingField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            <FloatingField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
            />

            <FloatingField
              label="Budget"
              name="budget"
              type="number"
              value={form.budget}
              onChange={handleChange}
              placeholder="Enter budget"
            />

            <FloatingField
              label="Use case"
              name="useCase"
              value={form.useCase}
              onChange={handleChange}
              placeholder="Gaming, music, office, etc."
            />

            <FloatingField label="Category" name="category" value={form.category}>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select category</option>
                <option value="IEMs">IEMs</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio">Audio</option>
                <option value="Wearables">Wearables</option>
              </select>
            </FloatingField>

            <FloatingField label="Urgency" name="urgency" value={form.urgency}>
              <select name="urgency" value={form.urgency} onChange={handleChange}>
                <option value="Immediate">Immediate</option>
                <option value="Within a month">Within a month</option>
                <option value="Flexible">Flexible</option>
              </select>
            </FloatingField>

            {error && <p className="form-error">{error}</p>}

            <button className="form-submit-btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
