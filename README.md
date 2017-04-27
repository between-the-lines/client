# Type or Text
**3rd place winner at Cognitive Builder Faire 2017**
![Flyer](/SF_FAire.png)

## Purpose
*Type or Text* is a web application which extracts data from social media, such as Twitter to see how interesting a topic is in a given area, *in realtime*, and render the results in such a way that anyone can understand at a glance.  Our first iteration resulted in a Google Maps integration with emoji representations of general feelings based on realtime Twitter streams.

Our idea came up after trying to determine how we can utilize some of the IBM tools we learned at the Cognitive Builder Faire and integrate our knowledge. We wondered what were the actual reactions towards the new Samsung Galaxy over the first two days of its release, so we used that trend as our test model.

The way we used this is by streaming data from twitter using specific keywords. For example, we used the new Samsung S8. From the data extracted, we cleaned up the data that did not belong. This meant removing tweets that were used for marketing purposes, and spam, lots of spam. Basically, for every popular trend, a bunch of bots typically use these trending topics to provide spam.

After we cleaned the data, we used the **IBM Sentiment Analysis** from Watson that goes through each individual tweet and gives an analysis of that tweet.

Each tweet which contains a result from IBM are moved to a program we developed that takes the location data and maps them to the location that was searched.

## Social Impact
Imagine a certain trend going on, such as a concert, school event, or a business where an average person can see how others are feeling towards a given topic.

We believe our product can be used for a variety of reasons. Instead of scrolling through twitter to determine what people are saying about a topic and rummaging through a lot of tweets. Using IBMs Sentiment Analysis API, Google Map's clustering, our own custom APIs and algorithms, we can render results as emojis instead of various percentages. This allows the average person to instantly gain insight about a product or topic based on a local area or to zoom out and see the overall average of the mood in a region or the world.

## Constraints
* This project was built over a period of about 12 hours at the Cognitive Builder Faire Hackathon therefore this is an early build with limited functionality that will be enhanced and built up over time.
* Currently, the Watson API only allows for English and French language analysis.

## Our Team
![Photo of our team](/cbf2017team.jpg)
###### in order from left to right:
* Manoj Mohan
* Rock Pereira
* Jean-Carlos Paredes
* Michael Cleary
* Luiz Estácio
* Kai Hsia
* Mohamad Eid

## Running the application:
1. In the command line, enter `npm install -g http-server`
2. then `http-server -p 4000`
3. Command + double-click the first url displayed in the command line to open the view.
4. CTRL-C will stop the server

