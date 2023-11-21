// TASK 1 -----------------------------------------

let realmadrid = {
  teamname: "Real Madrid",
  city: "Madrid",
  country: "Spain",
  topscorers: ["Ronaldo", "Benzema", "Hazard"],
  worldwidefans: 798000000,
};

let barcelona = {
  teamname: "Barcelona",
  city: "Barcelona",
  country: "Spain",
  topscorers: ["Messi", "Suarez", "Puyol"],
  worldwidefans: 738000000,
};

let manchesterunited = {
  teamname: "Manchester United",
  city: "Manchester",
  country: "England",
  topscorers: ["Cantona", "Rooney", "Ronaldo"],
  worldwidefans: 755000000,
};

let manchestercity = {
  teamname: "Manchester City",
  city: "Manchester",
  country: "England",
  topscorers: ["Sterling", "Aguero", "Haaland"],
  worldwidefans: 537000000,
};

let brazilnationalteam = {
  teamname: "Brazil National Team",
  city: "Not applicable",
  country: "Brazil",
  topscorers: ["Ronaldinho", "Cafu", "Bebeto"],
  worldwidefans: 950000000,
};

let argentinanationalteam = {
  teamname: "Argentina National Team",
  city: "Not applicable",
  country: "Argentina",
  topscorers: ["Messi", "Batistuta", "Maradona"],
  worldwidefans: 888000000,
};

let atlecicomadrid = {
  teamname: "Atletico Madrid",
  city: "Madrid",
  country: "Spain",
  topscorers: ["Aragonés", "Griezmann", "Torez"],
  worldwidefans: 400000000,
};

teams = [
  realmadrid,
  barcelona,
  manchesterunited,
  manchestercity,
  brazilnationalteam,
  argentinanationalteam,
  atlecicomadrid,
];

// teams.forEach((team) => {
//   db.collection("teams").add(team);
// });

// TASK 2 -----------------------------------------------------

// t2q1
db.collection("teams")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      document.querySelector("#p2q1").innerHTML += `<p>${
        doc.data().teamname
      } </p>`;
    });
  });

// t2q2
db.collection("teams")
  .where("city", "==", "Madrid")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      document.querySelector("#p2q2").innerHTML += `<p>${
        doc.data().teamname
      } </p>`;
    });
  });

// t2q3
db.collection("teams")
  .where("city", "==", "Not applicable")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      document.querySelector("#p2q3").innerHTML += `<p>${
        doc.data().teamname
      } </p>`;
    });
  });

// t2q4
db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      document.querySelector("#p2q4").innerHTML += `<p>${
        doc.data().teamname
      } </p>`;
    });
  });

// t2q5
db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      document.querySelector("#p2q5").innerHTML += `<p>${
        doc.data().teamname
      } </p>`;
    });
  });

// t2q6
db.collection("teams")
  .where("worldwidefans", ">", 700000000)
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      if (doc.data().country == "Spain") {
        document.querySelector("#p2q6").innerHTML += `<p>${
          doc.data().teamname
        } </p>`;
      }
    });
  });

// t2q7
db.collection("teams")
  .where("worldwidefans", ">", 500000000)
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      if (doc.data().worldwidefans < 600000000) {
        document.querySelector("#p2q7").innerHTML += `<p>${
          doc.data().teamname
        } </p>`;
      }
    });
  });

// t2q8
db.collection("teams")
  .where("topscorers", "array-contains", "Ronaldo")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      document.querySelector("#p2q8").innerHTML += `<p>${
        doc.data().teamname
      } </p>`;
    });
  });

// t2q9
db.collection("teams")
  .where("topscorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      document.querySelector("#p2q9").innerHTML += `<p>${
        doc.data().teamname
      } </p>`;
    });
  });

// TASK 3 ------------------------------------------------------

// A
db.collection("teams")
  .where("teamname", "==", "Real Madrid")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        worldwidefans: 811000000,
        teamname: "Real Madrid FC",
      });
    });
  });

db.collection("teams")
  .where("teamname", "==", "Barcelona")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        worldwidefans: 747000000,
        teamname: "FC Barcelona",
      });
    });
  });

db.collection("teams")
  .where("teamname", "==", "Real Madrid FC")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams")
        .doc(doc.id)
        .update({
          topscorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
        });
      db.collection("teams")
        .doc(doc.id)
        .update({
          topscorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
        });
    });
  });

db.collection("teams")
  .where("teamname", "==", "FC Barcelona")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams")
        .doc(doc.id)
        .update({
          topscorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
        });
      db.collection("teams")
        .doc(doc.id)
        .update({
          topscorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
        });
    });
  });

// B

db.collection("teams")
  .where("teamname", "==", "Real Madrid FC")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams")
        .doc(doc.id)
        .update({
          color: {
            home: "White",
            away: "Black",
          },
        });
    });
  });

db.collection("teams")
  .where("teamname", "==", "FC Barcelona")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams")
        .doc(doc.id)
        .update({
          color: {
            home: "Red",
            away: "Gold",
          },
        });
    });
  });

db.collection("teams")
  .where("teamname", "==", "Real Madrid FC")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        "color.away": "Purple",
      });
    });
  });

db.collection("teams")
  .where("teamname", "==", "FC Barcelona")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        "color.away": "Pink",
      });
    });
  });
