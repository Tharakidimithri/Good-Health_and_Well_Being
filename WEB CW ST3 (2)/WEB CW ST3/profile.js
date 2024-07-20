let steps = {
    1: [
        { question: "Your name", type: "text" },
        { question: "Your surname", type: "text" },
        { question: "Your age", type: "number" },
        { question: "Gender", type: "radio", options: ["Male", "Female", "Other"] },
        
    ],
    2: [
        { question: "Rationale", type: "text" },
        { question: "Date of Assignment", type: "date" },
        { question: "Task", type: "text" },
        { question: "Place", type: "text" },
        { question: "Assignment type", type: "text" }
    ],
    3: [
        { question: "Area of study", type: "text" },
        { question: "Highest degree", type: "text" },
        { question: "University/Institute", type: "text" },
        { question: "Completion year", type: "number" },
        { question: "Country", type: "text" }
    ],
    4: [
        { question: "Available for volunteering (min-max hours)", type: "range", min: 0, max: 40 },
        { question: "Telephone number", type: "tel" },
        { question: "Email", type: "email" }
    ]
};

let currentStep = 1;
let currentPrompt = 0;
let profile = {};
let stepProgress = { 1: 0, 2: 0, 3: 0, 4: 0 };

function startProfile() {
    profile = {};
    currentStep = 1;
    currentPrompt = 0;
    stepProgress = { 1: 0, 2: 0, 3: 0, 4: 0 };
    document.querySelector('.button_par').innerHTML = '';
    document.querySelector('.profile_output').innerHTML = '';
    document.querySelector('.progress').style.width = '0%';
    showPrompt();
}

function showPrompt() {
    const container = document.querySelector('.form-container');
    container.innerHTML = '';
    if (currentPrompt < steps[currentStep].length) {
        const prompt = steps[currentStep][currentPrompt];
        const label = document.createElement('label');
        label.innerText = prompt.question;
        container.appendChild(label);
        if (prompt.type === 'radio') {
            prompt.options.forEach(option => {
                const radioContainer = document.createElement('div');
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = prompt.question;
                radioInput.value = option;
                if (profile[prompt.question] === option) {
                    radioInput.checked = true;
                }
                radioInput.onchange = function() {
                    profile[prompt.question] = option;
                };
                radioContainer.appendChild(radioInput);
                radioContainer.appendChild(document.createTextNode(option));
                container.appendChild(radioContainer);
            });
        } else if (prompt.type === 'range') {
            const rangeInput = document.createElement('input');
            rangeInput.type = 'range';
            rangeInput.min = prompt.min;
            rangeInput.max = prompt.max;
            rangeInput.step = 1;
            rangeInput.value = profile[prompt.question] || prompt.min;
            rangeInput.oninput = function() {
                profile[prompt.question] = rangeInput.value;
            };
            container.appendChild(rangeInput);
        } else {
            const input = document.createElement('input');
            input.type = prompt.type;
            if (prompt.type === 'tel') {
                input.pattern = "\\d{10}";
                input.title = "10-digit phone number";
            } else if (prompt.type === 'email') {
                input.pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}";
                input.title = "Valid email address";
            }
            input.value = profile[prompt.question] || '';
            input.onchange = function() {
                profile[prompt.question] = input.value;
            };
            container.appendChild(input);
        }
    } else {
        container.innerHTML = 'Step complete!';
    }
    updateNavigationButtons();
    updateProfileOutput();
    updateProgress();
}


function nextPrompt() {
    if (validateInput()) {
        currentPrompt++;
        if (currentPrompt >= steps[currentStep].length) {
            currentPrompt = 0;
            currentStep++;
        }
        showPrompt();
    }
}

function prevPrompt() {
    if (currentPrompt > 0) {
        currentPrompt--;
    } else if (currentStep > 1) {
        currentStep--;
        currentPrompt = steps[currentStep].length - 1;
    }
    showPrompt();
}

function skipPrompt() {
    currentPrompt++;
    if (currentPrompt >= steps[currentStep].length) {
        currentPrompt = 0;
        currentStep++;
    }
    showPrompt();
}

function validateInput() {
    const container = document.querySelector('.form-container');
    const input = container.querySelector('input');
    if (input && !input.checkValidity()) {
        input.classList.add('error');
        return false;
    }
    return true;
}

function goToStep(step) {
    currentStep = step;
    currentPrompt = 0;
    showPrompt();
}

function updateProfileOutput() {
    let output = document.getElementsByClassName("profile_output")[0];
    output.innerHTML = "";
    for (let key in profile) {
        output.innerHTML += `<p><strong>${key}:</strong> ${profile[key]}</p>`;
    }
}

function updateProgress() {
    let totalPrompts = Object.values(steps).flat().length;
    let completedPrompts = Object.keys(profile).length;
    let progress = (completedPrompts / totalPrompts) * 100;
    let progressElement = document.getElementsByClassName("progress")[0];
    progressElement.style.width = progress + "%";
}

function logout() {
    profile = {};
    currentStep = 1;
    currentPrompt = 0;
    stepProgress = { 1: 0, 2: 0, 3: 0, 4: 0 };
    document.getElementsByClassName("button_par")[0].innerHTML = "";
    document.getElementsByClassName("profile_output")[0].innerHTML = "";
    document.getElementsByClassName("progress")[0].style.width = "0%";
    document.querySelector('.form-container').innerHTML = '';
}

function updateNavigationButtons() {
    document.querySelector('.prev').style.display = currentStep > 1 || currentPrompt > 0 ? 'inline-block' : 'none';
    document.querySelector('.next').style.display = currentPrompt < steps[currentStep].length ? 'inline-block' : 'none';
    document.querySelector('.skip').style.display = currentPrompt < steps[currentStep].length ? 'inline-block' : 'none';
}
