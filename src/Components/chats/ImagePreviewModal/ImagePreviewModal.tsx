export default function ImagePreviewModal({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img src={src} className="max-h-[90vh] max-w-[90vw] rounded-lg" />
    </div>
  );
}
