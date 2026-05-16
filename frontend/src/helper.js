export const toggleClass = (selector, className) => {
  let element = document.querySelector(selector);
  element.classList.toggle(className);
};

export const removeclass = (selector, className) => {
  let element = document.querySelector(selector);
  element.classList.remove(className);
};

export const api_base_url = "http://localhost:3000"