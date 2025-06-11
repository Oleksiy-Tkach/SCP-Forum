const gocDatabase = [
  {
    name: "ГОК 'Темні Шляхи'",
    description: "ГОК 'Темні Шляхи' займається нейтралізацією окультних аномалій і забезпеченням глобальної безпеки від таких загроз. Вони працюють в умовах глибокої таємності та мають особливі повноваження для виконання своїх місій.",
    image: "images/scp1730.png",
    icon: "fas fa-shield-alt"  // Додано іконку для підрозділу
  },
  {
    name: "ГОК 'Світло Вірності'",
    description: "ГОК 'Світло Вірності' зосереджена на протидії культурам, які поклоняються аномаліям. Вони використовують методи психологічної війни для здолання ворогів і збереження світового порядку.",
    image: "images/scp1730.png",
    icon: "fas fa-lightbulb"  // Додано іншу іконку
  }
];

window.addEventListener('DOMContentLoaded', () => {
  const gocList = document.getElementById('gocList');
  gocDatabase.forEach(goc => {
    const div = document.createElement('div');
    div.classList.add('goc-item');
    div.innerHTML = `
      <i class="${goc.icon}"></i>
      <h3>${goc.name}</h3>
      <img src="${goc.image}" alt="${goc.name}">
      <p>${goc.description}</p>
    `;
    gocList.appendChild(div);
  });
});
