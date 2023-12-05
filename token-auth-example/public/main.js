// All rights reserved by Trincher Oleksandr, 2023. For inquiries regarding copyright or coding issues, please contact me through Discord at 'oleksandrtrincher.

// initial startup
clickerAmount = JSON.parse(localStorage.getItem('clickAmount')) || 0;
clickerTimes = JSON.parse(localStorage.getItem('clickerTimes')) || 1;

function checkAndRemoveElement(elementId) {
    const removed = JSON.parse(localStorage.getItem(`${elementId}Removed`)) || false;
    if (removed) {
        const element = document.querySelector(`.${elementId}`);
        element.remove();
    }
};

// set variables
const clicker = document.querySelector('.clicker');
const output = document.querySelector('.count');
output.textContent = `Clicks: ${clickerAmount}`;
const clickDisplay = document.querySelector('.clicks');
clickDisplay.textContent = `CPC: ${clickerTimes}`;
const resetButton = document.querySelector('.reset');
const adminTrigger = document.querySelector('.admin-trigger');

const adminElementClassName = localStorage.getItem('adminElementClassName');

if (adminElementClassName) {
    const adminElement = document.querySelector(`.${adminElementClassName}`);
    adminElement.remove();
}

adminTrigger.addEventListener('click', () => {
    const clickAdmin = document.querySelector('.admin-panel').value;
    const clickAdminNumber = parseFloat(clickAdmin);

    clickerAmount += clickAdminNumber;

    output.textContent = clickerAmount;

    console.log('Updated clickerAmount:', clickAdminNumber);
});

// Define upgrades
const upgrades = [
    { id: 'upgrade-one', cost: 100, multiplier: 2 },
    {id: 'upgrade-two', cost: 1000, multiplier: 2}
];

// Initialize upgrades
upgrades.forEach(upgrade => {
    const element = document.querySelector(`.${upgrade.id}`);
    element.addEventListener('click', () => purchaseUpgrade(upgrade, clickDisplay));
    checkAndRemoveElement(upgrade.id);
});

// clicker code
clicker.addEventListener('click', () => {
    clickerAmount += Math.floor(clickerTimes);
    output.textContent = `Clicks: ${clickerAmount}`;
});

// auto save
setInterval(() => {
    localStorage.setItem('clickAmount', JSON.stringify(clickerAmount));
    localStorage.setItem('clickerTimes', JSON.stringify(clickerTimes));
    console.log('saved');
}, 10000);

// reset code
resetButton.addEventListener('click', () => resetToDefaults());

// Function to purchase an upgrade
function purchaseUpgrade(upgrade, clickDisplay) {
    if (clickerAmount >= upgrade.cost) {
        console.log(`Bought ${upgrade.id}`);
        clickerAmount -= upgrade.cost;
        clickerTimes += clickerTimes * upgrade.multiplier;

        // Update display elements
        clickDisplay.textContent = `CPC: ${clickerTimes}`;
        output.textContent = `Clicks: ${clickerAmount}`;

        // Save the updated state to localStorage
        localStorage.setItem('clickAmount', JSON.stringify(clickerAmount));
        localStorage.setItem('clickerTimes', JSON.stringify(clickerTimes));

        // Remove the upgrade element from the HTML
        const upgradeElement = document.querySelector(`.${upgrade.id}`);
        upgradeElement.remove();

        // Mark upgrade as removed in local storage
        localStorage.setItem(`${upgrade.id}Removed`, JSON.stringify(true));
    } else {
        console.error(`Not enough clickers for ${upgrade.id}`);
    }
};

// Function to reset to default values
function resetToDefaults() {
    const resetWarning = confirm('Are you sure you want to reset your progress?');

    if (resetWarning === true) {
        // Set default values
        clickerAmount = 0;
        clickerTimes = 1;

        // Update display elements
        output.textContent = `Clicks: ${clickerAmount}`;
        clickDisplay.textContent = `CPC: ${clickerTimes}`;

        // Save defaults to local storage
        localStorage.setItem('clickAmount', JSON.stringify(clickerAmount));
        localStorage.setItem('clickerTimes', JSON.stringify(clickerTimes));

        upgrades.forEach(upgrade => {
            upgrade.bought = false;

            const upgradeDisplay = document.querySelector(`.${upgrade.id}-display`);
            if (upgradeDisplay) {
                upgradeDisplay.textContent = 'Default Upgrade Value';
            }
        });

        upgrades.forEach(upgrade => {
            localStorage.removeItem(`${upgrade.id}Removed`);
            localStorage.removeItem(`${upgrade.id}Bought`);
        });

        console.log('Reset to defaults');

        window.location.reload();
    };
};

async function fetchAuthToken() {
    try {
        const response = await fetch('/getAuthToken'); // Adjust the endpoint
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error fetching authentication token:', error);
        return null;
    }
}

// Set HTTP-only cookie for authentication token
function setAuthTokenCookie(token) {
    document.cookie = `authToken=${token}; HttpOnly; SameSite=Strict; Secure`;
}