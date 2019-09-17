import { galleryElement } from './views'
import { Status, Attachment, Media } from './types'

main()
    .catch(e => console.error(e))

async function main() {
    const statuses = await fetchStatuses()

    const medias = statuses.flatMap(processStatus)

    let gallery = document.getElementById('gallery')

    if (gallery) {
        gallery.appendChild(galleryElement(medias))
    } else {
        console.error('No #gallery element, cannot mount gallery.')
    }
}

function processStatus(status: Status): Array<Media> {
    const supportedAttachments = status.media_attachments.filter(attachmentSupported)

    return supportedAttachments.map(attachment => ({
        status,
        attachment,
        relatedAttachments: supportedAttachments
    }))
}

function attachmentSupported(attachment: Attachment): boolean
{
    return attachment.type === 'image'
}

function fetchStatuses(): Promise<Array<Status>> {
    return fetch('https://eldritch.cafe/api/v1/timelines/tag/minecrafteldritchcafe?only_attachment=1')
        .then(response => response.json())
}