// Reusable component for the movie info card
AFRAME.registerComponent('movie-info-card', {
  schema: {
    title: { type: 'string', default: 'Title' },
    genre: { type: 'string', default: 'Genre' },
    year: { type: 'string', default: 'Year' },
    synopsis: { type: 'string', default: 'Synopsis not available.' },
    cast: { type: 'string', default: 'Cast not available.' }
  },
  
  init: function() {
    // Set card background color to black and adjust size
    this.el.setAttribute('geometry', {
      primitive: 'box',
      height: 2.5, // Increased height to fit more text
      width: 3.5,  // Increased width
      depth: 0.1
    });
    this.el.setAttribute('material', { color: '#000', opacity: 0.7 }); // Black background

    // Title
    const titleEl = document.createElement('a-text');
    titleEl.setAttribute('id', 'card-title');
    titleEl.setAttribute('value', this.data.title + ' (' + this.data.year + ')');
    titleEl.setAttribute('position', '0 1 0.06'); // Adjusted position
    titleEl.setAttribute('align', 'center');
    titleEl.setAttribute('font', 'monoid'); // Use a readable font
    titleEl.setAttribute('color', '#fff'); // White text
    titleEl.setAttribute('width', '2.8'); // Wider text field
    titleEl.setAttribute('wrap-count', '30'); // Wrap long titles
    this.el.appendChild(titleEl);

    // Genre
    const genreEl = document.createElement('a-text');
    genreEl.setAttribute('id', 'card-genre');
    genreEl.setAttribute('value', 'Genre: ' + this.data.genre);
    genreEl.setAttribute('position', '0 0.9 0.06'); // Below title
    genreEl.setAttribute('align', 'center');
    genreEl.setAttribute('width', '2');
    genreEl.setAttribute('font', 'mozillavr');
    genreEl.setAttribute('color', '#eee'); // Slightly off-white
    this.el.appendChild(genreEl);

    // Synopsis
    const synopsisEl = document.createElement('a-text');
    synopsisEl.setAttribute('id', 'card-synopsis');
    synopsisEl.setAttribute('value', 'Synopsis:\n' + this.data.synopsis);
    synopsisEl.setAttribute('position', '0 0 0.06'); // Centered
    synopsisEl.setAttribute('align', 'center');
    //synopsisEl.setAttribute('font', 'aileronsemibold');
    synopsisEl.setAttribute('color', '#fff'); // White text
    synopsisEl.setAttribute('width', '1.8'); // Wider text field
    synopsisEl.setAttribute('wrap-count', '35'); // Wrap for synopsis
    this.el.appendChild(synopsisEl);

    // Cast
    const castEl = document.createElement('a-text');
    castEl.setAttribute('id', 'card-cast');
    castEl.setAttribute('value', 'Cast:\n' + this.data.cast);
    castEl.setAttribute('position', '0 -0.9 0.06'); // Below synopsis
    castEl.setAttribute('align', 'center');
    castEl.setAttribute('font', 'mozillavr');
    castEl.setAttribute('color', '#fff'); // White text
    castEl.setAttribute('width', '1.5'); // Wider text field
    castEl.setAttribute('wrap-count', '35'); // Wrap for cast
    this.el.appendChild(castEl);
  },

  update: function() {
    this.el.querySelector('#card-title').setAttribute('value', this.data.title + ' (' + this.data.year + ')');
    this.el.querySelector('#card-genre').setAttribute('value', 'Genre: ' + this.data.genre);
    this.el.querySelector('#card-synopsis').setAttribute('value', 'Synopsis:\n' + this.data.synopsis);
    this.el.querySelector('#card-cast').setAttribute('value', 'Cast:\n' + this.data.cast);
  }
});

// Component to handle poster clicks and show/hide the info card
AFRAME.registerComponent('poster-handler', {
  schema: {
    title: { type: 'string', default: '' },
    genre: { type: 'string', default: '' },
    year: { type: 'string', default: '' },
    synopsis: { type: 'string', default: '' },
    cast: { type: 'string', default: '' }
  },

  init: function () {
    const poster = this.el;
    const infoCard = document.querySelector('#info-card');

    poster.addEventListener('click', function () {
      if (infoCard.getAttribute('visible')) {
        infoCard.setAttribute('visible', false);
      } else {
        infoCard.setAttribute('movie-info-card', {
          title: poster.components['poster-handler'].data.title,
          genre: poster.components['poster-handler'].data.genre,
          year: poster.components['poster-handler'].data.year,
          synopsis: poster.components['poster-handler'].data.synopsis,
          cast: poster.components['poster-handler'].data.cast
        });
        infoCard.setAttribute('visible', true);
      }
    });
  }
});