import axios from "axios";
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

axios
  .get("https://api.github.com/users/dustinmyers/followers")
  .then((res) => {
    res.data.forEach((obj) => {
      followersArray.push(obj.login);
    });
    return followersArray;
  })

  .then((names) => {
    names.forEach((name) => {
      axios
        .get(`https://api.github.com/users/${name}`)
        .then((res) => {
          console.log(res.data);
          cardTarget.appendChild(cardMaker(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardMaker(obj) {
  const card = document.createElement("div");
  const img = document.createElement("img");
  const divCardInfo = document.createElement("div");
  const h3 = document.createElement("h3");
  const username = document.createElement("p");
  const userLocation = document.createElement("p");
  const profileP = document.createElement("p");
  const profileLink = document.createElement("a");
  const followersP = document.createElement("p");
  const followingP = document.createElement("p");
  const bioP = document.createElement("p");

  card.classList.add("card");
  divCardInfo.classList.add("card-info");
  h3.classList.add("name");
  username.classList.add("username");

  img.src = obj.avatar_url;
  h3.textContent = obj.name;
  username.textContent = obj.login;
  userLocation.textContent = `Location: ${obj.location}`;
  profileP.textContent = "Profile: ";
  profileLink.href = obj.html_url;
  profileLink.innerHTML = "GitHub";
  followersP.textContent = `Followers: ${obj.followers}`;
  followingP.textContent = `Following: ${obj.following}`;
  bioP.textContent = obj.bio;

  card.appendChild(img);
  card.appendChild(divCardInfo);
  divCardInfo.appendChild(h3);
  divCardInfo.appendChild(username);
  divCardInfo.appendChild(userLocation);
  divCardInfo.appendChild(profileP);
  profileP.appendChild(profileLink);
  divCardInfo.appendChild(followersP);
  divCardInfo.appendChild(followingP);
  divCardInfo.appendChild(bioP);

  return card;
}

const cardTarget = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/jorshuag")
  .then((res) => {
    const card = cardMaker(res.data);

    return card;
  })
  .then((card) => {
    cardTarget.appendChild(card);
  })

  .catch((err) => {
    console.log(err);
  });

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
