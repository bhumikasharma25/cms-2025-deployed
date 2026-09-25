import { Input as BaseInput } from "react-native-web";

export const Input = ({ type = "text", placeholder, value, onChange }: {
  type?: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <BaseInput type={type} placeholder={placeholder} value={value} onChange={handleOnChange} style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", fontSize: "16px" }} />
  );
};