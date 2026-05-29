import { forwardRef } from "react";
import getLinkIcon from "../utils/getLinkIcon";

const ProfilePreview = forwardRef(
  ({ profile, links = [], theme }, ref) => {
    return (
      <div
        ref={ref}
        className="profile-card glass"
      >
        <img
          src={
            profile?.avatar ||
            "https://via.placeholder.com/150"
          }
          alt={profile?.name || "Profile"}
        />

        <h1>
          {profile?.name || "Your Name"}
        </h1>

        <p>
          {profile?.bio ||
            "Your bio will appear here"}
        </p>

        <div className="links-wrapper">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url || "#"}
              className="link-button"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor:
                  theme?.buttonColor ||
                  "#6d5dfc",

                borderRadius: `${
                  theme?.radius || 18
                }px`,
              }}
            >
              {getLinkIcon(link.url)}{" "}
              {link.title ||
                "Untitled Link"}
            </a>
          ))}
        </div>
      </div>
    );
  }
);

export default ProfilePreview;