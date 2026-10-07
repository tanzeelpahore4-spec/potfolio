import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Calendar, Clock, Lock, Sparkles, Inbox } from 'lucide-react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';

// Shared client validation schema
export const clientContactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name must be under 80 characters'),
  email: z.string().trim().email('Please enter a valid business email address'),
  inquiryType: z.enum(['architecture_review', 'contract_project', 'advisory', 'fractional_cto', 'other'], {
    message: 'Please select a valid consultation or project type',
  }),
  timeline: z.enum(['immediate', '1_3_months', '3_6_months', 'exploratory'], {
    message: 'Please select an estimated timeline',
  }),
  budgetRange: z.enum(['under_25k', '25k_50k', '50k_100k', '100k_plus', 'not_specified']),
  message: z.string().trim().min(15, 'Please provide at least 15 characters describing your systems requirements').max(3000, 'Message is too long'),
});

export type ClientContactFormData = z.infer<typeof clientContactSchema>;

interface ContactSectionProps {
  onTrackAction: (type: string, target?: string, metadata?: Record<string, any>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onTrackAction }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showInquiriesDrawer, setShowInquiriesDrawer] = useState<boolean>(false);
  const [inquiries, setInquiries] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<ClientContactFormData>({
    resolver: zodResolver(clientContactSchema),
    mode: 'onBlur',
    defaultValues: {
      inquiryType: 'architecture_review',
      timeline: 'immediate',
      budgetRange: '50k_100k',
    },
  });

  const onSubmit = async (formData: ClientContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      onTrackAction('contact_form_submit_attempt', formData.inquiryType);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle server-side validation error response
        if (data.errors) {
          Object.keys(data.errors).forEach((field) => {
            const fieldError = data.errors[field]?.[0];
            if (fieldError) {
              setError(field as any, {
                type: 'server',
                message: fieldError,
              });
            }
          });
        }
        setServerError(data.message || 'Server validation failed. Please check the fields.');
        return;
      }

      // Success
      setSubmissionSuccess(true);
      setSubmissionId(data.submissionId || `SUB-${Date.now()}`);
      reset();
      onTrackAction('contact_form_success', formData.inquiryType);
    } catch (err) {
      setServerError('Network error connecting to backend API. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadPastInquiries = async () => {
    try {
      const res = await fetch('/api/contact/messages');
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.messages || []);
        setShowInquiriesDrawer(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries & Bio */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-sky-400">
                Direct Engagement & Consultation
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900 dark:text-neutral-100 tracking-tight">
                Let's Architect High-Scale Systems Together.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Available for advisory engagements, multi-region architecture audits, fractional CTO advisory, and critical high-scale distributed systems challenges.
              </p>
            </div>

            {/* Direct details */}
            <div className="space-y-4 text-xs sm:text-sm font-mono-tabular">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-sans">Primary Email</span>
                  <a
                    href={`mailto:${PORTFOLIO_OWNER.email}`}
                    className="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-500 transition-colors"
                  >
                    {PORTFOLIO_OWNER.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-sans">Availability & Location</span>
                  <span className="text-neutral-800 dark:text-neutral-200">
                    San Francisco Bay Area · Global High-Trust Remote
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-sans">Turnaround SLA</span>
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Direct executive response within 24 business hours
                  </span>
                </div>
              </div>
            </div>

            {/* Inquiries inspector button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={loadPastInquiries}
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
              >
                <Inbox className="w-4 h-4" />
                <span>Inspect Server Inquiries Log (API Test Mode)</span>
              </button>
            </div>
          </div>

          {/* Right Column: React Hook Form + Zod Server Validation */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-neutral-100">
                    Architecture Consultation Request
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Validated with React Hook Form + Zod server-side schemas
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono-tabular">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit Secure</span>
                </div>
              </div>

              {submissionSuccess ? (
                <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      Inquiry Received & Validated!
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-md mx-auto">
                      Your architecture review parameters were parsed and verified by the server schema. Reference ID: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{submissionId}</span>.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmissionSuccess(false)}
                      className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Submit Another Consultation Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {serverError && (
                    <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Dr. Alex Rivera"
                        {...register('name')}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-950 border transition-colors text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none ${
                          errors.name
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-neutral-200 dark:border-neutral-800 focus:border-blue-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="alex@enterprise-cloud.com"
                        {...register('email')}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-950 border transition-colors text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-neutral-200 dark:border-neutral-800 focus:border-blue-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type and Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Inquiry Scope <span className="text-rose-500">*</span>
                      </label>
                      <select
                        {...register('inquiryType')}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500"
                      >
                        <option value="architecture_review">Systems Architecture & Resiliency Audit</option>
                        <option value="fractional_cto">Fractional CTO / Principal Architect Advisory</option>
                        <option value="contract_project">Distributed Systems Engineering Contract</option>
                        <option value="other">Technical Due Diligence & Other</option>
                      </select>
                      {errors.inquiryType && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.inquiryType.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Target Timeline <span className="text-rose-500">*</span>
                      </label>
                      <select
                        {...register('timeline')}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500"
                      >
                        <option value="immediate">Immediate / Urgent (Next 2 Weeks)</option>
                        <option value="1_3_months">Next 1 — 3 Months</option>
                        <option value="3_6_months">3 — 6 Months</option>
                        <option value="exploratory">Exploratory / Discovery</option>
                      </select>
                      {errors.timeline && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.timeline.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Budget Tier */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Estimated Budget Tier
                    </label>
                    <select
                      {...register('budgetRange')}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-500"
                    >
                      <option value="25k_50k">$25,000 — $50,000 (Focused Architecture Sprint)</option>
                      <option value="50k_100k">$50,000 — $100,000 (Comprehensive Systems Audit & Design)</option>
                      <option value="100k_plus">$100,000+ (Multi-Quarter Principal Advisory & Implementation)</option>
                      <option value="under_25k">Under $25,000</option>
                      <option value="not_specified">Not Yet Determined / Advisory</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      System Overview & Architecture Goals <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe current architecture, throughput bottlenecks, latency targets, and target outcome..."
                      {...register('message')}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-950 border transition-colors text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none ${
                        errors.message
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-neutral-200 dark:border-neutral-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Server-side schema validation via Zod
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Validating...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Consultation Spec</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Inquiries Modal / Drawer for Transparency */}
        {showInquiriesDrawer && (
          <div className="mt-8 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-display text-neutral-900 dark:text-neutral-100">
                Server Inquiries Store ({inquiries.length} Messages)
              </h4>
              <button
                onClick={() => setShowInquiriesDrawer(false)}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              >
                Close Drawer
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {inquiries.map((inq: any) => (
                <div
                  key={inq.id}
                  className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-mono-tabular flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">{inq.name}</span>
                    <span className="text-neutral-400"> ({inq.email})</span>
                    <div className="text-neutral-600 dark:text-neutral-400 text-[11px] truncate max-w-md mt-0.5">
                      {inq.message}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-sky-500 uppercase font-semibold">{inq.inquiryType}</span>
                    <div className="text-[10px] text-neutral-500">
                      {new Date(inq.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
