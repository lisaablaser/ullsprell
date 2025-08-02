document.addEventListener("DOMContentLoaded", () => {
  const injectPartials = async () => {
    try {
      const ids = [
        ["header", "header.html"],
        ["footer", "footer.html"]
      ];

      for (const [id, file] of ids) {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
      }
    } catch (err) {
      console.error(err);
    } finally {
      document.body.style.opacity = "1";
    }
  };

  injectPartials();

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.style.display = "block";
      form.reset();
    });
  }
});
