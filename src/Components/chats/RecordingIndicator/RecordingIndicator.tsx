export default function RecordingIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="text-white text-sm italic animate-pulse">recording...</div>
  );
}
