(async () => {
  const response = await fetch("https://reqres.in/api/users/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name: "mikko", job: "software engineer" }),
  });
  const json = await response.json();
  console.log(json);
})();
