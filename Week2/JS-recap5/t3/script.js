(async () => {
  try {
    const response = await fetch("https://reqres.in/api/unknown/23");
    const json = await response.json();
    if (!response.ok) throw Error;
    console.log(json);
  } catch (e) {
    console.log(e);
  }

  try {
    const response = await fetch("https://reqres.in/api/unknown/23", {
      method: "DELETE",
    });
    const json = await response.json();
    if (!response.ok) throw Error;
    console.log(json);
  } catch (e) {
    console.log(e);
  }
})();
