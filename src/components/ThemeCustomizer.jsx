const presets = {
  minimal: {
    background: "#070b14",
    buttonColor: "#6d5dfc",
    radius: 18,
  },

  neon: {
    background: "#050816",
    buttonColor: "#14d9e5",
    radius: 22,
  },

  sunset: {
    background: "#1b1029",
    buttonColor: "#ff7b72",
    radius: 26,
  },
};

export default function ThemeCustomizer({
  theme,
  onChange,
  onPresetSelect,
}) {
  return (
    <div className="theme-editor">
      <h3>Theme</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "18px",
          flexWrap: "wrap",
        }}
      >
        <button
          className="add-btn"
          onClick={() =>
            onPresetSelect(
              presets.minimal
            )
          }
        >
          Minimal
        </button>

        <button
          className="add-btn"
          onClick={() =>
            onPresetSelect(
              presets.neon
            )
          }
        >
          Neon
        </button>

        <button
          className="add-btn"
          onClick={() =>
            onPresetSelect(
              presets.sunset
            )
          }
        >
          Sunset
        </button>
      </div>

      <div className="form-group">
        <label>
          Background Color
        </label>

        <input
          type="color"
          name="background"
          value={theme.background}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Button Color</label>

        <input
          type="color"
          name="buttonColor"
          value={theme.buttonColor}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>
          Border Radius
          ({theme.radius}px)
        </label>

        <input
          type="range"
          name="radius"
          min="0"
          max="40"
          value={theme.radius}
          onChange={onChange}
        />
      </div>
    </div>
  );
}