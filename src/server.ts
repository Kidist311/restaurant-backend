console.log("Server file started");

import app from "./app.js";

console.log("App imported");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});