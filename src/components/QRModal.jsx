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
      <div
        className="modal-card glass"
        style={{
          width: "320px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h3>Your QR Code</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <QRCodeSVG
            value={profileUrl}
            size={120}
            bgColor="transparent"
            fgColor="#ffffff"
          />
        </div>

        <p
          style={{
            fontSize: "13px",
            opacity: ".7",
            wordBreak: "break-all",
          }}
        >
          {profileUrl}
        </p>

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