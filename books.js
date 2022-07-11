let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");
  booksWrapper.classList += " books_loading";
  if (!books) {
    books = await getBooks();
  }
  booksWrapper.classList.remove("books_loading");
  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }
  const booksHTML = books.map((book) => {
    return `<div class="book">
        <figure class="book_img-mask">
            <img class=book_img src="${book.url}" alt="">
        </figure>
        <div class="book_title">${book.title}</div>
        <div class="book_rating">
            ${createRating(book.rating)}
        </div>
        <div class="book_price">
            ${createPrice(book.originalPrice, book.salePrice)}
        </div>
    </div>`;
  });
  booksWrapper.innerHTML = booksHTML.join("");
}

setTimeout(() => {
  renderBooks();
});

function filterBooks(event) {
  if (event.target.value === "LOW_TO_HIGH") {
    renderBooks(event.target.value);
  }
  if (event.target.value === "HIGH_TO_LOW") {
    renderBooks(event.target.value);
  }
  if (event.target.value === "RATING") {
    renderBooks(event.target.value);
  }
}

function createRating(num) {
  let starHTML = "";
  for (let i = 0; i < Math.floor(num); i++) {
    starHTML = starHTML + '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(num)) {
    starHTML = starHTML + '<i class="fas fa-star-half-alt"></i>\n';
  }
  for (let i = Math.ceil(num); i < 5; i++) {
    starHTML = starHTML + '<i class="far fa-star"></i>\n';
  }
  return starHTML;
}
function createPrice(original, sale) {
  let priceHTML = "";
  if (!!sale) {
    priceHTML = `<span class="book_price-normal">$${original}</span>$${sale}\n`;
  } else {
    priceHTML = `$${original}\n`;
  }
  return priceHTML;
}

function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 39.99,
          salePrice: 19.99,
          rating: 5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 29.99,
          salePrice: 14.99,
          rating: 4.5,
        },
        {
          id: 3,
          title: "Can't Hurt Me",
          url: "assets/david goggins.jpeg",
          originalPrice: 79.99,
          salePrice: 24.99,
          rating: 4.5,
        },
        {
          id: 4,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 39.99,
          salePrice: 14.99,
          rating: 4,
        },
        {
          id: 5,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 29.99,
          salePrice: 9.99,
          rating: 3,
        },
        {
          id: 6,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 19.99,
          salePrice: null,
          rating: 4,
        },
        {
          id: 7,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 11.99,
          salePrice: null,
          rating: 5,
        },
        {
          id: 8,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 12.99,
          salePrice: null,
          rating: 5,
        },
        {
          id: 9,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 24.99,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 10,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 24.99,
          salePrice: 19.99,
          rating: 2.5,
        },
        {
          id: 11,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 49.99,
          salePrice: null,
          rating: 5,
        },
        {
          id: 12,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 19.99,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
