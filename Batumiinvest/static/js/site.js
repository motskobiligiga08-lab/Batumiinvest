(() => {
  const cards = [...document.querySelectorAll('.property-card')];
  const count = document.getElementById('results-count');
  const empty = document.getElementById('empty-state');
  const grid = document.getElementById('property-grid');
  const filters = { deal: 'all', district: 'all', type: 'all', beds: 'all', tag: null };

  function matchesBeds(card) {
    const rooms = card.dataset.rooms.toLowerCase();
    if (filters.beds === 'all') return true;
    if (filters.beds === 'studio') return rooms.includes('სტუდიო');
    if (filters.beds === '1') return rooms.includes('1 საძინებელი');
    if (filters.beds === '2') return rooms.includes('2 საძინებელი');
    return rooms.includes('3 საძინებელი') || rooms.includes('4 საძინებელი');
  }

  function applyFilters() {
    let visible = 0;
    cards.forEach(card => {
      const okDeal = filters.deal === 'all' || (filters.deal === 'invest' ? Number(card.dataset.roi) >= 12 : card.dataset.deal === filters.deal);
      const okDistrict = filters.district === 'all' || card.dataset.district === filters.district;
      const okType = filters.type === 'all' || card.dataset.type === filters.type;
      const okTag = !filters.tag || card.dataset.tags.split(',').includes(filters.tag);
      const show = okDeal && okDistrict && okType && okTag && matchesBeds(card);
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = visible;
    empty.hidden = visible !== 0;
    grid.hidden = visible === 0;
    document.querySelector('.clear-filters').classList.toggle('visible', filters.tag !== null || filters.district !== 'all' || filters.type !== 'all' || filters.beds !== 'all' || filters.deal !== 'all');
  }

  function clearFilters() {
    Object.assign(filters, { deal: 'all', district: 'all', type: 'all', beds: 'all', tag: null });
    document.querySelector('#district').value = 'all';
    document.querySelector('#property-type').value = 'all';
    document.querySelector('#beds').value = 'all';
    document.querySelectorAll('.deal-tab').forEach((tab, i) => { tab.classList.toggle('active', i === 0); tab.setAttribute('aria-selected', String(i === 0)); });
    document.querySelectorAll('[data-tag]').forEach(button => button.classList.remove('selected'));
    applyFilters();
  }

  document.querySelectorAll('.deal-tab').forEach(tab => tab.addEventListener('click', () => {
    filters.deal = tab.dataset.deal;
    document.querySelectorAll('.deal-tab').forEach(item => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); });
    applyFilters();
  }));
  document.querySelector('#district').addEventListener('change', event => { filters.district = event.target.value; applyFilters(); });
  document.querySelector('#property-type').addEventListener('change', event => { filters.type = event.target.value; applyFilters(); });
  document.querySelector('#beds').addEventListener('change', event => { filters.beds = event.target.value; applyFilters(); });
  document.querySelector('#search-button').addEventListener('click', applyFilters);
  document.querySelectorAll('[data-tag]').forEach(button => button.addEventListener('click', () => {
    const tag = button.dataset.tag;
    filters.tag = filters.tag === tag ? null : tag;
    document.querySelectorAll('[data-tag]').forEach(item => item.classList.toggle('selected', item.dataset.tag === filters.tag));
    applyFilters();
  }));
  document.querySelectorAll('.clear-filters,#empty-clear').forEach(button => button.addEventListener('click', clearFilters));

  document.querySelector('#sort').addEventListener('change', event => {
    const key = event.target.value;
    const sorted = [...cards].sort((a, b) => key === 'low' ? Number(a.dataset.price) - Number(b.dataset.price) : key === 'high' ? Number(b.dataset.price) - Number(a.dataset.price) : key === 'roi' ? Number(b.dataset.roi) - Number(a.dataset.roi) : Number(a.dataset.id) - Number(b.dataset.id));
    sorted.forEach(card => grid.append(card));
  });

  document.querySelectorAll('.favorite-btn').forEach(button => button.addEventListener('click', () => {
    const pressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!pressed));
    button.setAttribute('aria-label', pressed ? 'რჩეულებში დამატება' : 'რჩეულებიდან წაშლა');
  }));

  const themeButton = document.querySelector('.theme-toggle');
  if (localStorage.getItem('batumi-theme') === 'dark') document.body.classList.add('dark');
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    localStorage.setItem('batumi-theme', dark ? 'dark' : 'light');
    themeButton.setAttribute('aria-label', dark ? 'ღია რეჟიმის ჩართვა' : 'მუქი რეჟიმის ჩართვა');
  });

  const menuButton = document.querySelector('.menu-toggle');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    document.querySelector('.mobile-nav').classList.toggle('open', open);
  });
  document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    document.querySelector('.mobile-nav').classList.remove('open');
  }));

  const price = document.querySelector('#price-range');
  const rent = document.querySelector('#rent-range');
  const money = value => '$' + Number(value).toLocaleString('en-US');
  function updateCalculator() {
    const propertyPrice = Number(price.value);
    const monthlyRent = Number(rent.value);
    const annual = monthlyRent * 12;
    const roi = propertyPrice ? annual / propertyPrice * 100 : 0;
    document.querySelector('#price-value').textContent = money(propertyPrice);
    document.querySelector('#rent-value').textContent = money(monthlyRent);
    document.querySelector('#roi-result').textContent = roi.toFixed(1) + '%';
    document.querySelector('#payback-result').innerHTML = (annual ? (propertyPrice / annual).toFixed(1) : '—') + ' <small>წელი</small>';
    document.querySelector('#annual-result').textContent = money(annual);
    [price, rent].forEach(input => {
      const percent = (Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min)) * 100;
      input.style.background = `linear-gradient(to right,var(--green) 0%,var(--green) ${percent}%,#e5ebe7 ${percent}%,#e5ebe7 100%)`;
    });
  }
  price.addEventListener('input', updateCalculator);
  rent.addEventListener('input', updateCalculator);
  updateCalculator();
})();
