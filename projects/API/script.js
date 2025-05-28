'use strict';

// Disclaimer! All Bootstrap är från chatGPT då jag inte visste vad allt hette. Detta för mig var den snabbaste vägen att använda bootstrap. Frågade alltid vad jag var ute efter och upplevde att jag alltid fick tillbaka grejer som fungerade.

// Hämtar body och ändrar bg-färg till ljusgrå från bootstrap
document.querySelector('body').classList.add('bg-light');

// Ser till att koden körs efter att hela sidan har laddats klart.
window.addEventListener('load', function() {
    // Anropar funktionen för att skapa modalen
    createModal();
    // Anropar funktionen för att skapa formuläret
    createWorkoutForm();
});

// Skapar funktionen för att skapa formuläret
function createWorkoutForm() {
    
    let card = document.createElement('div'); // Skapar upp ett kort till formuläret
    card.classList.add('card', 'mx-auto', 'm-5', 'p-5', 'w-75'); // Bootstrap

    // Skapar upp form-element till formuläret
    let workoutForm = document.createElement('form');
    workoutForm.id = 'workoutForm'; // Ger formuläret ett ID för referens till inputsen.

    // Skapar H1 header till kortet
    let heading = document.createElement('h1');
    heading.textContent = 'Exercise Generator'; 
    heading.classList.add('text-center'); 
    workoutForm.appendChild(heading);

    // Skapar en p-tagg med kort info under H1
    let formInfo = document.createElement('p');
    formInfo.textContent = 'Fill in any desired search fields. Click "Possible Values" for help.';
    formInfo.classList.add('text-center');
    workoutForm.appendChild(formInfo);

    // Label och input type = 'text' till 'name'
    createInputField(workoutForm, 'Name of exercise:', 'name', 'e.g. Dumbbell Bench Press');

    // Label och input type = 'text' till 'type'
    createInputField(workoutForm, 'Type of exercise:', 'type', 'e.g. cardio, powerlifting, strength');

    // Label och input type = 'text' till 'muscle'
    createInputField(workoutForm, 'Muscle group:', 'muscle', 'e.g. biceps, calves, chest, triceps');

    // Label och input type = 'text' till 'difficulty'
    createInputField(workoutForm, 'Difficulty:', 'difficulty', 'e.g. beginner, intermediate, expert');

    // Label och input type = 'text' till 'offset'
    createInputField(workoutForm, 'Offset:', 'offset', 'Default is 0');

    // Submit-knapp till formuläret
    let button = document.createElement('button');
    button.textContent = 'Submit';
    button.classList.add('btn', 'btn-primary', 'w-100', 'mt-3', 'm-1');
    workoutForm.appendChild(button);

    // Appendar kortet med formuläret
    card.appendChild(workoutForm);
    document.body.appendChild(card);

    // Lyssnare till submit-knappen
    workoutForm.addEventListener('submit', function (event) {
        // funktionen körs vid submit
        handleFormSubmit(event, workoutForm);
    });
}

/* 
Funktion för att skapa en label och input type = "text"
Referenser som ska skickas med:
form = referens till formulär
labelText = label till input
inputId = Id och name till input samt for till label
placeholderText = hjälpande text innuti input
*/ 
function createInputField(form, labelText, inputId, placeholderText) {
    let label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', inputId);
    label.classList.add('m-1', 'p-1');
    form.appendChild(label);

    let input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
    input.name = inputId;
    input.placeholder = placeholderText;
    input.classList.add('form-control', 'm-1', 'p-1');
    form.appendChild(input);
}

// kopierade html-kod från "Large modal" https://getbootstrap.com/docs/4.0/components/modal/ och bad chatGPT skriva om den till JavaScript. Lade sedan in innehållet i modalen för hand. Kryss-ruta saknas, men modalen försvinner om man trycker utanför modalen.  

