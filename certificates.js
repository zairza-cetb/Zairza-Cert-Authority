// Fallback certificate data in case dynamic loading fails
const fallbackCertificates = [
    {
        id: 'cert1',
        title: 'Full Stack Development',
        description: 'Certification for completing the full stack development bootcamp',
        issueDate: '2023-04-25',
        expiration: '2026-04-25',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        folder: 'certificates/full-stack'
    },
    {
        id: 'cert2',
        title: 'Data Science',
        description: 'Certification for mastering data science fundamentals',
        issueDate: '2023-08-05',
        expiration: '2026-08-05',
        skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
        folder: 'certificates/data-science'
    },
    {
        id: 'cert3',
        title: 'Cloud Computing',
        description: 'Certification for cloud architecture and deployment',
        issueDate: '2023-09-15',
        expiration: '2026-09-15',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        folder: 'certificates/cloud'
    }
];

// Function to load certificate data from metadata.json files
async function loadCertificates() {
    try {
        // Get list of certificate directories
        const response = await fetch('certificates/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
            .filter(a => a.href.endsWith('/') && !a.href.includes('..'))
            .map(a => a.href.split('/').filter(Boolean).pop());

        // Load metadata from each directory
        const certificates = await Promise.all(links.map(async (dir) => {
            try {
                const response = await fetch(`certificates/${dir}/metadata.json`);
                const data = await response.json();
                return {
                    id: data.id || `cert-${dir}`,
                    title: data.name,
                    description: data.description,
                    image: data.image || '',
                    issueDate: data.issuedOn,
                    expiration: data.expires,
                    skills: data.skills || [],
                    criteria: data.criteria?.narrative || data.criteria || '',
                    tags: data.tags || [],
                    folder: `certificates/${dir}`
                };
            } catch (err) {
                console.error(`Error loading certificate from ${dir}:`, err);
                return null;
            }
        }));

        const loadedCertificates = certificates.filter(cert => cert !== null);
        return loadedCertificates.length > 0 ? loadedCertificates : fallbackCertificates;
    } catch (err) {
        console.error('Error loading certificates:', err);
        return fallbackCertificates;
    }
}