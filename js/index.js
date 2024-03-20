let sInput = document.getElementById("subject_input");
let cInput = document.getElementById("chapter_input");

let tbody = document.getElementById("table-classes");
const numOfSubjects = webDB.length;

function addAllSubjects(subjectArray) {
  let option = document.createElement("option");
  option.innerText = subjectArray.at(-1);
  sInput.appendChild(option);
  option.value = subjectArray[0];
}
function onReload() {
  webDB.forEach(addAllSubjects);
}
onReload();

function addChaptersAccordingToSubjects(selectedSubject) {
  for (let i = 0; i < numOfSubjects; i++) {
    if (selectedSubject == webDB[i][0]) {
      let numOfChapters = webDB[i].length - 1;
      for (let j = 1; j < numOfChapters; j++) {
        let option = document.createElement("option");
        option.innerText = webDB[i][j];
        cInput.appendChild(option);
        if (j < 10) {
          option.value = "0" + j;
        } else {
          option.value = j.toString();
        }
      }
      break;
    }
  }
}
function removeChapters() {
  let numOfcInputChilds = cInput.childElementCount;
  if (numOfcInputChilds > 1) {
    for (let i = 1; i < numOfcInputChilds; i++) {
      cInput.removeChild(cInput.children[1]);
    }
  }
}
function onSubjectChange() {
  let selectedSubject = document.getElementById("subject_input").value;
  if (selectedSubject !== "ss") {
    cInput.disabled = false;
    cInput.children[0].innerText = "Select a Chapter";
    removeChapters();
    addChaptersAccordingToSubjects(selectedSubject);
  } else {
    cInput.disabled = true;
    cInput.children[0].innerText = "Choose a Subject First";
    cInput.value = "sf";
  }
}

function removeClasses() {
  let numOftbodyClasses = tbody.childElementCount;
  if (numOftbodyClasses > 0) {
    for (let i = 0; i < numOftbodyClasses; i++) {
      tbody.removeChild(tbody.children[0]);
    }
  }
}

function showClasses(selectedSubject, selectedChapter) {
  let docReference = `${selectedSubject}-${selectedChapter}`;

  firestore
    .collection("SHIKHO")
    .doc(docReference)
    .get()
    .then((classDoc) => {
      if (classDoc.exists) {
        addClasses(classDoc, docReference);
      } else {
        alert("NO Class Founded");
      }
    });
}
function addClasses(classDoc, docReference) {
  let classData = classDoc.data();
  let classes = Object.keys(classData).sort();
  let subject_chapter = docReference.split("-");
  //   let classDocID = classDoc.id;
  classes.forEach((singleClass) => {
    let trow = document.createElement("tr");
    let CLASS = classData[singleClass];
    trow.innerHTML = `<td>${CLASS[0]}</td><td>${CLASS[3]}</td><td>${CLASS[2]}</td><td>${CLASS[1]} MB</td><td><a href="https://shikhoapp.github.io/${subject_chapter[0]}/${subject_chapter[1]}/${singleClass}/" target="_blank">Link</a></td>`;
    tbody.appendChild(trow);
  });
}

function onChapterChange() {
  let selectedSubject = document.getElementById("subject_input").value;
  let selectedChapter = document.getElementById("chapter_input").value;
  if (selectedChapter !== "sc") {
    removeClasses();
    showClasses(selectedSubject, selectedChapter);
  }
}

// classes.forEach((classNum) => {
//     let trow = document.createElement("tr");
//     let eachClassData = classData.classNum;
//     trow.innerHTML = `<tbody><td>${eachClassData[0]}</td><td>${eachClassData[3]}</td><td>${eachClassData[2]}</td><td>${eachClassData[1]} MB</td></tbody>`;
//     table.appendChild(trow);
//   });
