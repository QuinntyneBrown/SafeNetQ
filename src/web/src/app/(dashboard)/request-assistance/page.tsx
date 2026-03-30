"use client";

import { useState } from "react";
import { Heart, GraduationCap, AlertTriangle, Home, HelpCircle, Upload, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn, formatCurrency } from "@/lib/utils";

const categories = [
  { id: "medical", label: "Medical", icon: <Heart className="h-6 w-6" />, color: "text-error" },
  { id: "education", label: "Education", icon: <GraduationCap className="h-6 w-6" />, color: "text-info" },
  { id: "emergency", label: "Emergency", icon: <AlertTriangle className="h-6 w-6" />, color: "text-warning" },
  { id: "housing", label: "Housing", icon: <Home className="h-6 w-6" />, color: "text-primary" },
  { id: "other", label: "Other", icon: <HelpCircle className="h-6 w-6" />, color: "text-secondary" },
];

const stepLabels = ["Category", "Details", "Documents", "Review"];

export default function RequestAssistancePage() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold mb-2">Request Submitted</h2>
        <p className="text-sm text-secondary text-center max-w-md mb-6">
          Your request has been submitted for community review. You will be notified of updates.
        </p>
        <Button onClick={() => { setSubmitted(false); setStep(0); setCategory(""); setTitle(""); setDescription(""); setAmount(""); setFiles([]); }}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Request Assistance</h1>
        <p className="text-sm text-secondary mt-1">
          Submit a request for community-reviewed financial assistance.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium flex-shrink-0",
                i <= step ? "bg-primary text-white" : "bg-border text-secondary"
              )}
            >
              {i < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className="hidden sm:inline text-xs text-secondary">{label}</span>
            {i < stepLabels.length - 1 && (
              <div className={cn("h-px flex-1", i < step ? "bg-primary" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-white p-6">
        {/* Step 0: Category */}
        {step === 0 && (
          <>
            <h2 className="font-heading text-lg font-semibold mb-4">Select Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                    category === cat.id ? "border-primary bg-primary/5" : "border-border hover:bg-surface"
                  )}
                >
                  <span className={cat.color}>{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
            <Button className="w-full mt-6" disabled={!category} onClick={() => setStep(1)}>
              Continue
            </Button>
          </>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <>
            <h2 className="font-heading text-lg font-semibold mb-4">Request Details</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Title"
                placeholder="Brief description of your need"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="h-32 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Provide details about your situation and why you need assistance..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <Input
                label="Amount Requested"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                helperText="Maximum based on your tier: $15,000"
                required
              />
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" icon={<ArrowLeft className="h-4 w-4" />} onClick={() => setStep(0)}>
                Back
              </Button>
              <Button className="flex-1" disabled={!title || !amount} onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Documents */}
        {step === 2 && (
          <>
            <h2 className="font-heading text-lg font-semibold mb-4">Supporting Documents</h2>
            <p className="text-sm text-secondary mb-4">
              Upload relevant documents (medical bills, invoices, estimates, etc.)
            </p>
            <label className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-8 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
              <Upload className="h-8 w-8 text-secondary" />
              <span className="text-sm font-medium">Click to upload files</span>
              <span className="text-xs text-secondary">PDF, PNG, JPG up to 10MB each</span>
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) setFiles(Array.from(e.target.files));
                }}
              />
            </label>
            {files.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-secondary">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {f.name}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" icon={<ArrowLeft className="h-4 w-4" />} onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <>
            <h2 className="font-heading text-lg font-semibold mb-4">Review Your Request</h2>
            <div className="flex flex-col gap-4 rounded-lg bg-surface p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Category</span>
                <span className="font-medium capitalize">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Title</span>
                <span className="font-medium">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Amount</span>
                <span className="font-medium">{formatCurrency(Number(amount))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Documents</span>
                <span className="font-medium">{files.length} file(s)</span>
              </div>
              <div>
                <span className="text-secondary">Description</span>
                <p className="mt-1 font-medium">{description}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" icon={<ArrowLeft className="h-4 w-4" />} onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="flex-1" loading={loading} onClick={handleSubmit}>
                Submit Request
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
