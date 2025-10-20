//#region Business logic
const languageTokens = {
    "Ruby": {
        "requiredExperience": 0,
        "pastLanguageDifficulty": 0,
        "programmingExpertise": 0,
        "assemblerCompiler": 0,
        "whyLearnPast": 2,
        "difficulty": 1
    },
    "C#": {
        "requiredExperience": 2,
        "pastLanguageDifficulty": 4,
        "programmingExpertise": 3,
        "assemblerCompiler": 0,
        "whyLearnPast": 1,
        "difficulty": 3
    },
    "JavaScript": {
        "requiredExperience": 1,
        "pastLanguageDifficulty": 2,
        "programmingExpertise": 2,
        "assemblerCompiler": 0,
        "whyLearnPast": 2,
        "difficulty": 2
    },
    "Go": {
        "requiredExperience": 2,
        "pastLanguageDifficulty": 3,
        "programmingExpertise": 3,
        "assemblerCompiler": 1,
        "whyLearnPast": 2,
        "difficulty": 2
    },
    "Python": {
        "requiredExperience": 0,
        "pastLanguageDifficulty": 0,
        "programmingExpertise": 0,
        "assemblerCompiler": 0,
        "whyLearnPast": 1,
        "difficulty": 1
    },
    "Rust": {
        "requiredExperience": 4,
        "pastLanguageDifficulty": 4,
        "programmingExpertise": 4,
        "assemblerCompiler": 2,
        "whyLearnPast": 4,
        "difficulty": 5
    },
    "Swift": {
        "requiredExperience": 1,
        "pastLanguageDifficulty": 2,
        "programmingExpertise": 2,
        "assemblerCompiler": 0,
        "whyLearnPast": 2,
        "difficulty": 2
    },
    "Java": {
        "requiredExperience": 2,
        "pastLanguageDifficulty": 3,
        "programmingExpertise": 2,
        "assemblerCompiler": 0,
        "whyLearnPast": 2,
        "difficulty": 3
    },
    "GDscript": {
        "requiredExperience": 1,
        "pastLanguageDifficulty": 1,
        "programmingExpertise": 1,
        "assemblerCompiler": 0,
        "whyLearnPast": 3,
        "difficulty": 1
    },
    "GML Code": {
        "requiredExperience": 1,
        "pastLanguageDifficulty": 1,
        "programmingExpertise": 1,
        "assemblerCompiler": 0,
        "whyLearnPast": 3,
        "difficulty": 1
    },
    "C++": {
        "requiredExperience": 3,
        "pastLanguageDifficulty": 4,
        "programmingExpertise": 3,
        "assemblerCompiler": 1,
        "whyLearnPast": 4,
        "difficulty": 4
    },
    "Assembly": {
        "requiredExperience": 3,
        "pastLanguageDifficulty": 5,
        "programmingExpertise": 4,
        "assemblerCompiler": 2,
        "whyLearnPast": 5,
        "difficulty": 5
    },
    "Scratch": {
        "requiredExperience": 0,
        "pastLanguageDifficulty": 0,
        "programmingExpertise": 0,
        "assemblerCompiler": 0,
        "whyLearnPast": 0,
        "difficulty": 0
    },
    "Raw Machine Code": {
        "requiredExperience": 4,
        "pastLanguageDifficulty": 5,
        "programmingExpertise": 4,
        "assemblerCompiler": 4,
        "whyLearnPast": 5,
        "difficulty": 5
    },
    "Brainf*ck": {
        "requiredExperience": 4,
        "pastLanguageDifficulty": 5,
        "programmingExpertise": 4,
        "assemblerCompiler": 4,
        "whyLearnPast": 6,
        "difficulty": 6
    }
}

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
    console.log(sortedLanguages);
    return sortedLanguages.slice(0, 3);
}
//#endregion

window.onload = function() {
    
    //#region UI logic
    let form = document.querySelector("form");
    try {
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

            console.log(experience);
            const lang = suggestThreeLanguages(experience, pastLanguages, programmingExpertise, assemblerCompiler, whyLearnPastScore, difficulty);
            if (lang[0] === "Brainf*ck") {
                document.querySelector("p#languages").innerText = `We would recommend the languages ${lang[0]}, ${lang[1]}, and ${lang[2]}.\nAlso, you need help.`;
            } else {
                document.querySelector("p#languages").innerText = `We would recommend the languages ${lang[0]}, ${lang[1]}, and ${lang[2]}.`;
            }
            
            console.log("experience: "+experience);
            console.log("pastLanguages: "+pastLanguages);
            console.log("programmingExpertise: "+programmingExpertise);
            console.log("assemblerCompiler: "+assemblerCompiler);
            console.log("whyLearnPast: "+whyLearnPast);
            console.log("difficulty: "+difficulty);
            
            event.preventDefault();

            document.querySelector("div#output").removeAttribute("class");
        };
    } catch (error) {
        console.error(error);
    }
    //#endregion
};