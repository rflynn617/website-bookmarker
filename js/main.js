//Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  //get form values
  let siteName = document.getElementById("siteName").value;
  let siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  //Test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    //Init array
    const bookmarks = [];
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Set to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from localstorage
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Re-set back to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  //Clear form
  document.getElementById("myForm").reset();

  //Re-fetch bookmarks
  fetchBookmarks();
}

//Delete bookmark
function deleteBookmark(url) {
  //Get bookmarks from localstorage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //Loop through bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  //Re-set back to localstorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //Re-fetch bookmarks
  fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks() {
  //Get bookmarks from localstorage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //Get output id
  const bookmarksResults = document.getElementById("bookmarksResults");

  //Build output
  bookmarksResults.innerHTML = "";
  for (let i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      ' <a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      " <a onClick=\"deleteBookmark('" +
      url +
      '\')"class="btn btn-danger" href="#">Delete</a> ' +
      "</h3>";
    ("</div>");
  }
}

//Validate form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }
  return true;
}
