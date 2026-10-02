// ======================================================
// KERNEL ARCHITECTURE LAB - FRONTEND JAVASCRIPT
// ======================================================


// ------------------------------------------------------
// 1. CURRENT ARCHITECTURE
// ------------------------------------------------------

let selectedArchitecture = "monolithic";


// ------------------------------------------------------
// 2. ARCHITECTURE SELECTION
// ------------------------------------------------------

function selectArchitecture(type) {

    selectedArchitecture = type;

    const monoButton = document.getElementById("monoBtn");
    const microButton = document.getElementById("microBtn");

    if (monoButton && microButton) {

        if (type === "monolithic") {

            monoButton.classList.add("active");
            microButton.classList.remove("active");

        } else {

            microButton.classList.add("active");
            monoButton.classList.remove("active");

        }
    }

    console.log("Selected architecture:", type);
}


// ------------------------------------------------------
// 3. SHOW MONOLITHIC ARCHITECTURE
// ------------------------------------------------------

function showMonolithic() {

    const monolithic = document.getElementById("monolithic");
    const microkernel = document.getElementById("microkernel");

    if (monolithic && microkernel) {

        monolithic.classList.remove("hidden");
        microkernel.classList.add("hidden");
    }

    selectedArchitecture = "monolithic";

    const monoButton = document.getElementById("monoBtn");
    const microButton = document.getElementById("microBtn");

    if (monoButton) {
        monoButton.classList.add("active");
    }

    if (microButton) {
        microButton.classList.remove("active");
    }
}


// ------------------------------------------------------
// 4. SHOW MICROKERNEL ARCHITECTURE
// ------------------------------------------------------

function showMicrokernel() {

    const monolithic = document.getElementById("monolithic");
    const microkernel = document.getElementById("microkernel");

    if (monolithic && microkernel) {

        monolithic.classList.add("hidden");
        microkernel.classList.remove("hidden");
    }

    selectedArchitecture = "microkernel";

    const monoButton = document.getElementById("monoBtn");
    const microButton = document.getElementById("microBtn");

    if (monoButton) {
        monoButton.classList.remove("active");
    }

    if (microButton) {
        microButton.classList.add("active");
    }
}


// ------------------------------------------------------
// 5. ARCHITECTURE REQUEST SIMULATION
// ------------------------------------------------------

async function simulateRequest() {

    const output = document.getElementById("simulationOutput");

    if (!output) {
        return;
    }

    output.innerHTML = "<p>Starting simulation...</p>";

    try {

        const response = await fetch(
            `http://localhost:3000/api/architecture/${selectedArchitecture}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Server error");
        }

        output.innerHTML = "";

        const steps = data.steps;

        steps.forEach((step, index) => {

            setTimeout(() => {

                const div = document.createElement("div");

                div.className = "step";

                div.innerHTML = "→ " + step;

                output.appendChild(div);

            }, index * 700);

        });

    } catch (error) {

        console.error(error);

        output.innerHTML = `
            <p style="color:red;">
                Backend connection failed.
                Make sure the Node.js server is running.
            </p>
        `;
    }
}


// ------------------------------------------------------
// 6. RESET ARCHITECTURE SIMULATION
// ------------------------------------------------------

function resetSimulation() {

    const output = document.getElementById("simulationOutput");

    if (output) {
        output.innerHTML = "";
    }
}


// ------------------------------------------------------
// 7. IPC / SYSTEM CALL SIMULATION
// ------------------------------------------------------

async function startSimulation() {

    const operationElement =
        document.getElementById("operation");

    const output =
        document.getElementById("simulationOutput");

    if (!operationElement || !output) {
        console.log("Required simulation elements not found.");
        return;
    }

    const operation = operationElement.value;

    if (!operation) {

        output.innerHTML = `
            <p>Please select an operation.</p>
        `;

        return;
    }

    output.innerHTML = `
        <p>Starting ${operation} simulation...</p>
    `;

    try {

        const response = await fetch(
            "http://localhost:3000/api/simulate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    architecture: selectedArchitecture,
                    operation: operation
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Simulation failed");
        }

        output.innerHTML = "";

        data.steps.forEach((step, index) => {

            setTimeout(() => {

                const div = document.createElement("div");

                div.className = "step";

                div.innerHTML =
                    `${index + 1}. ${step}`;

                output.appendChild(div);

            }, index * 700);

        });

    } catch (error) {

        console.error(error);

        output.innerHTML = `
            <p style="color:red;">
                Could not connect to backend.
            </p>
        `;
    }
}


// ------------------------------------------------------
// 8. FAULT SIMULATION
// ------------------------------------------------------

async function simulateFault() {

    const componentElement =
        document.getElementById("component");

    const result =
        document.getElementById("faultResult");

    if (!componentElement || !result) {
        return;
    }

    const component = componentElement.value;

    if (!component) {

        result.innerHTML = `
            <p>Please select a component.</p>
        `;

        return;
    }

    result.innerHTML = `
        <p>Simulating failure...</p>
    `;

    try {

        const response = await fetch(
            "http://localhost:3000/api/fault",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    architecture: selectedArchitecture,
                    component: component
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Fault simulation failed");
        }

        result.innerHTML = `
            <h3>${data.status}</h3>
            <p>${data.message}</p>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p style="color:red;">
                Backend connection failed.
            </p>
        `;
    }
}


// ------------------------------------------------------
// 9. RESET FAULT
// ------------------------------------------------------

function resetComponents() {

    const result =
        document.getElementById("faultResult");

    if (result) {
        result.innerHTML = "";
    }
}


// ------------------------------------------------------
// 10. RESTART COMPONENT
// ------------------------------------------------------

async function restartService() {

    const componentElement =
        document.getElementById("component");

    const result =
        document.getElementById("faultResult");

    if (!componentElement || !result) {
        return;
    }

    const component = componentElement.value;

    if (!component) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/fault/restart",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    architecture: selectedArchitecture,
                    component: component
                })
            }
        );

        const data = await response.json();

        result.innerHTML = `
            <h3>${data.status}</h3>
            <p>${data.message}</p>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p style="color:red;">
                Backend connection failed.
            </p>
        `;
    }
}