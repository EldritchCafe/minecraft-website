import html from 'nanohtml'
import raw from 'nanohtml/raw'

import { Account, Attachment, Media } from './types'
import { nullableMap, mapWithContext } from './util'

export const galleryElement = (images: Array<Media>) => html`
    <div class="gallery">
        ${mapWithContext(images, imageElement)}
    </div>
`

const imageElement = (current: Media, previous: null | Media, next: null | Media) => html`
    <div>
        <a class="gallery__item" href="${attachmentUrlFragment(current.attachment)}">
            <img class="gallery__img" src="${current.attachment.preview_url}">
        </a>

        <div class="viewer" id="${attachmentId(current.attachment)}">
            ${nullableMap(previous, previous => html`
                <a class="viewer__control viewer__control-previous" href="${attachmentUrlFragment(previous.attachment)}">Previous</a>
            `)}

            ${nullableMap(next, next => html`
                <a class="viewer__control viewer__control-next" href="${attachmentUrlFragment(next.attachment)}">Next</a>
            `)}

            <a class="viewer__control viewer__control-close" href="#">Close</a>

            <img class="viewer__img" src="${current.attachment.url}">

            <div class="viewer__description">${statusElement(current)}</div>
        </div>
    </div>
`

const statusElement = ({status, attachment, relatedAttachments}: Media) => html`
    <div class="status">
        <header>${accountElement(status.account)}</header>

        <div>
            ${raw(status.content)}
        </div>

        <div>
            ${relatedAttachments.map(relatedAttachment =>
                relatedAttachment.id === attachment.id
                    ? html`
                        <img src="${relatedAttachment.preview_url}" width="32" height="32" class="selected-attachment">
                    `
                    : html`
                        <a href="${attachmentUrlFragment(relatedAttachment)}">
                            <img src="${relatedAttachment.preview_url}" width="32" height="32">
                        </a>
                    `
            )}
        </div>
    </div>
`

const accountElement = (account: Account) => html`
    <div class="account">
        <a href="${account.url}">
            <img src="${account.avatar}" width="32" height="32">
            ${account.username}
        </a>
    </div>
`

const attachmentId = (attachment: Attachment) => `image/${attachment.id}`

const attachmentUrlFragment = (attachment: Attachment) => `#${attachmentId(attachment)}`