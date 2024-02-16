document.addEventListener('DOMContentLoaded', function () {

    function hideAllSections() {
        const sections = document.querySelectorAll('.game-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    function showSection(sectionId) {
        hideAllSections();
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'flex';
        }
    }

     showSection('game-container');
     
});