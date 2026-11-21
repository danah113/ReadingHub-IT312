/* ReadingHub — Club Offerings page script
   - Offerings are shown in a random order when the page loads
   - The "Sort by" menu then sorts them by name (A-Z / Z-A) or price (low-high / high-low)
   - Choosing "Random order" shuffles them again */

(function () {
  var list = document.querySelector('.offer-list');
  var select = document.getElementById('sort');
  var form = document.querySelector('.sort-bar');
  var status = document.getElementById('sort-status');

  if (!list || !select) { return; }

  var collator = new Intl.Collator(undefined, { sensitivity: 'base' });

  function getItems() {
    return Array.prototype.slice.call(list.children);
  }

  function nameOf(li) {
    return li.querySelector('h2').textContent.trim();
  }

  // Reads the price from the text, e.g. "$15" -> 15, "$0" -> 0
  function priceOf(li) {
    var amount = li.querySelector('.amount');
    var n = amount ? parseFloat(amount.textContent.replace(/[^0-9.]/g, '')) : 0;
    return isNaN(n) ? 0 : n;
  }

  // Fisher-Yates shuffle
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function byName(a, b) { return collator.compare(nameOf(a), nameOf(b)); }
  function byPrice(a, b) { return priceOf(a) - priceOf(b) || byName(a, b); }

  var labels = {
    'random': 'in random order',
    'name-asc': 'by name, A to Z',
    'name-desc': 'by name, Z to A',
    'price-asc': 'by price, low to high',
    'price-desc': 'by price, high to low'
  };

  function render() {
    var items = getItems();
    var mode = select.value;

    if (mode === 'name-asc')        { items.sort(byName); }
    else if (mode === 'name-desc')  { items.sort(function (a, b) { return byName(b, a); }); }
    else if (mode === 'price-asc')  { items.sort(byPrice); }
    else if (mode === 'price-desc') { items.sort(function (a, b) { return priceOf(b) - priceOf(a) || byName(a, b); }); }
    else                            { shuffle(items); }

    // appendChild moves each existing <li> into its new position
    items.forEach(function (li) { list.appendChild(li); });

    if (status) { status.textContent = 'Offerings shown ' + (labels[mode] || labels.random) + '.'; }
  }

  select.addEventListener('change', render);

  // The menu is a GET form; with JavaScript on we sort in place instead of reloading
  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
  }

  // Start in random order (also resets the menu if the browser restored an old choice)
  select.value = 'random';
  render();
})();