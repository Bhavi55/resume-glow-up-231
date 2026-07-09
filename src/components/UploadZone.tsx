import { useCallback, useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";

type Props = {
  onFile: (file: File) => void;
  disabled?: boolean;
  fileName?: string;
  onClear?: () => void;
};

export function UploadZone({ onFile, disabled, fileName, onClear }: Props) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      onFile(files[0]);
    },
    [onFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        if (disabled) return;
        handleFiles(e.dataTransfer.files);
      }}
      className={`glass relative rounded-3xl border-2 border-dashed p-10 text-center transition-all ${
        drag ? "border-primary/70 scale-[1.01]" : "border-border"
      } ${disabled ? "opacity-60" : ""}`}
    >
      {fileName ? (
        <div className="flex items-center justify-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-hero-gradient">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-left">
            <p className="font-medium">{fileName}</p>
            <p className="text-xs text-muted-foreground">Ready to analyze</p>
          </div>
          {onClear && (
            <button
              onClick={onClear}
              className="glass ml-4 grid h-9 w-9 place-items-center rounded-full hover:bg-destructive/20"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-hero-gradient glow">
            <Upload className="h-7 w-7 text-primary-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold">
            Drop your resume here
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            PDF or DOCX · up to 10MB · processed locally in your browser
          </p>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-hero-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground glow transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            Choose file
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}
    </div>
  );
}
