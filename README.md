# Web Development Project 8 - *AandM Discussion Hub*

Submitted by: **Shi Wei Zheng**

This web app: **A discussion forum for anime and manga lovers.**

Time spent: **20** hours spent in total

Link to app: https://aandm-discussion.netlify.app/

## Required Features

The following **required** functionality is completed:

- [x] **A create form that allows the user to create posts**
- [x] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [x] **A home feed displaying previously created posts**
- [x] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [x] **Clicking on a post shall direct the user to a new page for the selected post**
- [x] **Users can sort posts by either their created time or upvotes count**
- [x] **Users can search for posts by title**
- [x] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [x] **Users can leave comments underneath a post on the post's separate page**
- [x] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [x] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [ ] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [ ] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [x] List anything else that you added to improve the site's functionality!
  * [x] Use [Anilist API](https://anilist.gitbook.io/anilist-apiv2-docs/) to get currently trending anime and manga
  * [x] Use Firebase 9 for
    - User authentication
    - Database

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://user-images.githubusercontent.com/22397488/233820396-0201df49-2328-46d0-98ed-76f2771d4874.mp4

<!-- Replace this with whatever GIF tool you used! -->
Video created with ShareX

## Notes





Describe any challenges encountered while building the app.
- This is my first time using Firebase so I ran into a few difficulties. I had to research how to incorporate the service into my app and use the various functions provided by the service. I ran into problems like not being able to update user information and getting the data that I needed from the Firestore database. It was confusing at first, but after trying out different methods of overcoming the challenges and searching for possible solutions, I was able to understand how the authentication and database function in Firebase.
- It was confusing to fetch data from the Anilist API since it uses GraphQL instead of REST API. Not understanding how GraphQL works, I had trouble fetching the data I needed. Even though I followed the documentation, I had to do other research on how to fetch the data. Many trials and error were done to solve a lot of the challenges I encountered.

## License

    Copyright [2023] [Shi Wei Zheng]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
