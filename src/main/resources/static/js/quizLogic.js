document.addEventListener('DOMContentLoaded', (event) => {
    let qCur = 1;
    let pages = document.querySelectorAll('.qbox');
    let correctAnswers = [7, 4, 81, 144, 9, 4]

    let nextButton = document.getElementById('next');
    let backButton = document.getElementById('back');
    let submitButton = document.getElementById('submit');
    let lastQuestionOptions = document.querySelectorAll(`input[name="q${pages.length}"]`);
    let qNumber = document.getElementById('qnumber');

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    function showQuestion(qNumber) {
        pages.forEach((page, idx) => {
            page.style.display = idx+1 === qNumber ? 'block' : 'none';
        });
    }

    function changeqNumber(){
        qNumber.innerHTML = `${qCur}/${[pages.length]}`;
    }

    function goNextQuestion(){
        if(qCur < pages.length){
            if(document.querySelector(`input[name="q${qCur}"]:checked`)){
                qCur++;
                showQuestion(qCur);
                changeqNumber();
            }
            else{
                alert("Select a choice before moving on");
            }
        }

        if(qCur == pages.length){
            nextButton.style.visibility = 'hidden';
        }

        if(qCur > 1)
            backButton.style.visibility = 'visible';
    }

    function goBackQuestion(){
        if(qCur > 1){
            qCur--;
            showQuestion(qCur);
            changeqNumber();
        }

        if(qCur == 1){
            backButton.style.visibility = 'hidden';
        }

        nextButton.style.visibility = 'visible';
    }

    nextButton.addEventListener('click', () => {
        goNextQuestion();
    });

    backButton.addEventListener('click', () => {
        goBackQuestion();
    });0

    document.addEventListener('keydown', function(event) {
        if(event.key === "ArrowRight")
            goNextQuestion();
        else if(event.key === "ArrowLeft")
            goBackQuestion();
    });



    submitButton.addEventListener('click', () => {
        let score = 0;
        pages.forEach((page, idx) => {        
            let choice = document.querySelector(`input[name="q${idx+1}"]:checked`);
            if(choice?.value == correctAnswers[idx]){
                page.classList.add('correct');            
                page.classList.remove('wrong');   
                score++;
            }         
            else{
                page.classList.add('wrong');            
                page.classList.remove('correct');
        
                document.querySelector(`label[for="${choice.id}"]`).classList.add('wrong-text');
            }
        });

        let scoreText = document.querySelector('#score');
        scoreText.innerHTML = `Score: ${score}/${pages.length}`;
        scoreText.style.visibility = 'visible';

        
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.disabled = true;
        });

        correctAnswers.forEach((answer, idx) => {
            let correctOption = document.querySelector(`input[name="q${idx+1}"][value="${answer}"]`);
            let correctText = document.querySelector(`label[for="${correctOption.id}"]`);
            if(correctText){
                correctText.classList.add('correct-text');
            }
        });

        submitButton.style.visibility = 'hidden';
    });

    lastQuestionOptions.forEach(option => {
        option.addEventListener('change', () => {
            submitButton.style.visibility = 'visible';
        });
    });


    changeqNumber();
});
