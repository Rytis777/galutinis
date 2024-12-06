// Select the toggle button and body element
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Check localStorage for saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  updateButtonText();
}

// Add event listener for the toggle button
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  
  // Save the current theme to localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.setItem("theme", "");
  }

  updateButtonText();
});

// Update button text based on the current theme
function updateButtonText() {
  if (body.classList.contains("dark-mode")) {
    toggleButton.textContent = "Switch to Light Mode";
  } else {
    toggleButton.textContent = "Switch to Dark Mode";
  }
}

document.getElementById("submitButton").addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const additionalInfo = document.getElementById("additionalInfo").value;

  const userData = {
    firstName,
    lastName,
    email,
    phone,
    address,
    additionalInfo,
  };

  console.log(userData);

  // Atvaizduoti rezultatus
  const output = `
    <p><strong>Vardas Pavardė (el. pašto adresas):</strong> ${firstName} ${lastName} (${email})</p>
    <p><strong>Adresas:</strong><br>${address.replace(/\n/g, "<br>")}</p>
    <p><strong>Papildoma informacija:</strong> ${additionalInfo}</p>
  `;

  document.getElementById("output").innerHTML = output;
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const output = document.getElementById("output");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();
    const additionalInfo = form.additionalInfo.value.trim();

    let errors = [];

    // Tikriname el. paštą
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Netinkamas el. pašto adresas.");
    }

    // Tikriname telefoną (tik skaičiai, leidžiama + ženklas)
    if (!/^\+?\d{9,15}$/.test(phone)) {
      errors.push("Netinkamas telefono numeris. Įveskite nuo 9 iki 15 skaitmenų.");
    }

    // Tikriname adresą
    if (address.length < 5) {
      errors.push("Adresas turi būti bent 5 simbolių ilgio.");
    }

    // Tikriname papildomą informaciją (ar skaičius)
    if (isNaN(additionalInfo) || additionalInfo === "") {
      errors.push("Papildoma informacija turi būti skaičius.");
    }

    // Jei yra klaidų, išvedame jas
    if (errors.length > 0) {
      output.innerHTML = `<p class="error-message">${errors.join("<br>")}</p>`;
      return;
    }

    // Vidurkio apskaičiavimas
    const avgResult = parseFloat(additionalInfo);
    let avgColor = "green";

    if (avgResult < 5) {
      avgColor = "red";
    } else if (avgResult < 10) {
      avgColor = "orange";
    }

    // Išvedame rezultatus
    output.innerHTML = `
      <p><strong>Rezultatai:</strong></p>
      <p>Vardas: ${form.firstName.value.trim()}</p>
      <p>Pavardė: ${form.lastName.value.trim()}</p>
      <p>El. paštas: ${email}</p>
      <p>Telefonas: ${phone}</p>
      <p>Adresas: ${address}</p>
      <p style="color: ${avgColor};">Vidurkis: ${avgResult}</p>
    `;
  });
});

// Funkcija el. pašto adreso ir telefono numerio validacijai
document.getElementById("submitButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+-]+$/;

  let errorMessage = "";
  let successMessage = "";

  // Patikrina el. pašto adresą
  if (!emailRegex.test(email)) {
    errorMessage += "Neteisingas el. pašto formatas.<br>";
    document.getElementById("email").classList.add("error-input");
  } else {
    document.getElementById("email").classList.remove("error-input");
  }

  // Patikrina telefono numerį
  if (!phoneRegex.test(phone) || phone.length < 8) {
    errorMessage += "Neteisingas telefono numerio formatas.<br>";
    document.getElementById("phone").classList.add("error-input");
  } else {
    document.getElementById("phone").classList.remove("error-input");
  }

  // Jei nėra klaidų, rodomas sėkmės pranešimas
  if (errorMessage === "") {
    successMessage = "Duomenys sėkmingai išsiųsti!";
  }

  // Rezultato atvaizdavimas
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = errorMessage ? `<p class="error">${errorMessage}</p>` : `<p class="success">${successMessage}</p>`;
});

