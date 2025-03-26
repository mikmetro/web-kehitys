const target = document.querySelector("#target");

const userAgent = window.navigator.userAgent.split(" ");
const [browser, version] = userAgent[userAgent.length - 1].split("/");

addText(`Browser: ${browser} (Version: ${version})`);
addText(`OS: ${window.navigator.oscpu}`);
addText(`Screen size: ${screen.width}x${screen.height}`);
addText(`Browser size: ${window.outerWidth}x${window.outerHeight}`);
addText(
  `Date: ${new Intl.DateTimeFormat("fi-FI", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date())}`,
);

function addText(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  target.append(paragraph);
}
