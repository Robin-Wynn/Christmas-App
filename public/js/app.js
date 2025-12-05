// console.log("Hello World") 
// const text = document.querySelectorAll(".programSummary")
// text.forEach(summary => summary.style.display = 'none')

// function readMore(nodeList) {
//     nodeList.forEach(el => {
        
//     })
// }

// const readMoreBtn = document.querySelectorAll('read-more-btn')

// readMoreBtn.forEach(button => {
//     button.addEventListener('click', (e)=> {
//         e.preventDefault()
//         if (button.getAttribute('data-btnId') == )
//     })
// })

const VISIBLE_WORD_COUNT = 6

document.querySelectorAll(".programSummary").forEach(summary => {
    // grab full text 
    const fullText = summary.textContent.trim()

    // store the full original text
    summary.dataset.full = fullText

    // split into words for truncation
    const words = fullText.split(/\s+/)

    // generate short version
    let shortText = fullText

    if (words.length > VISIBLE_WORD_COUNT) {
        shortText = words.slice(0, VISIBLE_WORD_COUNT).join(" ") + "..."
        
    }

    summary.dataset.short = shortText
    summary.dataset.expanded = "false"

    summary.textContent =  shortText
})

document.querySelectorAll(".read-more-btn").forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.id
        const summary = document.querySelector(`.programSummary[data-id="${id}"]`)

        const expanded = summary.dataset.expanded === "true"

        if (expanded) {
            summary.textContent = summary.dataset.short
            summary.dataset.expanded = "false"
            button.textContent = "Read More"
        } else {
            summary.textContent = summary.dataset.full
            summary.dataset.expanded = "True"
            button.textContent = "Read Less"
        }
    })
})