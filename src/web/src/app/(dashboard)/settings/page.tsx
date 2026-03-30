"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Mail, Phone, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
        <p className="text-sm text-secondary mt-1">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <h3 className="font-heading text-base font-semibold mb-4">Profile Information</h3>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              icon={<User className="h-4 w-4" />}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Last Name"
              icon={<User className="h-4 w-4" />}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Input
            label="Email"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            disabled
            helperText="Contact support to change your email"
          />
          <Input
            label="Phone"
            icon={<Phone className="h-4 w-4" />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex justify-end">
            <Button size="sm">Save Changes</Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h3 className="font-heading text-base font-semibold mb-4">
          <Bell className="inline h-4 w-4 mr-2" />
          Notifications
        </h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-secondary">Receive updates via email</p>
            </div>
            <button
              role="switch"
              aria-checked={emailNotif}
              onClick={() => setEmailNotif(!emailNotif)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotif ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotif ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-xs text-secondary">Receive push notifications</p>
            </div>
            <button
              role="switch"
              aria-checked={pushNotif}
              onClick={() => setPushNotif(!pushNotif)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pushNotif ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pushNotif ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </label>
        </div>
      </Card>

      {/* Language */}
      <Card>
        <h3 className="font-heading text-base font-semibold mb-4">
          <Globe className="inline h-4 w-4 mr-2" />
          Language
        </h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="h-10 w-full max-w-xs rounded-lg border border-border bg-white px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="fr">Francais</option>
          <option value="es">Espanol</option>
          <option value="ar">Arabic</option>
        </select>
      </Card>
    </div>
  );
}
