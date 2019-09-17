import html from 'nanohtml'
import raw from 'nanohtml/raw'

main()
    .catch(e => console.error(e))



interface Status {
    url: string
    account: Account
    content: string
    media_attachments: Array<Attachment>
}

interface Account {
    username: string
    url: string
    avatar: string
}

interface Attachment {
    id: string
    type: 'unknown' | 'image' | 'gifv' | 'video'
    preview_url: string
    url: string
    description: string
}

interface Image {
    status: Status
    media: Attachment
}





async function main() {
    const statuses = await fetchStatuses()

    const images = statuses
        .flatMap(status =>
            status.media_attachments.map(media => ({ media, status }))
        )
        .filter(x => x.media.type === 'image')

    let gallery = document.getElementById('gallery')
    gallery.appendChild(galleryView(images))
}

function galleryView(images: Array<Image>) {
    return html`
        <div class="gallery">
            ${images.map(itemView)}
        </div>
    `
}

function itemView({ status, status: { account }, media }: Image) {
    return html`
        <div>
            <a class="gallery__item" href="${mediaUrlFragment(media)}">
                <img class="gallery__img" src="${media.preview_url}">
            </a>

            <div class="viewer" id="${mediaId(media)}">
                <img class="viewer__img" src="${media.url}">

                <div>
                    <a href="${account.url}">
                        <img src="${account.avatar}" width="32" height="32">
                        ${account.username}
                    </a>

                    <div>
                        ${raw(status.content)}
                    </div>

                    <div>
                        ${status.media_attachments.map(alternativeMedia => alternateMediaView(media, alternativeMedia))}
                    </div>
                </div>

                <!--<a class="viewer__control" href="#previous">Previous</a>-->
                <!--<a class="viewer__control" href="#next">Next</a>-->
                <a class="viewer__control viewer__control--close" href="#">Close</a>
            </div>
        </div>
    `
}

function alternateMediaView(current: Attachment, alternate: Attachment)
{
    const img = html`<img src="${alternate.preview_url}" width="32" height="32">`

    return current.id === alternate.id
        ? img
        : html`<a href="${mediaUrlFragment(alternate)}">${img}</a>`
}

function fetchStatuses(): Promise<Array<Status>> {
    return fetch('https://eldritch.cafe/api/v1/timelines/tag/minecrafteldritchcafe?only_media=1')
        .then(response => response.json())
}

function mediaUrlFragment(media: Attachment)
{
    return `#${mediaId(media)}`
}

function mediaId(media: Attachment)
{
    return `image/${media.id}`
}