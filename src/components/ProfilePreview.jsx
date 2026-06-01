import { forwardRef } from "react";
import getLinkIcon from "../utils/getLinkIcon";

const fallbackAvatar =
  "https://via.placeholder.com/150";

const ProfilePreview = forwardRef(
  ({ profile, links = [], theme }, ref) => {
    return (
      <div
        ref={ref}
        className="profile-card glass"
      >
        <img
          key={profile.avatar}
          src={
            profile.avatar ||
            fallbackAvatar
          }
          alt="Profile"
          onError={(e) => {
            e.currentTarget.src =
              fallbackAvatar;
          }}
        />

        <h1>
          {profile.name ||
            "Your Name"}
        </h1>

        <p>
          {profile.bio ||
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
                  theme.buttonColor,
                borderRadius:
                  `${theme.radius}px`,
              }}
            >
              {getLinkIcon(
                link.url
              )}{" "}
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