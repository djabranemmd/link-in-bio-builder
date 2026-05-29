import { useState } from "react";

export default function ShareButton({
  username,
}) {
  const [copied, setCopied] =
    useState(false);

  async function handleShare() {
    const shareUrl =
      `${window.location.origin}/${username}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${username}'s profile`,
          text: "Check out my profile",
          url: shareUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(
        shareUrl
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        className="add-btn"
        onClick={handleShare}
      >
        {copied
          ? "Copied ✓"
          : "Share Profile"}
      </button>
    </div>
  );
}