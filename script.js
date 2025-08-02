document.addEventListener("DOMContentLoaded", () => {
   const basePath = window.location.pathname.includes("/gallery/") 
    ? "../" 
    : "./";


  const injectPartials = async () => {
    try {
      const ids = [["header", `${basePath}header.html`], ["footer", `${basePath}footer.html`]];
      for (const [id, file] of ids) {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
      }
      document.body.style.opacity = "1";
    } catch (err) {
      console.error(err);
      document.body.style.opacity = "1";
    }
  };

  injectPartials();
  // Load common layout
  ["header", "footer"].forEach(id => {
    fetch(`/${id}.html`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${id}.html`);
        return res.text();
      })
      .then(html => {
        document.getElementById(id).innerHTML = html;
      })
      .catch(err => console.error(err));
  });

  
  console.log("Ullsprell site loaded.");

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent page reload
      status.style.display = "block";
      form.reset();
    });
  }
});
