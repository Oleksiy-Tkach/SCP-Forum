document.addEventListener('DOMContentLoaded', function () {
  const mtfList = document.getElementById('mtfList');

  const mtfData = [
    {
      name: "Mobile Task Force Alpha-1",
      description: "Елітна група, спеціалізується на боротьбі з найнебезпечнішими SCP.",
      image: "images/alpha 1.png",
      link: "https://scp-wiki.wikidot.com/task-forces#alpha-1"
    },
    {
      name: "Mobile Task Force Beta-7",
      description: "Спеціалізується на оперативному реагуванні на SCP-події в міських умовах.",
      image: "images/beta 7.png",
      link: "https://scp-wiki.wikidot.com/task-forces#beta-7"
    },
    {
      name: "Mobile Task Force Zeta-9",
      description: "Група, яка використовує спеціальні технічні засоби для знешкодження SCP.",
      image: "images/zeta-10.png",
      link: "https://scp-wiki.wikidot.com/task-forces#zeta-9"
    }
  ];

  function renderMTFData() {
    mtfData.forEach(mtf => {
      const mtfItem = document.createElement('div');
      mtfItem.classList.add('mtf-item');

      mtfItem.innerHTML = `
        <img src="${mtf.image}" alt="${mtf.name}">
        <h3>${mtf.name}</h3>
        <p>${mtf.description}</p>
        <a class="mtf-button" href="${mtf.link}" target="_blank">Детальніше</a>
      `;

      mtfList.appendChild(mtfItem);
    });
  }

  renderMTFData();
});
