export default function Builder() {
  return (
    <main className="app-shell">
      <div className="aurora aurora-1"></div>
      <div className="aurora aurora-2"></div>

      <div className="container">
        <section className="editor-panel glass">
          <h2>Link-in-Bio Builder</h2>

          <p>
            Builder page — profile editor will live here.
          </p>
        </section>

        <section className="preview-panel">
          <div className="profile-card glass">
            <h1>Live Preview</h1>

            <p>
              Public profile preview will appear here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}