// Select all elements with the class "random-bg"
const elements = document.querySelectorAll("li");

// Loop through each element and assign a random background color
elements.forEach((element) => {
  // Generate random values for RGB
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  // Create the random background color using RGB values
  const randomColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 0.3)`;
  console.log(randomRed, randomGreen, randomBlue);
  // Apply the random background color to the element
  element.style.background = randomColor;
});
