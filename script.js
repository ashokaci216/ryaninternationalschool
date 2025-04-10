fetch('timetable.json')
  .then(response => response.json())
  .then(timetableData => {
    const dayButtons = document.querySelectorAll('.day-btn');
    const timetableScreen = document.getElementById('timetableScreen');
    const daysScreen = document.getElementById('daysScreen');
    const backBtn = document.getElementById('backBtn');
    const selectedDayTitle = document.getElementById('selectedDayTitle');
    const subjectList = document.getElementById('subjectList');
    const autoMessage = document.getElementById('autoMessage');
    const themeToggle = document.getElementById('themeToggle');
    const themeChooser = document.getElementById('themeChooser');
    const body = document.body;

    const subjectColors = {
      Math: 'Math', English: 'English', Science: 'Science', Hindi: 'Hindi',
      SST: 'SST', Marathi: 'Marathi', Computer: 'Computer',
      "LR/APT": 'APT', "Act/Computer/P.T": 'Act', "Musis/PA": 'PA',
      "SEL/LIB": 'SEL', "P.T": 'PT', "MPT": 'MPT', "Art": 'Art', "Swimming & Games": 'Swimming',
      "Holiday": 'Holiday'
    };

    function showTimetable(day, auto = false) {
      selectedDayTitle.textContent = `${day} Subjects`;
      autoMessage.textContent = auto ? `Today is ${day} — showing your timetable automatically.` : "";
      subjectList.innerHTML = "";
      timetableData[day].forEach(subject => {
        const li = document.createElement('li');
        const className = subjectColors[subject] || subject.replace(/[^a-zA-Z]/g, '').split(" ")[0] || 'general';
        li.classList.add(`subject-${className}`);
        li.textContent = subject;
        subjectList.appendChild(li);
      });
      daysScreen.classList.add('hidden');
      timetableScreen.classList.remove('hidden');
    }

    dayButtons.forEach(button => {
      button.addEventListener('click', () => {
        const day = button.dataset.day;
        showTimetable(day);
      });
    });

    backBtn.addEventListener('click', () => {
      timetableScreen.classList.add('hidden');
      daysScreen.classList.remove('hidden');
    });

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
    });

    themeChooser.addEventListener('change', (e) => {
      body.className = body.className.replace(/theme-\w+/g, '').trim();
      if (e.target.value !== 'default') {
        body.classList.add(`theme-${e.target.value}`);
      }
    });

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    if (timetableData[today]) {
      showTimetable(today, true);
    }
  });