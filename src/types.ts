export interface Status {
    url: string
    account: Account
    content: string
    media_attachments: Array<Attachment>
}

export interface Account {
    username: string
    url: string
    avatar: string
}

export interface Attachment {
    id: string
    type: 'unknown' | 'image' | 'gifv' | 'video'
    preview_url: string
    url: string
    description: string
}

export interface Media {
    status: Status
    attachment: Attachment,
    relatedAttachments: Array<Attachment>
}