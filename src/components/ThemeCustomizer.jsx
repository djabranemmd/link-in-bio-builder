export default function ThemeCustomizer({
  theme,
  onChange,
}) {
  return (
    <div className="theme-editor">
      <h3>Theme</h3>

      <div className="form-group">
        <label>Background Color</label>

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
          Border Radius ({theme.radius}px)
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