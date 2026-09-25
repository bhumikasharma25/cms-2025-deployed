export const Loader = ({ size = "24px" }: { size?: string }) => {
  const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  return (
    <div style={{ width: size, height: size, border: "2px solid #e5e7eb", borderTop: "2px solid #3b82f6", borderRadius: "50%", animation: `${spin} 1s linear infinite`, margin: "auto" }}>
    </div>
  );
};