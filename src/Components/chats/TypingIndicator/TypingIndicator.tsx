export default function TypingIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="text-white text-sm italic animate-pulse">typing...</div>
  );
}
