import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Job, JobStatus } from "@/lib/jobs-storage";
import { JOB_STATUSES } from "@/lib/jobs-storage";
import { todayISO } from "@/lib/jobs-utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Job, "id" | "createdAt" | "updatedAt">, id?: string) => void;
  editing?: Job | null;
};

const emptyForm = {
  company: "",
  role: "",
  location: "",
  salary: "",
  status: "Applied" as JobStatus,
  appliedDate: todayISO(),
  link: "",
  notes: "",
};

export function JobForm({ open, onOpenChange, onSave, editing }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setErrors({});
      if (editing) {
        setForm({
          company: editing.company,
          role: editing.role,
          location: editing.location ?? "",
          salary: editing.salary ?? "",
          status: editing.status,
          appliedDate: editing.appliedDate,
          link: editing.link ?? "",
          notes: editing.notes ?? "",
        });
      } else {
        setForm(emptyForm);
      }
    }
  }, [open, editing]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.company.trim()) errs.company = "Company is required";
    if (!form.role.trim()) errs.role = "Role is required";
    if (!form.appliedDate) errs.appliedDate = "Date is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave(
      {
        company: form.company.trim(),
        role: form.role.trim(),
        location: form.location.trim() || undefined,
        salary: form.salary.trim() || undefined,
        status: form.status,
        appliedDate: form.appliedDate,
        link: form.link.trim() || undefined,
        notes: form.notes.trim() || undefined,
      },
      editing?.id,
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Application" : "Add Application"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update the details of this application." : "Track a new job application."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Company *" error={errors.company}>
              <Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Corp" autoFocus />
            </Field>
            <Field label="Role *" error={errors.role}>
              <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Frontend Engineer" />
            </Field>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Location">
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Remote" />
            </Field>
            <Field label="Salary">
              <Input value={form.salary} onChange={(e) => set("salary", e.target.value)} placeholder="$150,000" />
            </Field>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Status">
              <Select value={form.status} onValueChange={(v) => set("status", v as JobStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {JOB_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Applied Date *" error={errors.appliedDate}>
              <Input type="date" value={form.appliedDate} onChange={(e) => set("appliedDate", e.target.value)} />
            </Field>
          </div>

          <Field label="Job Link">
            <Input value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="https://…" />
          </Field>

          <Field label="Notes">
            <Textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Interview prep, contacts, next steps…" />
          </Field>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-hero-gradient text-primary-foreground">
              {editing ? "Save Changes" : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
