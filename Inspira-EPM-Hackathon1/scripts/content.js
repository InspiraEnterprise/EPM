
const overlayData = [
    /*for the Create Configuration Button*/
    {
        selector: "[aria-label='Create Configuration']",
        content: "Configure Data Collection",
        tooltipDirection: "left"
        
    },
    /*for the sub-pages aws, Google, Azure*/
    {
        /*for Aws*/
        selector: "[href='/data-sources/data-collectors/AWS']",
        content: "Connect to AWS",
        tooltipDirection: "bottom"
    },
    {
        /*for Azure*/
        selector: "[href='/data-sources/data-collectors/AZURE']",
        content: "Connect to Azure",
        tooltipDirection: "top"
    },
    {
        /*for GCP*/
        selector: "[href='/data-sources/data-collectors/GCP']",
        content: "Connect to GCP",
        tooltipDirection: "top"
    },
    /* for Dashboard*/
    {
        selector: "[href='/home']",
        content: "Get Overview Of your Multi Cloud Infrastructure",
        tooltipDirection: "top"
    },
    /* for Analytics*/
    {
        selector: "[href='/analytics/users']",
        content: "Identify And Evaluate your Infrastructure Risk Using Analytics ",
        tooltipDirection: "top"
    },
    /*for Remediation*/
    {
        selector: "[href='/remediation/roles-policies']",
        content: "Remediate and Manage Identities",
        tooltipDirection: "top"
    },
    /*for Autopilot*/
    {
        selector: "[href='/autopilot']",
        content: "Automatically get recommendations on risky identities",
        tooltipDirection: "top"
    },
    /*for Audit*/
    {
        selector: "[href='/audit']",
        content: "Get audit reports on activities across your multicloud",
        tooltipDirection: "top"
    },
    /*for Report*/
    {
        selector: "[href='/reports/system']",
        content: "Customize and Download Reports",
        tooltipDirection: "top"
    },
    /*got Help*/
    {
        selector: "[href='https://docs.microsoft.com/azure/active-directory/cloud-infrastructure-entitlement-management']",
        content: "Get more Help",
        tooltipDirection: "top"
    },
    /*for configure*/
    {
        selector: "[href='/data-sources/authorization-systems/']",
        content: "View status of Authorization Systems",
        tooltipDirection: "top"
    },
    {
        selector: "[href='/data-sources/authorization-systems']",
        content: "Configure Authorization System",
        tooltipDirection: "left"
    },
    /*for monitor*/
    {
        selector: "[href='/alerts/activity']",
        content: "Continous Monitoring and Alerting details are captured here",
        tooltipDirection: "left"
    },
    /* for Activity*/
    {
        selector: "[aria-label='Tasks']",
        content: "Activity Status",
        tooltipDirection: "left"
    },
];

function generateHelper() {
    console.log("Generating helper");
    // generate the visual clippy in the bottom right

    const clippy = document.createElement("div");
    clippy.classList.add("clippy");
    console.log("getting helper image url");
    var helperImageUrl = chrome.runtime.getURL("images/clip.webp");
    console.log(helperImageUrl);
    clippy.innerHTML = `<div class="helper-container">
        <img src="${helperImageUrl}" alt="helper">
    </div>`;
    document.body.appendChild(clippy);

}

function generateInfoBox(foundElement, targetElementData) {
    const infoBox = document.createElement("div");
    infoBox.classList.add("epmg-tooltip");

    const container = document.createElement("div");
    container.classList.add("epmg-tooltipcontainer");
    container.classList.add(`${targetElementData.tooltipDirection}`);
    container.innerHTML = `<span class="epmg-tooltiptext">${targetElementData.content}</span>`;

    infoBox.appendChild(container);
    foundElement.appendChild(infoBox);
    foundElement.classList.add("epmg-tooltip");
}

async function findAttachableItems(attempts, timeoutId) {
    if (!attempts) attempts = 0;
    if (attempts > 3) { console.log("too many attempts, ending"); clearTimeout(timeoutId); return; }

    overlayData.forEach(async (targetElementData) => {
        const targetElements = document.querySelectorAll(targetElementData.selector);
        if (targetElements.length === 0) {
            attempts++;
            var nextTimeout = attempts * 6000;

            console.log(`no elements found for ${targetElementData.selector}, retrying in ${nextTimeout / 1000} seconds`);
            var timeoutId = setTimeout(function () { findAttachableItems(attempts); }, nextTimeout, timeoutId);
            return;
        }
        console.log(`found ${targetElements.length} elements`);

        targetElements.forEach((foundElement) => {
            console.log(`generating infobox for ${foundElement.nodeValue}`);
            generateInfoBox(foundElement, targetElementData);
        });
    });
}

function init() {
    generateHelper();
    findAttachableItems(0, 0);
}

setTimeout(init, 5000);

