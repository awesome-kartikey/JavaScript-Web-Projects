const toggleSwitch = document.querySelector('input[type = "checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');


// Dark Mode Styles
// function darkMode() {
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     toggleIcon.children[0].textContent = 'Dark Mode';
//     toggleIcon.children[1].classList.remove('fa-sun');
//     toggleIcon.children[1].classList.add('fa-moon');
//     image1.src = 'img/undraw_proud_coder_dark.svg';
//     image2.src = 'img/undraw_feeling_proud_dark.svg';
//     image3.src = 'img/undraw_conceptual_idea_dark.svg';
// }

// // Light Mode Styles
// function lightMode() {
//     nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     toggleIcon.children[0].textContent = 'Light Mode';
//     toggleIcon.children[1].classList.remove('fa-moon');
//     toggleIcon.children[1].classList.add('fa-sun');
//     image1.src = 'img/undraw_proud_coder_light.svg';
//     image2.src = 'img/undraw_feeling_proud_light.svg';
//     image3.src = 'img/undraw_conceptual_idea_light.svg';
// }

function updateMode(isDarkMode) {
    nav.style.backgroundColor = isDarkMode ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDarkMode ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    toggleIcon.children[1].classList.toggle('fa-moon', isDarkMode);
    toggleIcon.children[1].classList.toggle('fa-sun', !isDarkMode);
    
    const mode = isDarkMode ? 'dark' : 'light';
    image1.src = `img/undraw_proud_coder_${mode}.svg`;
    image2.src = `img/undraw_feeling_proud_${mode}.svg`;
    image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}

function darkMode() {
    updateMode(true);
}

function lightMode() {
    updateMode(false);
}



// Switch theme Dynamically

function switchTheme(event) {   
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkMode();
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      lightMode();
      localStorage.setItem('theme', 'light');
    }
  }

// Event listener for the toggle switch
toggleSwitch.addEventListener('change', switchTheme);

// Check local storage for theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    }
}