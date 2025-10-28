//#region Business logic
let languageTokens = {};
fetch('js/language-tokens.json')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        languageTokens = data;
    })
    .catch(error => {
        console.error('Fetch operation failed:', error);
        alert('Failed to load language metadata. Please try reloading the page.');
    });

function getLanguageExperienceScore(language) {
    if (language === "None") {return 0};
    return languageTokens[language]["difficulty"];
}

function suggestThreeLanguages(experience, pastLanguage, programmingExpertise, assemblerCompiler, whyLearnPast, difficulty) {
    let languageScores = {};
    for (const language in languageTokens) {
        let score = 0;
        score += Math.abs(languageTokens[language]["requiredExperience"] -      experience);
        score += Math.abs(languageTokens[language]["pastLanguageDifficulty"] -  getLanguageExperienceScore(pastLanguage));
        score += Math.abs(languageTokens[language]["programmingExpertise"] -    programmingExpertise);
        score += Math.abs(languageTokens[language]["assemblerCompiler"] -       assemblerCompiler);
        score += Math.abs(languageTokens[language]["whyLearnPast"] -            whyLearnPast);
        score += Math.abs(languageTokens[language]["difficulty"] -              difficulty);
        languageScores[language] = score;
    }
    let sortedLanguages = Object.keys(languageScores).sort((a, b) => languageScores[a] - languageScores[b]);
    return sortedLanguages.slice(0, 3);
}
//#endregion

window.onload = function() {
    
    //#region UI logic
    let form = document.querySelector("form");

    form.onsubmit = function(event) {
        const experience = document.getElementById("experience").selectedIndex;
        const pastLanguages = document.getElementById("past-languages").value;
        const programmingExpertise = document.getElementById("programming-expertise").selectedIndex;
        const assemblerCompiler = document.getElementById("assembler-compiler").selectedIndex;
        const whyLearnPast = Array.from(document.querySelectorAll("input[type='checkbox']")).map(checkbox => checkbox.checked);
        const difficulty = document.getElementById("difficulty").selectedIndex;
        let whyLearnPastScore = 0;
        for (let i = 0; i < whyLearnPast.length; i++) {
            if (whyLearnPast[i]) {
                whyLearnPastScore += 1;
            }
        }

        if (Object.keys(languageTokens).length === 0) {
            document.querySelector("p#languages").innerText = "Error: Metadata fetch failed. Please try reloading the page.";
        } else {
            const lang = suggestThreeLanguages(experience, pastLanguages, programmingExpertise, assemblerCompiler, whyLearnPastScore, difficulty);
            if (lang[0] === "Brainf*ck") {
                document.querySelector("p#languages").innerText = `We would recommend ${lang[0]}.\nAlso, you need help.`;
            } else {
                document.querySelector("p#languages").innerText = `We would recommend ${lang[0]}.`;
            }
        }
        
        event.preventDefault();
        document.querySelector("div#output").removeAttribute("class");
    };
    //#endregion
};