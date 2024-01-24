// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const contacts = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { id: 2, firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com" },
  { id: 3, firstName: "dan", lastName: "eki", email: "ekisoweidan@gmail.com" },
  {
    id: 4,
    firstName: "mimi",
    lastName: "babtunde",
    email: "babatunde@gmai.com",
  },
];

app.post("/search", (req, res) => {
  const searchTerm = req.body.search.toLowerCase();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm) ||
      contact.lastName.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm)
  );

  // Generate HTML snippet for HTMX to insert
  let resultsHTML = filteredContacts
    .map(
      (contact) =>
        `<tr>
       <td>${contact.firstName}</td>
       <td>${contact.lastName}</td>
       <td>${contact.email}</td>
     </tr>`
    )
    .join("");

  // If no results, provide a message
  if (filteredContacts.length === 0) {
    resultsHTML = '<tr><td colspan="3">No contacts found.</td></tr>';
  }

  res.send(resultsHTML);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
