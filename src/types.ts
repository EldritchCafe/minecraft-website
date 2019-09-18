export interface Status {
    url: string
    account: Account
    content: string
    media_attachments: Array<Attachment>
    created_at: string
    favourites_count: number
    reblogs_count: number
}

export interface Account {
    username: string
    acct: string
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