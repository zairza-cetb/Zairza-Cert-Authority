// Static badge data
const badges = [
  {
    id: "http://certify.zairza.co.in/badges/skillpp25wk1/metadata.json",
    title: "Skill++ Week 0",
    description: "For completing week-1 of Skill++",
    image: "https://skillspp2k25.vercel.app/assets/week0-BZc6ZB8D.png",
    criteria: "http://certify.zairza.co.in/index.html",
    tags: ["Zairza", "skill++"],
    alignment: [
      {
        targetName: "Skill-Development",
        targetUrl: "https://skillspp.zairza.co.in/",
        targetDescription:
          "Gain expert knowledge, hands-on experience, boost your skills in various tech domains.",
        targetFramework: "Zairza Skills++",
      },
    ],
    folder: "badges/skillpp25wk1",
  },
];

// Static certificate data
const certificates = [
  {
    id: "cert1",
    title: "Full Stack Development",
    description:
      "Certification for completing the full stack development bootcamp",
    image: "https://via.placeholder.com/300x200?text=Full+Stack+Development",
    issueDate: "2023-04-25",
    expiration: "2026-04-25",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    criteria:
      "Successfully complete all modules of the full stack development bootcamp including final project",
    tags: ["Web Development", "Full Stack"],
    folder: "certificates/full-stack",
  },
];

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Populate grids
  populateGrid("badges-grid", badges);
  populateGrid("certificates-grid", certificates);

  // Set up modal close button
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  });
});

// Function to show the selected tab
function showTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((tab) => tab.classList.remove("active"));

  // Deactivate all tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => btn.classList.remove("active"));

  // Show the selected tab content
  document.getElementById(tabId).classList.add("active");

  // Activate the clicked tab button
  document
    .querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`)
    .classList.add("active");
}

// Function to populate grid with items
function populateGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = ""; // Clear existing content

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    // Create card content with image if available
    let cardContent = "";
    if (item.image) {
      cardContent += `<div class="card-image"><img src="${item.image}" alt="${item.title}"></div>`;
    }

    cardContent += `
            <h3>${item.title}</h3>
            <p>${item.description.substring(0, 60)}${
      item.description.length > 60 ? "..." : ""
    }</p>
        `;

    // Add tags if available
    if (item.tags && item.tags.length > 0) {
      cardContent += `<div class="tags">${item.tags
        .slice(0, 3)
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("")}</div>`;
    }

    card.innerHTML = cardContent;

    // Add click event to open modal
    card.addEventListener("click", () => openModal(item));

    grid.appendChild(card);
  });
}

// Function to open modal with item details
function openModal(item) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  // Determine if it's a badge or certificate
  const isCertificate = item.hasOwnProperty("skills");

  // Create modal content
  let content = `
        <div class="modal-details">
    `;

  // Add image if available
  if (item.image) {
    content += `<div class="modal-image"><img src="${item.image}" alt="${item.title}"></div>`;
  }

  content += `
            <h2>${item.title}</h2>
            <p class="description">${item.description}</p>
    `;

  // Add tags if available
  if (item.tags && item.tags.length > 0) {
    content += `
            <div class="tags-container">
                <strong>Tags:</strong>
                <div class="tags">
                    ${item.tags
                      .map((tag) => `<span class="tag">${tag}</span>`)
                      .join("")}
                </div>
            </div>
        `;
  }

  if (item.issueDate) {
    content += `<p><strong>Issue Date:</strong> ${formatDate(
      item.issueDate
    )}</p>`;
  }

  if (isCertificate) {
    if (item.expiration) {
      content += `<p><strong>Expiration Date:</strong> ${formatDate(
        item.expiration
      )}</p>`;
    }
    if (item.skills && item.skills.length > 0) {
      content += `<p><strong>Skills:</strong> ${item.skills.join(", ")}</p>`;
    }
  }

  // Add criteria
  if (item.criteria) {
    content += `<p><strong>Criteria:</strong> ${item.criteria}</p>`;
  }

  // Add alignment if available (for badges)
  if (item.alignment && item.alignment.length > 0) {
    content += `
            <div class="alignment">
                <h3>Alignments</h3>
                ${item.alignment
                  .map(
                    (align) => `
                    <div class="alignment-item">
                        <p><strong>${align.targetName}</strong></p>
                        <p>${align.targetDescription || ""}</p>
                        ${
                          align.targetFramework
                            ? `<p class="meta">Framework: ${align.targetFramework}</p>`
                            : ""
                        }
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  content += `
            <p class="meta"><strong>ID:</strong> ${item.id}</p>
        </div>
    `;

  modalBody.innerHTML = content;
  modal.style.display = "block";
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Helper function to format dates
function formatDate(dateString) {
  if (!dateString) return null;
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (err) {
    console.error("Error formatting date:", err);
    return dateString; // Return the original string if parsing fails
  }
}
