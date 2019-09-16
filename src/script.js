import html from 'nanohtml'

main()
    .catch(e => console.error(e))

async function main() {
    const statuses = await fetchStatuses()

    const images = statuses
        .flatMap(status =>
            status.media_attachments.map(media => ({ media, status }))
        )
        .filter(x => x.media.type === 'image')

    console.log(images)

    let gallery = document.getElementById('gallery')
    gallery.appendChild(galleryView(images))
}

function galleryView(images) {
    return html`
        <div class="gallery">
            ${images.map(itemView)}
        </div>
    `
}

function itemView(image) {
    return html`
        <div>
            <a class="gallery__item" href="#${image.media.id}">
                <img class="gallery__img" src="${image.media.preview_url}">
            </a>

            <div class="viewer" id="${image.media.id}">
                <img class="viewer__img" src="${image.media.url}">

                <!--<a class="viewer__control" href="#previous">Previous</a>-->
                <!--<a class="viewer__control" href="#next">Next</a>-->
                <a class="viewer__control viewer__control--close" href="#">Close</a>
            </div>
        </div>
    `
}

function fetchStatuses() {
    return fetch('https://eldritch.cafe/api/v1/timelines/tag/minecrafteldritchcafe?only_media=1')
        .then(response => response.json())
}

