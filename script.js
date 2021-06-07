const textInput = document.querySelector("#input");
const progressBar = document.querySelector(".progress");
const div = document.querySelector(".info")

textInput.addEventListener("input", function() {
    updateProgressBar()
})

function updateProgressBar() {
    const weaknesses = calculateWeaknesses(textInput.value);
    console.log(weaknesses);
    let strength = 100;
    div.innerHTML = '';
    weaknesses.forEach(weakness => {
        if(weakness == null) return
        strength -= weakness.deduction;
        const messageElement = document.createElement('div')
        messageElement.innerText = weakness.message
        div.appendChild(messageElement)
    });
    progressBar.style.setProperty('--strength', strength);

}

function calculateWeaknesses(password) {
    const weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowerCharacters(password));
    weaknesses.push(upperCharacters(password));
    weaknesses.push(specialCharacters(password));
    weaknesses.push(numberWeakness(password));
    weaknesses.push(repeatCharacters(password));
    return weaknesses;
}

function lengthWeakness(password) {
    const length = password.length;

    if(length <= 5) {
        return {
            message: 'Your password is too short',
            deduction: 40
        }
    }

    if(length <= 10) {
        return {
            message: 'Your password could be longer',
            deduction: 10
        }
    }
}

function lowerCharacters(password) {
    return characterTypeWeakness(password, /[a-z]/g, 'lower characters')
}
function upperCharacters(password) {
    return characterTypeWeakness(password, /[A-Z]/g, 'upper characters')
}
function specialCharacters(password) {
    return characterTypeWeakness(password, /\W|_/g, 'special characters')
}
function numberWeakness(password) {
    return characterTypeWeakness(password, /[0-9]/g, 'numbers')
  }



function characterTypeWeakness(password, regex, type) {
    const matches = password.match(regex) || [];

    if(matches.length === 0 ) {
        return {
            message: `Your password has no ${type}`,
            deduction: 20
        }
    }

    if(matches.length <= 2) {
        return {
            message: `Your password could have more ${type}`,
            deduction: 5
        }
    }
}

function repeatCharacters(password) {
    const matches = password.match(/(.)\1/g) || []

    if (matches.length > 0) {
        return {
            message: 'Your password has repeated characters',
            deduction: matches.length * 10
        }
    }
}




























// let specialParagraph = false;
// let bigLetter = false;
// let messageError = '';

// textInput.addEventListener("keyup", function() {
//     let password = textInput.value;
//     let strength = 0;
//     let bigLetterRegex = /[A-Z]/g;
//     let specialCharacterRegex = /\W|_/g;
//     let numberRegex = /\d/g;
//     // Adding 1% for every Character
//     strength = password.length;
//     // Adding 10% for special Character
//     if(password.match(specialCharacterRegex)) {
//         strength += 30;
//     } else if(!password.match(specialCharacterRegex) && specialParagraph === false) {
//         // const specialP = document.createElement('p');
//         // specialP.innerText = 'Your Password has no special characters';
//         // specialP.setAttribute("id", 'specialP');
//         // div.append(specialP);
//         messageError += `Your password had no special characters`
//         specialParagraph = true;
//     }
//     // Adding 10% for big Letter
//     if(password.match(bigLetterRegex)) {
//         strength += 30;
//     } else if (!password.match(bigLetterRegex) && bigLetter === false) {
//         messageError += `Your password has no big letters\n`
//         bigLetter = true;
//     }
//     // Adding 10% for number
//     if(password.match(numberRegex)) {
//         strength += 30;
//     }
//     console.log(strength);
//     console.log(messageError)
//     progressBar.style.setProperty('--strength', strength);
// })