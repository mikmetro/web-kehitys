(async () => {
  try {
    const user = {
      name: "John Doe",
      job: "Developer",
    };
    const url = "https://reqres.in/api/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
})();

async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (response.status.toString()[0] !== "2")
    throw Error(
      `An error occured while fetching: ${response.status} ${response.type}`,
    );
  const json = await response.json();
  return json;
}
