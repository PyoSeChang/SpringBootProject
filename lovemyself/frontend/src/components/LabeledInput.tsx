// src/components/LabeledInput.tsx

interface Props {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LabeledInput({ label, name, value, onChange }: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: "100%", padding: "0.5rem" }}
      />
    </div>
  );
}