function createModal() {
    // Skapar knappen till modalen
    let infoBtn = document.createElement('button');
    infoBtn.type = 'button';
    infoBtn.classList.add('btn', 'btn-primary', 'm-3');
    infoBtn.textContent = 'Possible Values';
    infoBtn.setAttribute('data-toggle', 'modal');
    infoBtn.setAttribute('data-target', '.bd-example-modal-lg');

    // Skapar modal container
    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'fade', 'bd-example-modal-lg');
    modalContainer.tabIndex = '-1';
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-labelledby', 'myLargeModalLabel');
    modalContainer.setAttribute('aria-hidden', 'true');

    // Skapar modal dialog
    let modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog', 'modal-lg');
    modalContainer.appendChild(modalDialog);

    // Skapar innehållet till modalen
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalDialog.appendChild(modalContent);

    // Skapar header till modalen med en titel
    let modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Possible Values';
    modalHeader.appendChild(modalTitle);

    // Skapar modalens body med body text
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalContent.appendChild(modalBody);

    // Modalens undertitlar (subHeadings) och brödtext (bodyTexts) i form av två arrays. Fyll på eller ändra innehållet i modalen här. 
    let subHeadings = [
        'Name of exercise (optional)',
        'Exercise Type (optional)',
        'Muscle Group (optional)',
        'Difficulty (optional)',
        'Offset (optional)'
    ];

    let bodyTexts = [
        // Name of exercise
        'This value can be partial (e.g. press will match Dumbbell Bench Press)',
        // Exercise Type
        'Possible values are: cardio, olympic_weightlifting, plyometrics, powerlifting, strength, stretching, strongman',
        // Muscle Group
        'muscle group targeted by the exercise. Possible values are: abdominals, abductors, adductors, biceps, calves, chest, forearms, glutes, hamstrings, lats, lower_back, middle_back, neck, quadriceps, traps, triceps',
        // Difficulty
        'Difficulty level of the exercise. Possible values are: beginner, intermediate, expert',
        // Offset
        'Number of results to offset for pagination. Default is 0.'
    ];

    // for-loop för att skriva ut titlarna och texten i modalen. For-loopen itererar igenom hela subHeading. 
    for (let i = 0; i < subHeadings.length; i++) {
        // Skriver först ut titeln
        let subHeading = document.createElement('h6');
        subHeading.textContent = subHeadings[i];
        modalBody.appendChild(subHeading);
        // Sedan skrivs innehållet ut under titeln
        let bodyText = document.createElement('p');
        bodyText.textContent = bodyTexts[i];
        modalBody.appendChild(bodyText);
    }

    // Appenda modal-knapp och modal
    document.body.appendChild(infoBtn);
    document.body.appendChild(modalContainer);
}

// Funktion för att visa upp resultatet
function displayResultCard(result) {
    // Skapar upp ett kort till resultatet
    let resultCard = document.createElement('div');
    resultCard.id = 'resultCard';
    resultCard.classList.add('card', 'mx-auto', 'm-5', 'p-5', 'w-75');

    // Skapar H2-tagg 
    let resultHeading = document.createElement('h2');
    resultHeading.textContent = 'Result';
    resultHeading.classList.add('mx-auto');
    resultCard.appendChild(resultHeading);

    // Intererar genom resultatet och visar upp varje item
    for (let i = 0; i < result.length; i++) {
        let item = result[i];
        // Skapar upp ett kort för varje item
        let itemCard = document.createElement('div');
        itemCard.classList.add('card', 'mx-auto', 'm-5', 'p-5', 'w-100');

        // Skapar upp en H4 till namnet på övningen
        let title = document.createElement('h4');
        title.textContent = item.name;
        itemCard.appendChild(title);

        // Skapar upp H6:or till p-elementen från DOM:en osv
        let equipmentHeading = document.createElement('h6');
        equipmentHeading.textContent = 'Equipment:';
        itemCard.appendChild(equipmentHeading);

        // Skapar upp p-tagg till tillhörande H6:a 
        let equipment = document.createElement('p');
        equipment.textContent = item.equipment; 
        itemCard.appendChild(equipment);

        let muscleHeading = document.createElement('h6');
        muscleHeading.textContent = 'Muscle Group:';
        itemCard.appendChild(muscleHeading);

        let muscle = document.createElement('p');
        muscle.textContent = item.muscle;
        itemCard.appendChild(muscle);

        let typeHeading = document.createElement('h6');
        typeHeading.textContent = 'Type:';
        itemCard.appendChild(typeHeading);

        let type = document.createElement('p');
        type.textContent = item.type;
        itemCard.appendChild(type);

        let difficultyHeading = document.createElement('h6');
        difficultyHeading.textContent = 'Difficulty:';
        itemCard.appendChild(difficultyHeading);

        let difficulty = document.createElement('p');
        difficulty.textContent = item.difficulty;
        itemCard.appendChild(difficulty);

        let instructionsHeading = document.createElement('h6');
        instructionsHeading.textContent = 'Instructions:';
        itemCard.appendChild(instructionsHeading);

        let content = document.createElement('p');
        content.textContent = item.instructions;
        itemCard.appendChild(content);

        // Appendar itemCard till resultat-kortet
        resultCard.appendChild(itemCard);
    }

    // Appendar resultat-kortet i bodyn
    document.body.appendChild(resultCard);
}

