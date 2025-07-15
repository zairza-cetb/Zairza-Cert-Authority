// Fallback badge data in case dynamic loading fails
const fallbackBadges = [
    {
        id: 'badge1',
        title: 'Web Development',
        description: 'Awarded for excellence in web development',
        issueDate: '2023-05-15',
        criteria: 'Complete web development course with distinction',
        folder: 'badges/web-dev'
    },
    {
        id: 'badge2',
        title: 'Machine Learning',
        description: 'Awarded for completing machine learning projects',
        issueDate: '2023-06-20',
        criteria: 'Successfully implement 3 ML algorithms',
        folder: 'badges/machine-learning'
    },
    {
        id: 'badge3',
        title: 'UI/UX Design',
        description: 'Awarded for creating exceptional user interfaces',
        issueDate: '2023-07-10',
        criteria: 'Design and prototype a complete application',
        folder: 'badges/ui-ux'
    }
];

// Function to load badge data from metadata.json files
async function loadBadges() {
    try {
        // Get list of badge directories
        const response = await fetch('badges/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
            .filter(a => a.href.endsWith('/') && !a.href.includes('..'))
            .map(a => a.href.split('/').filter(Boolean).pop());

        // Load metadata from each directory
        const badges = await Promise.all(links.map(async (dir) => {
            try {
                const response = await fetch(`badges/${dir}/metadata.json`);
                const data = await response.json();
                return {
                    id: data.id || `badge-${dir}`,
                    title: data.name,
                    description: data.description,
                    image: data.image || '',
                    issueDate: data.issuedOn,
                    criteria: data.criteria?.narrative || data.criteria || '',
                    tags: data.tags || [],
                    alignment: data.alignment || [],
                    folder: `badges/${dir}`
                };
            } catch (err) {
                console.error(`Error loading badge from ${dir}:`, err);
                return null;
            }
        }));

        const loadedBadges = badges.filter(badge => badge !== null);
        return loadedBadges.length > 0 ? loadedBadges : fallbackBadges;
    } catch (err) {
        console.error('Error loading badges:', err);
        return fallbackBadges;
    }
}