"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Upload, CreditCard, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const idTypes = [
  { id: "passport", label: "Passport", icon: <FileText className="h-5 w-5" /> },
  { id: "drivers_license", label: "Driver's License", icon: <CreditCard className="h-5 w-5" /> },
  { id: "national_id", label: "National ID", icon: <CreditCard className="h-5 w-5" /> },
];

const steps = ["Select ID Type", "Upload Documents", "Review"];

export default function KycPage() {
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // API call would go here
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-surface px-4 py-8">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Shield className="h-8 w-8 text-primary" />
        <span className="font-heading text-2xl font-bold">SafeNetQ</span>
      </Link>

      {/* Progress */}
      <div className="w-full max-w-lg mb-10">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  i <= step
                    ? "bg-primary text-white"
                    : "bg-border text-secondary"
                )}
              >
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden sm:inline text-sm text-secondary">{s}</span>
            </div>
          ))}
        </div>
        <div className="h-2 rounded-full bg-border">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-lg rounded-xl border border-border bg-white p-6">
        {step === 0 && (
          <>
            <h2 className="font-heading text-xl font-semibold mb-2">Select ID Type</h2>
            <p className="text-sm text-secondary mb-6">
              Choose the type of government-issued ID you would like to verify with.
            </p>
            <div className="flex flex-col gap-3">
              {idTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedId(type.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                    selectedId === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-surface"
                  )}
                >
                  <span className="text-primary">{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
            <Button
              className="w-full mt-6"
              disabled={!selectedId}
              onClick={() => setStep(1)}
            >
              Continue
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="font-heading text-xl font-semibold mb-2">Upload Documents</h2>
            <p className="text-sm text-secondary mb-6">
              Upload clear photos of the front and back of your ID.
            </p>
            <div className="flex flex-col gap-4">
              <UploadZone
                label="Front of ID"
                file={frontFile}
                onFile={setFrontFile}
              />
              <UploadZone
                label="Back of ID"
                file={backFile}
                onFile={setBackFile}
              />
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={!frontFile}
                loading={loading}
                onClick={handleSubmit}
              >
                Submit for Verification
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="text-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="font-heading text-xl font-semibold mb-2">Submitted!</h2>
            <p className="text-sm text-secondary mb-6">
              Your documents are being reviewed. This usually takes 1-2 business days.
            </p>
            <Link href="/select-tier">
              <Button className="w-full">Continue to Select Tier</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadZone({
  label,
  file,
  onFile,
}: {
  label: string;
  file: File | null;
  onFile: (f: File) => void;
}) {
  return (
    <label className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
      <Upload className="h-6 w-6 text-secondary" />
      <span className="text-sm font-medium">{file ? file.name : label}</span>
      <span className="text-xs text-secondary">Click to upload or drag and drop</span>
      <input
        type="file"
        accept="image/*,.pdf"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </label>
  );
}
