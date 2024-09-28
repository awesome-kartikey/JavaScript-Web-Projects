const toggleSwitch = document.querySelector('input[type="checkbox"]');
const elements = {
  nav: document.getElementById('nav'),
  toggleIcon: document.getElementById('toggle-icon'),
  images: ['image1', 'image2', 'image3'].map(id => document.getElementById(id)),
  textBox: document.getElementById('text-box')
};

const updateMode = (isDarkMode) => {
  const mode = isDarkMode ? 'dark' : 'light';
  elements.nav.style.backgroundColor = isDarkMode ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
  elements.textBox.style.backgroundColor = isDarkMode ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
  elements.toggleIcon.children[0].textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`;
  elements.toggleIcon.children[1].className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
  elements.images.forEach((img, i) => img.src = `img/undraw_${['proud_coder', 'feeling_proud', 'conceptual_idea'][i]}_${mode}.svg`);
};

const switchTheme = (e) => {
  const isDarkMode = e.target.checked;
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  updateMode(isDarkMode);
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};

toggleSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  toggleSwitch.checked = currentTheme === 'dark';
  updateMode(toggleSwitch.checked);
}