"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookingSchema, deviceTypes, genericIssues, type DeviceType } from "@/lib/schema";
import { devices } from "@/content/devices";
import { business } from "@/content/business";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";

/** What the user types — startedAt/company are injected at submit time. */
const formSchema = bookingSchema.omit({ startedAt: true, company: true });
type FormValues = z.input<typeof formSchema>;

type Phase =
  | { name: "editing" }
  | { name: "submitting" }
  | { name: "success"; whatsappUrl: string }
  | { name: "error" };

export function BookRepairForm({ defaultDevice }: { defaultDevice?: DeviceType }) {
  const pathname = usePathname();
  const startedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>({ name: "editing" });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: { deviceType: defaultDevice, consent: undefined },
  });

  const deviceType = watch("deviceType");
  const consent = watch("consent");
  const isOther = deviceType === "Other";

  const models = useMemo(() => {
    if (!deviceType || isOther) return [];
    const device = devices.find((d) => d.formDeviceType === deviceType);
    return device ? [...device.models, "Other / not sure"] : [];
  }, [deviceType, isOther]);

  const issues = useMemo(() => {
    if (isOther || !deviceType) return [...genericIssues];
    const device = devices.find((d) => d.formDeviceType === deviceType);
    return device ? [...device.repairs.map((r) => r.name), "Other"] : [...genericIssues];
  }, [deviceType, isOther]);

  async function onSubmit(values: FormValues) {
    setPhase({ name: "submitting" });
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
          sourcePage: pathname,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const json = (await res.json()) as { ok: boolean; whatsappUrl: string };
      if (!json.ok) throw new Error("rejected");
      setPhase({ name: "success", whatsappUrl: json.whatsappUrl });
    } catch {
      setPhase({ name: "error" });
    }
  }

  if (phase.name === "success") {
    return (
      <div
        className="rounded-2xl border border-hairline bg-surface-raised p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/10">
          <Icon name="check" className="size-7 text-accent" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">Request received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-secondary">
          One more tap: send us the details on WhatsApp so we can reply with your
          free diagnosis slot.
        </p>
        <div className="mt-6">
          <Button
            href={phase.whatsappUrl}
            size="lg"
            target="_blank"
            rel="noopener"
            className="bg-[#25D366] text-white hover:bg-[#2BE070]"
          >
            <Icon name="whatsapp" className="size-5" />
            Send on WhatsApp
          </Button>
        </div>
        <p className="mt-4 text-xs text-secondary">
          Prefer to talk? Call{" "}
          <a href={business.phoneHref} className="link-underline font-medium text-primary">
            {business.phone}
          </a>
        </p>
      </div>
    );
  }

  if (phase.name === "error") {
    return (
      <div
        className="rounded-2xl border border-hairline bg-surface-raised p-8 text-center"
        role="alert"
      >
        <h3 className="text-xl font-semibold">That didn&apos;t go through</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-secondary">
          No problem — reach us directly and we&apos;ll take it from here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={business.phoneHref} size="lg">
            Call {business.phone}
          </Button>
          <Button
            href={`https://wa.me/${business.whatsappNumber}`}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener"
          >
            <Icon name="whatsapp" className="size-5 text-[#25D366]" />
            WhatsApp us
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setPhase({ name: "editing" })}
          className="link-underline mt-5 text-sm text-secondary"
        >
          Or try the form again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {/* honeypot — humans never see this */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Company
          <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Device type" required error={errors.deviceType?.message}>
          {(a11y) => (
            <select
              {...a11y}
              {...register("deviceType", {
                onChange: () => {
                  setValue("model", "");
                  setValue("issue", "");
                },
              })}
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>
                Choose a device
              </option>
              {deviceTypes.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          label="Model"
          required
          error={errors.model?.message}
          hint={!deviceType ? "Choose a device first" : undefined}
        >
          {(a11y) =>
            isOther ? (
              <input
                {...a11y}
                {...register("model")}
                type="text"
                placeholder="Tell us what it is"
                className={inputClass}
              />
            ) : (
              <select
                {...a11y}
                {...register("model")}
                disabled={!deviceType}
                className={inputClass}
                defaultValue=""
              >
                <option value="" disabled>
                  {deviceType ? "Choose your model" : "—"}
                </option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )
          }
        </Field>
      </div>

      <Field label="What's wrong?" required error={errors.issue?.message}>
        {(a11y) => (
          <select
            {...a11y}
            {...register("issue")}
            disabled={!deviceType}
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              {deviceType ? "Choose the issue" : "—"}
            </option>
            {issues.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Notes" error={errors.notes?.message}>
        {(a11y) => (
          <textarea
            {...a11y}
            {...register("notes")}
            rows={3}
            placeholder="Anything that helps — when it happened, what you've tried…"
            className={inputClass}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name?.message}>
          {(a11y) => (
            <input
              {...a11y}
              {...register("name")}
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
              className={inputClass}
            />
          )}
        </Field>

        <Field label="Phone" required error={errors.phone?.message}>
          {(a11y) => (
            <div className="flex">
              <span className="flex min-h-11 items-center rounded-l-xl border border-r-0 border-hairline bg-surface-raised px-3.5 text-sm text-secondary">
                +91
              </span>
              <input
                {...a11y}
                {...register("phone")}
                type="tel"
                inputMode="numeric"
                placeholder="90000 00000"
                autoComplete="tel-national"
                className={`${inputClass} rounded-l-none`}
              />
            </div>
          )}
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        {(a11y) => (
          <input
            {...a11y}
            {...register("email")}
            type="email"
            placeholder="jane.doe@example.com"
            autoComplete="email"
            className={inputClass}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
        <Field label="Address" error={errors.address?.message} hint="For doorstep pickup or delivery">
          {(a11y) => (
            <textarea
              {...a11y}
              {...register("address")}
              rows={2}
              autoComplete="street-address"
              className={inputClass}
            />
          )}
        </Field>
        <Field label="PIN" error={errors.pin?.message}>
          {(a11y) => (
            <input
              {...a11y}
              {...register("pin")}
              type="text"
              inputMode="numeric"
              placeholder="560034"
              autoComplete="postal-code"
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-0.5 size-5 accent-[var(--accent)]"
        />
        <span>
          I agree to be contacted about this repair.
          {errors.consent && (
            <span className="block text-xs font-medium text-red-600 dark:text-red-400">
              {errors.consent.message}
            </span>
          )}
        </span>
      </label>

      <div aria-live="polite">
        <Button
          type="submit"
          size="lg"
          disabled={consent !== true || phase.name === "submitting"}
          className="w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {phase.name === "submitting" ? "Sending…" : "Request my free diagnosis"}
        </Button>
      </div>
      <p className="text-xs text-secondary">
        We reply during opening hours ({business.hoursLine}). Your details go only
        to our repair team — nothing else.
      </p>
    </form>
  );
}
