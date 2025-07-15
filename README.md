# Zairza Certificate & Badge Authority

This repository contains the issuer profile for all badges and certificates issued from Zairza, compliant with OpenBadges v2 standard [here](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#Profile).

## Website Structure

The website provides a simple interface to view and verify badges and certificates issued by Zairza.

### Features

- **Tabbed Navigation**: Switch between badges and certificates
- **Grid Layout**: View all available badges and certificates
- **Modal Details**: Click on any item to view detailed information
- **Modular Structure**: Each badge and certificate has its own folder for additional files

### File Structure

```
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # Main JavaScript functionality
├── badges.js           # Badge loading functionality
├── certificates.js      # Certificate loading functionality
├── badges/             # Folder containing all badges
│   ├── badge-name/        # Individual badge folder
│   │   └── metadata.json # Badge metadata (loaded dynamically)
├── certificates/       # Folder containing all certificates
│   ├── cert-name/     # Individual certificate folder
│   │   └── metadata.json # Certificate metadata (loaded dynamically)
└── assets/            # General assets like logos
```

### How to Add New Badges/Certificates

1. Create a new folder in the appropriate directory (badges/ or certificates/)
2. Add a metadata.json file with the badge/certificate details following the schema below
3. The website will automatically load the new badge/certificate on the next page load

#### Badge Metadata Example Schema

```json
{
  "@context": "https://w3id.org/openbadges/v2",
  "type": "BadgeClass",
  "id": "https://example.org/robotics-badge.json",
  "name": "Awesome Robotics Badge",
  "description": "For doing awesome things with robots that people think is pretty great.",
  "image": "https://example.org/robotics-badge.png",
  "criteria": "https://example.org/robotics-badge.html",
  "tags": ["robots", "awesome"],
  "issuer": "https://example.org/organization.json",
  "alignment": [
    { "targetName": "CCSS.ELA-Literacy.RST.11-12.3",
      "targetUrl": "http://www.corestandards.org/ELA-Literacy/RST/11-12/3",
      "targetDescription": "Follow precisely a complex multistep procedure when
      carrying out experiments, taking measurements, or performing technical
      tasks; analyze the specific results based on explanations in the text.",
      "targetCode": "CCSS.ELA-Literacy.RST.11-12.3"
    },
    { "targetName": "Problem-Solving",
      "targetUrl": "https://learning.mozilla.org/en-US/web-literacy/skills#problem-solving",
      "targetDescription": "Using research, analysis, rapid prototyping, and feedback to formulate a problem and develop, test, and refine the solution/plan.",
      "targetFramework": "Mozilla 21st Century Skills"
    }
  ]
}
```

#### Certificate Metadata Schema

```json
{
  "id": "unique-cert-id",
  "name": "Certificate Name",
  "description": "Certificate description",
  "image": "certificate-image.svg",
  "criteria": {
    "narrative": "Requirements to earn this certificate"
  },
  "issuer": {
    "name": "Zairza",
    "url": "https://zairza.in"
  },
  "skills": ["Skill1", "Skill2"],
  "issuedOn": "YYYY-MM-DD",
  "expires": "YYYY-MM-DD"
}
```

## License

This project is licensed under the MIT License.
