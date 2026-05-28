export default function ShareButton({
  username,
}) {
  function handleShare() {
    const shareUrl = `${window.location.origin}/${username}`;

    navigator.clipboard.writeText(
      shareUrl
    );

    alert("Profile link copied to clipboard");
  }

  return (
    <button
      className="reset-btn"
      onClick={handleShare}
    >
      Share Profile
    </button>
  );
}