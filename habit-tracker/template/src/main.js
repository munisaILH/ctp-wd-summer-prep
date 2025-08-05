<<<<<<< HEAD
//grrab dom elements
const form = document.getElementById('habit-form');
const input = document.getElementById('habit-name');
const list = document.getElementById('habit-list');


let habits = [];

function loadHabits() {
const savedHabits = localStorage.getItem('habits');
if (savedHabits !== null) {
    habits = JSON.parse(savedHabits);   //if habit is found, parse string back into array
} else {
    habits = [];
}
}

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
//clear list
  list.innerHTML = '';      
  //todays date - YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  habits.forEach(habit => {
    const li = document.createElement('li');
    //how many days in a row the habit was done ??
    const streak = calculateStreak(habit.history);

    const info = document.createElement('div');
    info.innerHTML = `<strong>${habit.name}</strong><br>
      <span class="streak">Current: ${streak.current}, Longest: ${streak.max}</span>`;

      //button- lets you mark as done
    const doneBtn = document.createElement('button');
    doneBtn.textContent = habit.history.includes(today) ? 'Undo' : 'Done';
    doneBtn.onclick = () => {
      if (habit.history.includes(today)) {
        habit.history = habit.history.filter(d => d !== today);
      } else {
        habit.history.push(today);
      }
      saveHabits();
      renderHabits();
    };

    //create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    //button = clicked
    deleteButton.onclick = function () {
    const confirmDelete = confirm('Are you sure you want to delete this habit?');
  
    if (confirmDelete) {
        //remove the habit from the array
        const updatedHabits = [];
        for (let i = 0; i < habits.length; i++) {
    if (habits[i].id !== habit.id) {
        updatedHabits.push(habits[i]);
      }
    }

    habits = updatedHabits;

    saveHabits();     //save the updated habits to localStorage
    renderHabits();   //render the habit list again
  }
};

    //attach all habit elements to the page
    li.appendChild(info);
    li.appendChild(doneBtn);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}
//when the form is submitted
form.addEventListener('submit', function (event) {
    event.preventDefault(); //stop the page from refreshing
    const habitName = input.value.trim(); //getting the typed habit name

    if (habitName === '') {
        return; //no blank habits
    }

    //create a new HABIT object
    const newHabit = {
        id: crypto.randomUUID(),  //generate a unique ID ?
        name: habitName,
        history: []               //start with no prior history
    };
    habits.push(newHabit);
    input.value = '';

    //save and re-render
    saveHabits();
    renderHabits();
});


function calculateStreak(history) {
  const sorted = [...history].sort().reverse();

  const today = new Date().toISOString().split('T')[0];
  let currentStreak = 0;
  let longestStreak = 0;
  let lastDate = today;

  //calculate the current streak (counting from today going backwards)
  for (let i = 0; i < history.length; i++) {
    const habitDate = new Date(dates[i]);
    const prevDate = new Date(lastDate);

    //difference in DAYS between last checked and this one
    const dayDifference = (prevDate - habitDate) / (1000 * 60 * 60 * 24);

    if (dayDifference === 0 || dayDifference === 1) {
        currentStreak++;
        lastDate = dates[i];
    } else {
        break; //streak is broken
    }
  }

  //calculate the longest streak
  let tempStreak = 1;

  for (let i = 1; i < history.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);

    const diff = (prev - curr) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
      tempStreak = 1;
    }
  }

  //finalll check in case the last streak is the longest
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }

  return {
    current: currentStreak,
    max: longestStreak
  };
}

renderHabits();
=======
const form = document.getElementById('habit_form')
const habits = [];

form.addEventListener('submit', (event) => {event.preventDefault()
    event.preventDefault()
    const data = new FormData(event.target)     //formdata = obj
    const habit = {
        name: data.get('habit_name'),
        targetStreak: Number(data.get('target_streak'))
    }

    habits.push(habit)

    console.log(JSON.stringify(habits))
    renderHabits(habits)
})

const renderHabits = (habits) => {
    const habitList = document.getElementById('habit_list')
    habitList.innerHTML = habits.map(habit => {
        return `<li>${habit.name} ${habit.targetStreak}</li>`
    }).join('\n')
}
>>>>>>> 8a58668 (Week 1 HW, Js + CSS added, HTML altered)
