const coursesData = [
  {
    id: 1,
    title: 'The Ultimate Google Ads Training Course',
    price: '$100',
    author: 'Jerome Bell',
    category: 'marketing',
    image: 'assets/person1.png',
    tagLabel: 'Marketing',
    tagClass: 'tag--marketing',
  },
  {
    id: 2,
    title: 'Product Management Fundamentals',
    price: '$480',
    author: 'Marvin McKinney',
    category: 'management',
    image: 'assets/person2.png',
    tagLabel: 'Management',
    tagClass: 'tag--management',
  },
  {
    id: 3,
    title: 'HR Management and Analytics',
    price: '$200',
    author: 'Leslie Alexander Li',
    category: 'hr',
    image: 'assets/person3.png',
    tagLabel: 'HR & Recruting',
    tagClass: 'tag--hr',
  },
  {
    id: 4,
    title: 'Brand Management & PR Communications',
    price: '$530',
    author: 'Kristin Watson',
    category: 'marketing',
    image: 'assets/person4.png',
    tagLabel: 'Marketing',
    tagClass: 'tag--marketing',
  },
  {
    id: 5,
    title: 'Graphic Design Basic',
    price: '$500',
    author: 'Guy Hawkins',
    category: 'design',
    image: 'assets/person5.png',
    tagLabel: 'Design',
    tagClass: 'tag--design',
  },
  {
    id: 6,
    title: 'Business Development Management',
    price: '$400',
    author: 'Dianne Russell',
    category: 'management',
    image: 'assets/person6.png',
    tagLabel: 'Management',
    tagClass: 'tag--management',
  },
  {
    id: 7,
    title: 'Highload Software Architecture',
    price: '$600',
    author: 'Brooklyn Simmons',
    category: 'development',
    image: 'assets/person7.png',
    tagLabel: 'Development',
    tagClass: 'tag--development',
  },
  {
    id: 8,
    title: 'Human Resources – Selection and Recruitment',
    price: '$150',
    author: 'Kathryn Murphy',
    category: 'hr',
    image: 'assets/person8.png',
    tagLabel: 'HR & Recruting',
    tagClass: 'tag--hr',
  },
  {
    id: 9,
    title: 'User Experience. Human-centered Design',
    price: '$240',
    author: 'Cody Fisher',
    category: 'design',
    image: 'assets/person9.png',
    tagLabel: 'Design',
    tagClass: 'tag--design',
  },
];

const initialCount = coursesData.length;

const cardsContainer = document.getElementById('cards-container');
const tabs = document.querySelectorAll('.tabs__btn');
const searchInput = document.getElementById('search-input');
const loadMoreBtn = document.querySelector('.btn-load-more');

let currentCategory = 'all';
let currentSearch = '';
let isExpanded = false;

function createCard(item) {
  return `
        <article class="card">
            <div class="card__header">
                <img src="${item.image}" alt="${item.author}" class="card__image">
                <span class="card__tag ${item.tagClass}">${item.tagLabel}</span>
            </div>
            <div class="card__body">
                <h3 class="card__title">${item.title}</h3>
                <div class="card__meta">
                    <span class="card__price">${item.price}</span>
                    <span class="card__author">by ${item.author}</span>
                </div>
            </div>
        </article>
    `;
}

function renderCards(data) {
  cardsContainer.innerHTML = '';
  if (data.length === 0) {
    cardsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #777;">
            Nothing found :(
        </div>`;
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  if (loadMoreBtn) {
    if (currentCategory === 'all') {
      loadMoreBtn.style.display = 'inline-flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  cardsContainer.innerHTML = data.map(createCard).join('');
}

function updateTabCounts() {
  const searchText = currentSearch.toLowerCase();
  const counts = { all: 0 };

  tabs.forEach(tab => (counts[tab.dataset.category] = 0));

  coursesData.forEach(item => {
    const isSearchMatch =
      item.title.toLowerCase().includes(searchText) ||
      item.author.toLowerCase().includes(searchText);

    if (isSearchMatch) {
      counts.all++;
      if (counts.hasOwnProperty(item.category)) {
        counts[item.category]++;
      }
    }
  });

  tabs.forEach(tab => {
    const category = tab.dataset.category;
    const count = counts[category] || 0;
    const supTag = tab.querySelector('sup');
    if (supTag) {
      supTag.textContent = count;
      supTag.style.transition = 'color 0.3s';
      supTag.style.color = '#FF3B30';
      setTimeout(() => (supTag.style.color = ''), 300);
    }
  });
}

function filterCourses() {
  const filtered = coursesData.filter(item => {
    const isCategoryMatch =
      currentCategory === 'all' || item.category === currentCategory;

    const searchText = currentSearch.toLowerCase();
    const isSearchMatch =
      item.title.toLowerCase().includes(searchText) ||
      item.author.toLowerCase().includes(searchText);

    return isCategoryMatch && isSearchMatch;
  });

  renderCards(filtered);
  updateTabCounts();
}

function toggleMoreCourses() {
  if (!isExpanded) {
    for (let i = 0; i < 3; i++) {
      const randomItem = coursesData[Math.floor(Math.random() * initialCount)];
      const newItem = {
        ...randomItem,
        id: coursesData.length + 1,
        title: randomItem.title + ' (NEW)',
        price: '$' + Math.floor(Math.random() * 900),
      };
      coursesData.push(newItem);
    }
    loadMoreBtn.innerHTML = '<span class="icon-refresh">×</span> Hide';
    isExpanded = true;
  } else {
    coursesData.splice(initialCount);
    loadMoreBtn.innerHTML = '<span class="icon-refresh">↻</span> Load more';
    isExpanded = false;
  }

  filterCourses();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tabs__btn--active'));
    tab.classList.add('tabs__btn--active');
    currentCategory = tab.dataset.category;
    filterCourses();
  });
});

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const handleSearch = debounce(e => {
  currentSearch = e.target.value.trim();
  filterCourses();
}, 300);

searchInput.addEventListener('input', handleSearch);

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', toggleMoreCourses);
}

filterCourses();