// Funktion som skapar en p-tagg som skriver ut ett felmeddelande som är röd och centererad. Valfritt felmeddelande skickas med vid anropning av funktionen. 
function displayErrorMessage(message) {

    let errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('text-danger', "text-center");

    return errorMessage;
}

// Funktion som skapar upp en spinner
function createSpinner() {

    let spinner = document.createElement('div');
    spinner.classList.add('spinner-border', 'text-primary', 'my-3');
    spinner.setAttribute('role', 'status');

    let spinnerContainer = document.createElement('div');
    spinnerContainer.classList.add('d-flex', 'justify-content-center');
    spinnerContainer.appendChild(spinner);

    return spinnerContainer;
}


function handleFormSubmit(event) {

    event.preventDefault();

    // Hämtar värdet som skickas in från användaren
    const valueName = document.getElementById('name').value.trim();
    const valueType = document.getElementById('type').value.trim();
    const valueMuscle = document.getElementById('muscle').value.trim();
    const valueDifficulty = document.getElementById('difficulty').value.trim();
    const valueOffset = document.getElementById('offset').value.trim();
    const oldResultCard = document.getElementById('resultCard');

    // rest-API från https://rapidapi.com/apininjas/api/exercises-by-api-ninjas
    // const url och options från API-ninjas
    const url = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=' + valueName + '&type=' + valueType + '&muscle=' + valueMuscle + '&difficulty=' + valueDifficulty + '&offset=' + valueOffset;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ef0548b16emshc9be4621b1fbc90p123eb1jsn2afe8c97cba3',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
    }

    // hämtar createSpinner och placerar den längst ned i formuläret
    let spinnerContainer = createSpinner();
    workoutForm.appendChild(spinnerContainer);


    // Hämtar errorMessage-taggen som har klassen '.text-danger.text-center'
    let removeErrorMessage = workoutForm.querySelector('.text-danger.text-center');

    // ErrorMessage tas bort när man får en sökträff
    if(removeErrorMessage) {
        removeErrorMessage.remove();
    }

    // Använder fetch för att hämta data från en URL och returnerar JSON-svar.
    window.fetch(url, options)
        .then(function(response) {
            return response.json();
        })

        // Visa errorMessage om man inte får något resultat annars körs displayResultCard
        .then(function(result) {
            if(result.length === 0) {
                let errorMessage = displayErrorMessage('No results found. Please check for any misspelling or check out the "Possible values".');
                workoutForm.appendChild(errorMessage);

                // Visar resultat om man får träff
            } else {

                /* ChatGPT: Hur visar jag JSON-format i konsolen?
                Hittade liknade svar från stackoverflow https://stackoverflow.com/questions/28149462/how-to-print-json-data-in-console-log */

                console.log(JSON.stringify(result, null, 2));

                displayResultCard(result);
            }

            // Tar bort gamla resultat om du gör en ny sökning
            if(oldResultCard) {
                oldResultCard.remove();
            }
        })

        // Om något går fel till exempel nätverksfel så visas denna
        .catch(function (error) {
            console.error('Error fetching data:', error);
            let errorMessage = displayErrorMessage('An error occurred while fetching the results. Please try again later.');
            workoutForm.appendChild(errorMessage);
        })

        // Tar bort spinner när hämtning är klar (alltid)
        .finally(function () {
            spinnerContainer.remove();
        });
}
