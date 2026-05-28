import { QRCodeSVG } from "qrcode.react";

export default function QRModal({
  username,
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  const profileUrl =
    `${window.location.origin}/${username}`;

  return (
    <div className="modal-overlay">
      <div className="modal-card glass">
        <h3>Your QR Code</h3>

        <QRCodeSVG
          value={profileUrl}
          size={180}
          bgColor="transparent"
          fgColor="#ffffff"
        />

        <p>{profileUrl}</p>

        <button
          className="reset-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}