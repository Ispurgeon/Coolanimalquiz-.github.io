const questions = [
    {
        question: "How many toes do cats have ?",
        optionA: "5",
        optionB: "6",
        optionC: "18",
        optionD: "8",
        correctOption: "optionC"
    },

    {
        question: "How many dogs are in the world ?",
        optionA: "400 million",
        optionB: "97 million",
        optionC: "38 million",
        optionD: "350 million",
        correctOption: "optionA"
    },

    {
        question: "Which animal is no longer endangered ?",
        optionA: "Black Rhino",
        optionB: "Amur Leopard",
        optionC: "Giant Panda",
        optionD: "African forest elephant",
        correctOption: "optionC"
    },

    {
        question: "How many noses do slugs have?",
        optionA: "6",
        optionB: "4",
        optionC: "8",
        optionD: "2",
        correctOption: "optionB"
    },

    {
        question: "Humming birds are the only birds that can:",
        optionA: "Jump",
        optionB: "Stick it's tongue out up to 2 inches",
        optionC: "Fly backwards",
        optionD: "Only survive off of nectar",
        correctOption: "optionC"
    },

    {
        question: "Can Crocidiles stick out their tongue?",
        optionA: "Yes",
        optionB: "No",
        optionC: "See answer lol",
        optionD: "See answer but faster",
        correctOption: "optionB"
    },

    {
        question: "Which sex of mosquitos bites?",
        optionA: "Both male and female",
        optionB: "Only male",
        optionC: "Only Female",
        optionD: "Trick question, only adolecents",
        correctOption: "optionC"
    },

    {
        question: "What color are polarbears skin?",
        optionA: "White",
        optionB: "Tan",
        optionC: "Grey",
        optionD: "Black",
        correctOption: "optionD"
    },

    {
        question: "How many body lengths can fleas jump?",
        optionA: "350",
        optionB: "325",
        optionC: "340",
        optionD: "400",
        correctOption: "optionA"
    },

    {
        question: "What is the only dog without a pink tongue?",
        optionA: "Bluenose Pitbull",
        optionB: "Chow chow",
        optionC: "Schnauzer",
        optionD: "Shar pei",
        correctOption: "optionB"
    },


  

]


let shuffledQuestions = []

function handleQuestions() { 
 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Man you suck lol."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Not too bad."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Wow you know your stuff"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}