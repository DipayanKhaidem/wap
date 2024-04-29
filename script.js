const contactsElement = document.getElementById("contacts");

function displayContacts(data) {
  contactsElement.innerHTML = ""; // Clear previous content

  data.forEach((person) => {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact");

    const nameElement = document.createElement("h3");
    nameElement.textContent = person.name;
    contactDiv.appendChild(nameElement);

    const addressElement = document.createElement("p");
    addressElement.textContent = `Address: ${person.address}`;
    contactDiv.appendChild(addressElement);

    const emailElement = document.createElement("p");
    emailElement.textContent = `Email: ${person.email}`;
    contactDiv.appendChild(emailElement);

    const phoneElement = document.createElement("p");
    phoneElement.textContent = `Phone: ${person.phone}`;
    contactDiv.appendChild(phoneElement);

    contactsElement.appendChild(contactDiv);
  });
}

fetch("contacts.xml")
  .then((response) => response.text())
  .then((xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const people = xmlDoc.getElementsByTagName("person");
    const data = [];
    for (let i = 0; i < people.length; i++) {
      const person = people[i];

      data.push({
        name: person.getElementsByTagName("name")[0].textContent,
        address: person.getElementsByTagName("address")[0].textContent,
        email: person.getElementsByTagName("email")[0].textContent,
        phone: person.getElementsByTagName("phone")[0].textContent,
      });
    }
    displayContacts(data);
  })
  .catch((error) => {
    console.error("Error fetching contacts:", error);
  });
