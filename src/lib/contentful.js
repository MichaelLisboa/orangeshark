import { createClient } from "contentful"

const SPACE_ID = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;
// const SPACE_ID = "0qk3z6vp1hs5"
// const ACCESS_TOKEN = "QG7npfSwA56QJDy7jH4nupPpjjCznfqiqaYyidLihuA"
const client = createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})

export function getBlogPosts () {
    return client.getEntries({
        content_type: "blog"
    })
}

export function getBlogPostBySlug (slug) {
    return client.getEntries({
        "content_type": "blog",
        "fields.entrySlug": slug
    })
}

export function getEventPosts () {
    return client.getEntries({
        content_type: "event"
    })
}

export function getEventPostBySlug (slug) {
    return client.getEntries({
        "content_type": "event",
        "fields.entrySlug": slug
    })
}

export function getTeamMembers () {
    return client.getEntries({
        content_type: "team"
    })
}

export function getPartners () {
    return client.getEntries({
        content_type: "partners"
    })
}
