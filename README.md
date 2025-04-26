## 🎯 Goals

- [x] Fetch API data with the useEffect React hook and async/await syntax
- [x] Respond to events triggered by user interaction and handle user input
- [x] Use .map() to dynamically render a group of elements
- [x] Use .filter() to filter data based on user input
- [x] Use React Router to build navigation around the application
- [x] Use Link to dynamically generate a list of routes
- [x] Use useParams() hook to extract parameters from a URL
- [x] Install and integrate an npm library into an existing React app
- [x] Setup and use supabase-js to manage a database
- [x] Perform various API requests that will change your web app according to CRUD

## ❗ Required Features

- [x] The site has a dashboard displaying a list of data fetched using an API call
  - [x] The dashboard should display at least 10 unique items, one per row
  - [x] The dashboard includes at least two features in each row
- [x] useEffect React hook and async/await are used
- [x] The app dashboard includes at least three summary statistics about the data
  - [x] the total number of items in the dataset or which meet certain criteria in the dataset
  - [x] the mean, median, mode, or other statistic of a certain aspect of the data
  - [x] quartiles, quintiles, or ranges of the data
- [x] A search bar allows the user to search for an item in the fetched data
  - [x] The search bar correctly filters items in the list, only displaying items matching the search query
  - [x] The list of results dynamically updates as the user types into the search bar
- [x] An additional filter allows the user to restrict displayed items by specified categories
  - [x] The filter restricts items in the list using a different attribute than the search bar
  - [x] The filter correctly filters items in the list, only displaying items matching the filter attribute in the dashboard
  - [x] The dashboard list dynamically updates as the user adjusts the filter
- [x] Clicking on an item in the list view displays more details about it
  - [x] Clicking on an item in the dashboard list navigates to a detail view for that item
  - [x] Detail view includes extra information about the item not included in the dashboard view
  - [x] The same sidebar is displayed in detail view as in dashboard view
- [x] Each detail view of an item has a direct, unique URL link to that item’s detail view page
- [x] The app includes at least two unique charts developed using the fetched data that tell an interesting story
  - [x] At least two charts should be incorporated into the dashboard view of the site
  - [x] Each chart should describe a different aspect of the dataset
- [x] The web app contains a page that features a create form to add a new crewmate
  - [x] Users can name the crewmate
  - [x] Users can set the crewmate’s attributes by clicking on one of several values
- [x] The web app includes a summary page of all the user’s added crewmates
  - [x] The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  - [x] The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] A previously created crewmate can be updated from the list of crewmates in the summary page
  - [x] Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - [x] Users can see the current attributes of their crewmate on the update form
  - [x] After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page
- [x] A previously created crewmate can be deleted from the crewmate list
  - [x] Using the edit form detailed in the previous crewmates can be updated feature, there is a button that allows users to delete that crewmate
  - [x] After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [x] Each crewmate has a direct, unique URL link to an info page about them
  - [x] Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
    - [x] The detail page contains extra information about the crewmate not included in the summary page
    - [x] Users can navigate to the edit form from the detail page
- [x] Web app includes a create form that allows the user to create posts
  - [x] Form requires users to add a post title
  - [x] Forms should have the option for users to add:
    - [x] additional textual content
    - [x] an image added as an external image URL
- [x] Web app includes a home feed displaying previously created posts
  - [x] Web app must include home feed displaying previously created posts
  - [x] By default, each post on the posts feed should show only the post's:
    - [x] creation time
    - [x] title
    - [x] upvotes count
  - [x] Clicking on a post should direct the user to a new page for the selected post
- [x] Users can view posts in different ways
  - [x] Users can sort posts by either:
    - [x] creation time
    - [x] upvotes count
  - [x] Users can search for posts by title
- [ ] Users can interact with each post in different ways
  - [ ] The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - [ ] content
    - [ ] image
    - [ ] comments
  - [ ] Users can leave comments underneath a post on the post page
  - [x] Each post includes an upvote button on the post page.
  - [x] Each click increases the post's upvotes count by one
  - [x] Users can upvote any post any number of times
- [ ] A post that a user previously created can be edited or deleted from its post pages
  - [ ] After a user creates a new post, they can go back and edit the post
  - [x] A previously created post can be deleted from its post page

## 🚀 Stretch Features

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - [x] e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values
- [x] The site's customized dashboard contains more content that explains what is interesting about the data
  - [x] e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [x] The site allows users to toggle between different data visualizations
  - [x] User should be able to use some mechanism to toggle between displaying and hiding visualizations
- [ ] Web app implements pseudo-authentication
  - [ ] Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - [ ] Upon launching the webzzzzz app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - [ ] For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID
  - [ ] On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - [ ] e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characteristics to their posts
  - [ ] Users can share and view web videos
  - [ ] Users can set flags such as "Question" or "Opinion" while creating a post
  - [ ] Users can filter posts by flags on the home feed
  - [ ] Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

<br>
<img src="./pokestats/src/assets/walkthrough-video.gif">
<img src="./pokestats/src/assets/walkthrough-video-2.gif">
<img src="./pokestats/src/assets/walkthrough-video-3.gif">

GIFs created with [Ezgif](https://ezgif.com/)
