import html from 'nanohtml'
import raw from 'nanohtml/raw'
import { formatDistance } from 'date-fns'
import { fr } from 'date-fns/locale'

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
            <a class="viewer__control viewer__control-close" href="#">Close</a>

            <div class="viewer__attachment">
                ${nullableMap(previous, previous => html`
                    <a class="viewer__control viewer__control-previous" href="${attachmentUrlFragment(previous.attachment)}">Previous</a>
                `)}

                ${nullableMap(next, next => html`
                    <a class="viewer__control viewer__control-next" href="${attachmentUrlFragment(next.attachment)}">Next</a>
                `)}

                <img class="viewer__img" src="${current.attachment.url}">
            </div>

            <div class="viewer__status">${statusElement(current)}</div>
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
                        <img src="${relatedAttachment.preview_url}" class="status-attachment status-attachment--selected">
                    `
                    : html`
                        <a href="${attachmentUrlFragment(relatedAttachment)}">
                            <img src="${relatedAttachment.preview_url}" class="status-attachment">
                        </a>
                    `
            )}
        </div>

        <div>
            <a href="${status.url}"">
                <time datetime="${status.created_at}">${formatDate(new Date(status.created_at))}</time>
            </a>

            [F: ${status.favourites_count}]

            [B: ${status.reblogs_count}]
        </div>
    </div>
`

const accountElement = (account: Account) => html`
    <a class="account" href="${account.url}">
        <img src="${account.avatar}" width="32" height="32">
        <bdi>${account.username}</bdi>
        <span>@${account.acct}</span>
    </a>
`

const formatDate = (date: Date) => formatDistance(date, new Date(), { locale: fr, addSuffix: true })

const attachmentId = (attachment: Attachment) => `image/${attachment.id}`

const attachmentUrlFragment = (attachment: Attachment) => `#${attachmentId(attachment)}`