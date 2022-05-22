let title = document.getElementById("exampleFormControlInput1");
let note = document.getElementById("exampleFormControlTextarea1");
let add_note = document.getElementById("add_note");
let showFav = document.getElementById("showFav");

notesShow();

add_note.addEventListener("click", function () {
  // let strnoteobj;
  // let strtitleobj;
  // let strnote = localStorage.getItem("strnote");
  // let strTitle = localStorage.getItem("strTitle");

  // if (strnote == null && strTitle == null) {
  //   strnoteobj = [];
  //   strtitleobj = [];
  // } else {
  //   strnoteobj = JSON.parse(strnote);
  //   strtitleobj = JSON.parse(strTitle);
  // }
  // strnoteobj.push(note.value);
  // strtitleobj.push(title.value);
  // localStorage.setItem("strnote", JSON.stringify(strnoteobj));
  // localStorage.setItem("strTitle", JSON.stringify(strtitleobj));
  // //   title.value = users.firstName;
  // //   note.value = "";
  // //   title.value="";
  notesShow();
});

async function favOrNot(i) {
  let response = await fetch("/noteapi");
  let noteData = await response.json();
  if (await noteData.notes[i].fav) {
    return "Remove fav";
  } else {
    return "Add fav";
  }
}

async function notesShow() {
  try {
    let response = await fetch("/noteapi");
    let noteData = await response.json();
    let btnFav;
    
    // console.log(noteData.notes[0].title);
    // let strnote = localStorage.getItem("strnote");
    // // strnote=noteData.notes.title;
    // let strTitle = localStorage.getItem("strTitle");
    // if (strnote == null && strTitle == null) {
    //   strnoteobj = [];
    //   strtitleobj = [];
    // } else {
    //   strnoteobj = JSON.parse(strnote);
    //   strtitleobj = JSON.parse(strTitle);
    // }
    let domShow = "";
    // let favindex = localStorage.getItem("favIndexstr");
    // favindex = JSON.parse(favindex);
    await noteData.notes.forEach(function (element, index) {
      if (noteData.notes[index].fav) {
        btnFav = "Remove from fav";
      } else {
        btnFav = "Add fav";
      }
      domShow += `  <div class="card text-dark bg-warning mb-3 mx-3 my-3" style="max-width: 18rem;display:inline-flex;min-width: 10rem">
        <div class="card-header">Note ${
          index + 1
        } <button type="button" onclick="deleteNote(this.id)" class="btn-close" aria-label="Close"
                style="float: right;" id="${index}"></button></div>
        <div class="card-body">
            <h5 class="card-title">${noteData.notes[index].title}</h5>
            <p class="card-text">${noteData.notes[index].bodyCont}</p>
            <button type="button" class="btn btn-outline-light" id="${index}00" onclick="addFav(this.id)">
            ${btnFav}
            </button>
        </div>
    </div>`;

      // ************** trying to add the feature when the notes added to fav the button disappears
      // if (favindex.index == index) {
      //     document.getElementById("index").style.display = "none";
      // }
    });

    // function showFvBtn(){}

    document.getElementById("oops").innerHTML = domShow;
    // if (strnoteobj.length != 0 && strtitleobj.length != 0) {
    if (noteData.notes.length != 0) {
      let emptyNote = document.getElementById("emptyNote");
      emptyNote.style.display = "none";
    } else {
      emptyNote.style.display = "block";
    }
    document.getElementById("showFav").style.display = "inline-block";
    document.getElementById("showNote").style.display = "none";
  } catch (arr) {
    console.log(arr);
  }
}

async function deleteNote(index) {
  try {
    // let response = await fetch("/noteapi");
    // let noteData = await response.json();
    let response = await fetch("/noteapi", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        index: index,
        func: "del",
      }),
    });
    // let noteData = await response.json();
    // await console.log(response.json());
    await notesShow();
    return await response.json;
    // let strnote = localStorage.getItem("strnote");
    // let strTitle = localStorage.getItem("strTitle");
    // if (strnote == null && strTitle == null) {
    //   strnoteobj = [];
    //   strtitleobj = [];
    // } else {
    //   strnoteobj = JSON.parse(strnote);
    //   strtitleobj = JSON.parse(strTitle);
    // }
    // strnoteobj.splice(index, 1);
    // strtitleobj.splice(index, 1);
    // localStorage.setItem("strnote", JSON.stringify(strnoteobj));
    // localStorage.setItem("strTitle", JSON.stringify(strtitleobj));
  } catch (err) {
    console.log(err);
  }
}

let search = document.getElementById("search");
search.addEventListener("input", function () {
  let card = document.getElementsByClassName("card");
  Array.from(card).forEach(function (element) {
    let noteTxt = element.getElementsByTagName("p")[0].innerText;
    let titlTxt = element.getElementsByTagName("h5")[0].innerText;
    if (noteTxt.includes(search.value)) {
      element.style.display = "inline-flex";
    } else if (titlTxt.includes(search.value)) {
      element.style.display = "inline-flex";
    } else {
      element.style.display = "none";
    }
  });
});

async function addFav(favIndex) {
  favIndex = favIndex / 100;
  let response = await fetch("/noteapi", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      favIndex: favIndex,
      func: "fav",
    }),
  });
  await notesShow();
  return await response.json;

  // let favIndexobj;
  // let favIndexstr = localStorage.getItem("favIndexstr");
  // if (favIndexstr == null) {
  //   favIndexobj = [];
  // } else {
  //   favIndexobj = JSON.parse(favIndexstr);
  // }
  // favIndexobj.push(favIndex);
  // localStorage.setItem("favIndexstr", JSON.stringify(favIndexobj));
}

async function favourites() {
  let response = await fetch("/noteapi");
  let noteData = await response.json();
  // let favcount = localStorage.getItem("favIndexstr");
  // if (favcount == null) {
  //   favcount = [];
  // } else {
  //   favcount = JSON.parse(favcount);
  // }
  let favDomshow = "";
  await noteData.notes.forEach(function (element, index) {
    if (noteData.notes[index].fav == true) {
      favDomshow += `  <div class="card text-dark bg-warning mb-3 mx-3 my-3" style="max-width: 18rem;display:inline-flex;min-width: 10rem">
        <div class="card-header">Note ${index + 1} </div>
        <div class="card-body">
            <h5 class="card-title">${noteData.notes[index].title}</h5>
            <p class="card-text">${noteData.notes[index].bodyCont}</p>
        <button type="button" class="my-3 mx-3 btn btn-outline-danger remFavcl" id="${index}000" onclick="rmFav(this.id)">Remove from Fav </button>
        </div>
    </div>`;
      document.getElementById("oops").innerHTML = favDomshow;
    }
  });
  if (favDomshow == "") {
    document.getElementById("oops").innerHTML = "<h5>Nothing to show!</h5>";
  }
  document.getElementById("showFav").style.display = "none";
  document.getElementById("showNote").style.display = "inline-block";
}

async function rmFav(index) {
  index = index / 1000;
  let response = await fetch("/noteapi", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      rmFavIndex: index,
      func: "rmFav",
    }),
  });
  // console.log(index);
  await favourites();
  return await response.json;
  // let rmCounter = localStorage.getItem("favIndexstr");
  // rmCounter = JSON.parse(rmCounter);
  // rmCounter.splice(index, 1);
  // localStorage.setItem("favIndexstr", JSON.stringify(rmCounter));
}

// remaining features are show feature button changes dynamicly to show notes button when pressed ...checked
// syncing the notes to the server  ...checked
// making a chrome extension and syncing that to the server
//when deletin, delete it from the favourite menu too  ..checked
