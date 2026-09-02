const classSelect = document.querySelector('#class-select');
const selectedClass = document.querySelector('#selected-class');
const selectedName = document.querySelector('#selected-name');
const classDirectory = document.querySelector('#class-directory');
const classButtons = document.querySelector('#class-buttons');
const dressCode = document.querySelector('#dress-code');
const classEmail = document.querySelector('#class-email');
const changeClass = document.querySelector('#change-class');

const classes = [...classSelect.querySelectorAll('option')].map(option => option.value).filter(Boolean);
const dressCodes = {
  Ballet: 'Black leotard, pink tights, ballet shoes, and hair secured in a bun.',
  Jazz: 'Form-fitting dancewear, jazz shoes, and hair pulled up or back.',
  'Hip Hop': 'Comfortable dance clothing with hip-hop sneakers or clean-bottom gym shoes.',
  'Technique & Stretch': 'Form-fitting dancewear that allows instructors to clearly see alignment.',
  'Musical Theater & Pom': 'Dance attire that allows free movement; no jeans.',
  'Lyrical & Contemporary': 'Form-fitting dancewear with foot thongs or bare feet.',
  'Combo Classes': 'A leotard, skirt, tights, or another distraction-free dance outfit.'
};

classes.forEach(className => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = className;
  button.addEventListener('click', () => showClass(className));
  classButtons.append(button);
});

function showClass(className) {
  if (!className) return;
  classSelect.value = className;
  selectedName.textContent = className;
  dressCode.textContent = dressCodes[className] || 'Team attire and footwear vary by rehearsal. Check current instructions from your director or contact the studio.';
  classEmail.href = `mailto:info@candancestudios.com?subject=${encodeURIComponent(`${className} parent question`)}`;
  selectedClass.hidden = false;
  classDirectory.hidden = true;
  localStorage.setItem('candanceSelectedClass', className);
  selectedClass.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

classSelect.addEventListener('change', () => showClass(classSelect.value));
changeClass.addEventListener('click', () => {
  selectedClass.hidden = true;
  classDirectory.hidden = false;
  classSelect.value = '';
  localStorage.removeItem('candanceSelectedClass');
  classSelect.focus();
});

const savedClass = localStorage.getItem('candanceSelectedClass');
if (classes.includes(savedClass)) showClass(savedClass);
