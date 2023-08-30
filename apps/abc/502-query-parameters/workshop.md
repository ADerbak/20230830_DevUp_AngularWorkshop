# Workshop for this step

* Add a query parameter that represents the ID of the video
  in the list that is selected
* Use that parameter to set the initially selected video.
* Update the list to navigate whenever a video is clicked using
  routerLink, rather than emitting an event.

## Bonus

Whenever a video is selected via the Query Param, 
fetch the full video object data from the API using the ID.

You can request a single item from the demo API server, as long as the
items contain an "id" property. For example, you could retrieve
information about a video where the "id" property is "xyz123" like so:

  http://localhost:8085/videos/xyz123

  https://api.angularbootcamp.com/videos/xyz123

(Adjust as appropriate if your API URL is different.)
