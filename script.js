const languageButtons = [...document.querySelectorAll("[data-language-button]")]

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.languageButton
    document.body.dataset.language = language
    languageButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button))
    })
  })
})

const slideLinks = [...document.querySelectorAll("[data-slide-link]")]
const lessons = [...document.querySelectorAll(".lesson")]

function setActiveSlide(id) {
  slideLinks.forEach((link) => {
    const active = link.getAttribute("href") === "#" + id
    if (active) link.setAttribute("aria-current", "location")
    else link.removeAttribute("aria-current")
  })
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (visible) setActiveSlide(visible.target.id)
  }, { rootMargin: "-20% 0px -58% 0px", threshold: [0, 0.2, 0.45, 0.7] })

  lessons.forEach((lesson) => observer.observe(lesson))
} else {
  window.addEventListener("hashchange", () => {
    const id = window.location.hash.slice(1)
    if (id) setActiveSlide(id)
  })
}
