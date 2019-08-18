# Self-Study/Essay Questions

- [x] Mention two parts of Express that you learned about this week.  

> Express is unopinionated and simple, allowing for multiple ways to use this framework. Two such parts include express routing and middleware. Routers can be made with Express to redirect based on the url and HTTP method the user attempts to access. This is great for setting up databases using the API structure. Express middleware is another useful tool that allows better use of DRY code and allows the used of other 3rd party resources to create better and cleaner experience.

- [x] Describe Middleware?

> Middleware allows the use of interjecting code between another function. It can access the request and response objects submitted and execute code that makes changes to these objects. It can stop the function before it gets started or call the middlewark based on the order the middleware is entered. Middleware is used in a lot of different programming languages. In express, one good way to use middleware is as error checking resources. It can check the inputted data to verify it is valid before running the function. 

- [x] Describe a Resource?

> Resources for Express routing are pulled using the url and http method. Allowing for the use of Create, Read, Update, and Destory to be implemented based on the url (only 1 url per resource) called. Resources can have multiple renditions depending on the call.

- [x] What can the API return to help clients know if a request was successful?

> APIs can return HTTP Status codes based on the request results. Status Codes in the 200s are for successful responses. API can return other results as well depending on the request. The is a wide array of things the API can return. For example, a request of information from a database can return a 200 status and a JSON object of the results, or a HTTP status of 404, if the object information is not found.

- [x] How can we partition our application into sub-applications?

> Express is a flexibile framework, therefore it allows the programmer the ability to split the code into sub-applications. For example, different database requests can be subdivided into different apps based on the url call. So the code for a call to the users database would be in one file and have it's own set of applications in that file, while the code for the blog is in another file but does not necessarily have to overlap with the users application.  
> In our code, we have been using routers which are required into our base file and then using `server.use` function to tell the base application when and how to utilize the sub-applications.