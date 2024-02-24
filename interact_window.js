const welcome_position = { x: 0, y: 0 }
const upload_position = { x: 0, y: 0 }
const uploadProgress_position = { x: 0, y: 0 }
const imagePreview_position = { x: 0, y: 0 }
const filmstripPreview_position = { x: 0, y: 0 }
const contactSheet_position = { x: 0, y: 0 }
const todo_position = { x: 0, y: 0 }
const filmSelect_position = { x: 0, y: 0 }

interact('#welcome').draggable({
    listeners: {
        move (event) {
            welcome_position.x += event.dx
            welcome_position.y += event.dy
            event.target.style.transform =
                `translate(${welcome_position.x}px, ${welcome_position.y}px)`
            },
    },
    cursorChecker () { return null }
})


interact('#upload').draggable({
    listeners: {
        move (event) {
            upload_position.x += event.dx
            upload_position.y += event.dy
            event.target.style.transform =
                `translate(${upload_position.x}px, ${upload_position.y}px)`
            },
    },
    cursorChecker () { return null }
})

interact('#uploadProgress').draggable({
    listeners: {
        move (event) {
            uploadProgress_position.x += event.dx
            uploadProgress_position.y += event.dy
            event.target.style.transform =
                `translate(${uploadProgress_position.x}px, ${uploadProgress_position.y}px)`
            },
    },
    cursorChecker () { return null }
})

interact('#imagePreviewWindow').draggable({
    listeners: {
        move (event) {
            imagePreview_position.x += event.dx
            imagePreview_position.y += event.dy
            event.target.style.transform =
                `translate(${imagePreview_position.x}px, ${imagePreview_position.y}px)`
            },
    },
    cursorChecker () { return null }
})

interact('#filmstripPreviewWindow').draggable({
    listeners: {
        move (event) {
            filmstripPreview_position.x += event.dx
            filmstripPreview_position.y += event.dy
            event.target.style.transform =
                `translate(${filmstripPreview_position.x}px, ${filmstripPreview_position.y}px)`
            },
    },
    cursorChecker () { return null }
})

interact('#contactSheetWindow').draggable({
    listeners: {
        move (event) {
            contactSheet_position.x += event.dx
            contactSheet_position.y += event.dy
            event.target.style.transform =
                `translate(${contactSheet_position.x}px, ${contactSheet_position.y}px)`
            },
    },
    cursorChecker () { return null }
})

interact('#todoWindow').draggable({
    listeners: {
        move (event) {
            todo_position.x += event.dx
            todo_position.y += event.dy
            event.target.style.transform =
                `translate(${todo_position.x}px, ${todo_position.y}px)`
            },
    },
    cursorChecker () { return null }
})

interact('#filmSelectWindow').draggable({
    listeners: {
        move (event) {
            filmSelect_position.x += event.dx
            filmSelect_position.y += event.dy
            event.target.style.transform =
                `translate(${filmSelect_position.x}px, ${filmSelect_position.y}px)`
            },
    },
    cursorChecker () { return null }
})
