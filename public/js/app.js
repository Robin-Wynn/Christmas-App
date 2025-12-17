// READ MORE BUTTON
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
            summary.dataset.expanded = "true"
            button.textContent = "Read Less"
        }
    })
})

// patch method forms
document.getElementById("updateForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const updatedName = document.getElementById("streaming_platform").value 

    const res = await fetch(`api/streaming_platform/update/${req.params.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ streaming_platform: updatedName })
    })

    const data = await res.json()
    console.log(data)

    if (!data.error) {
        alert("Updated!")
    }
})