console.log("Server file started");

import app from "./app.js";

console.log("App imported");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});