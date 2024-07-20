document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    const previewBtn = document.getElementById('previewBtn');
    const editBtn = document.getElementById('editBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const previewContainer = document.getElementById('previewContainer');
    const nameInput = document.getElementById('uname');
    const emailInput = document.getElementById('email');
    const firstTimeInputs = document.querySelectorAll('input[name="firstTime"]');
    const informativeInputs = document.querySelectorAll('input[name="informative"]');
    const improvementsInput = document.getElementById('improvements');
    const satisfactionInputs = document.querySelectorAll('input[name="satisfaction"]');
    const recommendInputs = document.querySelectorAll('input[name="recommend"]');
    const updatesInput = document.getElementById('updates');
    const msgInput = document.getElementById('msg');
    const previewName = document.getElementById('previewName');
    const previewEmail = document.getElementById('previewEmail');
    const previewFirstTime = document.getElementById('previewFirstTime');
    const previewInformative = document.getElementById('previewInformative');
    const previewImprovements = document.getElementById('previewImprovements');
    const previewSatisfaction = document.getElementById('previewSatisfaction');
    const previewRecommend = document.getElementById('previewRecommend');
    const previewUpdates = document.getElementById('previewUpdates');
    const previewMsg = document.getElementById('previewMsg');

    previewBtn.addEventListener('click', function () {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const firstTime = document.querySelector('input[name="firstTime"]:checked').value;
        const informative = document.querySelector('input[name="informative"]:checked').value;
        const improvements = improvementsInput.value.trim();
        const satisfaction = document.querySelector('input[name="satisfaction"]:checked').value;
        const recommend = document.querySelector('input[name="recommend"]:checked').value;
        const updates = updatesInput.value;
        const msg = msgInput.value.trim();

        previewName.textContent = name;
        previewEmail.textContent = email;
        previewFirstTime.textContent = firstTime;
        previewInformative.textContent = informative;
        previewImprovements.textContent = improvements;
        previewSatisfaction.textContent = satisfaction;
        previewRecommend.textContent = recommend;
        previewUpdates.textContent = updates;
        previewMsg.textContent = msg;

        previewContainer.style.display = 'block';
        form.style.display = 'none';
    });

    editBtn.addEventListener('click', function () {
        previewContainer.style.display = 'none';
        form.style.display = 'block';
    });

    confirmBtn.addEventListener('click', function () {
        // Submit the form or handle the confirmed data
        form.submit();
    });
});
